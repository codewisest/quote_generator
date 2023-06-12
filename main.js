let apiQuotes = [];
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteButton = document.getElementById("new_quote");
const twitterButton = document.getElementById("twitter");
const quoteNumberDOM = document.querySelector(".quote_number");
const quotesTotal = document.querySelector(".quotes_total");
let quoteNumberRandom;
// generate random number
function generateRandomNumber() {
  quoteNumberRandom = Math.floor(Math.random() * apiQuotes.length);
  return quoteNumberRandom;
}
// get new quote
function newQuote() {
  // pick random quote from api quotes array

  const quote = apiQuotes[generateRandomNumber()];
  setQuotesNumber();
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

function setQuotesNumber() {
  quoteNumberDOM.textContent = quoteNumberRandom;
}

function showTotalQuotes() {
  quotesTotal.textContent = apiQuotes.length;
}

// get quotes from API
const getQuotes = async () => {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    setTextAndAuthor(newQuote());
    setQuotesNumber();
    showTotalQuotes();
  } catch (error) {}
};

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "blank");
}
// On load
getQuotes();

newQuoteButton.addEventListener("click", () => {
  setTextAndAuthor(newQuote());
  autoNewQuote();
});

twitterButton.addEventListener("click", tweetQuote);

// control timing for new quote
let quoteTimer;
function autoNewQuote() {
  clearInterval(quoteTimer);
  quoteTimer = setInterval(() => {
    setTextAndAuthor(newQuote());
  }, 20000);
}
