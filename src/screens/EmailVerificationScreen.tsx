import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import ForgotPasswordScreenHeader from '../components/ForgotPasswordScreenHeader';
import {useTheme} from '../context/ThemeContext';
import {MainStackNavigationList} from '../navigation/stackNavigation/MainStackNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ThemeText from '../components/ThemeText';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenContainerStyles } from '../styles/ScreenContainerStyles';
import { ForgotPasswordScreenStyles } from '../styles/ForgotPasswordScreenStyles';


type EmailVerficationNavigationProp = NativeStackNavigationProp<
  MainStackNavigationList,
  'EmailVerficationScreen'
>;

const emailVerificationSchema = z.object({
  userName: z
    .string()
    .min(2, {message: 'Name must be at least 2 characters long'}),
  email: z
    .string({message: 'email is required'})
    .email({message: 'Invalid email address'})
    .min(1, {message: 'Password must be at least 8 characters long'}),
});

type EmailVerificationSchemaType = z.infer<typeof emailVerificationSchema>;

const EmailVerificationScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<EmailVerificationSchemaType>({
    resolver: zodResolver(emailVerificationSchema),
  });

  const theme = useTheme();
  const navigation = useNavigation<EmailVerficationNavigationProp>();

  const submitDetails = (data: EmailVerificationSchemaType) => {
    console.log(data);
  };

  return (
    <SafeAreaView
      style={[ScreenContainerStyles.container, {backgroundColor: theme.colors.background}]}>
      <View style={ForgotPasswordScreenStyles.headerConatiner}>
        <ForgotPasswordScreenHeader
          title="Forgot Password"
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
          Mail Address Here
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xsmall">
          Enter  your  email  for  the  verification
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xsmall">
          process.  We  will  send  4  digits  code  to
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xsmall">
          your email.
        </ThemeText>
      </View>

      <View style={ForgotPasswordScreenStyles.textInputConatiner}>
        <CustomTextInput
          control={control}
          regName="userName"
          placeHolder="User Name"
          inputType="text"
          error={errors.userName?.message}
        />
        <CustomTextInput
          control={control}
          regName="email"
          placeHolder="Email"
          inputType="email"
          error={errors.email?.message}
        />
      </View>
      <View style={ForgotPasswordScreenStyles.buttonContainer}>
        <PrimaryButton
          title="Send"
          titleFontColor="primary"
          onHandle={handleSubmit(submitDetails)}
        />
      </View>
    </SafeAreaView>
  );
};

export default EmailVerificationScreen;

