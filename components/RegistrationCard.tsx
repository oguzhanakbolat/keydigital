import Icon from "@/constants/icons/Icon";
import Registration from "@/constants/images/registration";
import { Colors, Fonts } from "@/constants/theme";
import { parseRegistrationCardDetailed } from "@/utils/registerCard.";
import { saveImagePermanently } from "@/utils/saveImage";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { RegistrationCardType } from "@/types/addCardType";
import { ImageManipulator } from "expo-image-manipulator";
import { extractTextFromImage } from "expo-text-extractor";
import { FC, useEffect, useRef, useState } from "react";
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

const { width, height } = Dimensions.get("window");
const frameX = 16;
const ratio = 173 / 246;
const w = width - frameX * 2;
const h = w * ratio;
const frameY = (height - h) / 2;

type OcrIdCardProps = {
  setImage: (data: any) => void;
  setList: (data: RegistrationCardType) => void;
  image: string;
};

const RegistrationCard: FC<OcrIdCardProps> = ({ setImage, setList, image }) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(image);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const close = () => {
    setCapturedImage(null);
    setList({
      plate: null,
      chassisNumber: null,
      brand: null,
      model: null,
      year: null,
      name: null,
      surname: null,
      tckn: null,
      email: null,
      phone: null,
      address: null,
      city: null,
      district: null,
      allData: [],
    });
    setImage(null);
    setLoading(false);
    setShowCamera(false);
  };

  const takePicture = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert("İzin Gerekli", "Kamera kullanmak için izin vermelisiniz.");
        return;
      }
    }

    setShowCamera(true);
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
        });

        if (photo) {
          setShowCamera(false);
          const croppedUri = await cropImageToFrame(photo.uri);
          await processImage(croppedUri);
        }
      } catch (error) {
        Alert.alert("Hata", "Fotoğraf çekerken bir hata oluştu.");
        console.error("Capture Error:", error);
      }
    }
  };

  const cropImageToFrame = async (imageUri: string) => {
    try {
      const imageRef = await ImageManipulator.manipulate(
        imageUri
      ).renderAsync();
      const imageWidth = imageRef.width;
      const imageHeight = imageRef.height;

      let scale: number;
      let offsetX = 0;
      let offsetY = 0;

      const scaleW = imageWidth / width;
      const scaleH = imageHeight / height;

      scale = Math.max(scaleW, scaleH);
      offsetX = (imageWidth - width * scale) / 2;
      offsetY = (imageHeight - height * scale) / 2;

      const cropX = frameX * scale + offsetX;
      const cropY = frameY * scale + offsetY;
      const cropWidth = w * scale;
      const cropHeight = h * scale;

      const croppedImageRef = await ImageManipulator.manipulate(imageUri)
        .crop({
          originX: cropX,
          originY: cropY,
          width: cropWidth,
          height: cropHeight,
        })
        .renderAsync();

      const result = await croppedImageRef.saveAsync();
      return result.uri;
    } catch (error) {
      console.error("Crop Error:", error);
      return imageUri;
    }
  };

  const processImage = async (imageUri: string) => {
    try {
      setLoading(true);
      // Resmi kalıcı konuma kaydet
      const permanentUri = await saveImagePermanently(imageUri, "registration");
      setCapturedImage(permanentUri);

      const extractedText = await extractTextFromImage(permanentUri);

      if (extractedText) {
        const parsedData = parseRegistrationCardDetailed(extractedText);
        setList(parsedData);
        setImage(permanentUri);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Hata", "Metin tanıma sırasında bir hata oluştu.");
      console.error("OCR Error:", error);
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
      aspect: [11, 17],
      allowsMultipleSelection: false,
      selectionLimit: 1,
    });

    if (result.assets) {
      const image = result.assets[0];
      setCapturedImage(image.uri);
      await processImage(image.uri);
      setShowCamera(false);
    }
  };

  useEffect(() => {
    if (image) {
      setCapturedImage(image);
    } else {
      setImage(null);
      setCapturedImage(null);
    }
  }, [image]);

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Araç Ruhsatını Tarayın</Text>

      {capturedImage ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: capturedImage }}
            style={{ width: w, height: h }}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.closeButton} onPress={close}>
            <Icon name="close" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.button, { height: 90 }]}
          onPress={takePicture}
        >
          {loading ? (
            <Text style={styles.buttonText}>İşleniyor...</Text>
          ) : (
            <Registration size={120} />
          )}
        </TouchableOpacity>
      )}

      <Modal visible={showCamera} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            ratio="4:3"
          />

          <View style={styles.overlay}>
            <View style={styles.overlayTop}>
              <Text style={styles.instructionText}>
                Araç Ruhsatını çerçeve içine yerleştirin
              </Text>
            </View>

            <View style={styles.overlayMiddle}>
              <View
                style={[
                  styles.overlaySide,
                  {
                    height: h,
                  },
                ]}
              />
              <View
                style={[
                  styles.idCardFrame,
                  {
                    width: w,
                    height: h,
                  },
                ]}
              >
                <View style={[styles.corner, styles.cornerTopLeft]} />
                <View style={[styles.corner, styles.cornerTopRight]} />
                <View style={[styles.corner, styles.cornerBottomLeft]} />
                <View style={[styles.corner, styles.cornerBottomRight]} />
              </View>
              <View
                style={[
                  styles.overlaySide,
                  {
                    height: h,
                  },
                ]}
              />
            </View>

            <View style={styles.overlayBottom} />
          </View>

          <View style={[styles.cameraControls, { bottom: insets.bottom + 16 }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowCamera(false)}
            >
              <Icon name="back" size={32} color={Colors.text} />
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
              <Icon name="photos" size={32} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    marginBottom: 21,
  },
  labelText: {
    ...Fonts.S14W400,
    color: Colors.text,
    marginBottom: 5,
  },
  button: {
    width: w,
    justifyContent: "center",
  },
  buttonText: {
    ...Fonts.S14W400,
    color: Colors.text + "80",
    paddingTop: 2,
  },
  imageContainer: {
    borderRadius: 5,
    width: width - 32,
    borderWidth: 1,
    borderColor: Colors.text + "20",
    backgroundColor: Colors.white,
    justifyContent: "center",
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: Colors.white + "80",
    borderRadius: 5,
    padding: 5,
  },
  labelError: {
    ...Fonts.S12W400,
    color: Colors.danger,
    marginTop: 6,
  },

  loadingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  resultContainer: {
    marginTop: 20,
    flex: 1,
  },
  textContainer: {
    marginTop: 10,
    maxHeight: 300,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  resultText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
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
    borderColor: "#00ff00",
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

export default RegistrationCard;
