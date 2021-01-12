"use strict";

let partners = document.querySelector(".addpartners input:first-child");
partners.addEventListener("click", openPartners);

function openPartners(){
  this.nextElementSibling.classList.toggle("partners-block");
}

let form = document.querySelector(".formValidation");

let titleRules = {
  elem: form.elements.title,
  minLength: 3,
  errorField: document.getElementById("title-error"),
};

let descriptionRules = {
  elem: form.elements.description,
  minLength: 10,
  errorField: document.getElementById("description-error"),
};

let validator = {
  checkMinLen(rule){
    if (rule.elem.value.length <= rule.minLength) {
        rule.errorField.innerText =
         'Минимальное количество символов: ' + rule.minLength;
        return false;
    }
    rule.errorField.innerText = "";
    return true;
  }
};

let calendar = form.querySelector('.calendarDate');
calendar.addEventListener('input', calendarValid);
function calendarValid(e) {
  let selectedDate = this.value.trim();
  Date.prototype.format = function(format = 'yyyy-mm-dd') {
      const replaces = {
          yyyy: this.getFullYear(),
          mm: ('0'+(this.getMonth() + 1)).slice(-2),
          dd: ('0'+this.getDate()).slice(-2),
      };
      let result = format;
      for(const replace in replaces){
          result = result.replace(replace,replaces[replace]);
      }
      return result;
  };
  let correctDate = ((new Date()).format('yyyy-mm-dd'));
  selectedDate < correctDate  ? this.setCustomValidity(`Дата не может быть ранее указанной: ${correctDate}`) : this.setCustomValidity('');
}

form.elements.title.addEventListener("keyup", validator.checkMinLen.bind(null, titleRules));
form.elements.description.addEventListener("keyup", validator.checkMinLen.bind(null, descriptionRules));

form.addEventListener("submit", submitForm);
function submitForm(event) {
  event.preventDefault();
  if (!validator.checkMinLen(titleRules) || !validator.checkMinLen(descriptionRules)) {
    console.log("задача не добавлена");
  } else {
    console.log("Задача добавлена");
    document.querySelector(".yesAdd").classList.toggle("yesAdd");
  }
}

form.addEventListener("submit", function(eve){
  eve.preventDefault();
  let task = {
    title: form.elements.title.value.trim(),
    description: form.elements.description.value.trim(),
    calendar: form.elements.calendar.value,
    partners: form.elements.partners.value.split(',').map(n => n.trim()).join(', '),

  };
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks ? tasks : [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
