import { AttachButton, useMessageInputContext } from 'stream-chat-react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';

export const CustomAttachButton = () => {
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

    return <AttachButton handleOnPress={onPress} />
};

