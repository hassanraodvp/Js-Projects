let pwd = document.getElementById("pwd");
let msg = document.getElementById("msg");
let str = document.getElementById("strength");

pwd.addEventListener("input", () => {
    if (pwd.value.length > 0) {
        msg.style.display = "block";
    } else {
        msg.style.display = "none";
    }
    if(pwd.value.length < 5){
        str.innerHTML = "weak";
        pwd.style.borderColor = "#ff5925";
        msg.style.color = "#ff5925";
    }
    else if(pwd.value.length >= 5 && pwd.value.length < 10){
        str.innerHTML = "medium";
        pwd.style.borderColor = "blue";
        msg.style.color = "blue";
    }
    else if(pwd.value.length >= 10){
            str.innerHTML = "strong";
            pwd.style.borderColor = "#32CD32";
            msg.style.color = "#32CD32";
        }
});