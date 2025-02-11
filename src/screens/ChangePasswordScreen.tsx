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
import {MainStackNavigationList} from '../navigation/stackNavigation/MainStackNavigation';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import usePasswordReset from '../hooks/usePasswordReset';
import CustomModal from '../modals/CustomModal';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  'ChangePasswordScreen'
>;

type ResetPasswordNavigationProp = NativeStackNavigationProp<
  MainStackNavigationList,
  'ChangePasswordScreen'
>;

const ChangePasswordScreen = ({route}: {route: ResetPasswordRouteProp}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordType>({
    resolver: zodResolver(passwordSchema),
  });
  const theme = useTheme();

  const navigation = useNavigation<ResetPasswordNavigationProp>();

  const [modalMessage, setModalMessage] = useState<string>('');
  
  const [errorModalVisbility, setErrorModalVisibility] =
    useState<boolean>(false);

  const [successModalVisbility, setSuccessModalVisibility] =
    useState<boolean>(false);

  const passwordResetRequest = usePasswordReset();

  const successNavigate = () => {
    setSuccessModalVisibility(false);
    navigation.navigate('SuccessPasswordResetScreen');
  };

  const submitDetails = (data: PasswordType) => {
    if (data.password != data.confirmPassword) {
      setModalMessage('Passwords are mismatching');
      setErrorModalVisibility(true);
    } else {
      const {userName} = route.params;
      const password = data.password;
      passwordResetRequest.mutate(
        {userName, password},
        {
          onSuccess: data => {
            console.log(data);
            setModalMessage(data);
            setSuccessModalVisibility(true);
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
      <View style={ForgotPasswordScreenStyles.headerConatiner}>
        <ForgotPasswordScreenHeader
          title="Reset Password"
          navigateBack={() => navigation.goBack()}
        />
      </View>

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
          You must reset your password
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="xsmall">
          in your first login.
        </ThemeText>
      </View>

      <View style={ForgotPasswordScreenStyles.textInputConatiner}>
        <CustomTextInput
          control={control}
          regName="password"
          placeHolder="Password"
          inputType="text"
          isPassword={true}
          error={errors.password?.message}
        />
        <CustomTextInput
          control={control}
          regName="confirmPassword"
          placeHolder="Confirm Password"
          inputType="text"
          isPassword={true}
          error={errors.confirmPassword?.message}
        />
      </View>
      <View style={ForgotPasswordScreenStyles.buttonContainer}>
        <PrimaryButton
          title="Reset"
          titleFontColor="primary"
          onHandle={handleSubmit(submitDetails)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
