$(document).ready(function() {
  console.log("ready");
  setLinks();
});

function setLinks() {
  // Override Parent  URLs in Bloom display (in properties) to show "Show Data" instead of the URL
  $(document).arrive("a[href*='srcdoc']", function(newElem) {
    newElem.setAttribute("onclick","parent.postMessage({'type':'InternalUrl','dest':'View','url':'" + newElem.getAttribute('href').replaceAll(' ','+') +"'},'*'); return false;");
    newElem.innerHTML = "Show Document View";  
  });
   
  // Override Sourcing URLs in Bloom display (in properties) to show 'Show Sourcing' instead of the URL
  $(document).arrive("a[href*='Sourcing']", function(newElem) {
    newElem.setAttribute("onclick","parent.postMessage({'type':'InternalUrl','dest':'Bloom','url':'" + newElem.getAttribute('href').replaceAll(' ','+') +"'},'*'); return false;");
    newElem.innerHTML = "Show Sourcing";  
  });
}
