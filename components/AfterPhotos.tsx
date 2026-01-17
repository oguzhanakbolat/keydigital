import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { saveImagePermanently } from "@/utils/saveImage";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormLayout from "./FormLayout";

const { height, width } = Dimensions.get("window");

type AfterPhotosProps = {
  setPlateImage: (image: string) => void;
  setGaugeImage: (image: string) => void;
  setGeneralImage: (image: string) => void;
  plateImage: string;
  gaugeImage: string;
  generalImage: string;
  setStep: (step: number) => void;
  step: number;
  isActive: boolean;
};

const AfterPhotos: FC<AfterPhotosProps> = ({
  setPlateImage,
  setGaugeImage,
  setGeneralImage,
  plateImage,
  gaugeImage,
  generalImage,
  setStep,
  step,
  isActive,
}) => {
  const insets = useSafeAreaInsets();
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [selectedImage, setSelectedImage] = useState<
    "plate" | "gauge" | "general" | null
  >(null);

  const takePicture = async (which: "plate" | "gauge" | "general") => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert("İzin Gerekli", "Kamera kullanmak için izin vermelisiniz.");
        return;
      }
    }

    setShowCamera(true);
    setSelectedImage(which);
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
        });

        if (photo) {
          // Resmi kalıcı konuma kaydet
          const permanentUri = await saveImagePermanently(
            photo.uri,
            selectedImage || "photo"
          );
          if (selectedImage === "plate") {
            setPlateImage(permanentUri);
          } else if (selectedImage === "gauge") {
            setGaugeImage(permanentUri);
          } else if (selectedImage === "general") {
            setGeneralImage(permanentUri);
          }
          setShowCamera(false);
          setSelectedImage(null);
        }
      } catch (error) {
        Alert.alert("Hata", "Fotoğraf çekerken bir hata oluştu.");
        console.error("Capture Error:", error);
      }
    }
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("İzin Gerekli", "Galeriye erişim izni verilmedi!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: true,
      allowsMultipleSelection: false,
      selectionLimit: 1,
    });

    if (result.assets) {
      const image = result.assets[0];
      // Resmi kalıcı konuma kaydet
      const permanentUri = await saveImagePermanently(
        image.uri,
        selectedImage || "photo"
      );
      if (selectedImage === "plate") {
        setPlateImage(permanentUri);
      } else if (selectedImage === "gauge") {
        setGaugeImage(permanentUri);
      } else if (selectedImage === "general") {
        setGeneralImage(permanentUri);
      }
      setShowCamera(false);
      setSelectedImage(null);
    }
  };

  return (
    <FormLayout
      leftButtonPress={() => setStep(step - 1)}
      rightButtonPress={() => setStep(step + 1)}
      isActive={isActive}
    >
      <Text style={styles.title}>Teslimat Fotolarını Ekleyiniz</Text>

      <View style={styles.listContainer}>
        {plateImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: plateImage }} style={styles.image} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPlateImage("")}
            >
              <Icon name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => takePicture("plate")}
          >
            <View style={styles.iconContainer}>
              <Icon name="photos" size={150} color={Colors.text} />
            </View>
            <Icon name="plus" size={32} color={Colors.text} />
            <Text style={styles.text}>Plaka Fotografı</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.listContainer}>
        {gaugeImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: gaugeImage }} style={styles.image} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setGaugeImage("")}
            >
              <Icon name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => takePicture("gauge")}
          >
            <View style={styles.iconContainer}>
              <Icon name="photos" size={150} color={Colors.text} />
            </View>
            <Icon name="plus" size={32} color={Colors.text} />
            <Text style={styles.text}>Gösterge Saati Fotografı</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.listContainer}>
        {generalImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: generalImage }} style={styles.image} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setGeneralImage("")}
            >
              <Icon name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => takePicture("general")}
          >
            <View style={styles.iconContainer}>
              <Icon name="photos" size={150} color={Colors.text} />
            </View>
            <Icon name="plus" size={32} color={Colors.text} />
            <Text style={styles.text}>Araç Genel Görünüş Fotografı</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={showCamera} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            ratio="4:3"
          />

          <View style={[styles.cameraControls, { bottom: insets.bottom + 16 }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowCamera(false)}
            >
              <Icon name="back" size={27} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={capturePhoto}
            >
              <Icon name="camera" size={32} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => openGallery()}
            >
              <Icon name="photos" size={27} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </FormLayout>
  );
};

export default AfterPhotos;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollView: {
    paddingBottom: 16,
    flex: 1,
  },
  scrollBottom: {
    height: 10,
  },
  text: {
    ...Fonts.S14W500,
    color: Colors.text,
    textAlign: "center",
  },
  title: {
    ...Fonts.S14W500,
    color: Colors.text,
  },
  listContainer: {
    paddingTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  imageContainer: {
    width: (width - 48) / 2,
    height: (((width - 48) / 2) * 3) / 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.text + "20",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.text + "20",
    padding: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: Colors.white + "80",
    borderRadius: 8,
    padding: 5,
  },
  addButton: {
    width: width - 48,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.text + "20",
    backgroundColor: Colors.white,
  },
  addButtonText: {
    ...Fonts.S14W500,
    color: Colors.text,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
  },

  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 24,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.white + "80",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonHidden: {
    width: 50,
    height: 50,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonText: {
    fontSize: 30,
  },
  cancelButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  overlayMiddle: {
    flexDirection: "row",
    alignItems: "center",
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    height: 220,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
  },
  idCardFrame: {
    width: 340,
    height: 220,
    borderWidth: 2,
    borderColor: "white",
    borderStyle: "dashed",
    borderRadius: 12,
    position: "relative",
  },
  instructionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: Colors.success,
    borderWidth: 3,
  },
  cornerTopLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
});
