import { cn } from "@/lib/utils";

export const INSTITUTION_CREDIT = "Psicóloga Alejandra Bravo Pino";

export function InstitutionCredit({
  light = false,
  fixed = false,
}: {
  light?: boolean;
  fixed?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-center text-[11px] font-semibold leading-none tracking-wide",
        light ? "text-cream/70" : "text-muted",
        fixed && "pointer-events-none fixed inset-x-0 bottom-1.5 z-40",
      )}
    >
      {INSTITUTION_CREDIT}
    </p>
  );
}
