const addButton = document.getElementById("addbutton");
const jumpingCat = document.getElementById("buttoncat");
const toDoListElement = document.getElementById("actuallist");
const addToListElement = document.getElementById("entertext");
const doneListElement= document.getElementById("donelist");

jumpingCat.style.visibility = "hidden";

addButton.addEventListener("click", addToDoList);

function addToDoList(event){
//button cat    
    jumpingCat.style.visibility = "visible";
setTimeout(() =>{
    jumpingCat.style.visibility = "hidden";
}, 1000);

// adding actions to the list
const addedToList = document.createElement("li");   
addedToList.innerText = addToListElement.value;
toDoListElement.appendChild(addedToList);
addedToList.value="";

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
  } else {
    toDoListElement.appendChild(doneAction);
  }
}

//delete actions from both lists 
//this code is inspired from Chat GPT (my initial code was working just on the toDoList, but not doneList)
function deleteAction(event){
  const actionElement = event.target.parentElement;
  const parentElement = actionElement.parentElement;
  parentElement.removeChild(actionElement);
}