import {CustomAttachButton} from './mediaPickerTelegram';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";import { useState, useEffect, useRef, useMemo } from "react";
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
const Bottom = () => {

    // ref
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ["50%"], []);

    const openModal = () => {
        bottomSheetModalRef.current.present();
    };

    let photos;
    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={photos}
                    renderItem={({ item }) => (
                        <CustomAttachButton{...item} onPress={() => openModal()} />
                    )}
                />
            </SafeAreaView>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                style={styles.bottomSheet}
            >
            </BottomSheetModal>
        </BottomSheetModalProvider>

    );
};

export default Bottom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    cameraContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    }

});
