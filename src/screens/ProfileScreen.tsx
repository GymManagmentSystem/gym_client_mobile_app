import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useGetMemberDetailsById from '../hooks/useGetMemberDetailsById';
import useUserDataStore from '../store/userDetailStore';
import {useTheme} from '../context/ThemeContext';
import ProfileImageComponent from '../components/ProfileImageComponent';
import {getHeightPercentage, getWidthPercentage} from '../utility/Dimensions';
import ThemeText from '../components/ThemeText';
import TextViewContainer from '../components/TextViewContainer';
import PrimaryButton from '../components/PrimaryButton';
import CustomModal from '../modals/CustomModal';
import LoadingActivityIndicator from '../modals/LoadingActivityIndicator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackNavigationList} from '../navigation/stackNavigation/MainStackNavigation';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../api/AxiosInstance';

type profileScreenNavigationProp = NativeStackNavigationProp<
  MainStackNavigationList,
  'BottomStackScreens'
>;

const ProfileScreen = () => {
  const theme = useTheme();

  const navigation = useNavigation<profileScreenNavigationProp>();
  const userDataStore = useUserDataStore();
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const {
    data: memberDeatails,
    error,
    isLoading,
  } = useGetMemberDetailsById(userDataStore.loggedMmeberId);

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  console.log(memberDeatails?.firstName);

  const resetPasswordScreenNavigation = () => {
    navigation.navigate('ResetPasswordScreen', {
      userName: userDataStore.loggedUserName,
    });
  };

  const logoutProcess = () => {
    userDataStore.setLoggedMemberId(0);
    userDataStore.setUserName('');
    axiosInstance.defaults.headers.common['Authorization'] = null;
    navigation.navigate('LoginScreen');
  };

  return (
    <View
      style={[
        style.mainContainer,
        {backgroundColor: theme.colors.background.primary},
      ]}>
      <View>
        <CustomModal
          message={error?.message || 'unexpected error'}
          modalType="error"
          visibility={showErrorModal}
          onClick={() => {
            setShowErrorModal(false);
          }}
        />
        <LoadingActivityIndicator
          title="Loading Member Details..."
          visibility={isLoading}
        />
      </View>
      <View style={style.headingTextContainer}>
        <ThemeText fontType="primary" fontStyle="medium" fontSize="medium">
          Profile
        </ThemeText>
      </View>
      {memberDeatails ? (
        <View>
          <View style={style.profilePictureContainer}>
            <ThemeText
              fontType="primary"
              fontStyle="medium"
              fontSize="medium"
              fontColor="other">
              Nethupama Shavinda
            </ThemeText>
            <ProfileImageComponent imageUrl={memberDeatails.profileImageUrl} />
          </View>
          <View style={style.userDataConatiner}>
            <TextViewContainer
              label="User Name"
              value={memberDeatails.firstName + ' ' + memberDeatails.lastName}
            />
            <TextViewContainer
              label="Email Address"
              value={memberDeatails.email}
            />
            <TextViewContainer
              label="Contact Number"
              value={memberDeatails.contactNumber}
            />
            <TextViewContainer label="Age" value={memberDeatails.age} />
          </View>

          <View style={style.passwordResetTextButtonConatiner}>
            <TouchableOpacity onPress={() => resetPasswordScreenNavigation()}>
              <ThemeText
                fontType="secondary"
                fontSize="xsmall"
                fontStyle="regular">
                Reset Password
              </ThemeText>
            </TouchableOpacity>
            <Image
              source={require('../../assets/icons/resetPasswordIcon.png')}
              style={style.imageIcon}
            />
          </View>

          <View style={style.buttonContainer}>
            <PrimaryButton
              title="Log Out"
              titleFontColor="primary"
              onHandle={() => console.log('hi')}
            />
          </View>
        </View>
      ) : null}
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
  profilePictureContainer: {
    marginTop: getHeightPercentage(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  userDataConatiner: {
    marginTop: 20,
    gap: 10,
  },
  passwordResetTextButtonConatiner: {
    marginTop: getHeightPercentage(15),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
  },
  imageIcon: {
    width: 15,
    height: 15,
  },
  buttonContainer: {
    marginTop: getHeightPercentage(20),
  },
});
