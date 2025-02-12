import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import ThemeText from '../components/ThemeText';

interface CustomActivityIndicatorProps {
  title: string;
  visibility: boolean;
}

const LoadingActivityIndicator = ({
  title,
  visibility,
}: CustomActivityIndicatorProps) => {
  const theme = useTheme();
  return (
    <Modal transparent={true} visible={visibility} animationType="slide">
      <View style={styles.modalPosition}>
        <ActivityIndicator color={theme.colors.secondary} size="large" />
        <ThemeText fontType="secondary" fontStyle="regular" fontSize="small">
          {title}
        </ThemeText>
      </View>
    </Modal>
  );
};

export default LoadingActivityIndicator;

const styles = StyleSheet.create({
  modalPosition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
