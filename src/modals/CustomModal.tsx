import {Image, Modal, StyleSheet, View} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import ThemeText from '../components/ThemeText';
import PrimaryButton from '../components/PrimaryButton';


interface CustomModalProps {
  message: string;
  modalType: 'error' | 'success';
  visibility:boolean;
  onToogleModal:()=>void
}

const CustomModal = ({message, modalType,visibility,onToogleModal}: CustomModalProps) => {
  const theme = useTheme();

  return (
    <Modal transparent={true} animationType="fade" visible={visibility}>
      <View style={ModalStyles.modalPosition}>
        <View
          style={[
            ModalStyles.container,
            {backgroundColor: theme.colors.background.secondary},
          ]}>
          <View style={ModalStyles.imageContainer}>
            <View style={ModalStyles.imageBox}>
              {modalType === 'error' ? (
                <Image
                  source={require('../../assets/icons/modalErrorIcon.png')}
                  style={ModalStyles.image}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/modalRighIcon.png')}
                  style={ModalStyles.image}
                />
              )}
            </View>
          </View>
          <View style={ModalStyles.messageContainer}>
            <ThemeText fontType="primary" fontStyle="regular" fontSize="medium">
              {message}
            </ThemeText>
          </View>
          <View style={ModalStyles.buttonContainer}>
            <PrimaryButton
              title={modalType === 'error' ? 'Try Again' : 'Continue'}
              onHandle={onToogleModal}
              titleFontColor="primary"
              width={300}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const ModalStyles=StyleSheet.create({
    modalPosition:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    container:{
        justifyContent:"space-evenly",
        alignContent:"center",
        width:"100%",
        height:250,
        borderRadius:30
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10
      },
      imageBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      image:{
        width:"100%",
        height:"100%"
      },
      messageContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      },
      buttonContainer:{
        marginTop:10,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }
})
