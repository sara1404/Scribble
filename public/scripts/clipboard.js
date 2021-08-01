
function copyToClipboard() {
    var text = document.getElementById('linksobe').innerHTML;
    console.log(text);
    var input = document.body.appendChild(document.createElement("input"));
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
}