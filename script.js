/* Een lijst met de icoontjes van de Clickers. */
clickerIcons = [
    "https://pngimg.com/uploads/chef/chef_PNG54.png",
    "https://img.favpng.com/9/7/16/clip-art-restaurant-vector-graphics-illustration-building-png-favpng-anqXKNQTViWvfD0E4E2PrxtkE.jpg",
    "https://inqar.nl/files/upload/Grijs%20Kenteken/Mercedes-Benz-Sprinter-311-CDI-L2.png",
    "https://img2.gratispng.com/20180723/btg/kisspng-google-logo-google-search-google-images-g-suite-google-adwords-5b5695e47fdc94.0743248315324011245237.jpg",
    "https://www.thuisbezorgd.nl/images/logo/square_logo.png"
]

/* === De volgende functies beïnvloeden het uiterlijk van de pagina. === */

/* Voeg een nieuw icoontje toe aan de lijst met Actieve Clickers van tier tier */
function voegActieveClickerToe(tier) {
    const actieveClickerDiv = document.getElementById("actieveClickers")
    const tierDiv = actieveClickerDiv.getElementsByClassName("tier" + tier)[0]

    const afbeelding = document.createElement("img")
    afbeelding.src = clickerIcons[tier]
    afbeelding.className = "icon"

    tierDiv.appendChild(afbeelding)
}

/* Verander het geld bedrag dat op de pagina word weergegeven naar hoeveelheid. */
function updateGeld(hoeveelheid) {
    const geldH2 = document.getElementById("geld")

    geldH2.innerText = "Geld: " + hoeveelheid + "$"
}

/* Verander het geld per seconde bedrag dat op de pagina word weergegeven naar hoeveelheid. */
function updateGeldPerSeconde(hoeveelheid) {
    const geldPerSecondeH2 = document.getElementById("geldPerSeconde")

    geldPerSecondeH2.innerText = "Geld per seconde: " + hoeveelheid + "$"
}

/* Verwijder de Powerup voor tier tier uit de lijst. */
function verwijderPowerup(tier) {
    const powerupDiv = document.getElementById("powerupWinkel")
    const tierDiv = powerupDiv.getElementsByClassName("tier" + tier)[0]

    tierDiv.remove()
}

/* === Vanaf hier focussen we op de functionaliteit! === */

/* Zet alle variabelen die je nodig hebt hier. */

/* Voegt 1$ toe en update de pagina */
let geld = 0
function onClickCookie() {
    geld = geld + 1


    updateGeld(geld)
}

/* Berekent het geld dat de Clickers genereren per seconde. */
const aantalClickerTiers = 5

const clickerInkomsten = [1, 20, 40, 75, 250]

function berekenGeldPerSeconde() {
    let totaal = 0

    for (let tier = 0; tier < aantalClickerTiers; tier++) {
        const inkomsten = clickerInkomsten[tier]
        const aantal = aantalClickers[tier]
        totaal += inkomsten * aantal
    }

    return totaal
}

/* Koopt een Powerup, mits hier geld voor is en de powerup nog niet gekocht is. Update de pagina. */
const powerupKosten = [100, 1000, 5000, 10000, 100000]
const beschikbarePowerups = [true, true, true, true, true]

function koopPowerup(tier) {
    if (beschikbarePowerups[tier] == false) {
        return
    }
    if (geld < powerupKosten[tier]) {
        return
    }

    beschikbarePowerups[tier] = false;
    geld = geld - powerupKosten[tier]
    clickerInkomsten[tier] = clickerInkomsten[tier] * 2

    verwijderPowerup(tier)
    updateGeldPerSeconde(berekenGeldPerSeconde())
    updateGeld(geld)
}

/* Koopt een Clicker, mits hier geld voor is en er nog ruimte is. Update de pagina. */
const aantalClickers = [0, 0, 0, 0, 0]
const clickerKosten = [10, 1000, 5000, 10000, 100000]

let maxAantalClickers = 20

function koopClicker(tier) {
    if (aantalClickers[tier] >= maxAantalClickers) {
        return
    }
    if (geld < clickerKosten[tier]) {
        return
    }

    geld = geld - clickerKosten[tier]
    aantalClickers[tier] = aantalClickers[tier] + 1

    voegActieveClickerToe(tier)
    updateGeldPerSeconde(berekenGeldPerSeconde())
    updateGeld(geld)
}

/* Voegt het geld van de Clickers toe aan het geld. Update de pagina. */
function updateClickerGeld() {
    geld = geld + berekenGeldPerSeconde()

    updateGeld(geld)
}

/* Zorgt dat updateClickerGeld elke seconde activeert. */
setInterval(updateClickerGeld, 1000)

