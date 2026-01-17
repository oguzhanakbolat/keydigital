import { Colors, Fonts } from "@/constants/theme";
import { post, postData } from "@/services";
import { useSaveStore, useUserStore } from "@/store";
import { DataType } from "@/types/addCardType";
import dateFormatter from "@/utils/date";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import FormLayout from "./FormLayout";

const { height, width } = Dimensions.get("window");

type SummaryInformationProps = {
  setStep: (step: number) => void;
  data: DataType;
  step: number;
  required: boolean;
  isActive: boolean;
  onSaveSuccess?: () => void;
};

const SummaryInformationItem = ({
  title,
  value,
  error,
}: {
  title: string;
  value: string;
  error?: boolean;
}) => {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoTitle}>{title}</Text>
      {value ? (
        <Text style={styles.infoValue} numberOfLines={3}>
          {value}
        </Text>
      ) : error ? (
        <Text style={styles.infoValueError}>Lütfen bu alanı doldurunuz</Text>
      ) : (
        <Text style={styles.infoValue}>-</Text>
      )}
      <Text style={styles.infoValue} numberOfLines={3}>
        {value}
      </Text>
    </View>
  );
};

const SummaryInformationText = ({ value }: { value: string }) => {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

const SummaryInformationError = ({ value }: { value: string }) => {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoValueError}>{value}</Text>
    </View>
  );
};

