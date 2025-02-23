import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';

const pickImage = async (fromCamera = false) => {
    const options:CameraOptions= {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
    };

    return new Promise((resolve, reject) => {
        const picker = fromCamera ? launchCamera : launchImageLibrary;

        picker(options, response => {
            if (response.didCancel) {
                reject("User cancelled image selection");
            } else if (response.errorMessage) {
                reject(response.errorMessage);
            } else {
                const image = response.assets?.[0]; // Get the selected image
                resolve(image);
            }
        });
    });
};

export default pickImage;