const lik = document.getElementById('lik');
const desnaStrelica = document.getElementById('desna-strelica');
const levaStrelica = document.getElementById('leva-strelica');
const likovi = ['../imgs/likZensko.png', '../imgs/likMusko.png'];
let brojac = 0;

let listener = () => { 
    if(brojac % 2 == 0) { 
        lik.src = likovi[1];
        brojac++;
    } else {
        lik.src = likovi[0];
        brojac = 0;
    }
}

levaStrelica.addEventListener('click', listener);
desnaStrelica.addEventListener('click', listener);








