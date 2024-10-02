// Процент на займ в десятичной системе, где 1 = 100%
const percent = 0.008;

const calculatorContainer = document.querySelector(".calculator");
const sumRow = calculatorContainer.querySelector("#calc-sum");
const sumInput = sumRow.querySelector(".calculator__input-range");
const sumValue = sumRow.querySelector(".calculator__row-value").querySelector("span");
const durationRow = calculatorContainer.querySelector("#calc-duration");
const durationInput = durationRow.querySelector(".calculator__input-range");
const durationValue = durationRow.querySelector(".calculator__row-value").querySelector("#duration-value");
const durationValueUnit = durationRow.querySelector(".calculator__row-value").querySelector("#duration-value-unit");
const returnValue = calculatorContainer.querySelector("#calc-return-value");
const returnDateContainer = calculatorContainer.querySelector("#calc-return-date");
const calculatorButton = calculatorContainer.querySelector(".calculator__link");
const inputProgressSum = sumRow.querySelector(".calculator__input-progress");
const inputProgressDuration = durationRow.querySelector(".calculator__input-progress");
const rangeInputs = document.querySelectorAll('input[type="range"]');
let isRTL = document.documentElement.dir === "rtl";

// Обработчики событий изменения ползунков
sumInput.addEventListener("input", calculate);
durationInput.addEventListener("input", calculate);
// Обработчик события загрузки страницы для инициализации первичного расчета с дефолтными значениями
document.addEventListener("DOMContentLoaded", calculate);

function calculateDate() {
	// days - Дата в которую необходимо вернуть сумму + 1 день
	const days = Number(durationInput.value) + 1;
	const date = new Date();
	const returnDate = getReturnDate(date, days);
	return formatDate(returnDate);
}

function calculate() {
	// Запрашиваемая сумма
	const sum = Number(sumInput.value);
	// Желаемое количество дней для займа
	const days = Number(durationInput.value);
	// Возвратная сумма
	const returnSum = calculatorFormula(sum, days);

	// Подстановка значений в верстку
	sumValue.textContent = sum.toLocaleString("ru-RU");
	durationValue.textContent = days;
	durationValueUnit.textContent = days === 1 ? "день" : days < 5 ? "дня" : "дней";
	returnValue.textContent = returnSum.toLocaleString("ru-RU");
	returnDateContainer.textContent = calculateDate().fullDate;
	calculatorButton.href = linkConstructor(sum, days, calculateDate().shortDate);
}

// Функция для создания ссылки на займ
function linkConstructor(sum, days, returnDate) {
	return `https://lk.profifinance.ru/start/credit?amount=${sum}&period=${days}&days=${returnDate}&utm_source=test`;
}

// Вспомогательная функция для форматирования даты
function formatDate(date) {
	let formattedDate = date.toLocaleDateString("ru-RU", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
	// Убираем "г." в конце строки
	formattedDate = formattedDate.replace(/ г\.$/, "");

	// Форматирование даты в формат ДД.ММ.ГГГГ
	const parsedDate = new Date(date);
	const day = String(parsedDate.getDate()).padStart(2, "0");
	const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
	const year = parsedDate.getFullYear();

	// Возврат даты в двух форматах, где shortDate - ДД.ММ.ГГГГ, fullDate - ДД месяц ГГГГ
	return { fullDate: formattedDate, shortDate: `${day}.${month}.${year}` };
}

// Вспомогательная функция для вычисления даты возврата
function getReturnDate(date, daysToAdd) {
	const returnDate = new Date(date);
	returnDate.setDate(returnDate.getDate() + daysToAdd);
	return returnDate;
}

// Калькулятор с формулой расчета, где roubles - запрашиваемая сумма, days - количество дней для займа
function calculatorFormula(roubles, days) {
	const result = roubles + roubles * percent * days;
	return result;
}

// Функция для изменения прогресс-бара ползунка
function handleInputChange(e) {
	let target = e.target;
	if (e.target.type !== "range") {
		target = document.getElementById("range");
	}
	const min = target.min;
	const max = target.max;
	const val = target.value;
	let percentage = ((val - min) * 100) / (max - min);
	if (isRTL) {
		percentage = max - val;
	}

	target.style.backgroundSize = percentage + "% 100%";
}

rangeInputs.forEach((input) => {
	input.addEventListener("input", handleInputChange);
});
function callback(mutationList, observer) {
	mutationList.forEach(function (mutation) {
		if (mutation.type === "attributes" && mutation.attributeName === "dir") {
			isRTL = mutation.target.dir === "rtl";
		}
	});
}

const observer = new MutationObserver(callback);
observer.observe(document.documentElement, { attributes: true });
