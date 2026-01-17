import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { useUserStore } from "@/store";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
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
  onLongPress: () => void;
};

const TabItem: FC<TabItemProps> = ({
  tab,
  isFocused,
  onPress,
  onLongPress,
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
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.centerTabContainer, animatedStyle]}
      >
        <View style={styles.centerTab}>
          <Icon name={tab.icon as any} size={32} color={Colors.white} />
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
      onLongPress={onLongPress}
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
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { user } = useUserStore();
  const currentRouteName = state.routes[state.index]?.name;

  if (HIDDEN_TAB_BAR_SCREENS.includes(currentRouteName)) {
    return null;
  }

  const TABS: TabConfig[] = [
    { name: "index", label: "Ana Sayfa", icon: "home" },
    { name: "list", label: "İş Listesi", icon: "bar" },
    { name: "addWork", label: "Ekle", icon: "plus", isCenter: true },
    { name: "profile", label: "Profil", icon: "profile" },
  ];

  if (user?.role?.name === "Authenticated") {
    TABS.push({ name: "personnel", label: "Personel", icon: "users" });
  } else {
    TABS.push({ name: "changePassword", label: "Şifre", icon: "pass-lock" });
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
        {TABS.map((tab, index) => {
          const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
          const isFocused = state.index === routeIndex;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: state.routes[routeIndex]?.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tab.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: state.routes[routeIndex]?.key,
            });
          };

          return (
            <TabItem
              key={tab.name}
              tab={tab}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
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
