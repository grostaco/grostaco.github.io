// Taken directly from the GreenSocks people https://codepen.io/GreenSock/pen/pojzxwZ

function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if (elem.classList.contains("gs_reveal_fromLeft")) {
        x = -100;
        y = 0;
    } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 100;
        y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
}

function counter(day, hour, minute, second, initial, start, end, duration) {
    start = start || 0;
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let elapsed = Math.floor(progress * (end - initial));

        day.innerHTML = Math.floor(elapsed / 86400);
        hour.innerHTML = Math.floor(elapsed % 86400 / 3600);
        minute.innerHTML = Math.floor(elapsed % 86400 % 3600 / 60);
        second.innerHTML = elapsed % 60;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            //setTimeout(() => counter(day, hour, minute, second, initial, end, Math.floor(Date.now() / 1000), duration), 100);
        }
    };
    window.requestAnimationFrame(step);
}


document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) },
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    counter(days, hours, minutes, seconds, 1621459200, 1621459200, Math.floor(Date.now() / 1000), 5000);
})