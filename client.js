const {
  input,
  output,
  run,
  number
} = document.translate;
const header=document.getElementById("header");
const langs = Object.keys(languages);
const getLang = () => langs[Math.floor(Math.random() * langs.length)];
const API_URL = "https://translate.googleapis.com/translate_a/single";
async function getTranslate(currentLang, nextLang, sourceText, doAlert = true) {
  let url = API_URL + "?client=gtx&sl=" + currentLang + "&tl=" + nextLang + "&dt=t&q=" + encodeURIComponent(sourceText);
  let res;
  let toReq;
  for (let i = 0; i < proxyFinder.length; i++) {
    toReq = proxyFinder[0](url);
    try {
      res = await fetch(toReq, {
        mode: 'cors'
      });
    } catch (err) {
      res = undefined;
    }
    if (!res || !res.ok) {
      proxyFinder.push(proxyFinder.shift());
    } else break;
  }
  if (!res || res.statusText !== "OK") return doAlert ? alert("Error--Google has blocked this bot for ~5 minutes because Google hates bots.") : false;
  let json = await res.json();
  return json[0][0][0];
}
run.addEventListener("click", async () => {
  let currentLang = "en";
  let nextLang;
  let sourceText = input.value;
  fetch("https://log.426729.repl.co").catch(err => {});
  for (i = 0; i < number.value; i++) {
    nextLang = getLang();
    sourceText = await getTranslate(currentLang, nextLang, sourceText);
    if (!sourceText) return;
    output.value = sourceText;
    currentLang = nextLang;
  }
  output.value = await getTranslate(currentLang, "en", sourceText);
});
setTimeout(async () => {
  let currentLang = "en";
  let nextLang;
  let sourceText = header.innerText;
  for (i = 0; i < 10; i++) {
    nextLang = getLang();
    sourceText = await getTranslate(currentLang, nextLang, sourceText, false);
    if (!sourceText) {
      header.innerText="The toy killing ideas.";
      return;
    }
    header.innerText = sourceText;
    currentLang = nextLang;
  }
  header.innerText = await getTranslate(currentLang, "en", sourceText);
}, 3000);
