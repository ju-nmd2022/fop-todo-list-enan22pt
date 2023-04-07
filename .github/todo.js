const addButton = document.getElementById("addbutton");
const jumpingCat = document.getElementById("buttoncat");
const toDoListElement = document.getElementById("actuallist");
const addToListElement = document.getElementById("entertext");
jumpingCat.style.visibility = "hidden";
const toDoCat = document.createElement("img");
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

//hover cat for the to do list

toDoCat.src = "cat2.png";
toDoCat.classList.add("toDoCat");
addedToList.appendChild(toDoCat);
toDoListElement.appendChild(addedToList);

//clear the imput value
if(addToListElement.value!=""){
    addToListElement.value="";
}
addedToList.addEventListener("click", markAsDone);

}

const doneListElement= document.getElementById("donelist");

// mark actions as done
function markAsDone(event) {
    const doneAction = event.target;
  doneAction.classList.toggle("done");
  if (doneAction.classList.contains("done")) {
    const doneCat = doneAction.querySelector('.toDoCat');
    doneListElement.appendChild(doneAction);
    doneListElement.removeChild(doneCat);
  } else {
    toDoListElement.appendChild(doneAction);
  }
}

