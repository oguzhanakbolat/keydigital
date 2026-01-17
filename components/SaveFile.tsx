import { Colors, Fonts } from "@/constants/theme";
import { useSaveStore } from "@/store";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SaveFile = () => {
  const { isLoading, name, listNumber, totalListNumber, saveList } =
    useSaveStore();

  return (
    <>
      {isLoading && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalContentTitle}>
              {name || "İşlemini Gerçekleştiriliyor..."}
            </Text>
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${((listNumber - 1) / totalListNumber) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.modalContentDescription}>
              {saveList?.[listNumber - 1]?.name}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default SaveFile;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: Colors.white,
    width: "100%",
    padding: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentTitle: {
    ...Fonts.S16W500,
    color: Colors.text,
    marginBottom: 16,
  },
  modalContentDescription: {
    ...Fonts.S14W400,
    color: Colors.text,
    marginBottom: 16,
  },
  progressContainer: {
    width: "100%",
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: Colors.text + "20",
    marginVertical: 16,
  },
  progressBar: {
    width: "10%",
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
});
