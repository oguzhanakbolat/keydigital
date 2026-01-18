import Header from "@/components/Header";
import { Colors, Fonts } from "@/constants/theme";
import { CDN_URL, get } from "@/services";
import { dateFormatter, dateFormatterWithTime } from "@/utils/date";
import * as Print from "expo-print";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
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

const SummaryInformationTitle = ({ title }: { title: string }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};


const WorkDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [work, setWork] = useState<any>(null);
  const getWork = async () => {
    const response = await get(`/processes/${id}`);
    if (response.success) {

      const userResponse = await get(`/users/${response.data.data.user}`);

      setWork({...response.data.data, user: userResponse?.data?.name || "", userPhone: userResponse?.data?.phone || "" });
    }
  };

  useEffect(() => {
    getWork();
  }, [id]);

  const generatePDF = async () => {
    if (!work) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>İş Detayı</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; font-size: 12px; }
            h1 { color: #333; font-size: 18px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { color: #555; font-size: 14px; margin-top: 14px; border-bottom: 1px solid #ddd; padding-bottom: 3px; }
            .date { float: right; font-size: 12px; color: #666; }
            .row2 { display: flex; justify-content: space-between; width: 100%; gap-x: 2%; flex-wrap: wrap; }
            .row { display: flex; padding: 5px 0; border-bottom: 1px solid #eee; width: 48%; }
            .rowFull { display: flex; padding: 4px 0; border-bottom: 1px solid #eee; width: 100%; }
            .label {font-size: 14px; color: #666; font-weight: bold; padding-right: 7px; }
            .value {font-size: 14px; color: #333; }
            .images { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
            .images img { width: 134px; height: 90px; object-fit: cover; border: 1px solid #ddd; }
            .process-item { padding: 5px 0; }
          </style>
        </head>
        <body>
          <h1><span>LOCKSMITH - İş Kaydı</span> <span class="date">${dateFormatterWithTime(work?.createdAt) || "-"}</span></h1>
          <div class="row" ><span class="label">İşlemi Yapan:</span><span class="value">${work?.user || "-"} / ${work?.userPhone || "-"}</span></div>
          <h2>Kimlik Bilgileri</h2>
          <div class="row2">
            <div class="row"><span class="label">TCKN:</span><span class="value">${work?.tckn || "-"}</span></div>
            <div class="row"><span class="label">Adı Soyadı:</span><span class="value">${work?.name || "-"}</span></div>
            <div class="row"><span class="label">Doğum Tarihi:</span><span class="value">${dateFormatter(work?.birthdate) || "-"}</span></div>
            <div class="row"><span class="label">Email:</span><span class="value">${work?.email || "-"}</span></div>
            <div class="row"><span class="label">Telefon:</span><span class="value">${work?.phone || "-"}</span></div>
            <div class="row"><span class="label">Adres:</span><span class="value">${work?.address ? `${work?.address} ${work?.district}/${work?.city}` : "-"} ${work?.address ? `${work?.address} ${work?.district}/${work?.city}` : "-"}</span></div>
          </div>
          <h2>Ruhsat Bilgileri</h2>
          <div class="row2">
            <div class="row"><span class="label">Marka / Model:</span><span class="value">${work?.brand && work?.model ? `${work?.brand} / ${work?.model}` : "-"}</span></div>
            <div class="row"><span class="label">Yıl:</span><span class="value">${work?.year || "-"}</span></div>
            <div class="row"><span class="label">Plaka:</span><span class="value">${work?.plate || "-"}</span></div>
            <div class="row"><span class="label">Şasi Numarası:</span><span class="value">${work?.chassisNumber || "-"}</span></div>
            <div class="row"><span class="label">Ruhsat Sahibi:</span><span class="value">${work?.name || "-"}</span></div>
            <div class="row"><span class="label">TCKN:</span><span class="value">${work?.tckn || "-"}</span></div>
            <div class="row"><span class="label">Email:</span><span class="value">${work?.email || "-"}</span></div>
            <div class="row"><span class="label">Telefon:</span><span class="value">${work?.phone || "-"}</span></div>
            <div class="row"><span class="label">Adres:</span><span class="value">${work?.address ? `${work?.address} ${work?.district}/${work?.city}` : "-"}</span></div>
          </div>
          <h2>Yapılan İşlemler</h2>
          <div class="row2">
            <div class="row">${work?.process ? work?.process.split(",").map((op: string, i: number) => `<div class="process-item">${i + 1}. ${op}</div>`).join("") : "-"}</div>
            <div class="row"><span class="label">Notlar:</span><span class="value">${work?.note || "-"}</span></div>
            <div class="row"><span class="label">Ücret:</span><span class="value">${work?.payment ? work?.payment + " TL" : "-"}</span></div>
          </div>
          <h2>Zorunlu Bilgiler</h2>
          <div class="row2">
            ${work?.km ? `<div class="row"><span class="label">Kilometre:</span><span class="value">${work?.km}</span></div>` : ""}
            ${work?.mechanicalPasswordCode ? `<div class="row"><span class="label">Mekanik Şifre:</span><span class="value">${work?.mechanicalPasswordCode}</span></div>` : ""}
            ${work?.pinCode ? `<div class="row"><span class="label">PIN Kodu:</span><span class="value">${work?.pinCode}</span></div>` : ""}
            ${work?.csCode ? `<div class="row"><span class="label">CS Kodu:</span><span class="value">${work?.csCode}</span></div>` : ""}
            ${work?.piece ? `<div class="row"><span class="label">Anahtar Sayısı:</span><span class="value">${work?.piece}</span></div>` : ""}
          </div>
          <h2>Fotoğraflar</h2>
          <div class="images">
            ${work?.idCardFront ? `<img src="${CDN_URL}${work?.idCardFront}" />` : ""}
            ${work?.idCardBack ? `<img src="${CDN_URL}${work?.idCardBack}" />` : ""}
            ${work?.registrationImage ? `<img src="${CDN_URL}${work?.registrationImage}" />` : ""}
            ${work?.beforeImages ? work?.beforeImages.split(",").map((img: string) => `<img src="${CDN_URL}${img}" />`).join("") : ""}
            ${work?.plateImage ? `<img src="${CDN_URL}${work?.plateImage}" />` : ""}
            ${work?.gaugeImage ? `<img src="${CDN_URL}${work?.gaugeImage}" />` : ""}
            ${work?.generalImage ? `<img src="${CDN_URL}${work?.generalImage}" />` : ""}
          </div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    } catch (error) {
      console.error("PDF oluşturma hatası:", error);
    }
  };


  return (
    <View style={styles.container}>
      <Header name="İş Detayı" leftButton={() => router.push("/(tabs)/list")} printButton={generatePDF} />
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
        <SummaryInformationTitle title="İş Bilgileri" />
          <SummaryInformationItem
            title="İşlemi Yapan"
            value={work?.user  || ""}
            />
            <SummaryInformationItem
              title="İşlem Tarihi"
              value={dateFormatterWithTime(work?.createdAt)  || ""}
      
            />
            <SummaryInformationItem
              title="Telefonu"
              value={work?.userPhone || ""}
           
            />
          <SummaryInformationTitle title="Kimlik Bilgileri" />
          <SummaryInformationItem
            title="TCKN"
            value={work?.tckn || ""}
          />
          <SummaryInformationItem
            title="Adı Soyadı"
            value={
              work?.name || ""
            }
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
          />
          <SummaryInformationTitle title="Ruhsat Bilgileri" />
          <SummaryInformationItem
            title="Marka / Mode"
            value={
              work?.brand && work?.model
                ? work?.brand + " / " + work?.model
                : ""
            }
          />
          <SummaryInformationItem
            title="Yıl"
            value={work?.year || ""}
          />
          <SummaryInformationItem
            title="Şasi Numarası"
            value={work?.chassisNumber || ""}
          />
          <SummaryInformationItem
            title="Ruhsat Sahibi"
            value={
              work?.name || ""
            }
          />
          <SummaryInformationItem
            title="TCKN"
            value={work?.tckn || ""}
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
          />
                    
          <SummaryInformationTitle title="Yapılan İşlemler" />
            {work?.process && work?.process?.split(",").length > 0 && (
              work?.process?.split(",").map((operation: any, index: number) => (
                <SummaryInformationText
                  key={index}
                  value={index + 1 + ". " + operation}
                />
              ))
            )}
            <SummaryInformationItem
              title="Notlar"
              value={work?.note || ""}
            />
            <SummaryInformationItem
              title="Ücret"
              value={work?.payment ? work?.payment?.toString() : "-"}
            />
      
            <View style={styles.infoContainer}>
              <SummaryInformationTitle title="Zorunlu Bilgiler" />
              {
                work?.km && (
                  <SummaryInformationItem
                    title="Kilometre Bilgisi"
                    value={work?.km || ""}
                    error
                  />
                )
              }
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