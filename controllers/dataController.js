/*
    Niz koji prima objekat room ovakav { link, time, rounds , players }
    Funkcija za dodavanje u niz novog rooma function(objekat{link, time, rounds}), treba da pored ovih podataka, dodas i prazan niz igraca(players) i da tek onda pushas u niz podatke
    Funkcija za vracanje rooma po Idu(Ako ne postoji element, vratiti null)

    {
        link:'123',
        rounds: 123,
        time: 123
    }

    ==>
    {
        link:'room',
        rounds:123,
        time: 123,
        players: []
    }


    Funkcija za dodavanje novog igraca u sobu, funkcija prima id sobe i id igraca
    Funkcija za uklanjanje igraca iz sobe, funkcija prima id sobe i id igraca.
    Funkcije za dodavanje i vracanje igraca su boolean tipa, i samim tim vracaju true false u zavisnosti da li igrac postoji ili ne.
    Npr igrac postoji a hoces da ga dodas => false, igrac ne postoji a hoces da ga izbrises => false

    */

    module.exports = { funkcija }