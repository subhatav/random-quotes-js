const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".name");

const speechButton = document.querySelector(".speech");
const copyButton = document.querySelector(".copy");
const twitterButton = document.querySelector(".twitter");

const quoteButton = document.querySelector("button");

function fetchRandomQuote() {

  quoteButton.classList.add("loading");
  quoteButton.innerText = "Loading the Quote...";

  fetch("https://api.quotable.io/random").then(response => response.json())
                                         .then(result => {

      quoteText.innerText = result.content;
      authorName.innerText = result.author;

      quoteButton.classList.remove("loading");
      quoteButton.innerText = "Fetch new Quote";
    });
}

speechButton.addEventListener("click", () => {

  const voiceSynthesizer = speechSynthesis;

  if (!quoteButton.classList.contains("loading")) {

    const quotation = `${quoteText.innerText} by ${authorName.innerText}`;

    voiceSynthesizer.speak(new SpeechSynthesisUtterance(quotation));

    setInterval(() => {

      !voiceSynthesizer.speaking ? speechButton.classList.remove("active")
                                 : speechButton.classList.add("active");
    }, 10);
  }
});

copyButton.addEventListener("click", () => {

  navigator.clipboard.writeText(quoteText.innerText);
});

twitterButton.addEventListener("click", () => {

  window.open(`https://twitter.com/intent/tweet?url=${quoteText.innerText}`, "_blank");
});

quoteButton.addEventListener("click", fetchRandomQuote);