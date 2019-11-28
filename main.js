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

// variables used to calculate final score
var score = 0;
var count = 0;   // # of tests applied
var vtreport;   // virus total report
var submitbtn = document.getElementById("submitbtn");

// connect are report from google safe browsing api
function googleSafeBrowsingAPI(){

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

}
// virus total
// connect and report from VIRUS TOTAL API
function virusTotalAPI(){
  var urlinput = "https://www.hackthissite.org";
  URL = "https://www.virustotal.com/vtapi/v2/url/report?apikey=0d290ee2f641ce2e72eae2abf94b8032127818a185398d39e4a1379e9a1172fd&resource="+ urlinput;

  $.ajax({
  type: "GET",
  url: URL,
  success:
  //  console.log(JSON.stringify(data));
    //vsreport = data;
    reportToString
  ,
  dataType: "json",
  });

}

// vertify the website url is secure with https or not
function vertifyHttps(urllink){
  var result = 0;
  if (urllink.indexOf("https") == 0){
    result = 1;
  }

  return result;
}

// get website url the user entered on our website
function getuserURL(){
  var getText = document.getElementById("submitbtn").textContent;
  console.log(getText);
  return getText;
  // return url
}

// a function to print a report in a readable format
function printfyHead(){

  // create elements <table> and a <tbody>
  var table = document.getElementById("put");
  var row = document.createElement("tr");

  // put <table> in the <body>
  var cell = document.createElement("th");
  var cellText = document.createTextNode("Website Name");
  cell.appendChild(cellText);
  row.appendChild(cell);

  var cell2 = document.createElement("th");
  var cellText2 = document.createTextNode("Result");
  cell2.appendChild(cellText2);
  row.appendChild(cell2);

  //row2.appendChild(cell2);
  table.appendChild(row);
}

function printfyBody (val,key){
  // cells creation
  // table row creation
  // create element <td> and text node
  //Make text node the contents of <td> element
  // put <td> at end of the table row
  var table = document.getElementById("put");
  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cell2 = document.createElement("td");
  var cellText = document.createTextNode(key);
  cell.appendChild(cellText);
  row.appendChild(cell);
  var cellText2 = document.createTextNode(val)
  cell2.appendChild(cellText2);
  row.appendChild(cell2);
  //row added to end of table body
  table.appendChild(row);
}





//
function reportToString(data){
  var myJSON = data.scans;
  const keys = Object.keys(myJSON);
  var values = Object.values(myJSON);

 //document.getElementById("demo").innerHTML = keys;
 //  console.log(keys);
 printfyHead();
 for( k in keys){
    console.log(keys[k]);
    document.getElementById("demo").innerHTML = keys[k];
    var result = JSON.stringify(values[k]);
    result = result.replace(/\"/g, ""); // removes "}" and ' "" '
    result = result.replace(/\{|\}/g, "");
    console.log(result); // object type
    document.getElementById("demo2").innerHTML = result;
    printfyBody(result, keys[k]);
 }


 //const values = JSON.stringify(Object.values(myJSON));

// document.getElementById("demo2").innerHTML = values.replace(/\"([^(\")"]+)\":/g,"$1:");

 //var values = Object.values(myJSON);
 //console.log(Object.entries[values]);


}
// aplity api
// apikey 743fbefa-3674-49d0-98b3-a3fffda60657
function apilityCheck(){

  $.ajax({
        type: 'GET',
        url: "https://api.apility.net/baddomain/google.com",

        headers:{
              'X-Auth-Token':'743fbefa-3674-49d0-98b3-a3fffda60657',
              'Accept': 'application/json'
        },
        contentType: 'application/json',
        success: function(data){
            console.log(data);
            //process the JSON data etc
        }
});

}
// a main function to produce security report on a given url
function produceReport(){
  // this is were most functions are called
  var enteredUrl; // the url the user want to check for
  enteredUrl = getuserURL();

  vertifyHttps(enteredUrl);  // check if the url is http/s
  //googleSafeBrowsingAPI();
  virusTotalAPI();
  //printify();
}
// onclick listner
//submitbtn.addEventListener("click", getuserURL);

//THIS function removes the sample table based on a click
function myFunction() {
  document.getElementById("sample").style.display = "none";

}

// This function is supposed to get the url and start the producer report function

submitbtn.addEventListener("click", produceReport);

function clearTable()
{
 var tableRef = document.getElementById('put');
 while ( tableRef.rows.length > 0 )
 {
  tableRef.deleteRow(0);
 }
}
//produceReport();
//apilityCheck();

// things left to do
// when btn is clicked check url and print table
