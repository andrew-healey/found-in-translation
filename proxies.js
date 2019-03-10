let makeCorsProxy=proxy=>url=>"https://"+proxy+".herokuapp.com/"+url;
let proxyFinder = [(url => url), makeCorsProxy("cors-anywhere"), makeCorsProxy("corsanywhere"),makeCorsProxy("cors-any-where"),makeCorsProxy("corsany-where"),makeCorsProxy("anywhere-cors"),makeCorsProxy("c-o-r-s-anywhere"),makeCorsProxy("any-where-cors")];
