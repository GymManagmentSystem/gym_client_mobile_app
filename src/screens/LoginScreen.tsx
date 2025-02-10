import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableHighlight,
} from 'react-native';
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
        style.screenContainer,
        {backgroundColor: theme.colors.background},
      ]}>
      <ThemeText fontSize="small">Hello world</ThemeText>

      <View>
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
      </View>

      <PrimaryButton
        title="START YOUR FITNESS ADVENTURE"
        onHandle={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});

export default LoginScreen;
