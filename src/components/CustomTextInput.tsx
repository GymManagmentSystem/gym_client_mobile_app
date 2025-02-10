import React from 'react';
import {Control, Controller} from 'react-hook-form';
import {StyleSheet, TextInput, View} from 'react-native';
import ThemeText from './ThemeText';
import {useTheme} from '../context/ThemeContext';

interface CustomTextInputProps {
  regName: string;
  placeHolder: string;
  control: Control<any>;
  error?: string;
  inputType:"decimal"|"email"|"numeric"|"text"|"tel"
  isPassword?:boolean
}

const CustomTextInput = ({
  regName,
  placeHolder,
  control,
  error,
  inputType,
  isPassword
}: CustomTextInputProps) => {
  const theme = useTheme();
  return (
    <View>
      <Controller
        control={control}
        name={regName}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.colors.primary,
                fontFamily: theme.typography.fontFamiliy,
              },
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeHolder}
            inputMode={inputType}
            secureTextEntry={isPassword}
          />
        )}
      />
      {error && (
        <ThemeText
          fontSize="xsmall"
          fontColor='error'
          >
          {error}
        </ThemeText>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    width: 346,
    height: 43,
    borderRadius: 20,
    paddingLeft: 30,
    marginTop: 30,
  },
});
