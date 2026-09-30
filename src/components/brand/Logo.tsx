import { cn } from "@/lib/utils";

const CREST = "/assets/brand/colegio-metodista.png";

export function Logo({
  className,
}: {
  variant?: "color" | "white";
  className?: string;
}) {
  return (
    <img
      src={CREST}
      alt="Colegio Metodista Robert Johnson"
      className={cn("h-16 w-auto max-w-44 shrink-0 object-contain", className)}
    />
  );
}

/** Escudo institucional. Reemplaza la marca MIRARIM en esta versión. */
export function BrandMark({
  className,
}: {
  variant?: "color" | "white";
  className?: string;
}) {
  return <Logo className={className} />;
}
