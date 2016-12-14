var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

function changeResolution(canvas, scaleFactor) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Set up CSS size if it's not set up already
    if (!canvas.style.width)
        canvas.style.width = canvas.width + 'px';
    if (!canvas.style.height)
        canvas.style.height = canvas.height + 'px';

    canvas.width = Math.ceil(canvas.width * scaleFactor);
    canvas.height = Math.ceil(canvas.height * scaleFactor);
    var ctx = canvas.getContext('2d');
    ctx.scale(scaleFactor, scaleFactor);
}
changeResolution(canvas, 2);

var click = document.querySelector('.moon');
var html_lumen = document.querySelector('.lumen');
var html_light = document.querySelector('.light');
var html_unleash = document.querySelector('.unleash');
var html_illumination = document.querySelector('.illumination');
var html_batiments_list = document.querySelector('.batiments ul');
var html_upgrades_list = document.querySelector('.upgrades ul');
var html_news_list = document.querySelector('.news ul');
var html_galaxy = document.querySelector('.galaxy');
var batiments_on_galaxy = [];
var array;
var html_news_list_li;
var timer;
var light = 0.1;
var min_light = 0.1;
var max_light = 1;
var need = 10;
var decrease_light = 100;
var decrease_speed = 400;
var lumen = 0;
var illumination = 9;
var product_ratio = 1;
var product_increment = 1;
var lvl_increment = 1;
var product_interval = 1000;
var click_state = false;
var click_state_time = 0;
var decrease = false;
var max_lumen = 500;
var convert_rate = 10;
var mooners_nbr;
var mooners_ratio;
var capa_lumen_max;
var nebula;
var cx = 150;
var cy = 150;
var radius = 250;
var last_increment_lvl = 0;

var click_multiplicator = 1;
var product_percent_click = 1;
var clickpercent_buyed = false;


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


for (i = 0; i < data_batiments.length; i++) {
    html_batiments_list.innerHTML += '<li><div class="infos"><span class="id"></span><span class="price"></span><span class="content"></span></div><div class="desc"><span class="buy">buy_</span><span class="price"></span></div></li>'
}
for (i = 0; i < data_upgrades_lumen.length; i++) {
    html_upgrades_list.innerHTML += '<li><div class="infos"><img class="icons" src="" alt=""><span class="id"></span><span class="price"></span><span class="content"></span></div><div class="desc"><span class="buy">buy_</span><span class="price"></span></div></li>'
}

setInterval(function() {
    var string = data_News[getRandomNumber(0, data_News.length)].content;
    array = string.split("");
    html_news_list.innerHTML += '<li></li>';
    html_news_list_li = document.querySelectorAll('.news ul li');
    frameLooper();
}, 60000);


function frameLooper(place) {
    if (array.length > 0) {
        html_news_list_li[html_news_list_li.length - 1].innerHTML += array.shift();
    } else {
        clearTimeout(timer);
    }
    timer = setTimeout('frameLooper()', 100); /* change 70 for speed */
}




var upgrades_tab = {};


upgrades_tab.batiments = document.querySelectorAll('.batiments ul li');

upgrades_tab.upgrades = document.querySelectorAll('.upgrades ul li');


for (i = 0; i < upgrades_tab.batiments.length; i++) {
    upgrades_tab.batiments[i].name = upgrades_tab.batiments[i].querySelector('.id');
    upgrades_tab.batiments[i].price = upgrades_tab.batiments[i].querySelectorAll('.price');
    upgrades_tab.batiments[i].content = upgrades_tab.batiments[i].querySelector('.content');
    upgrades_tab.batiments[i].setAttribute('data-id', i);
    upgrades_tab.batiments[i].data_id = upgrades_tab.batiments[i].getAttribute('data-id');
    upgrades_tab.batiments[i].desc = upgrades_tab.batiments[i].querySelector('.desc');
}
for (i = 0; i < upgrades_tab.upgrades.length; i++) {
    upgrades_tab.upgrades[i].name = upgrades_tab.upgrades[i].querySelector('.id');
    upgrades_tab.upgrades[i].price = upgrades_tab.upgrades[i].querySelectorAll('.price');
    upgrades_tab.upgrades[i].content = upgrades_tab.upgrades[i].querySelector('.content');
    upgrades_tab.upgrades[i].icons = upgrades_tab.upgrades[i].querySelector('.icons');
    upgrades_tab.upgrades[i].setAttribute('data-id', i);
    upgrades_tab.upgrades[i].data_id = upgrades_tab.upgrades[i].getAttribute('data-id');
    upgrades_tab.upgrades[i].desc = upgrades_tab.upgrades[i].querySelector('.desc');
}


// Prevent DOUBLE CLICK -> SELECT
document.addEventListener('mousedown', function(e) {
    e.preventDefault();
}, false);


