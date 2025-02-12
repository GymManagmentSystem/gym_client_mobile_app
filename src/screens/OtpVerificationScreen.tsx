import React, {useState} from 'react';
import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {ScreenContainerStyles} from '../styles/ScreenContainerStyles';
import {useTheme} from '../context/ThemeContext';
import {ForgotPasswordScreenStyles} from '../styles/ForgotPasswordScreenStyles';
import ForgotPasswordScreenHeader from '../components/ForgotPasswordScreenHeader';
import ThemeText from '../components/ThemeText';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackNavigationList} from '../navigation/stackNavigation/MainStackNavigation';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {getWidthPercentage} from '../utility/Dimensions';
import useOtpVerifcation from '../hooks/useOtpVerification';
import CustomModal from '../modals/CustomModal';

const otpSchema = z.object({
  otp: z
    .string({message: 'OTP is required'})
    .min(6, {message: 'OTP must have 6 digits'})
    .max(6, {message: 'OTP must have 6 digits'}),
});

type OtpType = z.infer<typeof otpSchema>;

type OtpVerificationNavigationProp = NativeStackNavigationProp<
  MainStackNavigationList,
  'OtpVerificationScreen'
>;

type OtpVerificationRouteProp = RouteProp<
  MainStackNavigationList,
  'OtpVerificationScreen'
>;

const OtpVerificationScreen = ({route}: {route: OtpVerificationRouteProp}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<OtpType>({
    resolver: zodResolver(otpSchema),
  });

  const theme = useTheme();
  const navigation = useNavigation<OtpVerificationNavigationProp>();
  const otpVerification = useOtpVerifcation();
  const [errorModalVisbility, setErrorModalVisibility] =
    useState<boolean>(false);

  const [successModalVisbility, setSuccessModalVisibility] =
    useState<boolean>(false);

  const [modalMessage, setModalMessage] = useState<string>('');

  const resendOtp = () => {};

  const successNavigate = () => {
    setSuccessModalVisibility(false);
  };

  const submitOtp = (data: OtpType) => {
    console.log(data);
    const {userName, email} = route.params;
    const otpEmail = {
      email,
      otp: data.otp,
    };
    otpVerification.mutate(otpEmail, {
      onSuccess: data => {
        setModalMessage(data)
        setSuccessModalVisibility(true)
      },
      onError: error => {
        setModalMessage(error.message)
        setErrorModalVisibility(true);
      },
    });
  };

  return (
    <SafeAreaView
      style={[
        ScreenContainerStyles.container,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View>
        <CustomModal
          modalType="error"
          message={modalMessage}
          visibility={errorModalVisbility}
          onClick={() => setErrorModalVisibility(false)}
        />

        <CustomModal
          modalType="success"
          message={modalMessage}
          visibility={successModalVisbility}
          onClick={successNavigate}
        />
      </View>

      <View style={ForgotPasswordScreenStyles.headerConatiner}>
        <ForgotPasswordScreenHeader
          title="Email Verification"
          navigateBack={() => console.log(navigation.navigate('LoginScreen'))}
        />
      </View>
      <View style={ForgotPasswordScreenStyles.imageContainer}>
        <View style={ForgotPasswordScreenStyles.imageBox}>
          <Image source={require('../../assets/icons/forgotIcon.png')} />
        </View>
      </View>

      <View style={ForgotPasswordScreenStyles.textContainer}>
        <ThemeText fontType="primary" fontStyle="semiBold" fontSize="xmedium">
          Get Your Code
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xsmall">
          Enter the 6 digits code that you received
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xsmall">
          on your email.
        </ThemeText>
      </View>

      <View style={ForgotPasswordScreenStyles.textInputConatiner}>
        <CustomTextInput
          control={control}
          regName="otp"
          placeHolder="Enter OTP"
          inputType="numeric"
          error={errors.otp?.message}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: getWidthPercentage(343, 396),
          }}>
          <ThemeText
            fontType="primary"
            fontStyle="regular"
            fontColor="primary"
            fontSize="xsmall">
            If you don’t receive code!
          </ThemeText>
          <TouchableOpacity>
            <ThemeText
              fontType="primary"
              fontStyle="regular"
              fontColor="other"
              fontSize="small">
              Resend
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={ForgotPasswordScreenStyles.buttonContainer}>
        <PrimaryButton
          title="Verify"
          titleFontColor="primary"
          onHandle={handleSubmit(submitOtp)}
        />
      </View>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;
