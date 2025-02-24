import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import useGetMemberDetailsById from '../hooks/useGetMemberDetailsById';
import useUserDataStore from '../store/userDetailStore';
import {useTheme} from '../context/ThemeContext';
import pickImage from '../utility/PickImage';
import usePostProfileImage from '../hooks/usePostProfileImage';
import ProfileImageComponent from '../components/ProfileImageComponent';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import ThemeText from '../components/ThemeText';
import TextViewContainer from '../components/TextViewContainer';

const ProfileScreen = () => {
  const theme = useTheme();
  const {loggedMmeberId} = useUserDataStore();
  const {data: memberDeatails} = useGetMemberDetailsById(loggedMmeberId);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const useProfileImage = usePostProfileImage();

  const handlePickImage = async (fromCamera = false) => {
    try {
      const image: any = await pickImage(fromCamera);
      setImageUri(image.uri);
      console.log(image.uri);
      uploadImage(image);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(memberDeatails);

  const uploadImage = (image: any) => {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName || `profile_${Date.now()}.jpg`,
    });

    useProfileImage.mutate({memberId: loggedMmeberId, profileImage: formData});
  };

  return (
    <View
      style={[
        style.mainContainer,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View style={style.headingTextContainer}>
        <ThemeText fontType="primary" fontStyle="medium" fontSize="medium">
          Profile
        </ThemeText>
      </View>
      <View style={style.profilePictureContainer}>
        <ThemeText fontType="primary" fontStyle="medium" fontSize="medium" fontColor='other'>Nethupama Shavinda</ThemeText>
        <ProfileImageComponent />
      </View>
      <View style={{gap:20}}>
        <TextViewContainer/>
        <TextViewContainer/>
        <TextViewContainer/>
        <TextViewContainer/>
      </View>
    </View>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingLeft: getWidthPercentage(16),
    paddingRight: getWidthPercentage(16),
  },
  headingTextContainer: {
    marginTop: getHeightPercentage(20),
  },
  profilePictureContainer:{
    marginTop:getHeightPercentage(10),
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:10
  }

});
