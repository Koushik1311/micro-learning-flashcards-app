import { cn } from "@/lib/utils";
import { View } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

interface ContainerProps extends SafeAreaViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <View className={cn("flex-1 px-4 py-2 bg-[#F4F1EB]", className)} {...props}>
      {/* <View className={cn("flex-1 px-4 py-2", className)} {...props}> */}
      {children}
    </View>
  );
}
