import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import ThemeText from '../components/ThemeText';
import PaymentHistoryCard from '../components/PaymentHistoryCard';
import useUserDataStore from '../store/userDetailStore';
import useGetPayments from '../hooks/useGetPayments';
import CustomModal from '../modals/CustomModal';
import LoadingActivityIndicator from '../modals/LoadingActivityIndicator';

const PaymentHistoryScreen = () => {
  const theme = useTheme();
  const {loggedMmeberId} = useUserDataStore();
  const {data: paymentList, isLoading, error} = useGetPayments(loggedMmeberId);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [errorModalVisbility, setErrorModalVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setModalMessage(error.message);
      setErrorModalVisibility(true);
    }
  }, [error]);

  return (
    <View
      style={[
        style.mainContainer,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View>
        <CustomModal
          modalType="error"
          message={modalMessage}
          visibility={errorModalVisbility}
          onClick={() => setErrorModalVisibility(false)}
        />

        <LoadingActivityIndicator
          title="Sending Otp..."
          visibility={isLoading}
        />
      </View>
      <View style={style.headingTextContainer}>
        <ThemeText fontType="primary" fontStyle="medium" fontSize="medium">
          Payments
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xsmall">
          Your payment History
        </ThemeText>
      </View>

      <ScrollView style={style.paymentListScreen}>
      {paymentList && paymentList?.length > 0
        ? paymentList.map(payment => <PaymentHistoryCard payment={payment} key={payment.paymentTime}/>)
        : null}

      </ScrollView>
     
    </View>
  );
};

export default PaymentHistoryScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: getWidthPercentage(16),
    paddingRight: getWidthPercentage(16),
  },
  headingTextContainer: {
    marginTop: getHeightPercentage(20),
    gap: 5,
  },
  paymentListScreen:{
    marginTop:getHeightPercentage(40)
  }
});
