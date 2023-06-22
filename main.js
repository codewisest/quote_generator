let apiQuotes = [];
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteButton = document.getElementById("new_quote");
const twitterButton = document.getElementById("twitter");
const quoteNumberDOM = document.querySelector(".quote_number");
const quotesTotal = document.querySelector(".quotes_total");
const nextQuoteButton = document.getElementById("next");
const trackPreviousNumber = [];
const goToButton = document.getElementById("go_to");
const goToInput = document.getElementById("user_number");

let quoteNumberRandom;
// generate random number
function generateRandomNumber() {
  quoteNumberRandom = Math.floor(Math.random() * apiQuotes.length);
  return quoteNumberRandom;
}

function setTextAndAuthor(quoteNumber) {
  const quote = apiQuotes[Number(quoteNumber)];

  if (quote.text.length > 100) {
    quoteText.classList.add("long_quote");
  } else {
    quoteText.classList.remove("long_quote");
  }
  quoteText.textContent = quote.text;
  if (quote.author !== null) {
    quoteAuthor.textContent = quote.author;
  } else {
    quoteAuthor.textContent = "Anonymous";
  }
  previousQuoteTracker();

  setQuotesNumber();
  autoNewQuote();
  console.log(quoteNumberDOM.textContent);
}

function setQuotesNumber() {
  quoteNumberDOM.textContent = quoteNumberRandom;
}

function showTotalQuotes() {
  quotesTotal.textContent = apiQuotes.length;
}

function setNextQuotesNumber() {
  let quoteNumber = Number(quoteNumberDOM.textContent);
  setTextAndAuthor(quoteNumber++);

  quoteNumberDOM.textContent = quoteNumber;
}

function previousQuoteTracker() {
  let quoteNumber = Number(quoteNumberDOM.textContent);
  trackPreviousNumber.push(quoteNumber);
  console.log(trackPreviousNumber);
}

// get quotes from API
const getQuotes = async () => {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    setTextAndAuthor(generateRandomNumber());

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

// control timing for new quote
let quoteTimer;
function autoNewQuote() {
  const quoteNumber = generateRandomNumber();
  clearInterval(quoteTimer);
  quoteTimer = setInterval(() => {
    setTextAndAuthor(quoteNumber);
  }, 15000);
}

// EVENT LISTENERS
newQuoteButton.addEventListener("click", () => {
  const randomQuoteNumber = generateRandomNumber();
  // newQuote(randomQuoteNumber);
  setTextAndAuthor(randomQuoteNumber);
});

twitterButton.addEventListener("click", tweetQuote);

nextQuoteButton.addEventListener("click", () => {
  const ans = setNextQuotesNumber();
  console.log(ans);
});

goToButton.addEventListener("click", () => {
  let goToNumber = Number(goToInput.value);
  setTextAndAuthor(goToNumber);
  quoteNumberDOM.textContent = goToNumber;
});
