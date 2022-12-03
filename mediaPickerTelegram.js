import { AttachButton, Channel, useMessageInputContext } from 'stream-chat-react-native';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';

const CustomAttachButton = () => {
    const { showActionSheetWithOptions } = useActionSheet();
    const { pickFile, uploadNewImage } = useMessageInputContext();

    const pickImageFromGallery = () =>
        ImagePicker.openPicker({
            multiple: true,
        }).then(images =>
            images.forEach(image =>
                uploadNewImage({
                    uri: image.path,
                }),
            ),
        );

    const pickImageFromCamera = () =>
        ImagePicker.openCamera({
            cropping: true,
        }).then(image =>
            uploadNewImage({
                uri: image.path,
            }),
        );

    const onPress = () => {
        // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
        showActionSheetWithOptions(
            {
                cancelButtonIndex: 3,
                destructiveButtonIndex: 3,
                options: ['Photo Library', 'Camera', 'Files', 'Cancel'],
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        pickImageFromGallery();
                        break;
                    case 1:
                        pickImageFromCamera();
                        break;
                    case 2:
                        pickFile();
                        break;
                    default:
                        break;
                }
            },
        );
    };

    return <AttachButton handleOnPress={onPress} />;
};

module.exports = CustomAttachButton;
