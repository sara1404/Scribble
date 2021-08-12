
function openRoom() {
    let link = document.getElementById('link').innerHTML;
    let roundNumber = document.querySelector('#round-option').value;
    let roundTime = document.querySelector('#time-option').value;
    localStorage.setItem('link', link)
    fetch('http://localhost:3000/openroom', {
        method: 'POST',
        body:JSON.stringify({
            link,
            number: roundNumber,
            time: roundTime
        }),
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(data => data.json())
      .then((data) => {
        window.location.href = 'http://localhost:3000/privroom/' + link;
      });
    setLink(link);
}

    