// Click for Light
click.addEventListener('click', function() {
    click_state = false;
    click_state_time = 0;
    decrease = false;
    if (lumen < max_lumen) {
        if (clickpercent_buyed == true) {
            lumen += (click_multiplicator * (product_increment / product_percent_click) * light);
        } else {
            lumen += click_multiplicator * light;
        }

    }
    if (light < max_light) {
        light += 0.02;
    }
    click_state = true;
});



// Decrease Light
function decrease_the_light() {
    if (decrease == true) {
        if (click.style.opacity > min_light) {
            click.style.opacity -= 1 / decrease_light;
            light -= 1 / decrease_light;
        }
    }
    window.setTimeout(decrease_the_light, decrease_speed);
}
decrease_the_light();


// Product lumen 
setInterval(function() {
    if (lumen < max_lumen) {
        lumen += (product_increment) * light;
    }
}, product_interval);

// Convert lumen to illumination
html_unleash.addEventListener('click', function() {
    illumination += Math.floor(Math.round(lumen / convert_rate));
    lumen = 0;
})



function start() {
    window.requestAnimationFrame(start);
    if (click_state == true) { // WHEN STOP CLICKING
        click_state_time++;
        if (click_state_time > 100) {
            decrease = true;
        }
    }

    click.style.opacity = light; // CHANGE OPACITY

    // WRITE IN HTML 
    html_lumen.innerHTML = 'Lumen : ' + Math.round(lumen) + '/' + max_lumen;
    html_light.innerHTML = 'Performance : ' + Math.round(light * 100) + '%';
    html_illumination.innerHTML = 'Illumination : ' + Math.round(illumination) + ' ill';
    if (lumen > max_lumen) {
        lumen = max_lumen;
    }
    if (light > max_light) {
        light = max_light;
    }
    // draw_batiments(data_batiments[1].galaxyWidth, data_batiments[1].galaxyColor);
    redraw();
}
redraw_on_buy();
start();

function progressive_increment() {

}

// UPGRADES 


for (i = 0; i < upgrades_tab.batiments.length; i++) {
    upgrades_tab.batiments[i].addEventListener('click', function() {

        if (illumination >= data_batiments[this.data_id].basePrice) {
            data_batiments[this.data_id].currentlvl++;
            if ((data_batiments[this.data_id].currentlvl == 5) || (data_batiments[this.data_id].currentlvl == 10) || (data_batiments[this.data_id].currentlvl == 25) || (data_batiments[this.data_id].currentlvl == 50)) {
                product_increment += data_batiments[this.data_id].lumenS * data_batiments[this.data_id].currentlvl
                lvl_increment = lvl_increment * 2;
                last_increment_lvl = data_batiments[this.data_id].currentlvl;
            } else if ((data_batiments[this.data_id].currentlvl >= 50) && (data_batiments[this.data_id].currentlvl == last_increment_lvl + 50)) {
                product_increment += data_batiments[this.data_id].lumenS * data_batiments[this.data_id].currentlvl
                lvl_increment = lvl_increment * 2;
                last_increment_lvl = data_batiments[this.data_id].currentlvl;
            }

            product_increment += (data_batiments[this.data_id].lumenS * lvl_increment);
            illumination -= data_batiments[this.data_id].basePrice;
            data_batiments[this.data_id].basePrice = price(this.data_id);
            draw_batiments(data_batiments[this.data_id].galaxyWidth, data_batiments[this.data_id].galaxyColor);
            redraw_on_buy();
        }


    }, false);
}

function redraw() {
    for (i = 0; i < upgrades_tab.batiments.length; i++) {
        if (illumination >= data_batiments[i].basePrice) {
            upgrades_tab.batiments[i].style.color = "#fff";
            upgrades_tab.batiments[i].desc.style.display = "block";
        } else {
            upgrades_tab.batiments[i].style.color = "#727272"
            upgrades_tab.batiments[i].desc.style.display = "none";
        }
    }
    for (i = 0; i < upgrades_tab.upgrades.length; i++) {
        if (illumination >= data_upgrades_lumen[i].upgradePrice) {
            upgrades_tab.upgrades[i].style.color = "#fff";
            upgrades_tab.upgrades[i].desc.style.display = "block";
        } else {
            upgrades_tab.upgrades[i].style.color = "#727272"
            upgrades_tab.upgrades[i].desc.style.display = "none";
        }
    }
}

