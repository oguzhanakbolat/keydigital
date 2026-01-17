import Header from "@/components/Header";
import { Colors, Fonts } from "@/constants/theme";
import { CDN_URL, get } from "@/services";
import dateFormatter from "@/utils/date";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const {  width, height } = Dimensions.get("window");

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


const WorkDetail = () => {
  const { id } = useLocalSearchParams();
  const [work, setWork] = useState<any>(null);
  const getWork = async () => {
    const response = await get(`/processes/${id}`);
    console.log('response', response.data);
    if (response.success) {
      setWork(response.data.data);
    }
  };

  useEffect(() => {
    getWork();
  }, [id]);

  console.log('work', work);

  return (
    <View style={styles.container}>
      <Header name="İş Detayı" back />
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <SummaryInformationTitle title="Kimlik Bilgileri" />
          <SummaryInformationItem
            title="TCKN"
            value={work?.tckn || ""}
            error
          />
          <SummaryInformationItem
            title="Adı Soyadı"
            value={
              work?.name || ""
            }
            error
          />
          <SummaryInformationItem
            title="Doğum Tarihi"
            value={dateFormatter(work?.birthdate || "")}
          />
          <SummaryInformationItem
            title="Email"
            value={work?.email || ""}
          />
          <SummaryInformationItem
            title="Telefon"
            value={work?.phone || ""}
          />
          <SummaryInformationItem
            title="Adres"
            value={
              work?.address &&
              work?.district &&
              work?.city
                ? work?.address +
                  " " +
                  work?.district +
                  "/" +
                  work?.city
                : ""
            }
            error
          />
          <SummaryInformationTitle title="Ruhsat Bilgileri" />
          <SummaryInformationItem
            title="Marka / Mode"
            value={
              work?.brand && work?.model
                ? work?.brand + " / " + work?.model
                : ""
            }
            error
          />
          <SummaryInformationItem
            title="Yıl"
            value={work?.year || ""}
            error
          />
          <SummaryInformationItem
            title="Şasi Numarası"
            value={work?.chassisNumber || ""}
            error
          />
          <SummaryInformationItem
            title="Ruhsat Sahibi"
            value={
              work?.name || ""
            }
            error
          />
          <SummaryInformationItem
            title="TCKN"
            value={work?.tckn || ""}
            error
          />
          <SummaryInformationItem
            title="Email"
            value={work?.email || ""}
          />
          <SummaryInformationItem
            title="Telefon"
            value={work?.phone || ""}
          />
          <SummaryInformationItem
            title="Adres"
            value={
              work?.address &&
              work?.district &&
              work?.city
                ? work?.address +
                  " " +
                  work?.district +
                  "/" +
                  work?.city
                : ""
            }
            error
          />
                    
          <SummaryInformationTitle title="Yapılan İşlemler" />
            {work?.process && work?.process?.split(",").length > 0 ? (
              work?.process?.split(",").map((operation: any, index: number) => (
                <SummaryInformationText
                  key={operation.id}
                  value={index + 1 + ". " + operation}
                />
              ))
            ) : (
              <SummaryInformationError value="Lütfen en az bir işlem seçiniz." />
            )}
            <SummaryInformationItem
              title="Notlar"
              value={work?.notes || ""}
            />
            <SummaryInformationItem
              title="Ücret"
              value={work?.payment ? work?.payment?.toString() : "-"}
            />
      

     
            <View style={styles.infoContainer}>
              <SummaryInformationTitle title="Zorunlu Bilgiler" />
              {
                work?.mechanicalPasswordCode && (
                  <SummaryInformationItem
                    title="Mekanik Şifre"
                    value={work?.mechanicalPasswordCode || ""}
                    error
                  />
                )
              }
              {
                work?.pinCode && (
                  <SummaryInformationItem
                    title="PIN Kodu"
                    value={work?.pinCode || ""}
                    error
                  />
                )
              }
              {
                work?.csCode && (
                  <SummaryInformationItem
                    title="CS Kodu"
                    value={work?.csCode || ""}
                    error
                  />
                )
              }
              {
                work?.immobilizerFile && (
                  <SummaryInformationItem
                    title="İmmobilizer"
                    value={
                      work?.immobilizerFile
                        ? "Dosya Yüklendi"
                        : "Dosya Yüklenmedi"
                    }
                  />
                )
              }
          
              { work?.piece && (
                <SummaryInformationItem
                  title="Anahtar Sayısı"
                  value={work?.piece?.toString() || ""}
                />
              )}
            </View>

            <View style={styles.infoContainer}>
              <SummaryInformationTitle title="Kimlik Kartı ve Ruhsat" />
              <View style={styles.imageContainer}>
                {work?.idCardFront && (
                  <Image source={{ uri: CDN_URL + work?.idCardFront }} style={styles.image} />
                )}
                {work?.idCardBack && (
                  <Image source={{ uri: CDN_URL + work?.idCardBack }} style={styles.image} />
                ) }
                {work?.registrationImage && (
                  <Image source={{ uri: CDN_URL + work?.registrationImage }} style={styles.image} />
                )}
              </View>
            </View>
        
            <View style={styles.infoContainer}>
              <SummaryInformationTitle title="İşlem Fotoğrafları" />
              <View style={styles.imageContainer}>
                {work?.beforeImages && work?.beforeImages?.split(",").length > 0 && (
                  work?.beforeImages?.split(",").map((image: any) => (
                    <Image key={image} source={{ uri: CDN_URL + image }} style={styles.image} />
                  ))
                )}
              </View>
            </View>
            <View style={styles.infoContainer}>
              <SummaryInformationTitle title="İşlem Sonrası Fotoları" />
              <View style={styles.imageContainer}>
                {work?.plateImage && (
                  <Image source={{ uri: CDN_URL + work?.plateImage }} style={styles.image} />
                )}
                {work?.gaugeImage && (
                  <Image source={{ uri: CDN_URL + work?.gaugeImage }} style={styles.image} />
                ) }
                {work?.generalImage && (
                  <Image source={{ uri: CDN_URL + work?.generalImage }} style={styles.image} />
                )}
              </View>
            </View>
            <View style={{height: 100}} />
        </ScrollView>
      </View>
    </View>
  );
};

export default WorkDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginBottom: 8,
    gap: 8,
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
      marginTop: 16,
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