const SummaryInformationTitle = ({ title }: { title: string }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const SummaryInformation: FC<SummaryInformationProps> = ({
  isActive,
  setStep,
  data,
  step,
  required,
  onSaveSuccess,
}) => {
  const router = useRouter();
  const { setLoading, setSaveList, setListNumber } = useSaveStore();
  const { user } = useUserStore();

  const saveData = async () => {
    let count = 0;

    const saveList = [
      {
        id: 1,
        name: "Veriler oluşturuluyor...",
      },
    ];

    if (!data?.cardInformation?.tckn) {
      count++;
    }

    if (!(data?.cardInformation?.name && data?.cardInformation?.surname)) {
      count++;
    }

    if (
      !(
        data?.cardInformation?.address &&
        data?.cardInformation?.district &&
        data?.cardInformation?.city
      )
    ) {
      count++;
    }

    if (!data?.registration?.brand || !data?.registration?.model) {
      count++;
    }

    if (!data?.registration?.year) {
      count++;
    }

    if (!data?.registration?.chassisNumber) {
      count++;
    }

    if (!(data?.registration?.name && data?.registration?.surname)) {
      count++;
    }

    if (!data?.registration?.tckn) {
      count++;
    }

    if (
      !(
        data?.registration?.address &&
        data?.registration?.district &&
        data?.registration?.city
      )
    ) {
      count++;
    }

    if (data?.process?.operations.length === 0) {
      count++;
    }

    if (
      data?.process?.operations.find((operation: any) =>
        [2, 3, 4, 5].includes(operation.id)
      ) &&
      !data?.requiredInformation?.mechanicalPasswordCode
    ) {
      count++;
    }

    if (!data?.cardFrontImage) {
      count++;
    } else {
      saveList.push({
        id: 2,
        name: "Kimlik ön yüz fotoğrafı yükleniyor...",
      });
    }

    if (!data?.cardBackImage) {
      count++;
    } else {
      saveList.push({
        id: 3,
        name: "Kimlik arka yüz fotoğrafı yükleniyor...",
      });
    }

    if (!data?.registrationImage) {
      count++;
    } else {
      saveList.push({
        id: 4,
        name: "Ruhsat fotoğrafı yükleniyor...",
      });
    }

    if (!data?.plateImage) {
      count++;
    } else {
      saveList.push({
        id: 5,
        name: "Plaka fotoğrafı yükleniyor...",
      });
    }

    if (!data?.gaugeImage) {
      count++;
    } else {
      saveList.push({
        id: 6,
        name: "Gösterge saati fotoğrafı yükleniyor...",
      });
    }

    if (!data?.generalImage) {
      count++;
    } else {
      saveList.push({
        id: 7,
        name: "Araç genel görünüş fotoğrafı yükleniyor...",
      });
    }

    if (data?.immobilizerFile) {
      saveList.push({
        id: 8,
        name: "İmmobilizer fotoğrafı yükleniyor...",
      });
    }

    if (data?.beforeImages.length === 0) {
      count++;
    } else {
      for (let i = 0; i < data?.beforeImages.length; i++) {
        saveList.push({
          id: 8 + i,
          name: "İşlem öncesi araç fotoğrafı " + (i + 1) + " yükleniyor...",
        });
      }
    }

    setSaveList(saveList);

    if (count > 0) {
      Alert.alert("Hata", "Lütfen gerekli tüm alanları doldurunuz.");
      return;
    }

    setLoading(true);

    const newData: any = {
      idCardData: data.idCard.allData,
      user: user?.id,
      company: user?.company?.documentId,
      payment: data.payment,
      registrationData: data.registration.allData,
      brand: data.registration.brand,
      model: data.registration.model,
      year: data.registration.year,
      chassisNumber: data.registration.chassisNumber,
      plate: data.registration.plate,
      vehicleOwner: data.registration.name + " " + data.registration.surname,
      vehicleOwnerTckn: data.registration.tckn,
      vehicleOwnerEmail: data.registration.email,
      vehicleOwnerPhone: data.registration.phone,
      vehicleOwnerAddress: data.registration.address,
      vehicleOwnerCity: data.registration.city,
      vehicleOwnerDistrict: data.registration.district,
      tckn: data.cardInformation.tckn,
      name: data.cardInformation.name + " " + data.cardInformation.surname,
      birthdate: dateFormatter(data.cardInformation.birthdate || ""),
      email: data.cardInformation.email,
      phone: data.cardInformation.phone,
      address: data.cardInformation.address,
      city: data.cardInformation.city,
      district: data.cardInformation.district,
      mechanicalPasswordCode:
        data.requiredInformation.mechanicalPasswordCode || "",
      pinCode: data.requiredInformation.pinCode || "",
      csCode: data.requiredInformation.csCode || "",
      piece: data.requiredInformation.piece || 0,
      gender: data.cardInformation.gender || "",
    };

    setListNumber(1);

    if (data?.cardFrontImage) {
      const fileType = data?.cardFrontImage.split(".")?.at(-1);
      const fileName = "card_front_" + Date.now() + "." + fileType;
      const response = await postData(data?.cardFrontImage, fileName);

      if (response.success) {
        newData.idCardFront = response?.data?.[0]?.url || "";
      }

      setListNumber(2);
    }

    if (data?.cardBackImage) {
      const fileType = data?.cardBackImage.split(".")?.at(-1);
      const fileName = "card_back_" + Date.now() + "." + fileType;
      const response = await postData(data?.cardBackImage, fileName);

      if (response.success) {
        newData.idCardBack = response?.data?.[0]?.url || "";
      }

      setListNumber(3);
    }

    if (data?.registrationImage) {
      const fileType = data?.registrationImage.split(".")?.at(-1);
      const fileName = "registration_" + Date.now() + "." + fileType;
      const response = await postData(data?.registrationImage, fileName);

      if (response.success) {
        newData.registrationImage = response?.data?.[0]?.url || "";
      }

      setListNumber(4);
    }

    if (data?.plateImage) {
      const fileType = data?.plateImage.split(".")?.at(-1);
      const fileName = "plate_" + Date.now() + "." + fileType;
      const response = await postData(data?.plateImage, fileName);

      if (response.success) {
        newData.plateImage = response?.data?.[0]?.url || "";
      }

      setListNumber(5);
    }

    if (data?.gaugeImage) {
      const fileType = data?.gaugeImage.split(".")?.at(-1);
      const fileName = "gauge_" + Date.now() + "." + fileType;
      const response = await postData(data?.gaugeImage, fileName);

      if (response.success) {
        newData.gaugeImage = response?.data?.[0]?.url || "";
      }

      setListNumber(6);
    }

    if (data?.generalImage) {
      const fileType = data?.generalImage.split(".")?.at(-1);
      const fileName = "general_" + Date.now() + "." + fileType;
      const response = await postData(data?.generalImage, fileName);

      if (response.success) {
        newData.generalImage = response?.data?.[0]?.url || "";
      }

      setListNumber(7);
    }

    if (data?.immobilizerFile) {
      const fileType = data?.immobilizerFile.split(".")?.at(-1);
      const fileName = "immobilizer_" + Date.now() + "." + fileType;
      const response = await postData(data?.immobilizerFile, fileName);

      if (response.success) {
        newData.immobilizerFile = response?.data?.[0]?.url || "";
      }

      setListNumber(8 + data?.beforeImages.length + 1);
    }

    if (data?.beforeImages.length > 0) {
      let images = [];

      for (let i = 0; i < data?.beforeImages.length; i++) {
        const image = data?.beforeImages[i];
        const fileType = image.split(".")?.at(-1);
        const fileName = "before_" + Date.now() + "." + fileType;
        const response = await postData(image, fileName);

        setListNumber(9 + i);

        if (response.success) {
          images.push(response?.data?.[0]?.url || "");
        }
      }

      newData.beforeImages = images.join(",");
    }

    if (data?.process?.operations.length > 0) {
      let operations = data?.process?.operations
        .map((operation: any) => operation.label)
        .join(",");
      newData.process = operations;
      newData.note = data?.process?.notes;
    }

    await post("/processes", { data: newData });

    onSaveSuccess?.();

    setLoading(false);

    router.push("/");
  };

  return (
    <FormLayout
      leftButtonPress={() => setStep(step - 1)}
      rightButtonPress={() => saveData()}
      isActive={isActive}
    >
      <>
        <SummaryInformationTitle title="Kimlik Bilgileri" />
        <SummaryInformationItem
          title="TCKN"
          value={data?.cardInformation?.tckn || ""}
          error
        />
        <SummaryInformationItem
          title="Adı Soyadı"
          value={
            data?.cardInformation?.name && data?.cardInformation?.surname
              ? data?.cardInformation?.name +
                " " +
                data?.cardInformation?.surname
              : ""
          }
          error
        />
        <SummaryInformationItem
          title="Doğum Tarihi"
          value={data?.cardInformation?.birthdate || ""}
        />
        <SummaryInformationItem
          title="Email"
          value={data?.cardInformation?.email || ""}
        />
        <SummaryInformationItem
          title="Telefon"
          value={data?.cardInformation?.phone || ""}
        />
        <SummaryInformationItem
          title="Adres"
          value={
            data?.cardInformation?.address &&
            data?.cardInformation?.district &&
            data?.cardInformation?.city
              ? data?.cardInformation?.address +
                " " +
                data?.cardInformation?.district +
                "/" +
                data?.cardInformation?.city
              : ""
          }
          error
        />
      </>
      <View style={styles.infoContainer}>
        <SummaryInformationTitle title="Ruhsat Bilgileri" />
        <SummaryInformationItem
          title="Marka / Mode"
          value={
            data?.registration?.brand && data?.registration?.model
              ? data?.registration?.brand + " / " + data?.registration?.model
              : ""
          }
          error
        />
        <SummaryInformationItem
          title="Yıl"
          value={data?.registration?.year || ""}
          error
        />
        <SummaryInformationItem
          title="Şasi Numarası"
          value={data?.registration?.chassisNumber || ""}
          error
        />
        <SummaryInformationItem
          title="Ruhsat Sahibi"
          value={
            data?.registration?.name && data?.registration?.surname
              ? data?.registration?.name + " " + data?.registration?.surname
              : ""
          }
          error
        />
        <SummaryInformationItem
          title="TCKN"
          value={data?.registration?.tckn || ""}
          error
        />
        <SummaryInformationItem
          title="Email"
          value={data?.registration?.email || ""}
        />
        <SummaryInformationItem
          title="Telefon"
          value={data?.registration?.phone || ""}
        />
        <SummaryInformationItem
          title="Adres"
          value={
            data?.registration?.address &&
            data?.registration?.district &&
            data?.registration?.city
              ? data?.registration?.address +
                " " +
                data?.registration?.district +
                "/" +
                data?.registration?.city
              : ""
          }
          error
        />
      </View>
      <View style={styles.infoContainer}>
        <SummaryInformationTitle title="Yapılan İşlemler" />
        {data?.process?.operations.length > 0 ? (
          data?.process?.operations.map((operation: any, index: number) => (
            <SummaryInformationText
              key={operation.id}
              value={index + 1 + ". " + operation.label}
            />
          ))
        ) : (
          <SummaryInformationError value="Lütfen en az bir işlem seçiniz." />
        )}
        <SummaryInformationItem
          title="Notlar"
          value={data?.process?.notes || ""}
        />
        <SummaryInformationItem
          title="Ücret"
          value={data?.payment ? data?.payment?.toString() : "-"}
        />
      </View>

      {required && (
        <View style={styles.infoContainer}>
          <SummaryInformationTitle title="Zorunlu Bilgiler" />
          <SummaryInformationItem
            title="Mekanik Şifre"
            value={data?.requiredInformation?.mechanicalPasswordCode || ""}
            error
          />
          <SummaryInformationItem
            title="PIN Kodu"
            value={data?.requiredInformation?.pinCode || ""}
            error
          />
          <SummaryInformationItem
            title="CS Kodu"
            value={data?.requiredInformation?.csCode || ""}
            error
          />
          <SummaryInformationItem
            title="İmmobilizer"
            value={
              data?.requiredInformation?.immobilizerFile
                ? "Dosya Yüklendi"
                : "Dosya Yüklenmedi"
            }
          />
          {data?.process?.operations.find(
            (operation: any) => operation.id === 2 || operation.id === 3
          ) ? (
            data?.requiredInformation?.piece ? (
              <SummaryInformationItem
                title="Anahtar Sayısı"
                value={data?.requiredInformation?.piece?.toString() || ""}
              />
            ) : (
              <SummaryInformationError value="Lütfen kaç anahtar yaptığınızı giriniz." />
            )
          ) : null}
        </View>
      )}

      <View style={styles.infoContainer}>
        <SummaryInformationTitle title="İşlem Fotoğrafları" />
        <View style={styles.imageContainer}>
          {data?.beforeImages.length > 0 ? (
            data?.beforeImages.map((image: any) => (
              <Image key={image} source={{ uri: image }} style={styles.image} />
            ))
          ) : (
            <View style={styles.imageErrorContainer}>
              <Text style={styles.imageErrorText}>
                Lütfen en az bir işlem fotoğrafı yükleyiniz.
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <SummaryInformationTitle title="İşlem Sonrası Fotoları" />
        <View style={styles.imageContainer}>
          {data?.plateImage ? (
            <Image source={{ uri: data?.plateImage }} style={styles.image} />
          ) : (
            <View style={styles.imageErrorContainer}>
              <Text style={styles.imageErrorText}>
                Lütfen plaka fotoğrafı yükleyiniz.
              </Text>
            </View>
          )}
          {data?.gaugeImage ? (
            <Image source={{ uri: data?.gaugeImage }} style={styles.image} />
          ) : (
            <View style={styles.imageErrorContainer}>
              <Text style={styles.imageErrorText}>
                Lütfen gösterge saati fotoğrafı yükleyiniz.
              </Text>
            </View>
          )}
          {data?.generalImage ? (
            <Image source={{ uri: data?.generalImage }} style={styles.image} />
          ) : (
            <View style={styles.imageErrorContainer}>
              <Text style={styles.imageErrorText}>
                Lütfen araç genel görünüş fotoğrafı yükleyiniz.
              </Text>
            </View>
          )}
        </View>
      </View>
    </FormLayout>
  );
};

export default SummaryInformation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height - 220,
  },
  scrollView: {
    paddingBottom: 16,
  },
  titleContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + "50",
    paddingBottom: 6,
    marginBottom: 8,
  },
  title: {
    ...Fonts.S14W500,
    color: Colors.primary,
    width: "100%",
  },
  text: {
    ...Fonts.S14W400,
    color: Colors.text,
  },

  infoContainer: {
    marginBottom: 16,
  },
  infoTitle: {
    ...Fonts.S14W500,
    color: Colors.text,
    width: 120,
  },
  infoValue: {
    ...Fonts.S14W400,
    color: Colors.text,
    width: width - 150,
  },
  infoValueError: {
    ...Fonts.S14W400,
    color: Colors.danger,
    width: width - 150,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + "20",
    paddingBottom: 8,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  image: {
    width: (width - 56) / 3,
    height: (width - 56) / 3,
    resizeMode: "cover",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.text + "20",
  },
  imageErrorContainer: {
    width: (width - 56) / 3,
    height: (width - 56) / 3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.text + "20",
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  imageErrorText: {
    ...Fonts.S14W400,
    textAlign: "center",
    color: Colors.danger,
    padding: 8,
  },
});
