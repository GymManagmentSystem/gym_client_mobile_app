import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import useUserDataStore from '../store/userDetailStore';
import useGetMemberDetailsById from '../hooks/useGetMemberDetailsById';
import usePostProfileImage from '../hooks/usePostProfileImage';
import pickImage from '../utility/PickImage';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';


const ProfileImageComponent = () => {
  const {loggedMmeberId}=useUserDataStore()
  const [imageUri,setImageUri]=useState<string |null>(null);
  const useProfileImage=usePostProfileImage();

  const queryClient=useQueryClient();


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


  const uploadImage = (image: any) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName || `profile_${Date.now()}.jpg`,
    });
    useProfileImage.mutate({memberId:loggedMmeberId,profileImage: formData},{
        onSuccess:(data)=>{
            queryClient.invalidateQueries(['memberDetailsById',loggedMmeberId])
        }
    });
};

  return (
          <View>
            <TouchableOpacity onPress={() => handlePickImage(false)}>
            <Image
                source={imageUri ? { uri: imageUri } : require('../../assets/images/defaultProfile.jpg')}
                style={style.image}
            />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => handlePickImage(true)} style={style.cammeraIconContainer}>
                <Image source={require('../../assets/icons/cammerIcon.png')} style={style.cammeraIcon}/>
            </TouchableOpacity> */}
        </View>
  )
}

export default ProfileImageComponent;

const style=StyleSheet.create({
    image:{
        width:120,
        height:120,
        borderRadius:60
    },
    cammeraIconContainer:{
        width:20,
        height:20
    },
    cammeraIcon:{
        width:"100%",
        height:"100%"
    }
})