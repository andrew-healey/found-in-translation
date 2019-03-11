let makeCorsProxy = proxy => url => "https://" + proxy + ".herokuapp.com/" + url;
let proxyFinder = [(url => url), "corsanywhere", "corsany-where"];
for (let i = 0; i < 4; i++) {
  let whichCor = ['cors', 'c-o-r-s'][i % 2];
  let whichAny = ['anywhere', 'any-where'][Math.floor(i / 2) % 2];
  proxyFinder = proxyFinder.concat([whichCor + "-" + whichAny, whichAny + "-" + whichCor]);
}
  /*
for (url of proxyFinder) {
  let hey = typeof url === "string" ? "https://" + url + ".herokuapp.com" : url("");
  fetch(hey, {
    mode: 'cors'
  }).catch(err => console.log("resulted in error", url));
}
*/
