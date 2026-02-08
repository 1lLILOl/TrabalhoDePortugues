const elements = document.body.querySelectorAll(
  "p, h1, h2, span, img, section, ul"
);

for (let element of elements) {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    }
  });
},

{
  threshold: 0.2
});

let isFirstTime = true;

if (isFirstTime){
    setTimeout(() => {
        elements.forEach(el => observer.observe(el));
    },200)
}else{
    elements.forEach(el => observer.observe(el));
    isFirstTime = false;
}