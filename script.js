const quoteContainter = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const TwitterBtn = document.getElementById("twitter");
const newQuotebtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const copyText = document.getElementById("copybtn");
let apiQuotes = [];

// loader
function loading() {
  loader.hidden = false;
  quoteContainter.hidden = true;
}

// complete loading

function complete() {
  quoteContainter.hidden = false;
  loader.hidden = true;
}

// Show Quotes

function newQuote() {
  loading();
  // Random quote picker
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   console.log(quote);

  // Exception case if author is blank

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //   For style handling of longer quotes
  if (quote.text.length > 80) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //   Hide loader and display quotes
  quoteText.textContent = quote.text;
  complete();
}

console.log("working");

// Get quotes from API

async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
    // Error  Here
  }
}

// Tweet button
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;

  window.open(twitterUrl, "_blank");
}

// Event listener
newQuotebtn.addEventListener("click", newQuote);
TwitterBtn.addEventListener("click", tweetQuote);
// copyText.addEventListener("click", copyclip);

// copy

// function copyclip() {
//   quoteText.select();
//   quoteText.setSelectionRange(0, 99999); /* For mobile devices */

//   /* Copy the text inside the text field */
//   document.execCommand("copy");

//   console.log("copied!");
// }

getQuotes();
