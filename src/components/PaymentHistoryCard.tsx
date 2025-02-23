import React from 'react'
import { StyleSheet, View } from 'react-native'
import { getHeightPercentage, getWidthPercentage } from '../utility/Dimensions'
import { useTheme } from '../context/ThemeContext'
import ThemeText from './ThemeText'



interface PaymentHistoryCardProp{
    payment:Payments
}

const PaymentHistoryCard = ({payment}:PaymentHistoryCardProp) => {

const theme=useTheme()

  return (
    <View style={[style.mainContainer,{backgroundColor:theme.colors.background.secondary}]}>
        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Package Type</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>{payment.packageType}</ThemeText>
            </View>
        </View>

        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Payment Time</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>{payment.paymentTime}</ThemeText>
            </View>
        </View>

        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Payment Date</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>{payment.paymentDate}</ThemeText>
            </View>
        </View>

        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Payment Validity</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>{payment.validity?"Valid":"Expired"}</ThemeText>
            </View>
        </View>

        <View style={style.mainRow}>
            <View style={[style.key]}>
                <ThemeText fontType='primary' fontStyle='medium' fontSize='xsmall'>Expire Date</ThemeText>
            </View>
            <View style={style.value}>
            <ThemeText fontType='primary' fontStyle='regular' fontSize='xsmall' fontColor='other'>{payment.expirayDate}</ThemeText>
            </View>
        </View>

    </View>
  )
}

export default PaymentHistoryCard

const style=StyleSheet.create({
    mainContainer:{
        marginTop:10,
        width:getWidthPercentage(355),
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
    },
    key:{
        justifyContent:"flex-start",
        width:getWidthPercentage(140)
    },
    value:{
        justifyContent:"flex-start"
    }
})