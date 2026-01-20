import { Colors } from '@/constants/theme';
import React, { FC, ReactNode } from 'react';
import { Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

type SelectModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  children: ReactNode;
}

const { width } = Dimensions.get('window');

const SelectModal: FC<SelectModalProps> = ({ showModal, setShowModal, children }) => {
  return (
    <Modal
    visible={showModal}
    animationType="fade"
    transparent={true}
    onRequestClose={() => setShowModal(false)}
  >
    <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.line} />
            {children}
      </View>
    </View></TouchableWithoutFeedback>
  </Modal>

  )
}

export default SelectModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: Colors.white,
        paddingTop: 32,
        paddingBottom: 64,
        paddingHorizontal: 16,
        borderRadius: 10,
        width,
    },
    line: {
        width: 100,
        height: 5,
        borderRadius: 2.5,
        alignSelf: 'center',
        backgroundColor: Colors.text + '20',
        marginBottom: 20,
    },
})