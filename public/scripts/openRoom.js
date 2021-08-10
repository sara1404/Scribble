function openRoom() {
    let link = document.getElementById('link').innerHTML;
    localStorage.setItem('link', link)
    window.location.href = 'http://localhost:3000/privroom/' + link;
}