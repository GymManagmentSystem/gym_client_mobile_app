import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemeText from './ThemeText';


interface ForgotPasswordScreenHeaderProps {
  title:string,
  navigateBack:()=>void;
}

const ForgotPasswordScreenHeader = ({title,navigateBack}:ForgotPasswordScreenHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.imageContainer} onPress={navigateBack}>
        <Image
          source={require('../../assets/icons/backArrow.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
          <ThemeText fontType="primary" fontStyle="bold" fontSize="large">
           {title}
          </ThemeText>
        </View>
    </View>
  );
};

export default ForgotPasswordScreenHeader;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 346,
    alignItems:"center"
  },
  imageContainer: {
    width: 20,
    height: 20,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer:{
    marginLeft:30
  }
});
