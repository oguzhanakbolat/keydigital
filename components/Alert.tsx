import { Colors } from '@/constants/theme';
import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './Button';

type AlertProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const { width , height } = Dimensions.get('window');


const Alert = ({ showModal, setShowModal, title, description, onConfirm, onCancel, confirmText = "Tamam", cancelText = "İptal" }: AlertProps) => {
    const insets = useSafeAreaInsets();
  return (
    <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={onCancel}>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { paddingBottom: insets.bottom  + 20}]}>
                    <View style={styles.modalLine} />
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalDescription}>{description}</Text>
                    <View style={styles.modalButtons}>
                        <Button title={cancelText} secondary half onPress={onCancel} />
                        <Button title={confirmText} half  onPress={() => {onConfirm(); onCancel();}} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
      </Modal>
  )
}

export default Alert

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width,
        height,
    },
    modalContent: {
        backgroundColor: 'white',
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 10,
        width,
    },
    modalLine: {
        width: 100,
        height: 5,
        borderRadius: 2.5,
        alignSelf: 'center',
        backgroundColor: Colors.text + '20',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 32
    },
})