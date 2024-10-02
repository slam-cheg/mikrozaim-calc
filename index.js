// процент по займу
const percent = 0.08;

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

sumInput.addEventListener("input", calculate);
durationInput.addEventListener("input", calculate);
document.addEventListener("DOMContentLoaded", calculate);

function calculateDate(){
    const days = Number(durationInput.value) + 1;
    const date = new Date();
    const returnDate = getReturnDate(date, days);
    returnDateContainer.textContent = formatDate(returnDate);
}

function calculate() {
	const sum = Number(sumInput.value);
	const days = Number(durationInput.value);
	const returnSum = calculatorFormula(sum, days);

	sumValue.textContent = sum.toLocaleString("ru-RU");
	durationValue.textContent = days;
    durationValueUnit.textContent = days === 1 ? "день" : (days < 5 ? "дня" : "дней");
	returnValue.textContent = returnSum.toLocaleString("ru-RU");

    calculateDate();
}

function formatDate(date) {
    let formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    // Убираем "г." в конце строки
    formattedDate = formattedDate.replace(/ г\.$/, '');
    return formattedDate;
}

function getReturnDate(date, daysToAdd) {
    const returnDate = new Date(date);
    returnDate.setDate(returnDate.getDate() + daysToAdd);
    return returnDate;
}

function calculatorFormula(roubles, days) {
	// формула расчета возвратной суммы
	const result = roubles + roubles * percent * days;
	return result;
}
