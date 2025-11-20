import * as Clipboard from "expo-clipboard";
import React, { FC, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Colors from "../Colors";
import Icon from "./Icon";

//üste bir component

type compoProps = {
  name: string;
  onCopy: (text: string) => void;
};

const IconComponent: FC<compoProps> = ({ name, onCopy }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  return (
    <TouchableOpacity style={styles.box} onPress={() => onCopy(name)}>
      <Icon name={name} size={24} color={"black"} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};
const list = [
  "close",
  "right-arrow",
  "back",
  "check",
  "mail",
  "password",
  "circle-close",
  "circle-excla",
  "segmented-cube",
  "down-arrow",
  "phone",
  "circle-check",
  "equipment",
  "home",
  "products",
  "academy",
  "profile",
  "notifications",
  "panel",
  "order-update",
  "system-alert",
  "circle-inform",
  "download",
  "search",
  "order-no",
  "period",
  "seller",
  "delivery",
  "weight",
  "paper-clip",
  "service-fact",
  "customer-ref",
  "delivery-light",
  "payment",
  "order-opener",
  "edit",
  "short",
  "visible",
  "not-visible",
  "plus",
  "minus",
  "user",
  "orders",
  "pass-lock",
  "dealer",
  "universe",
  "mode",
  "time-select",
];

const IconBooks = () => {
  const [toast, setToast] = useState("");

  const handleCopy = async (text: string) => {
    await Clipboard.setStringAsync(text);
    setToast(`${text} kopyalandı`);
    setTimeout(() => setToast(""), 2000); // 2 saniye sonra kaybolur
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {list.map((item, index) => (
            <IconComponent key={index} name={item} onCopy={handleCopy} />
          ))}
        </View>
      </ScrollView>
      {toast ? (
        <TouchableOpacity style={styles.toast} onPress={() => setToast("")}>
          <Text style={styles.textToast}>{toast}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default IconBooks;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  box: {
    width: "30%", // 3 kutu yan yana
    backgroundColor: "#fff7fb",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 30,
  },
  text: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 14,
  },
  textToast: {
    marginTop: 5,
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
  },
  toast: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: Colors.dark.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
