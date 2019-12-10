//------------------------------------------------------------------\\
// project by 5 Little Bugs
// 2019 - Information security
// A web application that checks the security of a website using different-
// apis
//------------------------------------------------------------------\\

var submitbtn = document.getElementById("submitbtn");
var userURL = "";  // the url the user entered

// connect are report from google safe browsing api
function googleSafeBrowsingAPI(urllink){

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
      {"url": urllink}
    ]
  }
  });

  $.ajax({
  type: "POST",
  url: URL,
  data: DATA,
  success: function(data){
    // google api returns {} if the website is clean
      if(JSON.stringify(data) === "{}"){
        console.log(" Clean Website");
      }else{
        console.log(" Website registerd as unsafe by google");
      }
  }
  ,dataType: "json",
  contentType : "application/json"
  });

}


// virus total
// connect and report from VIRUS TOTAL API
function virusTotalAPI(urllink){
  URL = "https://www.virustotal.com/vtapi/v2/url/report?apikey=0d290ee2f641ce2e72eae2abf94b8032127818a185398d39e4a1379e9a1172fd&resource="+ urllink;

  $.ajax({
  type: "GET",
  url: URL,
  success:
    reportToString,
  dataType: "json",
  });

}

// works with virus total api to access and print values
function reportToString(data){
  var myJSON = data.scans;
  const keys = Object.keys(myJSON);
  var values = Object.values(myJSON);

 printfyHead();

 for( k in keys){
    console.log(keys[k]);
    var result = JSON.stringify(values[k]);
    result = result.replace(/\"/g, ""); // removes "}" and ' "" '
    result = result.replace(/\{|\}/g, "");
    console.log(result); // object type
    printfyBody(result, keys[k]);
 }

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
  var getText = document.getElementById("urluserenterd").value;
  //console.log(getText);
  return getText;
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

// reports data from apility check
function reportFromApilityCheck(data){
  let myJSON = data.response.ip.score;
  const keys = Object.keys(myJSON);

  console.log(JSON.stringify(myJSON));

}

// aplity api
// apikey 743fbefa-3674-49d0-98b3-a3fffda60657
// bad url to test "https://api.apility.net/baddomain/mailinator.com",
// good url to test
function apilityCheck(urllink){
  //remove http// and www. from the Website
  if (urllink.indexOf("https") == 0){
    urllink = urllink.substring(8,urllink.length);
    //console.log(urllink);
  }
  // remove if https
  if (urllink.indexOf("http") == 0){
    urllink = urllink.substring(7,urllink.length);
    //console.log(urllink);
  }
// remove www.
  if (urllink.indexOf("www.") == 0){
    urllink = urllink.substring(4,urllink.length);
    //console.log(urllink);
  }

  //remove last back slash
  if(urllink[urllink.length - 1] == "/"){
    urllink = urllink.substring(0,urllink.length - 1);
  }

  $.ajax({
        type: 'GET',
        url: "https://api.apility.net/baddomain/" + urllink,
        headers:{
              'X-Auth-Token':'743fbefa-3674-49d0-98b3-a3fffda60657',
              'Accept': 'application/json'
        },
        contentType: 'application/json',
        //error: function(jqXHR, textStatus, errorThrown) {
        //  alert("Please recheck your website url! ");
        //},
        success:
        // >= 0 values means the site is clean
          reportFromApilityCheck

});

}
//---------------------------------------------------\\
                // MAIN FUNCTION \\
//---------------------------------------------------\\
// a main function to produce security report on a given url
function produceReport(){
  // this is were most functions are called

  userURL = getuserURL();

  // add this into the website
  vertifyHttps(userURL);  // check if the url is http/s
  googleSafeBrowsingAPI(userURL);
  virusTotalAPI(userURL);
  apilityCheck(userURL);
}


//THIS function removes the sample table based on a click
function myFunction() {
  document.getElementById("sample").style.display = "none";

}

// when submit button is clicked to get the url and start the producer report function
submitbtn.addEventListener("click", produceReport);

function clearTable()
{
 var tableRef = document.getElementById('put');
 while ( tableRef.rows.length > 0 )
 {
  tableRef.deleteRow(0);
 }
}
