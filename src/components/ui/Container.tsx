import { cn } from "@/lib/utils";
import { View } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <View className={cn("px-4", className)} {...props}>
      {children}
    </View>
  );
}
