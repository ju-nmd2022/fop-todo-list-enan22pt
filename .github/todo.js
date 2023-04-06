const addButton = document.getElementById("addbutton");
const jumpingCat = document.getElementById("buttoncat");
const toDoListElement = document.getElementById("actuallist");
const addToListElement = document.getElementById("entertext");
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
}