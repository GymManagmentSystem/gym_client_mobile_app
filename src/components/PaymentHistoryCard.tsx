import React from 'react'
import { StyleSheet, View } from 'react-native'
import { getHeightPercentage, getWidthPercentage } from '../utility/Dimensions'
import { useTheme } from '../context/ThemeContext'
import ThemeText from './ThemeText'


const PaymentHistoryCard = () => {

    
    const theme=useTheme()


  return (
    <View style={[style.mainContainer,{backgroundColor:theme.colors.background.secondary}]}>
        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Package Type</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>membership</ThemeText>
            </View>
        </View>

        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Payment Time</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>17:03:43</ThemeText>
            </View>
        </View>

        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Payment Date</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>2024.12.11</ThemeText>
            </View>
        </View>

        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Payment Validity</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>Expire</ThemeText>
            </View>
        </View>

        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Expire Date</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>2025.04.02</ThemeText>
            </View>
        </View>

    </View>
  )
}

export default PaymentHistoryCard

const style=StyleSheet.create({
    mainContainer:{
        width:getWidthPercentage(370),
        height:getHeightPercentage(200),
        gap:10,
        borderRadius:20,
        padding:10
    },
    mainRow:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:40,
        // marginLeft:getWidthPercentage(10),
        // marginRight:getWidthPercentage(10)
    },
    key:{
        justifyContent:"flex-start",
        width:getWidthPercentage(140)
    },
    value:{
        justifyContent:"flex-start"
    }
})