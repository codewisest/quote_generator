let apiQuotes = [];
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteButton = document.getElementById("new_quote");

// get new quote
function newQuote() {
  // pick random quote from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  return quote;
}

function setTextAndAuthor(newQuote) {
  if (newQuote.text.length > 100) {
    quoteText.classList.add("long_quote");
  } else {
    quoteText.classList.remove("long_quote");
  }
  quoteText.textContent = newQuote.text;
  if (newQuote.author !== null) {
    quoteAuthor.textContent = newQuote.author;
  } else {
    quoteAuthor.textContent = "Anonymous";
  }
}

// get quotes from API
const getQuotes = async () => {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    setTextAndAuthor(newQuote());
  } catch (error) {}
};

// On load
getQuotes();

newQuoteButton.addEventListener("click", () => {
  setTextAndAuthor(newQuote());
});

setInterval(() => {
  setTextAndAuthor(newQuote());
}, 20000);
