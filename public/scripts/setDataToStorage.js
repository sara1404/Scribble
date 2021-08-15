function saveUsernameToStorage() {
    let input = document.getElementById('inp');
    if(input.value.trim() == '') {
        console.log('You should enter a name');
        return;
    }
    localStorage.setItem('username', input.value);
    localStorage.setItem('admin', true);
    saveImageSrcToStorage();
    window.location.href = 'http://localhost:3000/privroom';
}

function saveImageSrcToStorage() {
    let img = document.getElementById('lik');
    localStorage.setItem('img', img.currentSrc);

}

function saveUsernameAndRedirectToMainPage() {
    let input = document.getElementById('inp');
    if(input.value.trim() == '') {
        console.log('You should enter a name');
        return;
    }
    localStorage.setItem('username', input.value);
    localStorage.setItem('admin', false);
    saveImageSrcToStorage();
    window.location.href += '/canvas';
}
