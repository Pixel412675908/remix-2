import { useTheme } from "@/hooks/use-theme";

export function LumiLogo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="select-none flex items-baseline">
      <span className="text-[22px] font-bold tracking-[0.04em] text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
        lumi
      </span>
      {isDark && (
        <span className="text-[22px] font-bold tracking-[0.04em] glow-green text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>
          nate
        </span>
      )}
    </div>
  );
}
