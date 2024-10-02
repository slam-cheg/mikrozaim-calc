// процент по займу
const percent = 0.8

const calculatorContainer = document.querySelector('.calculator');
const sumRow = calculatorContainer.querySelector('#calc-sum');
const sumInput = sumRow.querySelector('.calculator__input-range');
const sumValue = sumRow.querySelector('.calculator__row-value').querySelector("span");
const durationRow = calculatorContainer.querySelector('#calc-duration');
const durationInput = durationRow.querySelector('.calculator__input-range');
const durationValue = durationRow.querySelector('.calculator__row-value').querySelector(".duration-value");
const durationValueUnit = durationRow.querySelector('.calculator__row-value').querySelector(".duration-value-unit");
const returnValue = calculatorContainer.querySelector('#calc-return-value');
const returnDateContainer = calculatorContainer.querySelector('#calc-return-date');
const returnDay = returnDateContainer.querySelector('#day');
const returnMonth = returnDateContainer.querySelector('#month');
const returnYear = returnDateContainer.querySelector('#year');

function calculator(roubles, days) {
    // формула расчета возвратной суммы
    const result = roubles + (roubles * 0.8 * days);
    return result;
}