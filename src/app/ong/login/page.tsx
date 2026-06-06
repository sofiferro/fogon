import { OngLoginForm } from "@/components/auth/OngLoginForm";

interface OngLoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function OngLoginPage({ searchParams }: OngLoginPageProps) {
  const { redirect } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <OngLoginForm redirect={redirect} />
    </main>
  );
}
