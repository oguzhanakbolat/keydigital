import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { get } from "@/services";
import { useUserStore } from "@/store";
import { getPendingWorks, PendingWork } from "@/utils/pendingWorks";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const {height, width} = Dimensions.get("window");



export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useUserStore();
  const [data, setData] = useState<any>({});
  const [generalData, setGeneralData] = useState<any>({});
  const [pendingWorks, setPendingWorks] = useState<PendingWork[]>([]);
  const [who, setWho] = useState<string>(user?.role?.name === "Authenticated" ? "company" : "me");
  const [days, setDays] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dayScrollRef = useRef<ScrollView>(null);

  const getGeneralData = async () => {
    let url = "/processes";
    
    if(user?.role?.name === "Authenticated") {
      url += "?filters[company][$eq]=" + user?.company?.id;
    } else {
      url += "?filters[user][$eq]=" + user?.id + "&filters[company][$eq]=" + user?.company?.id;
    }

    const response = await get(url);

    if (response.success) {
      setGeneralData(response.data.meta.pagination);
    }
  };

  const getData = async () => {
    const startDate = new Date(selectedDate.setHours(0, 0, 0, 0)).toISOString() ;
    const endDate = new Date(selectedDate.setHours(23, 59, 59, 999)).toISOString(); 

    let url = "/processes";
    
    if(who === "company") {
      url += "?filters[company][$eq]=" + user?.company?.id;
    } else {
      url += "?filters[user][$eq]=" + user?.id + "&filters[company][$eq]=" + user?.company?.id;
    }

    url += "&filters[createdAt][$gte]=" + startDate + "&filters[createdAt][$lte]=" + endDate;

    const response = await get(url);

    if (response.success) {
      setData(response.data.meta.pagination);
    }
  };

  const getDateData = async (date: Date) => {
    setSelectedDate(date);
    const startDate = new Date(date.setHours(0, 0, 0, 0)).toISOString() ;
    const endDate = new Date(date.setHours(23, 59, 59, 999)).toISOString(); 

    let url = "/processes";
    
    if(who === "company") {
      url += "?filters[company][$eq]=" + user?.company?.id;
    } else {
      url += "?filters[user][$eq]=" + user?.id + "&filters[company][$eq]=" + user?.company?.id;
    }

    url += "&filters[createdAt][$gte]=" + startDate + "&filters[createdAt][$lte]=" + endDate;

    const response = await get(url);
    
    if (response.success) {
      setData(response.data.meta.pagination);
    }

  };

  const getPendingData = async () => {
    const pendingWorks = await getPendingWorks();
    console.log('pendingWorks', pendingWorks);
    setPendingWorks(pendingWorks);
  };

  const getDays = async () => {
    const today = new Date();
    const dayList = [];
    const todayDate = today.getDate();

    for (let i = -6; i < 1; i++) {
      dayList.push(new Date(today.setDate(todayDate + i)));
    }
    setDays(dayList);
  };

  useEffect(() => {
    getGeneralData();
    getPendingData();
    getData();
    getDays();
    setTimeout(() => {
      dayScrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getGeneralData();
      getPendingData();
      getData();  
      getDays();
      setSelectedDate(new Date());
      return () => {
        getGeneralData();
        getPendingData();
        getData();
        getDays();
        setSelectedDate(new Date());
      };
    }, [])
  );

  useEffect(() => {
    getDateData(selectedDate);
  }, [who, selectedDate]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.push("/profile")} style={styles.profileImageBorder}>
          <View style={styles.profileImageInner}>
            {user?.avatar ? (
              <Image
                source={{ uri: user?.avatar }}
                style={styles.profileImageInnerImage}
              />
            ) : (
              <Icon name="user" size={40} color={Colors.white} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile")} style={styles.profileNameContainer}>
            <Text style={styles.profileNameTitle}>
              Merhaba, {user?.name}
            </Text>
            <Text style={styles.profileNameText}>Tekrar Hoşgeldin</Text>
   
        </TouchableOpacity>
      </View>

      <View style={[styles.contentContainer, { height: height - insets.bottom - 220 }]}>
        <View style={styles.dayContainer}>
          <ScrollView style={styles.dayScroll} horizontal showsHorizontalScrollIndicator={false} ref={dayScrollRef}>
            {
              days.map((day, index) => (
                <TouchableOpacity key={index} style={[styles.day, selectedDate.getDate() === day.getDate() ? styles.activeDay : {}]} onPress={() => getDateData(day as Date)}>                  
                  <Text style={styles.dayText}>{day.toLocaleDateString("tr-TR", { weekday: "short" })}</Text>
                  <Text style={styles.dayNumber}>{day.getDate()}</Text>
                </TouchableOpacity>
              ))  
            }
          </ScrollView>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.date}>
              <Text style={styles.infoItemValue}>Tarih</Text>
              <Text style={styles.infoItemText}>{
                selectedDate.toLocaleDateString("tr-TR", { day: "numeric" }) + " " +
                selectedDate.toLocaleDateString("tr-TR", { month: "long" }) + " " +
                selectedDate.toLocaleDateString("tr-TR", { weekday: "long" })}
              </Text>
          </View>
          <View style={styles.whoContainer}>
            <TouchableOpacity onPress={() => setWho("me")}> 
              <Ionicons name="person" size={24} color={who === "me" ? Colors.primary : Colors.text + "80" } />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setWho("company")}> 
              <Ionicons name="people" size={24} color={who === "company" ? Colors.primary : Colors.text + "80" } />
            </TouchableOpacity>
          </View>
          <View style={styles.infoHidden}>
            <View style={styles.infoItemContainer}>
              <View style={styles.infoItemValueContainer}>
                <Text style={styles.infoTitle}>Toplam İş</Text>
                <Text style={styles.infoValue}>{data?.total || 0}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.content}>
            <View style={styles.generalDataContainer}>
              <Text style={styles.pendingWorksTitle}>Yapılan Toplam İş</Text>
              {generalData?.total > 0 ? (
                <TouchableOpacity onPress={() => router.push("/list")}>
                  <Text style={styles.pendingWorksText}>{generalData?.total}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.pendingWorksEmptyText}>Yapılan İş Yok</Text>
              )}
              <View style={styles.pendingWorksIcon}>
                <Ionicons name="checkmark" size={60} color={Colors.white + "40"} />
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.pendingWorksContainer}>
              <Text style={styles.pendingWorksTitle}>Bekleyen İş</Text>
              {pendingWorks.length > 0 ? (
                <TouchableOpacity onPress={() => router.push("/listWait")}>
                    <Text style={styles.pendingWorksText}>{pendingWorks.length}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.pendingWorksEmptyText}>Tüm işleriniz kaydedildi</Text>
              )}
              <View style={styles.pendingWorksIcon}>
                <Ionicons name="hourglass-outline" size={60} color={Colors.white + "40"} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    justifyContent: "flex-end",
    gap: 8,
  },
  summaryContainer: {
    gap: 8,
    margin: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    width: (width - 48) / 2,
  },
  generalDataContainer: {
    gap: 8,
    backgroundColor: Colors.success + "88",
    padding: 16,
    borderRadius: 8,
    width: (width - 48) / 2,
    height: 120,
  },
  pendingWorksContainer: {
    gap: 8,
    backgroundColor: Colors.danger + "88",
    padding: 16,
    borderRadius: 8,
    width: (width - 48) / 2,
    height: 120,
  },
  pendingWorksTitle: {
    ...Fonts.S12W500,
    color: Colors.white,
    width: "100%",
  },
  pendingWorksText: {
    ...Fonts.S48W600,
    color: Colors.white,
    width: "100%",
  },
  pendingWorksEmptyText: {
    ...Fonts.S12W400,
    color: Colors.white,
    width: "100%",
  },
  pendingWorksIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  whoContainer: {
    position: "absolute",
    left: 32,
    right: 32,
    top: 80,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  whoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginBottom: 8,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...Fonts.S14W400,
    color: Colors.text,
  },
  username: {
    ...Fonts.S24W500,
    color: Colors.text,
  },
  profileImage: {
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    marginBottom: 64,
  },
  profileImageBorder: {
    width: 60,
    height: 60,
    borderRadius: 70,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileImageInnerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileNameContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  profileNameTitle: {
    ...Fonts.S16W500,
    color: Colors.text,
  },
  profileNameText: {
    ...Fonts.S12W400,
    color: Colors.text,
  },

  dayContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },

  day: {
    width: 60,
    height: 60,
    backgroundColor: Colors.warning,
    borderRadius: 5,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDay: {
    backgroundColor: Colors.primary,
  },
  dayText: {
    ...Fonts.S12W400,
    color: Colors.white,
  },
  dayNumber: {
    ...Fonts.S16W500,
    color: Colors.white,
  },
  infoContainer: {
    gap: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    width: "100%",
    marginBottom: 16,
  },
  infoHidden: {
    height: (width - 128 ) / 2,
    width: width - 128,
    overflow: "hidden",
    position: "relative",
  },
  infoItemContainer: {
    flexDirection: "row",
    gap: 8,
    borderWidth: 30,
    borderColor: Colors.primary + "65",
    borderRadius: 5555,
    height: width - 128,
    width: width - 128,
    justifyContent: "center",
    position: "absolute",
    bottom: -(width - 128) / 2,
    left: 0
  },
  infoItemValue: {
    ...Fonts.S14W500,
    color: Colors.text,
  },
  infoItemValueContainer: {
    marginTop: (width - 128) / 2 - 90,
    gap: 2,
  },
  infoItemValueText: {
    ...Fonts.S12W400,
    color: Colors.text + "80",
  },
  infoItemText: {
    ...Fonts.S12W400,
    color: Colors.text,
  },
  infoTitle: {
    ...Fonts.S12W500,
    color: Colors.primary,
    textTransform: "uppercase",
    width: "100%",
    textAlign: "center",

  },
  infoValue: {
    ...Fonts.S24W600,
    color: Colors.primary,
    textAlign: "center",
    width: "100%",
  },
  dayScroll: {
    width: "100%",
    marginHorizontal: 16,
  },
});
