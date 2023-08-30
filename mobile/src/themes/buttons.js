import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export default buttons = {
  standartBotton: {
    width: width - 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
};
