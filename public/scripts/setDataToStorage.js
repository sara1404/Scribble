function saveUsernameToStorage() {
    let input = document.getElementById('inp');
    localStorage.setItem('username', input.value);
    window.location.href = 'http://localhost:3000/privroom';
}