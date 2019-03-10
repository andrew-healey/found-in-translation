const {
  input,
  output,
  run,
  number
} = document.translate;
const langs = Object.keys(languages);
const getLang = () => langs[Math.floor(Math.random() * langs.length)];
const API_URL = "https://translate.googleapis.com/translate_a/single";
async function getTranslate(currentLang, nextLang, sourceText) {
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
    if (!res || res.statusText !== "OK") {
      console.log(proxyFinder[0],"failed");
      proxyFinder.push(proxyFinder.shift());
    } else break;
  }
  if (!res || res.statusText !== "OK") return alert("Error--Google has blocked this bot for ~5 minutes because Google hates bots.");
  console.log(proxyFinder[0]);
  let json = await res.json();
  return json[0][0][0];
}
run.addEventListener("click", async () => {
  let currentLang = "en";
  let nextLang;
  let sourceText = input.value;
  for (i = 0; i < number.value; i++) {
    nextLang = getLang();
    sourceText = await getTranslate(currentLang, nextLang, sourceText);
    if (!sourceText) return;
    output.value = sourceText;
    currentLang = nextLang;
  }
  output.value = await getTranslate(currentLang, "en", sourceText);
});
