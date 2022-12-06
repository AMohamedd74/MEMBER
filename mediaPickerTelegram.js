import { AttachButton, useMessageInputContext } from 'stream-chat-react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const CustomAttachButton = () => {
    const { uploadNewImage } = useMessageInputContext();
    const [photos, setAddPhotos] = useState(null);
    const [photo, setAddphoto] = useState(null);


    const choosePhoto = () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
        })
            .then((images) => {
                setAddphoto(null);
                setAddPhotos((lastPhotos) => {
                    const imagesMap = images.map((i) => {
                        return {
                            uri: i.path,
                            width: i.width,
                            height: i.height,
                            mime: i.mime,
                        };
                    });
                    return [...lastPhotos, ...imagesMap];
                });

            })
            .catch((e) => alert(e));
    };

    const renderImage = (image) => {
        return (
            <Image
                style={{
                    width: 185,
                    height: 128,
                    resizeMode: 'contain',
                    marginTop: 1,
                }}
                source={image}
            />
        );
    };

    const renderAsset = (image) => {
        return renderImage(image);
    };

    const pickImageFromCamera = () =>
        ImagePicker.openCamera({
            cropping: true,
        }).then(image =>
            uploadNewImage({
                uri: image.path,
            }),
        );

    const onPress = () => {

    };

    return <AttachButton handleOnPress={onPress} />
};

export class choosePhoto {
}
