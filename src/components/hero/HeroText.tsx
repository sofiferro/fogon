import Link from "next/link";

export function HeroText() {
  return (
    <div className="flex flex-col gap-2 items-center text-center max-w-[800px] w-full">
      <h1 className="text-[40px] font-bold tracking-tight text-secondary leading-tight">
        Tu aporte llega directo a quien lo necesita
      </h1>
      <p className="text-base text-[#767676]">
        Descubrí causas de ONGs y elegí cómo ayudar.
      </p>
      <Link
        href="/ong/login"
        className="text-sm text-secondary font-medium mt-2 hover:underline underline-offset-2"
      >
        ¿Representás una ONG? Sumate acá
      </Link>
    </div>
  );
}
