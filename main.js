// steps

// connect html and js
// connect to the internet
  // make js understand html button click
//  when scan button is clicked
  // show if the inpt is not valid website
  // get website url as string fron the input tab
  // check if the stirng is a website using REG EXP
      // http_or_https_checker() method
  // once we get the string url check for http and https
    // add the result to the report table
  // show loading buffer while the report is prossesed
  // check each api
      // google security check
      // sql api
      // ssl api
      // more and
// show the report in the page
// downlodable report function


URL = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyCGvM7QqPCQPLKBIMaODssyWLqRNjNyJiA";
DATA = JSON.stringify({
"client": {
  "clientId":      "kebsafe",
  "clientVersion": "0.0.1"
},
"threatInfo": {
  "threatTypes":      ["MALWARE", "SOCIAL_ENGINEERING"],
  "platformTypes":    ["WINDOWS"],
  "threatEntryTypes": ["URL"],
  "threatEntries": [
    {"url": "http://www.urltocheck1.org/"},
    {"url": "http://www.urltocheck2.org/"},
    {"url": "http://www.urltocheck3.com/"}
  ]
}
});

$.ajax({
type: "POST",
url: URL,
data: DATA,
success: data => console.log(JSON.stringify(data)),
dataType: "json",
contentType : "application/json"
});


// ------------------------------------------------------------------------------------------
// virus total
//0d290ee2f641ce2e72eae2abf94b8032127818a185398d39e4a1379e9a1172fd
// var url = "https://www.virustotal.com/vtapi/v2/url/scan";
// var params = JSON.stringify({'apikey': '0d290ee2f641ce2e72eae2abf94b8032127818a185398d39e4a1379e9a1172fd', 'url':"https://www.hackthissite.org"});
// var xhr = new XMLHttpRequest();
// xhr.open("POST", url, true);
//
// //Send the proper header information along with the request
// //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//
// xhr.send(params);


// ---------------------------------

// var url = "https://www.virustotal.com/vtapi/v2/url/report";
// var params = JSON.stringify({'apikey': '0d290ee2f641ce2e72eae2abf94b8032127818a185398d39e4a1379e9a1172fd', 'resource':'https://www.hackthissite.org'});
// var xhr = new XMLHttpRequest();
// xhr.open("GET", url, true);
//
// //Send the proper header information along with the request
// //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
// //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//
// xhr.send(null);
//----------------------------------------------




var urlinput = "https://www.hackthissite.org";
URL = "https://www.virustotal.com/vtapi/v2/url/report?apikey=0d290ee2f641ce2e72eae2abf94b8032127818a185398d39e4a1379e9a1172fd&resource="+ urlinput;

$.ajax({
type: "GET",
url: URL,
success: data => console.log(JSON.stringify(data)),
dataType: "json",
});
