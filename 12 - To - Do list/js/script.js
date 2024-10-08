let listContainer = document.getElementById("list-container");
let inputBox = document.getElementById("input-box");

function addTask(){
    if(inputBox.value === ''){
        alert("Error💀: Please enter a task");
    } else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
    }
    inputBox.value = "";
}