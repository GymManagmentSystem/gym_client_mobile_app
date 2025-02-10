import { Dimensions } from "react-native";

const {width,height}=Dimensions.get('window');

export const getHeightPercentage=(figmaValue:number,figmaHeight:number):number=>{
    return (figmaValue/figmaHeight)*height
}

export const getWidthPercentage=(figmaValue:number,figmaWidth:number):number=>{
    return (figmaValue/figmaWidth)*width
}