function price(a) {

    return data_batiments[a].basePrice * Math.pow(1.15, data_batiments[a].currentlvl)
}

function price10(a) {

    return data_batiments[a].basePrice * 20.303718238
}

function price100(a) {

    return data_batiments[a].basePrice * 7828749.671335188
}

function price_prevision10(a) {

    return (data_batiments[a].basePrice * (Math.pow(1.15, 10) - Math.pow(1.15, data_batiments[a].currentlvl))) / 0.15
}

function price_prevision100(a) {

    return (data_batiments[a].basePrice * (Math.pow(1.15, 100) - Math.pow(1.15, data_batiments[a].currentlvl))) / 0.15
}


// Upgrades functions

function upgrade_nova() {
    //Production rate of lumens x2
    product_increment = product_increment * 2;
    return product_increment
}

function upgrade_supernova() {
    product_increment = product_increment * 3;
    return product_increment
}

function upgrade_plasma_injector() {
    // sun decrease speed -10%, to call 3x
    decrease_speed += (decrease_speed * 30 / 10)
    return decrease_speed
}

function upgrade_star() {
    //Sun max intensity goes up by 10%
    star_color += 1;
    set_star_color();
    return max_light += max_light / 10
}

function upgrade_dblclick() {
    // A chaque click on utilise une variable multiplicateur qui évolue avec les upgrades
    return click_multiplicator = click_multiplicator * 2
}

function upgrade_clickpercent1() {
    // A chaque click on utilise une variable multiplicateur qui évolue avec les upgrades
    clickpercent_buyed = true;
    return product_percent_click = 100
}

function upgrade_clickpercent2() {
    // A chaque click on utilise une variable multiplicateur qui évolue avec les upgrades
    return product_percent_click = 50
}

function upgrade_minSunUp() {
    //Augmente le minimum d'énergie du soleil de 10 pts
    return min_light = min_light + 0.1;
}

function upgrade_rateUp() {
    //Taux de conversion +20%
    return convert_rate -= (convert_rate * 20) / 100
}
