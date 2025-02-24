import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import useUserDataStore from '../store/userDetailStore';
import useGetMemberDetailsById from '../hooks/useGetMemberDetailsById';
import usePostProfileImage from '../hooks/usePostProfileImage';
import pickImage from '../utility/PickImage';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import LoadingActivityIndicator from '../modals/LoadingActivityIndicator';



interface ProfileImageComponentProp{
    imageUrl:string|null
}

const ProfileImageComponent = ({imageUrl}:ProfileImageComponentProp) => {
  const {loggedMmeberId}=useUserDataStore()
  const [imageUri,setImageUri]=useState<string |null>(!imageUrl?null:imageUrl);
  const useProfileImage=usePostProfileImage();

  const queryClient=useQueryClient();
  console.log("image url is ",imageUrl)

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
            <View>
            <LoadingActivityIndicator
          title="Loading Profile..."
          visibility={useProfileImage.isLoading}
        />
            </View>
            <TouchableOpacity onPress={() => handlePickImage(false)}>
            <Image
                source={imageUri ? { uri: imageUrl } : require('../../assets/images/defaultProfile.jpg')}
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