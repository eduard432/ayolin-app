import { TelegramConfigPage } from "@/components/channels/Telegram"

const integrationComponents = (chatbotId: string): Record<string, React.ReactNode>  => ({
	telegram: <TelegramConfigPage chatbotId={chatbotId} />,
	// whatsapp: <WhatsAppConfigPage />,
	// facebook: <FacebookConfigPage />,
})

const Page = async ({
	params,
}: {
	params: Promise<{ integration: string, chatbotId: string }>
}) => {
	const { integration, chatbotId } = await params
	const IntegrationComponent = integrationComponents(chatbotId)[integration]

	if (IntegrationComponent) return IntegrationComponent

	return (
		<div>
			<h1>Integration Configuration</h1>
			<p>Configure your integration here.</p>
		</div>
	)
}

export default Page
