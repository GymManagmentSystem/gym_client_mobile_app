import { StyleSheet } from "react-native";
import { getHeightPercentage, getWidthPercentage } from "../utility/Dimensions";

export const ForgotPasswordScreenStyles=StyleSheet.create({
      headerConatiner: {
        marginTop: getHeightPercentage(30),
      },
      imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:getHeightPercentage(45)
      },
      imageBox: {
        width: 120,
        height: 120,
        borderRadius: 60,
      },
      textContainer: {
        marginTop:getHeightPercentage(53),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      textInputConatiner: {
        marginTop:getHeightPercentage(45),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      buttonContainer:{
        marginTop:getHeightPercentage(71)
      }
})