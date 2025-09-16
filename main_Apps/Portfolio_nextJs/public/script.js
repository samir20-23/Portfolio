// public/script.js
(function() {
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