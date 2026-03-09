const fallbacks = [
  { content: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett" },
  { content: "In investing, what is comfortable is rarely profitable.", author: "Robert Arnott" },
  { content: "The four most dangerous words in investing are: 'This time it's different.'", author: "Sir John Templeton" },
  { content: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { content: "Know what you own, and know why you own it.", author: "Peter Lynch" },
  { content: "The individual investor should act consistently as an investor and not as a speculator.", author: "Benjamin Graham" },
  { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { content: "Opportunities come infrequently. When it rains gold, put out the bucket, not the thimble.", author: "Warren Buffett" },
  { content: "The most important quality for an investor is temperament, not intellect.", author: "Warren Buffett" },
  { content: "Don't look for the needle in the haystack. Just buy the haystack.", author: "John Bogle" },
  { content: "Wide diversification is only required when investors do not understand what they are doing.", author: "Warren Buffett" },
  { content: "The essence of investment management is the management of risks, not the management of returns.", author: "Benjamin Graham" },
  { content: "Risk comes from not knowing what you're doing.", author: "Warren Buffett" },
  { content: "Buy when everyone else is selling and hold until everyone else is buying.", author: "J. Paul Getty" },
  { content: "It's not how much money you make, but how much money you keep.", author: "Robert Kiyosaki" },
  { content: "Investing should be more like watching paint dry or watching grass grow.", author: "Paul Samuelson" },
  { content: "The best way to measure your investing success is not by whether you're beating the market but by whether you've put in place a financial plan.", author: "Benjamin Graham" },
  { content: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { content: "Markets can remain irrational longer than you can remain solvent.", author: "John Maynard Keynes" },
  { content: "Success in investing doesn't correlate with IQ... what you need is the temperament to control the urges that get other people into trouble.", author: "Warren Buffett" }
];

async function getNewRandomQuote() {
    // Skipping the fetch because the API certificate is expired
    // console.warn("API Offline: Using local quote fallback.");
    const randomIndex = Math.floor(Math.random() * fallbacks.length);
    return fallbacks[randomIndex];

    try {
        // We attempt the fetch, but keep the timeout short or expect it to fail
        const response = await fetch('https://api.quotable.io/quotes/random', { signal: AbortSignal.timeout(2000) });
        if (!response.ok) throw new Error('API unavailable');
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn("Using fallback quote due to API certificate error.");
        // Return a random selection from the 20 quotes above
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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