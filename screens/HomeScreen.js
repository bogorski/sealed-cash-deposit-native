import React, { useState, useEffect, useRef } from "react";
import {
	TextInput,
	View,
	Button,
	StyleSheet,
	Alert,
	BackHandler,
	ScrollView,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import * as Print from "expo-print";
import AsyncStorage from "@react-native-async-storage/async-storage";

import druk from "../image/druk.js";
import convertValue from "../components/convertNumers";

const Home = ({ navigation }) => {
	const [data, setData] = useState({
		accountNumber: "",
		city: "",
		flatNumber: "",
		fullName: "",
		houseNumber: "",
		postCode: "",
		recipientCity: "",
		recipientFlatNumber: "",
		recipientHouseNumber: "",
		recipientName: "",
		recipientPostCode: "",
		recipientStreet: "",
		street: "",
		transferTitle: "",
	});

	const [seal, setSeal] = useState();
	const [value, setValue] = useState([
		[5, 0, 0],
		[2, 0, 0],
		[1, 0, 0],
		[0.5, 0, 0],
		[0.2, 0, 0],
		[0.1, 0, 0],
	]);

	const [sumValue, setSumValue] = useState(0);
	const [sumQuantity, setSumQuantity] = useState(0);

	const imageDruk = druk;

	const getValueFunction = () => {
		AsyncStorage.getItem("@SettingData").then((value) => {
			value = JSON.parse(value);
			if (value) {
				setData(value);
			}
		});
	};

	useEffect(
		() => navigation.addListener("focus", () => getValueFunction()),
		[]
	);

	const refInput1 = useRef();
	const refInput2 = useRef();
	const refInput3 = useRef();
	const refInput4 = useRef();
	const refInput5 = useRef();
	const refInput6 = useRef();
	const refInput7 = useRef();

	const onChangeValue = (text, id) => {
		setValue((value) => {
			const thisValue = value[id];
			const sum = (text * thisValue[0]).toFixed(2);
			thisValue.splice(1, 1, text);
			thisValue.splice(2, 1, sum);
			return [...value];
		});
	};

	const onChangeSeal = (text) => {
		setSeal(text);
	};

	const elementInput = (id, ref, nextRef) => (
		<TextInput
			ref={ref}
			maxLength={5}
			autoFocus={id == 0 ? true : false}
			selectTextOnFocus={true}
			keyboardType="numeric"
			defaultValue="0"
			returnKeyType={"go"}
			onSubmitEditing={() => nextRef.current.focus()}
			value={value[id][1]}
			onChangeText={(value) => onChangeValue(value, id)}
			blurOnSubmit={false}
		/>
	);

	useEffect(() => {
		setSumValue((sumValue) => {
			let sum = 0;
			for (let i = 0; i < value.length; i++) {
				sum = parseFloat(sum) + parseFloat(value[i][2]);
			}
			sumValue = parseFloat(sum).toFixed(2);
			return sumValue;
		});
	});

	useEffect(() => {
		setSumQuantity((sumQuantity) => {
			let sum = 0;
			for (let i = 0; i < value.length; i++) {
				let valueInt = parseInt(value[i][1]);
				sum = sum + valueInt;
			}
			sumQuantity = sum;
			return sumQuantity;
		});
	});

	const tableHead = ["Nominał", "Ilość", "Razem"];
	const tableData = [
		[value[0][0] + " zł", elementInput(0, refInput1, refInput2), value[0][2]],
		[value[1][0] + " zł", elementInput(1, refInput2, refInput3), value[1][2]],
		[value[2][0] + " zł", elementInput(2, refInput3, refInput4), value[2][2]],
		[value[3][0] + " zł", elementInput(3, refInput4, refInput5), value[3][2]],
		[value[4][0] + " zł", elementInput(4, refInput5, refInput6), value[4][2]],
		[value[5][0] + " zł", elementInput(5, refInput6, refInput7), value[5][2]],
		["Razem", sumQuantity, sumValue],
		["Waga", "Worek ma odpowiednią wagę", "0"],
	];

	/*const sendMail = () => {
		const day = new Date().getDate();
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		const date = day + "." + month + "." + year;
		const name = "Mateusz Bogórski";
		const subject = "kasa " + name + " " + date;
		const adressMail = "mailto:mateusz.b@automatspec.pl?subject=" + subject;
		Linking.openURL(adressMail);
	};*/

	const now = new Date();
	const currnetDate =
		(now.getDate() <= 9 ? "0" + now.getDate() : now.getDate()) +
		"." +
		(now.getMonth() + 1 <= 9
			? "0" + (now.getMonth() + 1)
			: now.getMonth() + 1) +
		"." +
		now.getFullYear();

	const paymentForm = `
									<div style="position: relative; height: 33vh; font-family: Impact; letter-spacing: 2px; font-size: 16px;">
										<img src="data:image/png;base64,${imageDruk}" alt="Image blankiet" style="height: 100%"> 
										<div style="position: absolute; top: 16px; left: 32px; text-transform: uppercase;">
											<b>${data.recipientName}</b>
										</div>
										<div style="position: absolute; top: 46px; left: 32px; text-transform: uppercase">
											<b>${data.recipientStreet} ${data.recipientHouseNumber} ${
		data.recipientFlatNumber
	} ${data.recipientPostCode} ${data.recipientCity}</b>
										</div>
										<div style="position: absolute; top: 76px; left: 32px; letter-spacing: 8px;">
											<b>${data.accountNumber}</b>
										</div>
										<div style="position: absolute; top: 106px; left:295px;">
											<b>${sumValue}</b>
										</div>
										<div style="position: absolute; top: 138px; left:28px; font-size: 11px;">
											<b>${convertValue(sumValue)}</b>
										</div>
										<div style="position: absolute; top: 166px; left:32px; text-transform: uppercase;">
											<b>${data.fullName}</b>
										</div>
										<div style="position: absolute; top: 196px; left:32px; text-transform: uppercase;">
											<b>${data.transferTitle} ${currnetDate}</b>
										</div>
										<div style="position: absolute; top: 256px; left:32px; text-transform: uppercase; font-size: 12px;">
											<b>Bezpieczna koperta o numerze: "${seal}"</b>
										</div>
									</div>
						`;

	const printHTML = `
					<html>
						<head>
							<meta name="viewport" content="width=100vh, initial-scale=1.0">
							<style>
								@page {
									margin: 0;
									padding: 0;
								}
								table, td, th {
									border: 1px solid black;
									border-collapse: collapse;
									margin-left: auto; 
									margin-right: auto;
									width: 40vh;
									padding: 0.5vh;
								}
							</style>
						</head>
						<body style="margin: 0; padding: 0;">
							<div>
								<div>
									<div>
										<div>
											<p style="margin: 2vh; font-size: 2.5vh; text-align: center; font-weight: bold">Specyfikacja Wpłaty zamkniętej</p>
										</div>
										<div style="margin: 4vh; font-size: 1.5vh">
											<div>
												<p style="font-weight: bold">DANE JEDNOSTKI ORGANIZACYJNEJ KLIENTA DOKONUJĄCEJ WPŁATY:</p>
												<p>Nazwa klienta: ${data.fullName}</p>
												<p>Ulica: ${data.street} &emsp; Nr domu: ${
		data.houseNumber
	} &emsp; Nr lokalu: ${data.flatNumber}</p>
												<p>Kod pocztowy: ${data.postCode} &emsp; Miejscowość: ${data.city}</p>
											</div>
											<div>
												<p style="font-weight: bold; margin-top: 4vh">WPŁATA DOKONYWANA W ODDZIALE:</p>
											</div>
											<div>
												<p>Miasto: ${data.city}</p>
												<p>Kwota wpłaty: ${sumValue}</p>
												<p>Słownie: ${convertValue(sumValue)}</p>
											</div>
											<div>
												<p style="font-weight: bold; margin-top: 4vh">SPECYFIKACJA WPŁATY:</p>
											</div>
											<div>
												<p>Dotyczy bezpiecznej koperty o nr: ${seal}</p>
											</div>
										</div>
									</div>
									<div>
										<div>
											<table>
												<thead style="background-color: lightblue">
													<tr>
														<th>Nominał</th>
														<th>Ilość sztuk</th>
														<th>Kwota</th>
														<th>Waluta</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>500,00</td>
														<td>0</td>
														<td>0</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>200,00</td>
														<td>0</td>
														<td>0</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>100,00</td>
														<td>0</td>
														<td>0</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>50,00</td>
														<td>0</td>
														<td>0</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>20,00</td>
														<td>0</td>
														<td>0</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>10,00</td>
														<td>0</td>
														<td>0</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>5,00</td>
														<td>${value[0][1]}</td>
														<td>${value[0][2]}</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>2,00</td>
														<td>${value[1][1]}</td>
														<td>${value[1][2]}</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>1,00</td>
														<td>${value[2][1]}</td>
														<td>${value[2][2]}</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>0,50</td>
														<td>${value[3][1]}</td>
														<td>${value[3][2]}</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>0,20</td>
														<td>${value[4][1]}</td>
														<td>${value[4][2]}</td>
														<td>PLN</td>
													</tr>
													<tr>
														<td>0,10</td>
														<td>${value[5][1]}</td>
														<td>${value[5][2]}</td>
														<td>PLN</td>
													</tr>
													<tr style="font-weight: bold">
														<td >Razem</td>
														<td>${sumQuantity}</td>
														<td>${sumValue}</td>
														<td>PLN</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div style = "page-break-before: always ">
									<div style="display: flex; flex-direction: column; height: 100vh">
										${paymentForm}
										${paymentForm}
										${paymentForm}
									</div>
								</div>
							</div>
						</body>
					</html>
					`;

	const print = async () => {
		const html = printHTML;
		await Print.printAsync({
			html,
		});
	};

	const exitApp = () => {
		Alert.alert("Wyjście", "Czy na pewno chcesz wyjść?", [
			{
				text: "Nie",
			},
			{ text: "Tak", onPress: () => killApp() },
		]);
	};

	const killApp = () => {
		setSeal();
		setValue([
			[5, 0, 0],
			[2, 0, 0],
			[1, 0, 0],
			[0.5, 0, 0],
			[0.2, 0, 0],
			[0.1, 0, 0],
		]);

		BackHandler.exitApp();
	};

	useEffect(() => {
		const backAction = () => {
			exitApp();
			return true;
		};
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);
		return () => backHandler.remove();
	}, []);

	return (
		<ScrollView>
			<View style={styles.container}>
				<View>
					<Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
						<Row data={tableHead} style={styles.head} />
						<Rows data={tableData} />
					</Table>
				</View>
				<TextInput
					ref={refInput7}
					style={styles.input}
					onChangeText={onChangeSeal}
					value={seal}
					placeholder="Numer plomby"
				/>
				<View style={styles.btn}>
					<View style={styles.styleWidth}>
						<Button title="Drukuj" onPress={print} />
					</View>
					<View style={styles.styleWidth}>
						<Button
							title="Ustawienia"
							onPress={() => navigation.navigate("Ustawienia")}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
	head: { height: 40, backgroundColor: "#f1f8ff" },
	text: { margin: 6 },
	row: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "black",
	},
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
	btn: {
		flexDirection: "row",
		justifyContent: "space-around",
		margin: 12,
	},
	btnText: { textAlign: "center", color: "#fff" },
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	spacer: { textAlign: "left" },
});

export default Home;
