const elts = {
    text4: document.getElementById("text4"),
    text5: document.getElementById("text5")
};

const texts = [
    "Good",
    "Day",
    ":)",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text4.textContent = texts[textIndex % texts.length];
elts.text5.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text5.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    // elts.text5.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text4.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    // elts.text4.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text4.textContent = texts[textIndex % texts.length];
    elts.text5.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text5.style.filter = "";
    elts.text5.style.opacity = "100%";

    elts.text4.style.filter = "";
    elts.text4.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();


