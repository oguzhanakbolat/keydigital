import { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";

const NfcIdCard = () => {
	const [isSupported, setIsSupported] = useState(false);
	const [nfcData, setNfcData] = useState<string>("");
	const [isScanning, setIsScanning] = useState(false);

	useEffect(() => {
		checkNFCSupport();

		return () => {
			// Cleanup
			NfcManager.cancelTechnologyRequest().catch(() => {});
		};
	}, []);

	const checkNFCSupport = async () => {
		try {
			const supported = await NfcManager.isSupported();
			setIsSupported(supported);

			if (supported) {
				await NfcManager.start();
			}
		} catch (error) {
			console.error("NFC kontrol hatası:", error);
			setIsSupported(false);
		}
	};

	const startScanning = async () => {
		if (!isSupported) {
			Alert.alert("Uyarı", "Cihazınız NFC desteklemiyor");
			return;
		}

		try {
			setIsScanning(true);
			setNfcData("");

			// NFC okumaya başla
			await NfcManager.requestTechnology(NfcTech.Ndef);

			const tag = await NfcManager.getTag();

			if (tag) {
				let data = "NFC Kart Bilgileri:\n\n";

				// Tag ID'yi oku
				if (tag.id) {
					const tagId = tag.id;
					data += `Kart ID: ${tagId}\n\n`;
				}

				// NDEF mesajlarını oku
				if (tag.ndefMessage && tag.ndefMessage.length > 0) {
					data += "NDEF Mesajları:\n";
					tag.ndefMessage.forEach((record, index) => {
						try {
							const payload = new Uint8Array(record.payload);
							const text = Ndef.text.decodePayload(payload);
							data += `${index + 1}. ${text}\n`;
						} catch {
							// Binary veriyi hex olarak göster
							const hex = record.payload
								.map((byte: number) =>
									byte.toString(16).padStart(2, "0")
								)
								.join(" ");
							data += `${index + 1}. [Binary]: ${hex}\n`;
						}
					});
				} else {
					data += "\nNDEF mesajı bulunamadı.\n";
					data += "Bu kart okuma korumalı olabilir.";
				}

				setNfcData(data);
				Alert.alert("Başarılı", "NFC kart okundu!");
			}

			await NfcManager.cancelTechnologyRequest();
		} catch (error: any) {
			console.error("NFC okuma hatası:", error);
			Alert.alert(
				"Hata",
				`NFC okuma başarısız: ${error.message || error}`
			);
		} finally {
			setIsScanning(false);
			await NfcManager.cancelTechnologyRequest().catch(() => {});
		}
	};

	const stopScanning = async () => {
		try {
			await NfcManager.cancelTechnologyRequest();
			setIsScanning(false);
		} catch (error) {
			console.error("Durdurma hatası:", error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.statusContainer}>
				<Text style={styles.statusText}>
					NFC Desteği: {isSupported ? "✅ Var" : "❌ Yok"}
				</Text>
				{isScanning && (
					<Text style={styles.scanningText}>
						📡 Kart bekleniyor...
					</Text>
				)}
			</View>

			<View style={styles.buttonContainer}>
				<View style={styles.button}>
					<Button
						title="🔍 NFC Kart Oku"
						onPress={startScanning}
						disabled={!isSupported || isScanning}
					/>
				</View>
				{isScanning && (
					<View style={styles.button}>
						<Button
							title="⏹️ Durdur"
							onPress={stopScanning}
							color="#ff3b30"
						/>
					</View>
				)}
			</View>

			{nfcData ? (
				<ScrollView style={styles.dataContainer}>
					<Text style={styles.dataTitle}>Okunan Bilgiler:</Text>
					<Text style={styles.dataText}>{nfcData}</Text>
				</ScrollView>
			) : (
				<View style={styles.infoContainer}>
					<Text style={styles.infoText}>
						📱 Telefonunuzun arkasını NFC kartına yaklaştırın
					</Text>
					<Text style={styles.infoTextSmall}>
						{Platform.OS === "android"
							? "NFC ayarlarınızın açık olduğundan emin olun"
							: "iOS 13+ ve iPhone 7+ gereklidir"}
					</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	statusContainer: {
		marginBottom: 20,
		padding: 15,
		backgroundColor: "#f0f0f0",
		borderRadius: 10,
	},
	statusText: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 5,
	},
	scanningText: {
		fontSize: 14,
		color: "#007AFF",
		marginTop: 5,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 20,
	},
	button: {
		flex: 1,
	},
	dataContainer: {
		flex: 1,
		backgroundColor: "#ffffff",
		padding: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	dataTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#333",
	},
	dataText: {
		fontSize: 14,
		lineHeight: 22,
		color: "#666",
		fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
	},
	infoContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	infoText: {
		fontSize: 16,
		textAlign: "center",
		color: "#666",
		marginBottom: 10,
	},
	infoTextSmall: {
		fontSize: 12,
		textAlign: "center",
		color: "#999",
	},
});

export default NfcIdCard;
