const addButton = document.getElementById("addbutton");
const jumpingCat = document.getElementById("buttoncat");
const toDoListElement = document.getElementById("actuallist");
const addToListElement = document.getElementById("entertext");
const doneListElement= document.getElementById("donelist");
document.addEventListener('DOMContentLoaded', function() {
  accessActions();
});
jumpingCat.style.visibility = "hidden";

addButton.addEventListener("click", addToDoList);

function addToDoList(event){
//button cat    
    jumpingCat.style.visibility = "visible";
setTimeout(() =>{
    jumpingCat.style.visibility = "hidden";
}, 1000);

//no action will be added if the input is empty
if (addToListElement.value.trim() === "") {
  return;
}

// adding actions to the list
const addedToList = document.createElement("li");   
addedToList.innerText = addToListElement.value;
toDoListElement.appendChild(addedToList);
addedToList.value="";
saveToLocalStorage(addToListElement);

//delete action button
const deleteButton = document.createElement("button");
deleteButton.innerText= "✖︎";
addedToList.appendChild(deleteButton);
deleteButton.classList.add("deletebutton");
deleteButton.addEventListener("click", deleteAction);

//clear the imput value
if(addToListElement.value!=""){
    addToListElement.value="";
}

addedToList.addEventListener("click", markAsDone);
}

// mark actions as done
function markAsDone(event) {
const doneAction = event.target;
doneAction.classList.toggle("done");

if (doneAction.classList.contains("done")) {
  doneListElement.appendChild(doneAction);
  doneAction.setAttribute("data-text", doneAction.innerText);

// Save the marked element to local storage
saveDoneToLocal(doneAction.getAttribute("data-text"));
} else {
toDoListElement.appendChild(doneAction);
doneAction.removeAttribute("data-text");
}}



//delete actions from both lists 
//this code is inspired from Chat GPT (my initial code was working just on the toDoList, but not doneList)
function deleteAction(event){
  const actionElement = event.target.parentElement;
  const parentElement = actionElement.parentElement;
  parentElement.removeChild(actionElement);
  deleteLocalActions(actionElement);
  deleteDoneFromLocal(actionElement);
}

//saving to local storage 
//code inspired from https://www.youtube.com/watch?v=Ttf3CEsEwMQ&t=3673s&ab_channel=developedbyed
function saveToLocalStorage(action){
let actions;
if(localStorage.getItem('actions') === null){
  actions=[];
} else{
  actions = JSON.parse(localStorage.getItem('actions'));
}
actions.push(action.value);
localStorage.setItem('actions', JSON.stringify(actions));
}

//delete actions from the local storage of done list
function deleteDoneFromLocal(doneAction) {
let doneActions;
if (localStorage.getItem('doneActions') === null) {
  doneActions = [];
} else {
  doneActions = JSON.parse(localStorage.getItem('doneActions'));
}
const doneIndex = doneActions.indexOf(doneAction);
if (doneIndex > -1) {
  doneActions.splice(doneIndex, 1);
}
const doneActionIndex = doneAction.children[0].innerText;
doneActions.splice(doneActions.indexOf(doneActionIndex), 1);
localStorage.setItem('doneActions', JSON.stringify(doneActions));
}

function saveDoneToLocal(doneAction) {
  let actions;
  let doneActions;
  // Get the existing done actions from local storage
  if (localStorage.getItem('doneActions') === null) {
    doneActions = [];
  } else {
    doneActions = JSON.parse(localStorage.getItem('doneActions'));
  }
  if (localStorage.getItem('actions') === null) {
    actions = [];
  } else {
    actions = JSON.parse(localStorage.getItem('actions'));
  }
  doneActions.push(doneAction);
  const actionIndex = actions.indexOf(doneAction);
  
  // Remove the done action from the actions array
  if (actionIndex > -1) {
    actions.splice(actionIndex, 1);
  }
  localStorage.setItem('doneActions', JSON.stringify(doneActions));
  localStorage.setItem('actions', JSON.stringify(actions));
}

function accessActions(){
let actions;
let doneActions = JSON.parse(localStorage.getItem('doneActions')) || [];
if(localStorage.getItem('actions') === null){
  actions=[];
} else{
  actions = JSON.parse(localStorage.getItem('actions'));
}

actions.forEach(function(action){
// adding actions to the list
const addedToList = document.createElement("li");   
addedToList.innerText = action;
toDoListElement.appendChild(addedToList);
addedToList.value="";

//delete action button
const deleteButton = document.createElement("button");
deleteButton.innerText= "✖︎";
addedToList.appendChild(deleteButton);
deleteButton.classList.add("deletebutton");
deleteButton.addEventListener("click", deleteAction);
});

// Add saved done actions to the done list
doneActions.forEach(function(action) {
  const addedToList = document.createElement("li");   
  addedToList.innerText = action;
  doneListElement.appendChild(addedToList);

  // Add delete button and event listener
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "✖︎";
  addedToList.appendChild(deleteButton);
  deleteButton.classList.add("deletebutton");
  deleteButton.addEventListener("click", deleteAction);

  // Add "done" class to list item
  addedToList.classList.add("done");
});
}

function deleteLocalActions(action){
  let actions;
  if(localStorage.getItem('actions') === null){
    actions=[];
  } else{
    actions = JSON.parse(localStorage.getItem('actions'));
  }
const actionIndex = action.children[0].innerText;
actions.splice(actions.indexOf(actionIndex), 1);
localStorage.setItem('actions', JSON.stringify(actions));
}
// localStorage.clear();