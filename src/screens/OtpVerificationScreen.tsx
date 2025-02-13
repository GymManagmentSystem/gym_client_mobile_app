import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
import useEmailVerifcation from '../hooks/useEmailVerification';
import LoadingActivityIndicator from '../modals/LoadingActivityIndicator';

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

  const otpVerificationRequest = useOtpVerifcation();

  const resendingOtpRequest = useEmailVerifcation();

  const [errorModalVisbility, setErrorModalVisibility] =
    useState<boolean>(false);

  const [successModalVisbility, setSuccessModalVisibility] =
    useState<boolean>(false);

  const [successResendModalVisbility, setSuccessResendModalVisibility] =
    useState<boolean>(false);

  const [modalMessage, setModalMessage] = useState<string>('');

  const successNavigate = () => {
    const userEmailData = route.params;
    setSuccessModalVisibility(false);
    navigation.navigate('ResetPasswordScreen', {
      userName: userEmailData.userName,
    });
  };

  const successResendProcess = () => {
    setSuccessResendModalVisibility(false);
  };

  const resendOtp = () => {
    const userEmailData = route.params;
    resendingOtpRequest.mutate(userEmailData, {
      onSuccess: data => {
        console.log(data);
        setModalMessage(data);
        setSuccessResendModalVisibility(true);
      },
      onError: error => {
        console.log(error.name);
        setModalMessage(error.message);
        setErrorModalVisibility(true);
      },
    });
  };

  const submitOtp = (data: OtpType) => {
    console.log(data);
    const {userName, email} = route.params;
    const otpEmail = {
      email,
      otp: data.otp,
    };
    otpVerificationRequest.mutate(otpEmail, {
      onSuccess: data => {
        setModalMessage(data);
        setSuccessModalVisibility(true);
      },
      onError: error => {
        setModalMessage(error.message);
        setErrorModalVisibility(true);
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
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

              <CustomModal
                modalType="success"
                message={modalMessage}
                visibility={successResendModalVisbility}
                onClick={successResendProcess}
              />

              <LoadingActivityIndicator
                title="Sending Otp..."
                visibility={resendingOtpRequest.isLoading}
              />
            </View>

            <View style={ForgotPasswordScreenStyles.headerConatiner}>
              <ForgotPasswordScreenHeader
                title="Email Verification"
                navigateBack={() =>
                  console.log(navigation.navigate('LoginScreen'))
                }
              />
            </View>
            <View style={ForgotPasswordScreenStyles.imageContainer}>
              <View style={ForgotPasswordScreenStyles.imageBox}>
                <Image source={require('../../assets/icons/forgotIcon.png')} />
              </View>
            </View>

            <View style={ForgotPasswordScreenStyles.textContainer}>
              <ThemeText
                fontType="primary"
                fontStyle="semiBold"
                fontSize="xmedium">
                Get Your Code
              </ThemeText>
              <ThemeText
                fontType="primary"
                fontStyle="regular"
                fontSize="xsmall">
                Enter the 6 digits code that you received
              </ThemeText>
              <ThemeText
                fontType="primary"
                fontStyle="regular"
                fontSize="xsmall">
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
                  width: getWidthPercentage(343),
                }}>
                <ThemeText
                  fontType="primary"
                  fontStyle="regular"
                  fontColor="primary"
                  fontSize="xsmall">
                  If you don’t receive code!
                </ThemeText>
                <TouchableOpacity onPress={resendOtp}>
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OtpVerificationScreen;