function redraw_on_buy() {
    for (i = 0; i < upgrades_tab.batiments.length; i++) { // GET JSON DATA
        if (illumination >= data_batiments[i].basePrice) {
            upgrades_tab.batiments[i].style.color = "#fff";
            upgrades_tab.batiments[i].desc.style.display = "block";
        } else {
            upgrades_tab.batiments[i].style.color = "#727272"
            upgrades_tab.batiments[i].desc.style.display = "none";
        }
        upgrades_tab.batiments[i].name.innerHTML = data_batiments[i].id;
        for (n = 0; n < upgrades_tab.batiments[i].price.length; n++) {
            upgrades_tab.batiments[i].price[n].innerHTML = '<span class="price_number">' + data_batiments[i].basePrice + '</span> ill';
        }
        upgrades_tab.batiments[i].content.innerHTML = data_batiments[i].content;
    }
    for (i = 0; i < upgrades_tab.upgrades.length; i++) { // GET JSON DATA
        if (illumination >= data_upgrades_lumen[i].upgradePrice) {
            upgrades_tab.upgrades[i].style.color = "#fff";
            // upgrades_tab.upgrades[i].desc.style.display = "none";
        } else {
            upgrades_tab.upgrades[i].style.color = "#727272"
                // upgrades_tab.upgrades[i].desc.style.display = "block";
        }
        upgrades_tab.upgrades[i].name.innerHTML = data_upgrades_lumen[i].id;
        for (n = 0; n < upgrades_tab.upgrades[n].price.length; n++) {
            upgrades_tab.upgrades[i].price[n].innerHTML = '<span class="price_number">' + data_upgrades_lumen[i].upgradePrice + '</span> ill';
        }
        upgrades_tab.upgrades[i].content.innerHTML = data_upgrades_lumen[i].content;
        upgrades_tab.upgrades[i].icons.src = data_upgrades_lumen[i].img;

        if (data_upgrades_lumen[i].id == "Nova") {
            upgrades_tab.upgrades[i].style.display = "block";
        } else if (data_upgrades_lumen[i].id == "Plasma Injector I") {
            upgrades_tab.upgrades[i].style.display = "block";
        } else if (data_upgrades_lumen[i].id == "Yellow star") {
            upgrades_tab.upgrades[i].style.display = "block";
        } else if (data_upgrades_lumen[i].id == "Hydrogen Isotopes") {
            upgrades_tab.upgrades[i].style.display = "block";
        } else if (data_upgrades_lumen[i].id == "Condensators") {
            upgrades_tab.upgrades[i].style.display = "block";
        } else if (data_upgrades_lumen[i].id == "Illumination I") {

        }
    }
}




function draw_batiments(width, color) {
    var new_batiment = {};
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * radius * radius;
    new_batiment.x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle) + (canvas.width / 4);
    new_batiment.y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle) + (canvas.height / 4);


    new_batiment.width = width;
    new_batiment.color = color;
    batiments_on_galaxy.push(new_batiment);
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < batiments_on_galaxy.length; i++) {
        context.beginPath();
        context.arc(batiments_on_galaxy[i].x, batiments_on_galaxy[i].y, batiments_on_galaxy[i].width, 0, Math.PI * 2);
        context.fillStyle = batiments_on_galaxy[i].color;
        context.fill();
    }
}



// UPGRADES CLICK 
for (i = 0; i < upgrades_tab.upgrades.length; i++) {
    upgrades_tab.upgrades[i].addEventListener('click', function() {
        if (illumination >= data_upgrades_lumen[this.data_id].upgradePrice) {
            illumination -= data_upgrades_lumen[this.data_id].upgradePrice;
            if (data_upgrades_lumen[this.data_id].id == "Nova") {
                upgrade_nova();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Supernova") {
                upgrade_supernova();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Plasma Injector I") {
                upgrade_plasma_injector();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Plasma Injector II") {
                upgrade_plasma_injector();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Plasma Injector III") {
                upgrade_plasma_injector();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
            } else if (data_upgrades_lumen[this.data_id].id == "Yellow star") {
                for (i = 0; i < 1; i++) {
                    upgrade_star();
                }
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Orange star") {
                for (i = 0; i < 2; i++) {
                    upgrade_star();
                }
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Blue star") {
                for (i = 0; i < 3; i++) {
                    upgrade_star();
                }
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Purple star") {
                for (i = 0; i < 5; i++) {
                    upgrade_star();
                }
                upgrades_tab.upgrades[this.data_id].style.display = "none";
            } else if (data_upgrades_lumen[this.data_id].id == "Hydrogen Isotopes") {
                upgrade_dblclick();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Helium Isotopes") {
                upgrade_dblclick();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Carbon Isotopes") {
                upgrade_clickpercent1();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Neon Isotopes") {
                upgrade_clickpercent2();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
            } else if (data_upgrades_lumen[this.data_id].id == "Condensators") {
                upgrade_minSunUp();
                if (light < min_light) {
                    light = min_light;
                }
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Super Condensators") {
                upgrade_minSunUp();
                if (light < min_light) {
                    light = min_light;
                }
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Ultra Condensators") {
                upgrade_minSunUp();
                if (light < min_light) {
                    light = min_light;
                }
                upgrades_tab.upgrades[this.data_id].style.display = "none";
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination I") {
                upgrade_rateUp();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination II") {
                upgrade_rateUp();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination III") {
                upgrade_rateUp();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination IV") {
                upgrade_rateUp();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
                upgrades_tab.upgrades[parseInt(this.data_id) + 1].style.display = "block";
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination V") {
                upgrade_rateUp();
                upgrades_tab.upgrades[this.data_id].style.display = "none";
            }
        }



    }, false);
}
