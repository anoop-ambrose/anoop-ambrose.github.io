const text = [
    "Aspiring Penetration Tester",
    "Web Application Security",
    "Vulnerability Assessment",
    "Linux Enthusiast"
];

let textIndex = 0;
let charIndex = 0;

function typeEffect() {

    const typing = document.getElementById("typing");

    if(charIndex < text[textIndex].length){

        typing.textContent += text[textIndex].charAt(charIndex);
        charIndex++;

        setTimeout(typeEffect,100);

    }else{

        setTimeout(() => {

            typing.textContent = "";

            charIndex = 0;

            textIndex = (textIndex + 1) % text.length;

            typeEffect();

        },1500);
    }
}

typeEffect();
