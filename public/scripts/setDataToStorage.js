function saveUsernameToStorage() {
    let input = document.getElementById('inp');
    if(input.value.trim() == '') {
        console.log('You should enter a name');
        return;
    }
    localStorage.setItem('username', input.value);
    localStorage.setItem('admin', true);
    window.location.href = 'http://localhost:3000/privroom';
}


function saveUsernameAndRedirectToMainPage() {
    let input = document.getElementById('inp');
    if(input.value.trim() == '') {
        console.log('You should enter a name');
        return;
    }
    localStorage.setItem('username', input.value);
    localStorage.setItem('admin', false);
    window.location.href += '/canvas';
}