async function getNewRandomQuote() {
        const response = await fetch("https://api.quotable.io/quotes/random");
        if(!response.ok) {
            alert("There was a problem fetching a new quote. Please try again later.");
        }
        const data = await response.json();

        const quoteText = data[0].content;
        const quoteAuthor = data[0].author;
        document.getElementById("random-quote-text").textContent = quoteText
        document.getElementById("random-quote-author").textContent = quoteAuthor

        // 🌈 Change background gradient
        const section = document.getElementById("section-4");
        section.style.background = getRandomGradient();

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