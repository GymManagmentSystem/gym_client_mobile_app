import { Dimensions } from "react-native";

const {width,height}=Dimensions.get('window');

export const getHeightPercentage=(figmaValue:number):number=>{
    return (figmaValue/819)*height
}

export const getWidthPercentage=(figmaValue:number):number=>{
    return (figmaValue/403)*width
}