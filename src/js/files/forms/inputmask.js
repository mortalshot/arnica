/* Маски для полей (в работе) */

// Подключение функционала 
// Подключение списка активных модулей
import { flsModules } from "../modules.js";

// Подключение модуля
import "inputmask/dist/inputmask.min.js";

const phoneMasks = document.querySelectorAll('.form__input_phone');
if (phoneMasks.length) {
	flsModules.inputmask = Inputmask('+7 (999) 999-99-99').mask(phoneMasks);
}

const dateMasks = document.querySelectorAll('.form__input_date');
if (dateMasks.length) {
	flsModules.inputmask = Inputmask({alias: "datetime", inputFormat: "dd.mm.yyyy", showMaskOnHover: false}).mask(dateMasks);
}