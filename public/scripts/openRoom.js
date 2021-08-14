
async function openRoom() {
    let link = document.getElementById('link').innerHTML;
    let roundNumber = document.querySelector('#round-option').value;
    let roundTime = document.querySelector('#time-option').value;
    localStorage.setItem('link', link)
    console.log('clicked');

    let res = await fetch('http://localhost:3000/openroom', {
        method: 'POST',
        body:JSON.stringify({
            link,
            number: roundNumber,
            time: roundTime
        }),
        headers: {
            'Content-Type': 'application/json'
        },

    });

    let result = await res.json();
    if(res.status == 200) {
        alert('Succesfully registered room!');
        window.location.href = 'http://localhost:3000/privroom/admin/' + link;
    } else if(result.status == 401) {
        alert('Room alredy exists, try generating new link!');
    } else {
        console.log(result.status);
    }
   
}

    