"use strict";

let tasks = JSON.parse(localStorage.getItem('tasks'));
let empty = document.querySelector(".empty");

function getTasks(tasks){
  let forTasks = jQuery('#tasks');
  if (!tasks || !tasks.length) {
    empty.classList.add('emptyMess');
  }
  jQuery('.taskDes').remove();
  tasks.forEach(task => {
    forTasks.append(
      `<div class="taskDes">
      <h4>Дата выполнения: ${task.calendar}</h4>
      <div><p><b>Название:</b> ${task.title}</p>
      <p><b>Описание:</b> ${task.description}</p>
      <p><b>Участники:</b> ${task.partners}</p></div>
      </div>`
    )
  })

}
getTasks(tasks);

console.log(tasks);

$('#newtasks').click(function(){
  let newtasks = tasks.sort(sortFunction);
  getTasks(newtasks);
});
function sortFunction(a,b){
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;
}

jQuery(document).ready(function(){
  jQuery(".taskDes").click(function(){
    jQuery(this).toggleClass("selectedTask");
  });
});

let deleteButton = document.querySelector(".reset");
deleteButton.addEventListener("click", deleteTasks);
function deleteTasks(event) {
  event.preventDefault();
  let tasksD = Object.values(document.querySelectorAll(".taskDes"));
  for (let i = tasksD.length - 1; i >= 0; i--) {
    if (tasksD[i].classList.contains("selectedTask")) {
      tasksD[i].classList.add("deleteTask");
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  if (!tasks || !tasks.length) {
    empty.classList.add('emptyMess');
  }
}
