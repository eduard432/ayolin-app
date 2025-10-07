'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadList,
	FileUploadTrigger,
} from '@/components/ui/file-upload'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { uploadFile } from '@/data/admin/admin.upload.client'
import {
	addChatbotContent,
	deleteChatbotContent,
	useChatbot,
} from '@/data/chatbot/chatbot.client'
import { cn } from '@/lib/utils'
import { FileSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chatbot } from '@prisma/client'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Separator } from '@radix-ui/react-separator'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CloudUpload, Ellipsis, FileTextIcon, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

type InputFileCardProps = {
	size: number
	filename: string
	type: string
	className?: string
	url: string
	chatbotId: string
}

const InputFileCard = ({
	size,
	filename,
	type,
	className,
	url,
	chatbotId,
}: InputFileCardProps) => {
	const queryClient = useQueryClient()

	const deleteMutation = useMutation<
		Chatbot,
		Error,
		string,
		{ previousChatbot: Chatbot }
	>({
		mutationFn: async () => {
			const result = await deleteChatbotContent(chatbotId, url)
			return result
		},
		onError: (_, chatbotId, context) => {
			toast.error('Error updating chatbot')
			queryClient.setQueryData(
				['chatbot', chatbotId],
				context?.previousChatbot
			)
		},
		onMutate: async (chatbotId) => {
			await queryClient.cancelQueries({
				queryKey: ['chatbot', chatbotId],
			})

			const previousChatbot = queryClient.getQueryData<Chatbot>([
				'chatbot',
				chatbotId,
			]) as Chatbot

			queryClient.setQueryData(['chatbot', chatbotId], (old: Chatbot) => {
				if (!old) return old
				const newChatbot: Chatbot = {
					...old,
					filesInput: old.filesInput.filter((f) => f.url !== url),
				}
				return newChatbot
			})

			return { previousChatbot }
		},
		onSuccess: () => {
			toast.success('Chatbot updated successfully')
		},
	})

	return (
		<Card
			className={cn(
				'rounded-none py-4 col-span-full first:rounded-t-md last:rounded-b-md',
				className
			)}
		>
			<CardContent className="flex justify-between items-center">
				<div className="flex items-center gap-x-4">
					<Avatar className="w-10 h-10 ">
						<AvatarFallback
							className={cn(
								'w-full h-full flex items-center justify-center rounded-full bg-violet-500/10 text-violet-400 '
							)}
						>
							<FileTextIcon />
						</AvatarFallback>
					</Avatar>

					<div>
						<h4 className="font-medium">{filename}</h4>
						<p className="text-sm font-medium text-muted-foreground">
							{type} - {Math.round(size / 1024)} KB
						</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="cursor-pointer" variant="ghost">
							<Ellipsis />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => deleteMutation.mutate(chatbotId)}
							className="text-destructive"
						>
							Eliminar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardContent>
		</Card>
	)
}

const formSchema = z.object({
	file: z.array(FileSchema).length(1, 'Please select at least one file'),
})

const Page = () => {
	const params = useParams()
	const chatbotId = params?.chatbotId as string

	const { data: chatbot } = useChatbot(chatbotId)
	const queryClient = useQueryClient()

	const mutation = useMutation<
		Chatbot,
		Error,
		{
			fileInput: z.infer<typeof formSchema>
			chatbotId: string
		}
	>({
		mutationFn: async (data) => {
			const prevChatbot = chatbot as Chatbot
			const { url } = await uploadFile(data.fileInput.file[0])
			const newFileInput = {
				url,
				filename: data.fileInput.file[0].name,
				size: data.fileInput.file[0].size,
				type: data.fileInput.file[0].type,
			}

			const result = await addChatbotContent(prevChatbot.id, newFileInput)
			return result
		},
		onError: () => {
			toast.error('Error updating chatbot')
		},
		onSuccess: (data) => {
			toast.success('Chatbot updated successfully')
			// Invalida la query para refrescar los datos desde el servidor
			queryClient.invalidateQueries({
				queryKey: ['chatbot', data.id],
			})
			form.reset()
		},
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			file: [],
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutation.mutate({ fileInput: values, chatbotId })
	}

	return (
		<div className="space-y-4">
			<section>
				<h1 className="text-4xl font-semibold tracking-tight">
					Contenido del chatbot
				</h1>
				<p className="text-sm text-muted-foreground">
					Administra y personaliza el contenido que tu chatbot utilizará para
					interactuar con los usuarios.
				</p>
			</section>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="file"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Attachments</FormLabel>
								<FormControl>
									<FileUpload
										value={field.value}
										onValueChange={field.onChange}
										accept=".pdf"
										maxFiles={2}
										maxSize={5 * 1024 * 1024}
										onFileReject={(_, message) => {
											form.setError('file', {
												message,
											})
										}}
									>
										<FileUploadDropzone className="flex-row border-dotted h-28">
											<CloudUpload className="size-4" />
											Drag and drop or
											<FileUploadTrigger asChild>
												<Button variant="link" size="sm" className="p-0">
													choose files
												</Button>
											</FileUploadTrigger>
											to upload
										</FileUploadDropzone>
										<FileUploadList>
											{field.value.map((file, index) => (
												<FileUploadItem key={index} value={file}>
													<FileUploadItemPreview />
													<FileUploadItemMetadata />
													<FileUploadItemDelete asChild>
														<Button
															variant="ghost"
															size="icon"
															className="size-7"
														>
															<X />
															<span className="sr-only">Delete</span>
														</Button>
													</FileUploadItemDelete>
												</FileUploadItem>
											))}
										</FileUploadList>
									</FileUpload>
								</FormControl>
								<FormDescription>Upload up to 5MB.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end">
						<Button type="submit" className="">
							Guardar
						</Button>
					</div>
				</form>
			</Form>
			<Separator />

			<section className="">
				{chatbot &&
					chatbot.filesInput.map((fileInput) => (
						<InputFileCard
							key={fileInput.url}
							size={fileInput.size}
							filename={fileInput.filename}
							type={fileInput.type}
							url={fileInput.url}
							chatbotId={chatbot.id}
						/>
					))}
			</section>
		</div>
	)
}

export default Page
