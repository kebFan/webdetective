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

  //API_KEY: "AIzaSyCGvM7QqPCQPLKBIMaODssyWLqRNjNyJiA",

  URL = "https://www.hackthissite.org"
  DATA = JSON.stringify({
    "client": {
      "clientId":      "kebsafe",
      "clientVersion": "1.5.2"
    },
    "threatInfo": {
      "threatTypes":      ["MALWARE", "SOCIAL_ENGINEERING"],
      "platformTypes":    ["WINDOWS"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [{"url": "http://www.urltocheck1.org/"}]
    }
  })

  $.ajax({
    type: "POST",
    url: URL,
    data: DATA,
    success: data => alert(JSON.stringify(data)),
    dataType: "json",
    contentType : "application/json"
  });
