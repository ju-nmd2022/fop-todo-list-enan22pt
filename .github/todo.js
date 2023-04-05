const addButton = document.getElementById("addbutton");
const jumpingCat = document.getElementById("buttoncat");

jumpingCat.style.visibility = "hidden";

addButton.addEventListener("click", () =>{
    jumpingCat.style.visibility = "visible";

setTimeout(() =>{
    jumpingCat.style.visibility = "hidden";
}, 1000);

});
