import { getTheme } from "@/lib/themes";
import { useTheme } from "next-themes";

interface Props {
  theme: string;
}

const ColorPreview = (props: { color: string }) => {
  return (
    <div
      className="w-4 h-4 rounded-full border border-border"
      style={{ backgroundColor: props.color }}
    />
  );
};

const ColorsPreview = (props: Props) => {
  const { theme } = props;
  const themeConfig = getTheme(theme);
  const { theme: currentTheme } = useTheme();

  const colors: string[] = Object.values(
    currentTheme === "dark" ? themeConfig.dark : themeConfig.light,
  );

  if (!themeConfig) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color, index) => (
        <ColorPreview key={index} color={color} />
      ))}
    </div>
  );
};

export default ColorsPreview;
