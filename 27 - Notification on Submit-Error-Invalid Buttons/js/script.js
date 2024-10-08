let sub = document.getElementById("submit");
let err = document.getElementById("error");
let inv = document.getElementById("invalid");
let toastBox = document.getElementById("toastBox"); 

let successMsg = '<i class="fa-regular fa-circle-check"></i> Submitted Successfully';
let errorMsg = '<i class="fa-regular fa-circle-xmark"></i> Please fix the errors!';
let invalidMsg = '<i class="fa-solid fa-exclamation"></i> Invalid input, check again.';

 function showToast(msg) {
   let toast = document.createElement("div");
   toast.classList.add("toast");
   toast.innerHTML = msg;
   toastBox.appendChild(toast); 

   if(msg.includes("error")) {
    toast.classList.add("error");
   };
   if(msg.includes("Invalid")) {
    toast.classList.add("invalid");
   }

   setTimeout(() => {
    toast.remove();
   }, 5000); 
};