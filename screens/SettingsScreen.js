import React, { useState, useEffect, useRef } from "react";
import {
	Text,
	TextInput,
	StyleSheet,
	View,
	Button,
	ScrollView,
	Alert,
	BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ElementInput = ({
	innerRef,
	onSubmitEditing,
	placeholder,
	autoFocus,
	value,
	onChangeText,
	id,
	...props
}) => (
	<TextInput
		ref={innerRef}
		placeholder={placeholder}
		returnKeyType="next"
		onSubmitEditing={onSubmitEditing}
		blurOnSubmit={false}
		autoFocus={autoFocus}
		selectTextOnFocus
		onChangeText={(value) => onChangeText(id, value)}
		value={value}
		id={id}
		{...props}
	/>
);

const Settings = ({ navigation }) => {
	const [data, setData] = useState({
		fullName: "",
		street: "",
		houseNumber: "",
		flatNumber: "",
		city: "",
		postCode: "",
		recipientName: "",
		recipientStreet: "",
		recipientHouseNumber: "",
		recipientFlatNumber: "",
		recipientCity: "",
		recipientPostCode: "",
		accountNumber: "",
		transferTitle: "",
	});

	const refInput1 = useRef();
	const refInput2 = useRef();
	const refInput3 = useRef();
	const refInput4 = useRef();
	const refInput5 = useRef();
	const refInput6 = useRef();
	const refInput7 = useRef();
	const refInput8 = useRef();
	const refInput9 = useRef();
	const refInput10 = useRef();
	const refInput11 = useRef();
	const refInput12 = useRef();
	const refInput13 = useRef();
	const refInput14 = useRef();

	useEffect(() => {
		const backAction = () => {
			backAlert();
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		async function getData() {
			try {
				const jsonValue = await AsyncStorage.getItem("@SettingData");
				const value = jsonValue != null ? JSON.parse(jsonValue) : null;
				return setData((data) => ({
					...data,
					...value,
				}));
			} catch (e) {
				console.log(e, "error storage");
			}
		}
		getData();
	}, []);

	const storeData = async (value) => {
		try {
			value = data;
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem("@SettingData", jsonValue);
		} catch (e) {
			console.log(e, "error storage");
		}
		navigation.navigate("Liczenie");
	};

	const sendDataAlert = () => {
		Alert.alert("Zapisano", "Twoje dane zostały pomyślnie zaktualizowane", [
			{ text: "OK", onPress: () => storeData() },
		]);
	};

	const backAlert = () => {
		Alert.alert("Wróc", "Czy chcesz wyjść bez zapisania danych", [
			{
				text: "Nie",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "Tak",
				onPress: () => navigation.navigate("Liczenie"),
			},
		]);
	};

	const onChangeValue = (id, value) => {
		setData((data) => ({
			...data,
			[id]: value,
		}));
	};

	return (
		<ScrollView>
			<View>
				<Text>DANE JEDNOSTKI ORGANIZACYJNEJ KLIENTA DOKONUJĄCEJ WPŁATY</Text>
				<ElementInput
					id={"fullName"}
					value={data.fullName}
					innerRef={refInput1}
					placeholder={"Imię i nazwisko"}
					autoFocus={true}
					onSubmitEditing={() => refInput2.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"street"}
					value={data.street}
					innerRef={refInput2}
					placeholder={"Ulica"}
					onSubmitEditing={() => refInput3.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"houseNumber"}
					value={data.houseNumber}
					innerRef={refInput3}
					placeholder={"Nr domu"}
					onSubmitEditing={() => refInput4.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"flatNumber"}
					value={data.flatNumber}
					innerRef={refInput4}
					placeholder={"Nr mieszkania"}
					onSubmitEditing={() => refInput5.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"city"}
					value={data.city}
					innerRef={refInput5}
					placeholder={"Miejscowość"}
					onSubmitEditing={() => refInput6.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"postCode"}
					value={data.postCode}
					innerRef={refInput6}
					placeholder={"Kod pocztowy"}
					onSubmitEditing={() => refInput7.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
			</View>
			<View>
				<Text>DANE BANKOWEGO DOWODU WPŁATY</Text>
				<ElementInput
					id={"recipientName"}
					value={data.recipientName}
					innerRef={refInput7}
					placeholder={"Nazwa właściciela rachunku"}
					onSubmitEditing={() => refInput8.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientStreet"}
					value={data.recipientStreet}
					innerRef={refInput8}
					placeholder={"Ulica"}
					onSubmitEditing={() => refInput9.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientHouseNumber"}
					value={data.recipientHouseNumber}
					innerRef={refInput9}
					placeholder={"Nr domu"}
					onSubmitEditing={() => refInput10.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientFlatNumber"}
					value={data.recipientFlatNumber}
					innerRef={refInput10}
					placeholder={"Nr lokalu"}
					onSubmitEditing={() => refInput11.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientCity"}
					value={data.recipientCity}
					innerRef={refInput11}
					placeholder={"Miejscowość"}
					onSubmitEditing={() => refInput12.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"recipientPostCode"}
					value={data.recipientPostCode}
					innerRef={refInput12}
					placeholder={"Kod pocztowy"}
					onSubmitEditing={() => refInput13.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"accountNumber"}
					value={data.accountNumber}
					innerRef={refInput13}
					placeholder={"Nr rachunku bankowego"}
					onSubmitEditing={() => refInput14.current.focus()}
					onChangeText={onChangeValue}
					style={styles.input}
				/>
				<ElementInput
					id={"transferTitle"}
					value={data.transferTitle}
					innerRef={refInput14}
					placeholder={"Tytuł przelewu"}
					onChangeText={onChangeValue}
					style={styles.input}
					returnKeyType="done"
					blurOnSubmit={true}
				/>
				<View style={styles.styleLoginBtn}>
					<View style={styles.styleWidth}>
						<Button title="Wróć" onPress={backAlert} />
					</View>
					<View style={styles.styleWidth}>
						<Button title="Zapisz" onPress={sendDataAlert} />
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	styleWidth: {
		width: 150,
	},
	styleLoginBtn: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});

export default Settings;
