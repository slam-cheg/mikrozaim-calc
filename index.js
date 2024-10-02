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

// Обработчики событий изменения ползунков
sumInput.addEventListener("input", calculate);
durationInput.addEventListener("input", calculate);
// Обработчик события загрузки страницы для инициализации первичного расчета с дефолтными значениями
document.addEventListener("DOMContentLoaded", calculate);

function calculateDate(){
    // days - Дата в которую необходимо вернуть сумму + 1 день
    const days = Number(durationInput.value) + 1;
    const date = new Date();
    const returnDate = getReturnDate(date, days);
    returnDateContainer.textContent = formatDate(returnDate);
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
    durationValueUnit.textContent = days === 1 ? "день" : (days < 5 ? "дня" : "дней");
	returnValue.textContent = returnSum.toLocaleString("ru-RU");

    // Вычисление даты возврата и подстановка в верстку
    calculateDate();
}

// Вспомогательная функция для форматирования даты из милисекунд в читаемую строку
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
