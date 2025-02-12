import React, {useState} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {ScreenContainerStyles} from '../styles/ScreenContainerStyles';
import {ForgotPasswordScreenStyles} from '../styles/ForgotPasswordScreenStyles';
import ForgotPasswordScreenHeader from '../components/ForgotPasswordScreenHeader';
import {useTheme} from '../context/ThemeContext';
import ThemeText from '../components/ThemeText';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import {z} from 'zod';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackNavigationList} from '../navigation/stackNavigation/MainStackNavigation';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import usePasswordReset from '../hooks/usePasswordReset';
import CustomModal from '../modals/CustomModal';

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, {message: 'password must have more than 8 characters'})
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, {message: 'Password must contain at least one number'})
    .regex(/[@$!%*?&^#]/, {
      message:
        'Password must contain at least one special character (@$!%*?&^#)',
    }),
  confirmPassword: z
    .string()
    .min(8, {message: 'password must have more than 8 characters'}),
});

type PasswordType = z.infer<typeof passwordSchema>;

type ResetPasswordRouteProp = RouteProp<
  MainStackNavigationList,
  'ResetPasswordScreen'
>;

type resetPasswordNavigationProp = NativeStackNavigationProp<
  MainStackNavigationList,
  'ResetPasswordScreen'
>;

const ResetPasswordScreen = ({route}: {route: ResetPasswordRouteProp}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordType>({
    resolver: zodResolver(passwordSchema),
  });

  const theme = useTheme();

  const navigation = useNavigation<resetPasswordNavigationProp>();

  const resetPasswordRequest = usePasswordReset();

  const [modalMessage, setModalMessage] = useState<string>('');

  const [errorModalVisbility, setErrorModalVisibility] =
    useState<boolean>(false);

  const submitDetails = ({password, confirmPassword}: PasswordType) => {
    const {userName} = route.params;
    if (password != confirmPassword) {
      setModalMessage('Password Mistmatching');
      setErrorModalVisibility(true);
    } else {
      resetPasswordRequest.mutate(
        {userName, password},
        {
          onSuccess: data => {
            navigation.navigate('SuccessPasswordResetScreen');
          },
          onError: error => {
            setModalMessage(error.message);
            setErrorModalVisibility(true);
          },
        },
      );
    }
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

      </View>
      <View style={ForgotPasswordScreenStyles.headerConatiner}>
        <ForgotPasswordScreenHeader
          title="Reset Password"
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
          Enter New Password
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xsmall">
          Your new password must be different
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xsmall">
          from previously used password.
        </ThemeText>
      </View>

      <View style={ForgotPasswordScreenStyles.textInputConatiner}>
        <CustomTextInput
          control={control}
          regName="password"
          placeHolder="Password"
          inputType="text"
          error={errors.password?.message}
          isPassword={true}
        />
        <CustomTextInput
          control={control}
          regName="confirmPassword"
          placeHolder="Confirm Password"
          inputType="text"
          error={errors.confirmPassword?.message}
          isPassword={true}
        />
      </View>
      <View style={ForgotPasswordScreenStyles.buttonContainer}>
        <PrimaryButton
          title="Save"
          titleFontColor="primary"
          onHandle={handleSubmit(submitDetails)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
