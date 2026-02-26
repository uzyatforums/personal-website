async function getNewRandomQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        document.getElementById("random-quote-text").innerText = data.content;
        document.getElementById("random-quote-author").innerText = data.author;

    } catch (error) {
        alert("An error occurred while fetching a new quote. Please try again later.");
    }
}