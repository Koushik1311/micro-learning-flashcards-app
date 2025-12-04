import { View } from "react-native";
import Menu from "../ui/Menu";
import { cn } from "@/lib/utils";

export default function Header({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={cn(
        "px-4 py-2 flex-row justify-between items-center",
        className,
      )}
    >
      <Menu />
      {children}
    </View>
  );
}
