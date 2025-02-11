import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemeText from '../components/ThemeText';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavigationList} from '../navigation/stackNavigation/MainStackNavigation';
import {useTheme} from '../context/ThemeContext';
import z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import {ScreenContainerStyles} from '../styles/ScreenContainerStyles';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  MainStackNavigationList,
  'LoginScreen'
>;

const loginSchema = z.object({
  userName: z
    .string()
    .min(2, {message: 'Name must be at least 2 characters long'}),
  password: z
    .string()
    .min(8, {message: 'Password must be at least 8 characters long'}),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <SafeAreaView
      style={[
        ScreenContainerStyles.container,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View style={style.topContainer}>
        <ThemeText fontType="primary" fontStyle="bold" fontSize="large">
          Welcome Back !
        </ThemeText>
        <ThemeText fontType="primary" fontStyle="regular" fontSize="small">
          Log into your account
        </ThemeText>
      </View>

      <View style={style.inputContainer}>
        <CustomTextInput
          inputType="text"
          regName="userName"
          placeHolder="User Name"
          control={control}
          error={errors.userName?.message}
        />
        <CustomTextInput
          inputType="text"
          regName="password"
          placeHolder="Password"
          control={control}
          error={errors.password?.message}
          isPassword={true}
        />
        <View style={style.textButtonContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate("EmailVerficationScreen")}>
            <ThemeText
              fontType="secondary"
              fontStyle="regular"
              fontSize="xsmall">
              Forgot Password
            </ThemeText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.buttonContainer}>
        <PrimaryButton
          titleFontColor="primary"
          title="Sign In"
          onHandle={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 45,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 65,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 160,
  },
  textButtonContainer: {
    marginTop: 27,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default LoginScreen;
