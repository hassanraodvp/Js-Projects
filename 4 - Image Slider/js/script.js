let scrollContainer = document.querySelector(".gallery");
let backBtn = document.querySelector("#backBtn");
let nextBtn = document.querySelector("#nextBtn");

backBtn.addEventListener("click", () => {
    scrollContainer.scrollLeft -= 200;
    scrollContainer.style.scrollBehavior = "smooth";
});
nextBtn.addEventListener("click", () => {
    scrollContainer.scrollLeft += 200;
    scrollContainer.style.scrollBehavior = "smooth";
});