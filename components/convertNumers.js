function convertThreeNumbers(number) {
	number = number.toString();
	let setki = 0;
	let dziesiatki = 0;
	let jednosci = 0;
	let numberWords = "";
	if (number.length === 3) {
		setki = number[0];
		dziesiatki = number[1];
		jednosci = number[2];
	} else if (number.length === 2) {
		dziesiatki = number[0];
		jednosci = number[1];
	} else if (number.length === 1) {
		jednosci = number[0];
	}
	setki = Number(setki);
	dziesiatki = Number(dziesiatki);
	jednosci = Number(jednosci);
	if (setki === 1) {
		numberWords = "sto ";
	} else if (setki === 2) {
		numberWords = "dwieście ";
	} else if (setki === 3) {
		numberWords = "trzysta ";
	} else if (setki === 4) {
		numberWords = "czterysta ";
	} else if (setki === 5) {
		numberWords = "pięćset ";
	} else if (setki === 6) {
		numberWords = "sześćset ";
	} else if (setki === 7) {
		numberWords = "siedemset ";
	} else if (setki === 8) {
		numberWords = "osiemset ";
	} else if (setki === 9) {
		numberWords = "dziewięćset ";
	}

	if (dziesiatki === 2) {
		numberWords += "dwadzieścia ";
	} else if (dziesiatki === 3) {
		numberWords += "trzydzieści ";
	} else if (dziesiatki === 4) {
		numberWords += "czterdzieści ";
	} else if (dziesiatki === 5) {
		numberWords += "pięćdziesiąt ";
	} else if (dziesiatki === 6) {
		numberWords += "sześćdziesiąt ";
	} else if (dziesiatki === 7) {
		numberWords += "siedemdziesiąt ";
	} else if (dziesiatki === 8) {
		numberWords += "osiemdziesiąt ";
	} else if (dziesiatki === 9) {
		numberWords += "dziewięćdziesiąt ";
	}

	if (dziesiatki === 1) {
		if (jednosci === 0) {
			numberWords += "dziesięć ";
		} else if (jednosci === 1) {
			numberWords += "jedenaście ";
		} else if (jednosci === 2) {
			numberWords += "dwanaście ";
		} else if (jednosci === 3) {
			numberWords += "trzynaście ";
		} else if (jednosci === 4) {
			numberWords += "czternaście ";
		} else if (jednosci === 5) {
			numberWords += "piętnaście ";
		} else if (jednosci === 6) {
			numberWords += "szesnaście ";
		} else if (jednosci === 7) {
			numberWords += "siedemnaście ";
		} else if (jednosci === 8) {
			numberWords += "osiemnaście ";
		} else if (jednosci === 9) {
			numberWords += "dziewiętnaście ";
		}
	} else if (jednosci === 1) {
		numberWords += "jeden ";
	} else if (jednosci === 2) {
		numberWords += "dwa ";
	} else if (jednosci === 3) {
		numberWords += "trzy ";
	} else if (jednosci === 4) {
		numberWords += "cztery ";
	} else if (jednosci === 5) {
		numberWords += "pięć ";
	} else if (jednosci === 6) {
		numberWords += "sześć ";
	} else if (jednosci === 7) {
		numberWords += "siedem ";
	} else if (jednosci === 8) {
		numberWords += "osiem ";
	} else if (jednosci === 9) {
		numberWords += "dziewięć ";
	}
	return numberWords;
}

function convertNumbersToWords(number) {
	number = number.toString();
	let word = "";
	let tab = [];

	if (number.length % 3 === 1) {
		tab.push(number[0]);
		for (let i = 0; i < Math.floor(number.length / 3); i++) {
			let numberTemp = number.substr(1);
			tab.push(numberTemp.substr(-(numberTemp.length - 3 * i), 3));
		}
	} else if (number.length % 3 === 2) {
		tab.push(number.substr(0, 2));
		for (let i = 0; i < Math.floor(number.length / 3); i++) {
			let numberTemp = number.substr(2);
			tab.push(numberTemp.substr(-(numberTemp.length - 3 * i), 3));
		}
	} else if (number.length % 3 === 0) {
		for (let i = 0; i < Math.floor(number.length / 3); i++) {
			tab.push(number.substr(-(number.length - 3 * i), 3));
		}
	}

	for (let i = 0; i < tab.length; i++) {
		word += convertThreeNumbers(tab[i]);
		if (tab.length === 2 && i === 0) {
			word += "tyś ";
		}
	}

	return word;
}

function convertValue(number) {
	number = number.toString();
	let valueZlotych = number.substr(0, number.length - 3);
	let valueGroszy = number.substr(-2);

	valueZlotych = Number(valueZlotych);
	valueGroszy = Number(valueGroszy);

	let wordGroszy = "";
	let wordZlotych = "";
	if (valueGroszy === 0) {
		wordGroszy = "zero ";
	} else {
		wordGroszy = convertNumbersToWords(valueGroszy);
	}
	if (valueZlotych === 0) {
		wordZlotych = "zero ";
	} else {
		wordZlotych = convertNumbersToWords(valueZlotych);
	}

	return wordZlotych + "zł i " + wordGroszy + "gr";
}

export default convertValue;
