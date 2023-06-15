let apiQuotes = [];
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteButton = document.getElementById("new_quote");
const twitterButton = document.getElementById("twitter");
const quoteNumberDOM = document.querySelector(".quote_number");
const quotesTotal = document.querySelector(".quotes_total");
const nextQuoteButton = document.getElementById("next");

let quoteNumberRandom;
// generate random number
function generateRandomNumber() {
  quoteNumberRandom = Math.floor(Math.random() * apiQuotes.length);
  return quoteNumberRandom;
}
// get new quote
function newQuote(quoteNumber) {
  // pick random quote from api quotes array
  const quote = apiQuotes[Number(quoteNumber)];
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

function nextQuoteNumber() {
  let quoteNumber = Number(quoteNumberDOM.textContent);
  setTextAndAuthor(newQuote(quoteNumber++));
  console.log(quoteNumber);
  return quoteNumber;
}

function setNextQuotesNumber() {
  quoteNumberDOM.textContent = nextQuoteNumber();
}

// get quotes from API
const getQuotes = async () => {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    setTextAndAuthor(newQuote(generateRandomNumber()));
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
  const randomQuoteNumber = generateRandomNumber();
  // newQuote(randomQuoteNumber);
  setTextAndAuthor(newQuote(randomQuoteNumber));
  autoNewQuote();
});

twitterButton.addEventListener("click", tweetQuote);

nextQuoteButton.addEventListener("click", () => {
  const ans = setNextQuotesNumber();
  console.log(ans);
});

// control timing for new quote
let quoteTimer;
function autoNewQuote() {
  clearInterval(quoteTimer);
  quoteTimer = setInterval(() => {
    setTextAndAuthor(newQuote());
  }, 20000);
}
