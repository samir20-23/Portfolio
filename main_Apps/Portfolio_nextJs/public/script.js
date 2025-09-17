// public/script.js
(function() {
    //text circle
    const text = document.querySelector(".textcircletext");
    text.innerHTML = text.innerText
        .split("")
        .map(
            (char, i) => `<span style="transform:rotate(${i * 10}deg)">${char}</span>`
        )
        .join("");
    //text circle



    const cursor = document.querySelector(".cursor");
    if (!cursor) return;

    document.addEventListener("mousemove", (e) => {
        const x = e.pageX;
        const y = e.pageY;

        // move main custom cursor
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;

        // particle
        const particle = document.createElement("div");
        particle.classList.add("particle");
        document.body.appendChild(particle);
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        setTimeout(() => {
            particle.remove();
        }, 500);
    });
})();