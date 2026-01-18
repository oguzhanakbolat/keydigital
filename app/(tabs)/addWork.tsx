import AfterPhotos from "@/components/AfterPhotos";
import BeforePhotos from "@/components/BeforePhotos";
import CardInformation from "@/components/CardInformation";
import CardPhoptos from "@/components/CardPhoptos";
import CheckProcess from "@/components/CheckProcess";
import PaymentInformation from "@/components/PaymentInformation";
import RegisterationInformation from "@/components/RegisterationInformation";
import RegistrationPhoto from "@/components/RegistrationPhoto";
import RequiredInformation from "@/components/RequiredInformation";
import SummaryInformation from "@/components/SummaryInformation";
import { Colors, Fonts } from "@/constants/theme";
import {
  CardInformationType,
  CheckProcessType,
  DataType,
  RegistrationCardType,
  RequiredInformationType,
} from "@/types/addCardType";
import {
  deletePendingWork,
  getPendingWorkById,
  savePendingWork,
} from "@/utils/pendingWorks";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { useUserStore } from "@/store";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const stepTitle: string[] = [
  "Kimlik Kartı",
  "Müşteri Bilgileri",
  "Ruhsat",
  "Ruhsat Bilgileri",
  "Fotoğraflandırma",
  "İşlem Bilgileri",
  "Teslimat Fotoları",
  "Ödeme Bilgileri",
  "Özet",
];

const initialData: DataType = {
  id: "",
  user: null,
  company: null,
  idCard: {
    tckn: null,
    name: null,
    surname: null,
    birthdate: null,
    allData: [],
  },
  cardInformation: {
    tckn: null,
    name: null,
    surname: null,
    birthdate: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    district: null,
    gender: null,
  },
  registration: {
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
  },
  process: {
    operations: [],
    notes: null,
  },
  requiredInformation: {
    km: "",
    mechanicalPasswordCode: "",
    pinCode: "",
    csCode: "",
    immobilizerFile: "",
    piece: null,
  },
  payment: null,
  beforeImages: [],
  plateImage: "",
  gaugeImage: "",
  generalImage: "",
  registrationImage: "",
  cardFrontImage: "",
  cardBackImage: "",
  immobilizerFile: "",
};

const stepList = [
  "Kimlik Kartı",
  "Müşteri Bilgileri",
  "Ruhsat",
  "Ruhsat Bilgileri",
  "Fotoğraflandırma",
  "İşlem Bilgileri",
  "Teslimat Fotoları",
  "Zorunlu Bilgiler",
  "Ödeme Bilgileri",
  "Özet",
];

