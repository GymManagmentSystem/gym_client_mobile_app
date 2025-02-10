import { StyleSheet } from "react-native";
import { getWidthPercentage } from "../utility/Dimensions";




export const ScreenContainerStyles=StyleSheet.create({
    container: {
            flex: 1,
            paddingLeft: getWidthPercentage(32,403),
            paddingRight: getWidthPercentage(32,403),
          },
})