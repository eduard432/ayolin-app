import NewPasswordForm from "@/components/auth/new-password-form";

const NewPasswordPage = async ({ searchParams }: {searchParams: Promise<{token: string}>}) => {
  const token = (await searchParams).token
  return <NewPasswordForm token={token} />;
};

export default NewPasswordPage;
