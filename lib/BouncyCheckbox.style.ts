import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  textContainer: ViewStyle;
  iconImageStyle: ImageStyle;
}

export const _iconContainer = (
  size: number,
  checked: boolean,
  fillColor: string,
  unfillColor: string,
  borderColor: string,
): ViewStyle => {
  return {
    width: size,
    height: size,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: size / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: checked ? fillColor : unfillColor,
  };
};

export const _textStyle = (checked: boolean): TextStyle => {
  return {
    fontSize: 16,
    color: "#757575",
    textDecorationLine: checked ? "line-through" : "none",
  };
};

export default StyleSheet.create<Style>({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconImageStyle: {
    width: 10,
    height: 10,
  },
  textContainer: {
    marginLeft: 16,
  },
});
