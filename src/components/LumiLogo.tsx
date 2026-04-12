import { useTheme } from "@/hooks/use-theme";

export function LumiLogo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <span className="text-2xl font-bold tracking-tight select-none">
      {isDark ? (
        <>
          <span className="text-foreground">LUMI</span>
          <span className="glow-green text-primary">NATE</span>
        </>
      ) : (
        <span className="text-foreground">LUMI</span>
      )}
    </span>
  );
}
