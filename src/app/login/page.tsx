import { LoginForm } from "@/components/auth/LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <LoginForm redirect={redirect} />
    </main>
  );
}
