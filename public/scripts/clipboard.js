
function copyToClipboard(linkElementId) {
    console.log(linkElementId);
    var text = document.getElementById(linkElementId).innerHTML;
    var input = document.body.appendChild(document.createElement("input"));
    input.value = document.URL + '/' + text;
    console.log(input.value);
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    
    //show snackbar
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
