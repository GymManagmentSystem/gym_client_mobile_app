import React from 'react'
import { Text, View } from 'react-native'
import useGetMemberDetailsById from '../hooks/useGetMemberDetailsById'
import useUserDataStore from '../store/userDetailStore'


const ProfileScreen = () => {
  const {loggedMmeberId}=useUserDataStore()

const {data:memberDeatails,}=useGetMemberDetailsById(loggedMmeberId)

console.log("member details "+JSON.stringify(memberDeatails));


  return (
    <View>
        <Text>Profile Screen</Text>
    </View>
  )
}

export default ProfileScreen