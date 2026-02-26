async function getNewRandomQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        document.getElementById("random-quote-text").innerText = data.content;
        document.getElementById("random-quote-author").innerText = data.author;

        // 🌈 Change background gradient
        const section = document.getElementById("section-4");
        section.style.background = getRandomGradient();

    } catch (error) {
        alert("An error occurred while fetching a new quote. Please try again later.");
    }
}

function getRandomColour() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomGradient() {
    const colour1 = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    const colour2 = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    const angle = Math.floor(Math.random() * 360);

    return `linear-gradient(${angle}deg, ${colour1}, ${colour2})`;
}