export default function AddCarScreen() {
  const { user } = useUserStore();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ pendingId?: string }>();
  const [step, setStep] = useState(1);
  const [stepName, setStepName] = useState<string>(stepTitle[0]);
  const [data, setData] = useState<DataType>(initialData);
  const isInitialized = useRef(false);

  const setIdCardFrontImage = (image: string) => {
    setData((prev: any) => ({
      ...prev,
      cardFrontImage: image,
    }));
  };

  const setIdCardBackImage = (image: string) => {
    setData((prev: any) => ({
      ...prev,
      cardBackImage: image,
    }));
  };

  const setIdCardList = (list: CardInformationType) => {
    setData((prev: any) => ({
      ...prev,
      idCard: {
        ...prev.idCard,
        ...list,
      },
      cardInformation: {
        ...prev.cardInformation,
        tckn: list.tckn || prev.idCard.tckn,
        name: list.name || prev.idCard.name,
        surname: list.surname || prev.idCard.surname,
        birthdate: list.birthdate || prev.idCard.birthdate,
      },
    }));
  };

  const setRegistrationImage = (image: string) => {
    setData((prev: any) => ({
      ...prev,
      registrationImage: image,
    }));
  };

  const setCardInformationList = (list: CardInformationType) => {
    setData((prev: any) => ({
      ...prev,
      cardInformation: {
        ...prev.cardInformation,
        ...list,
      },
    }));
  };

  const setRegistrationList = (list: RegistrationCardType) => {
    setData((prev: any) => ({
      ...prev,
      registration: {
        ...prev.registration,
        allData: [...list.allData],
      },
    }));
  };

  const setRegistrationData = (list: RegistrationCardType) => {
    setData((prev: any) => ({
      ...prev,
      registration: {
        ...prev.registration,
        ...list,
      },
    }));
  };

  const setprocessList = (list: CheckProcessType) => {
    setData((prev: any) => ({
      ...prev,
      process: list,
    }));
  };

  const setPlateImage = (image: string) => {
    setData((prev: any) => ({
      ...prev,
      plateImage: image,
    }));
  };

  const setGaugeImage = (image: string) => {
    setData((prev: any) => ({
      ...prev,
      gaugeImage: image,
    }));
  };

  const setGeneralImage = (image: string) => {
    setData((prev: any) => ({
      ...prev,
      generalImage: image,
    }));
  };

  const setRequiredInformationList = (list: RequiredInformationType) => {
    setData((prev: any) => ({
      ...prev,
      requiredInformation: list,
    }));
  };

  const setPayment = (payment: number) => {
    setData((prev: any) => ({
      ...prev,
      payment: payment,
    }));
  };

  const setBeforeImages = (list: string[]) => {
    setData((prev: any) => ({
      ...prev,
      beforeImages: list,
    }));
  };

  const setStepNumber = () => {
    setStepName(stepList[step - 1] || "");
  };

  const resetData = () => {
    const newId = new Date().getTime().toString();
    setStep(1);
    setStepName(stepTitle[0]);
    setData({
      ...initialData,
      id: newId,
    });
  };

  const loadPendingWork = async (pendingId: string) => {
    const pendingWork = await getPendingWorkById(pendingId);

    if (pendingWork) {
      setData(pendingWork.data);
      setStep(1);
      setStepName(stepTitle[0]);
    } else {
      resetData();
    }

    setTimeout(() => {
      isInitialized.current = true;
    }, 100);
  };

  const saveToStorage = async () => {
    if (data.id && isInitialized.current) {
      await savePendingWork(data.id, data, step);
    }
  };

  const removeFromStorage = async () => {
    if (data.id) {
      await deletePendingWork(data.id);
    }
  };

  useEffect(() => {
    setStepNumber();
  }, [step]);

  useEffect(() => {
    saveToStorage();
  }, [step, data]);

  useFocusEffect(
    useCallback(() => {
      if (params.pendingId && params.pendingId !== "undefined") {
        loadPendingWork(params.pendingId);
      } else {
        resetData();

        setTimeout(() => {
          isInitialized.current = true;
        }, 100);
      }

      return () => {
        isInitialized.current = false;
      };
    }, [params.pendingId])
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.stepContainer}>
          {step >= 1 && (
            <TouchableOpacity onPress={() => setStep(1)} style={styles.circle}>
              <Text style={styles.circleText}>1</Text>
            </TouchableOpacity>
          )}

          {step >= 2 && (
            <TouchableOpacity onPress={() => setStep(2)} style={styles.circle}>
              <Text style={styles.circleText}>2</Text>
            </TouchableOpacity>
          )}

          {step >= 3 && (
            <TouchableOpacity onPress={() => setStep(3)} style={styles.circle}>
              <Text style={styles.circleText}>3</Text>
            </TouchableOpacity>
          )}

          {step >= 4 && (
            <TouchableOpacity onPress={() => setStep(4)} style={styles.circle}>
              <Text style={styles.circleText}>4</Text>
            </TouchableOpacity>
          )}

          {step >= 5 && (
            <TouchableOpacity onPress={() => setStep(5)} style={styles.circle}>
              <Text style={styles.circleText}>5</Text>
            </TouchableOpacity>
          )}


          {step >= 6 && (
            <TouchableOpacity onPress={() => setStep(6)} style={styles.circle}>
              <Text style={styles.circleText}>6</Text>
            </TouchableOpacity>
          )}

          {step >= 7 && (
            <TouchableOpacity onPress={() => setStep(7)} style={styles.circle}>
              <Text style={styles.circleText}>7</Text>
            </TouchableOpacity>
          )}

          {step >= 8 && (
            <TouchableOpacity onPress={() => setStep(8)} style={styles.circle}>
              <Text style={styles.circleText}>8</Text>
            </TouchableOpacity>
          )}

          {step >= 9 && (
            <TouchableOpacity onPress={() => setStep(9)} style={styles.circle}>
              <Text style={styles.circleText}>9</Text>
            </TouchableOpacity>
          )}
       
          {step >= 10 && (
            <TouchableOpacity
              onPress={() => setStep(10)}
              style={styles.circle}
            >
              <Text style={styles.circleText}>10</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.stepTitle}>{stepList[step - 1]}</Text>
        </View>

        <View style={styles.stepContainer}>
          {step < 2 && (
            <View style={styles.circlePassive}>
              <Text style={styles.circleTextPassive}>2</Text>
            </View>
          )}
          {step < 3 && (
            <View style={styles.circlePassive}>
              <Text style={styles.circleTextPassive}>3</Text>
            </View>
          )}
          {step < 4 && (
            <View style={styles.circlePassive}>
              <Text style={styles.circleTextPassive}>4</Text>
            </View>
          )}
          {step < 5 && (
            <View style={styles.circlePassive}>
              <Text style={styles.circleTextPassive}>5</Text>
            </View>
          )}
          {step < 6 && (
            <View style={styles.circlePassive}>
              <Text style={styles.circleTextPassive}>6</Text>
            </View>
          )}
          {step < 7 && (
            <View style={styles.circlePassive}>
              <Text style={styles.circleTextPassive}>7</Text>
            </View>
          )}
          {step < 8 && (
            <View style={styles.circlePassive}>
              <Text style={styles.circleTextPassive}>8</Text>
            </View>
          )}
          {step < 9 && (
            <View style={styles.circlePassive}>
              <Text style={styles.circleTextPassive}>9</Text>
            </View>
          )}
       
          {step < 10 && (
            <View style={styles.circlePassive}>
              <Text style={styles.circleTextPassive}>10</Text>
            </View>
          )}
         
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.formContainer}>
          <View style={[styles.form, { minHeight: height - insets.top }]}>
            <CardPhoptos
              setIdCardFrontImage={setIdCardFrontImage}
              setIdCardBackImage={setIdCardBackImage}
              cardFrontImage={data.cardFrontImage || ""}
              cardBackImage={data.cardBackImage || ""}
              setList={setIdCardList}
              setStep={setStep}
              step={step}
              isActive={stepName === "Kimlik Kartı"}
            />

            <CardInformation
              step={step}
              setStep={setStep}
              setData={setCardInformationList}
              list={data.cardInformation}
              isActive={stepName === "Müşteri Bilgileri"}
            />

            <RegistrationPhoto
              setImage={setRegistrationImage}
              setList={setRegistrationList}
              image={data.registrationImage || ""}
              setStep={setStep}
              step={step}
              isActive={stepName === "Ruhsat"}
            />

            <RegisterationInformation
              step={step}
              setStep={setStep}
              setData={setRegistrationData}
              list={data.registration}
              cardInformation={data.cardInformation}
              isActive={stepName === "Ruhsat Bilgileri"}
            />

            <BeforePhotos
              setImages={setBeforeImages}
              images={data.beforeImages}
              setStep={setStep}
              step={step}
              isActive={stepName === "Fotoğraflandırma"}
            />

            <CheckProcess
              setStep={setStep}
              setData={setprocessList}
              data={data.process}
              step={step}
              isActive={stepName === "İşlem Bilgileri"}
            />

            <AfterPhotos
              setPlateImage={setPlateImage}
              setGaugeImage={setGaugeImage}
              setGeneralImage={setGeneralImage}
              plateImage={data.plateImage || ""}
              gaugeImage={data.gaugeImage || ""}
              generalImage={data.generalImage || ""}
              setStep={setStep}
              step={step}
              isActive={stepName === "Teslimat Fotoları"}
            />

            <PaymentInformation
              setStep={setStep}
              setPayment={setPayment}
              payment={data.payment || null}
              step={step}
              isActive={stepName === "Ödeme Bilgileri"}
            />
            <RequiredInformation
              allData={data}
              setStep={setStep}
              setData={setRequiredInformationList}
              list={data.requiredInformation}
              step={step}
              isActive={stepName === "Zorunlu Bilgiler"}
            />

            <SummaryInformation
              setStep={setStep}
              data={data}
              step={step}
              required={stepList.length === 10}
              onSaveSuccess={removeFromStorage}
              isActive={stepName === "Özet"}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardAwareScrollView: {
    flex: 1,
    width,
    height: 100,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  circle: {
    width: 21,
    height: 21,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    ...Fonts.S12W500,
    color: Colors.white,
    lineHeight: Platform.OS === "ios" ? 18 : 12,
  },
  circlePassive: {
    width: 21,
    height: 21,
    backgroundColor: Colors.primary + "40",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  circleTextPassive: {
    ...Fonts.S12W500,
    lineHeight: Platform.OS === "ios" ? 18 : 12,
    color: Colors.white,
  },
  stepTitle: {
    ...Fonts.S12W500,
    color: Colors.text,
    marginLeft: 4,
  },
  content: {
    width,
    flex: 1,
  },
  formContainer: {
    flexDirection: "column",
  },
  form: {
    width,
    padding: 16,
    gap: 16,
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: "space-between",
  },

  title: {
    ...Fonts.S16W500,
    color: Colors.primary,
  },
  text: {
    ...Fonts.S14W400,
    color: Colors.text,
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.primary + "40",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  scrollView: {
    width,
  },
  scrollBottom: {
    height: 40,
  },
});
