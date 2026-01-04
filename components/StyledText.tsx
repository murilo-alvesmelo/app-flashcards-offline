import { cssInterop } from "nativewind";
import { Text, TextProps } from "react-native";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[{ fontFamily: "SpaceMono" }, props.style]} />;
}

cssInterop(MonoText, {
  className: {
    target: "style",
  },
});
