import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { useUserStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { FC } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type TabConfig = {
  name: string;
  label: string;
  icon: string;
  isCenter?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type TabItemProps = {
  tab: TabConfig;
  isFocused: boolean;
  onPress: () => void;
};

const TabItem: FC<TabItemProps> = ({
  tab,
  isFocused,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  if (tab.isCenter) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onLongPress={() => {}}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.centerTabContainer, animatedStyle]}
      >
        <View style={styles.centerTab}>
          <Ionicons name={tab.icon as any} size={32} color={Colors.white} /> 
        </View>
        <Text
          style={[styles.centerLabel, isFocused && styles.centerLabelActive]}
        >
          {tab.label}
        </Text>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.tabItem, animatedStyle]}
    >
      <View
        style={[styles.iconContainer, isFocused && styles.iconContainerActive]}
      >
        <Icon
          name={tab.icon as any}
          size={22}
          color={isFocused ? Colors.primary : Colors.icon}
        />
      </View>
      <Text style={[styles.label, isFocused && styles.labelActive]}>
        {tab.label}
      </Text>
    </AnimatedPressable>
  );
};

// Tab bar'ın gizleneceği ekranlar
const HIDDEN_TAB_BAR_SCREENS = ["addWork"];

const CustomTabBar: FC<BottomTabBarProps> = ({
  state,
}) => {
  const insets = useSafeAreaInsets();
  const { user } = useUserStore();
  const router = useRouter();
  const currentRouteName = state.routes[state.index]?.name;

  if (HIDDEN_TAB_BAR_SCREENS.includes(currentRouteName)) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Platform.OS === "ios" ? insets.bottom : 12,
        },
      ]}
    >
      <View style={styles.tabBar}>
        <TabItem
            key="Panel"
            tab={{ name: "Panel", label: "Panel", icon: "home" }}
            isFocused={state.index === 0}
            onPress={() => router.push("/(tabs)")}
          />

          <TabItem
            key="İş Listesi"
            tab={{ name: "list", label: "İş Listesi", icon: "bar" }}
            isFocused={state.index === 1}
            onPress={() => router.push("/(tabs)/list")}
          />

          <TabItem
            key="Ekle"
            tab={{ name: "addWork", label: "Ekle", icon: "add", isCenter: true }}
            isFocused={state.index === 2}
            onPress={() => router.push("/(tabs)/addWork")}
          />

          <TabItem
            key="Profil"
            tab={{ name: "profile", label: "Profil", icon: "user" }}
            isFocused={state.index === 3}
            onPress={() => router.push("/(tabs)/profile")}
          />

         {
          user?.role?.name === "Authenticated" ? (
            <TabItem
              key="Personel"
              tab={{ name: "personnel", label: "Personel", icon: "users" }}
              isFocused={state.index === 4}
              onPress={() => router.push("/(tabs)/personnel")}
            />
          ) : (
            <TabItem
              key="Şifre"
              tab={{ name: "changePassword", label: "Şifre", icon: "pass-lock" }}
              isFocused={state.index === 4}
              onPress={() => router.push("/(tabs)/changePassword")}
            />
          )
         }

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    width: width - 32,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingBottom: 6,
    paddingTop: 4,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    width: ((width - 32) / 16) * 3 - 2,
    height: 60,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  iconContainerActive: {
    backgroundColor: Colors.primary + "15",
  },
  label: {
    ...Fonts.S10W400,
    color: Colors.icon,
    marginTop: 4,
  },
  labelActive: {
    ...Fonts.S10W500,
    color: Colors.primary,
    marginTop: 4,
  },
  centerTabContainer: {
    alignItems: "center",
    marginTop: -30,
    width: ((width - 32) / 16) * 4,
    height: 80,
    justifyContent: "space-between",
  },
  centerTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.white,
  },
  centerLabel: {
    ...Fonts.S10W400,
    color: Colors.icon,
    marginTop: 13,
  },
  centerLabelActive: {
    ...Fonts.S10W500,
    color: Colors.primary,
  },
});

export default CustomTabBar;
