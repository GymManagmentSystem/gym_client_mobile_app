import React, { useState } from 'react'
import { Button, Image, Text, View } from 'react-native'
import useGetMemberDetailsById from '../hooks/useGetMemberDetailsById'
import useUserDataStore from '../store/userDetailStore'
import { useTheme } from '../context/ThemeContext'
import pickImage from '../utility/PickImage'
import usePostProfileImage from '../hooks/usePostProfileImage'
import ProfileImageComponent from '../components/ProfileImageComponent'




const ProfileScreen = () => {
  const theme=useTheme();
  const {loggedMmeberId}=useUserDataStore()
  const {data:memberDeatails,}=useGetMemberDetailsById(loggedMmeberId)
  const [imageUri,setImageUri]=useState<string |null>(null);

  const useProfileImage=usePostProfileImage();


  const handlePickImage = async (fromCamera = false) => {
    try {
        const image: any = await pickImage(fromCamera);
        setImageUri(image.uri);
        console.log(image.uri);
        uploadImage(image)
    } catch (error) {
        console.log(error);
    }
  };

  console.log(memberDeatails)

  const uploadImage = (image: any) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName || `profile_${Date.now()}.jpg`,
    });

    useProfileImage.mutate({memberId:loggedMmeberId,profileImage: formData});

    
};


  return (
    <View style={{flex:1,backgroundColor:theme.colors.background.primary}}>
      <ProfileImageComponent/>
      {/* <View>
            <Image
                source={imageUri ? { uri: imageUri } : require('../../assets/images/defaultProfile.jpg')}
                style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Button title="Pick from Gallery" onPress={() => handlePickImage(false)} />
            <Button title="Take a Photo" onPress={() => handlePickImage(true)} />
        </View> */}
    </View>
  )
}

export default ProfileScreen