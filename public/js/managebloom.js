// Requires the arrive.js library and jquery
var loadScript = function(url, cb) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  script.onreadystatechange = setArr;
  script.onload = setArr;
  head.appendChild(script);
}

// load arrive library
loadScript ('/js/arrive.min.js', setArr);

$(document).ready(function() {
  console.log("ready");
});


function printAncestor (el) {
  while (el = el.parentElement) console.log(el);
}

function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
 return el;
}

/**
 * tune bloom for interaction.
 */
function setArr() {
  //$(document).arrive("a[href*='srcdoc']", function(newElem) {
  // Override Parent  URLs in Bloom display (in properties) to show "Show Data" instead of the URL
  $(document).arrive("a[href*='srcdoc']", function(newElem) {
    console.log("newElem",newElem);
    printAncestor(newElem);
    newElem.setAttribute("onclick","parent.postMessage({'type':'InternalUrl','dest':'View','url':'" + newElem.getAttribute('href').replaceAll(' ','+') +"'},'*'); return false;");
    newElem.innerHTML = "Show Document View";  
  });
   
  // Override Sourcing URLs in Bloom display (in properties) to show 'Show Sourcing' instead of the URL
  $(document).arrive("a[href*='Sourcing']", function(newElem) {
    newElem.setAttribute("onclick","parent.postMessage({'type':'InternalUrl','dest':'Bloom','url':'" + newElem.getAttribute('href').replaceAll(' ','+') +"'},'*'); return false;");
    newElem.innerHTML = "Show Sourcing";  
  });
}
