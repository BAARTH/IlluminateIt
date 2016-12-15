// // LOADING //
// var html_loading = document.querySelector('.loading');
// var click_loading = document.querySelector('.moon.loading');
// var html_light_loading = document.querySelector('.light_loading');
// var html_light_loading_txt = document.querySelector('.light_loading_txt');
// var skip_intro = document.querySelector('.skip_intro');
// var light_loading = 0.1;
// var min_light_loading = 0;
// var max_light_loading = 1;
// var disabled_loading = false;

// click_loading.addEventListener('click', loading_click);

// function loading_click() {
//     if (light_loading < max_light_loading) {
//         light_loading += 0.02;
//         if (light_loading < max_light_loading) {
//             light_loading += 0.01;
//         }
//         click_loading.style.opacity = light_loading;
//     } else if (light_loading >= max_light_loading) {
//         click_loading.removeEventListener('click', loading_click);
//     }
// }

// function decrease_the_light_loading() {
//     if (click_loading.style.opacity > min_light_loading) {
//         click_loading.style.opacity -= 0.001;
//         light_loading -= 0.001;
//     }
// }
// setInterval(function() {
//     decrease_the_light_loading();
//     html_light_loading_txt.innerHTML = Math.round(light_loading * 100) + '%';
//     if ((light_loading > max_light_loading) && (disabled_loading == false)) {
//         disable_loading()
//         disabled_loading = true;
//     }
// }, 50);

// skip_intro.addEventListener('click', function() {
//     disable_loading()
//     disabled_loading = true;
// });

// function disable_loading() {
//     {
//         html_loading.className += " disable";
//         html_light_loading.className += " disable";
//         setTimeout(function() {
//             html_loading.style.display = 'none';
//         }, 5000);

//     }
// }
// END LOADING //

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



var click = document.querySelector('.moon.official');
var html_lumen = document.querySelector('.lumen');
var html_light = document.querySelector('.light');
var html_unleash = document.querySelector('.unleash');
var html_illumination = document.querySelector('.illumination');
var html_illuminers = document.querySelector('.illuminers');
var html_batiments_list = document.querySelector('.batiments ul');
var html_upgrades_list = document.querySelector('.upgrades ul');
var html_news_list = document.querySelector('.news ul');
var html_galaxy = document.querySelector('.galaxy');
var html_achievements = {};
html_achievements.achievements_container = document.querySelector('.achievements ul');

var upgrades_tab = {};

if (localStorage.getItem("First play") == null) {
    var batiments_on_galaxy = [];
    var particles = [];
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
    var illumination = 0;
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
    var click_multiplicator = 3;
    var product_percent_click = 1;
    var clickpercent_buyed = false;
    var upgrades_buyed = 0;
    var light_duration = 0;

    localStorage.setItem("First play", "no");
} else if (localStorage.getItem("First play") == "no") {
    var batiments_on_galaxy = JSON.parse(localStorage.getItem("batiments_on_galaxy"));
    var data_upgrades_lumen = JSON.parse(localStorage.getItem("data_upgrades_lumen"));
    var particles = [];
    var array = localStorage.getItem("array");
    var html_news_list_li = localStorage.getItem("html_news_list_li");
    var timer = parseInt(localStorage.getItem("timer"));
    var light = 0.1;
    var min_light = 0.1;
    var max_light = parseInt(localStorage.getItem("max_light"));
    var need = parseInt(localStorage.getItem("need"));
    var decrease_light = parseInt(localStorage.getItem("decrease_light"));
    var decrease_speed = parseInt(localStorage.getItem("decrease_speed"));
    var lumen = parseInt(localStorage.getItem("lumen"));
    var illumination = parseInt(localStorage.getItem("illumination"));
    var product_ratio = parseInt(localStorage.getItem("product_ratio"));
    var product_increment = parseInt(localStorage.getItem("product_increment"));
    var lvl_increment = parseInt(localStorage.getItem("lvl_increment"));
    var product_interval = parseInt(localStorage.getItem("product_interval"));
    var click_state = localStorage.getItem("click_state");
    var click_state_time = parseInt(localStorage.getItem("click_state_time"));
    var decrease = localStorage.getItem("decrease");
    var max_lumen = parseInt(localStorage.getItem("max_lumen"));
    var convert_rate = parseInt(localStorage.getItem("convert_rate"));
    var mooners_nbr = parseInt(localStorage.getItem("mooners_nbr"));
    var mooners_ratio = parseInt(localStorage.getItem("mooners_ratio"));
    var capa_lumen_max = parseInt(localStorage.getItem("capa_lumen_max"));
    var cx = parseInt(localStorage.getItem("cx"));
    var cy = parseInt(localStorage.getItem("cy"));
    var radius = parseInt(localStorage.getItem("radius"));
    var last_increment_lvl = parseInt(localStorage.getItem("last_increment_lvl"));
    var click_multiplicator = parseInt(localStorage.getItem("click_multiplicator"));
    var product_percent_click = parseInt(localStorage.getItem("product_percent_click"));
    var clickpercent_buyed = localStorage.getItem("clickpercent_buyed");
    var data_batiments = JSON.parse(localStorage.getItem("data_batiments"));
    var upgrades_buyed = parseInt(localStorage.getItem("upgrades_buyed"));
}



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

function check_upgrades() {
    for (i = 0; i < upgrades_tab.upgrades.length; i++)
        if (data_upgrades_lumen[i].appear == "true") {
            upgrades_tab.upgrades[i].style.display = "block";
        } else if (data_upgrades_lumen[i].appear == "false") {
        upgrades_tab.upgrades[i].style.display = "none";
    }
}

check_upgrades();

// Prevent DOUBLE CLICK -> SELECT
document.addEventListener('mousedown', function(e) {
    e.preventDefault();
}, false);


// Click event
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
        light_duration = 0;
        if (light > min_light) {
            click.style.opacity -= 1 / decrease_light;
            light -= 1 / decrease_light;

        }
    }
    window.setTimeout(decrease_the_light, decrease_speed);
}
decrease_the_light();

function check_light_duration() {
    setTimeout(function() {
        window.requestAnimationFrame(check_light_duration);
        if (decrease == false) {
            light_duration++;
        }
    }, 1000);

}
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
    html_illuminers.innerHTML = Math.round(product_increment) + ' illuminers';
    html_illumination.innerHTML = 'Illumination : ' + Math.round(illumination) + ' ill';
    if (lumen > max_lumen) {
        lumen = max_lumen;
    }
    if (light > max_light) {
        light = max_light;
    }
    max_lumen = Math.round(product_increment * 300);
    // draw_batiments(data_batiments[1].galaxyWidth, data_batiments[1].galaxyColor);
    redraw();
    // draw_particles();
    achievements_require();
    update_particles();
    draw_particles();
    draw_batiments()
        // LOCAL STORAGE
    localStorage.setItem("batiments_on_galaxy", JSON.stringify(batiments_on_galaxy));
    localStorage.setItem("data_upgrades_lumen", JSON.stringify(data_upgrades_lumen));
    localStorage.setItem("array", array);
    localStorage.setItem("html_news_list_li", html_news_list_li);
    localStorage.setItem("timer", timer);
    localStorage.setItem("light", light);
    localStorage.setItem("min_light", min_light);
    localStorage.setItem("max_light", max_light);
    localStorage.setItem("need", need);
    localStorage.setItem("decrease_light", decrease_light);
    localStorage.setItem("decrease_speed", decrease_speed);
    localStorage.setItem("lumen", lumen);
    localStorage.setItem("illumination", illumination);
    localStorage.setItem("product_ratio", product_ratio);
    localStorage.setItem("product_increment", product_increment);
    localStorage.setItem("lvl_increment", lvl_increment);
    localStorage.setItem("product_interval", product_interval);
    localStorage.setItem("click_state", click_state);
    localStorage.setItem("click_state_time", click_state_time);
    localStorage.setItem("decrease", decrease);
    localStorage.setItem("max_lumen", max_lumen);
    localStorage.setItem("convert_rate", convert_rate);
    localStorage.setItem("mooners_nbr", mooners_nbr);
    localStorage.setItem("mooners_ratio", mooners_ratio);
    localStorage.setItem("capa_lumen_max", capa_lumen_max);
    localStorage.setItem("cx", cx);
    localStorage.setItem("cy", cy);
    localStorage.setItem("radius", radius);
    localStorage.setItem("last_increment_lvl", last_increment_lvl);
    localStorage.setItem("click_multiplicator", click_multiplicator);
    localStorage.setItem("product_percent_click", product_percent_click);
    localStorage.setItem("clickpercent_buyed", clickpercent_buyed);
    localStorage.setItem("data_batiments", JSON.stringify(data_batiments));
    localStorage.getItem("upgrades_buyed", upgrades_buyed);
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
            add_batiments(data_batiments[this.data_id].galaxyWidth, data_batiments[this.data_id].galaxyColor);
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
            upgrades_tab.batiments[i].price[n].innerHTML = '<span class="price_number">' + data_batiments[i].basePrice.toFixed(0); + '</span> ill';
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
    }
}




function add_batiments(width, color) {
    var new_batiment = {};
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * radius * radius;
    new_batiment.x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle) + (canvas.width / 4);
    new_batiment.y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle) + (canvas.height / 4);
    new_batiment.width = width;
    new_batiment.color = color;
    batiments_on_galaxy.push(new_batiment);
}

function draw_batiments() {
    for (var i = 0; i < batiments_on_galaxy.length; i++) {
        context.beginPath();
        context.arc(batiments_on_galaxy[i].x, batiments_on_galaxy[i].y, batiments_on_galaxy[i].width, 0, Math.PI * 2);
        context.fillStyle = batiments_on_galaxy[i].color;
        context.fill();
    }
}

function add_particle(bat) {
    var particle = {};
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * radius * radius;
    particle.x = bat.x;
    particle.y = bat.y;
    particle.width = 1;
    particle.color = bat.color;
    particles.push(particle);
}

/* Updates particles */
function update_particles() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
        var _particle = particles[i];
        _particle.x += (canvas.width / 4 - _particle.x) * 0.01;
        _particle.y += (canvas.height / 4 - _particle.y) * 0.01;
        if (((_particle.x <= (canvas.width / 4) + 5) && (_particle.x >= (canvas.width / 4) - 5)) && ((_particle.y <= (canvas.height / 4) + 5) && (_particle.y >= (canvas.height / 4) - 5))) {
            particles.splice(i, 1);
            i--;
        }
    }

}

/* Draw particles on the position of destroyed target */
function draw_particles() {
    for (var i = 0; i < particles.length; i++) {
        context.beginPath();
        context.save();
        context.globalAlpha = 1;
        context.arc(particles[i].x, particles[i].y, particles[i].width, 0, Math.PI * 2);
        context.fillStyle = particles[i].color;
        context.fill();
        context.restore();
    }
}


setInterval(function() {
    for (var i = 0; i < batiments_on_galaxy.length; i++) {
        add_particle(batiments_on_galaxy[i]);
    }
}, 2500)



// UPGRADES CLICK 
for (i = 0; i < upgrades_tab.upgrades.length; i++) {
    upgrades_tab.upgrades[i].addEventListener('click', function() {
        if (illumination >= data_upgrades_lumen[this.data_id].upgradePrice) {
            illumination -= data_upgrades_lumen[this.data_id].upgradePrice;
            if (data_upgrades_lumen[this.data_id].id == "Nova") {
                upgrade_nova();

                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Supernova") {
                upgrade_supernova();
                data_upgrades_lumen[this.data_id].appear = "false";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Plasma Injector I") {
                upgrade_plasma_injector();
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Plasma Injector II") {
                upgrade_plasma_injector();
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Plasma Injector III") {
                upgrade_plasma_injector();
                data_upgrades_lumen[this.data_id].appear = "false";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Yellow star") {
                for (i = 0; i < 1; i++) {
                    upgrade_star();
                }
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Orange star") {
                for (i = 0; i < 2; i++) {
                    upgrade_star();
                }
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Blue star") {
                for (i = 0; i < 3; i++) {
                    upgrade_star();
                }
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Purple star") {
                for (i = 0; i < 5; i++) {
                    upgrade_star();
                }
                data_upgrades_lumen[this.data_id].appear = "false";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Hydrogen Isotopes") {
                upgrade_dblclick();
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Helium Isotopes") {
                upgrade_dblclick();
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear == "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Carbon Isotopes") {
                upgrade_clickpercent1();
                udata_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Neon Isotopes") {
                upgrade_clickpercent2();
                data_upgrades_lumen[this.data_id].appear = "false";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Condensators") {
                upgrade_minSunUp();
                if (light < min_light) {
                    light = min_light;
                }
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Super Condensators") {
                upgrade_minSunUp();
                if (light < min_light) {
                    light = min_light;
                }
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Ultra Condensators") {
                upgrade_minSunUp();
                if (light < min_light) {
                    light = min_light;
                }
                data_upgrades_lumen[this.data_id].appear = "false";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination I") {
                upgrade_rateUp();
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination II") {
                upgrade_rateUp();
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination III") {
                upgrade_rateUp();
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination IV") {
                upgrade_rateUp();
                data_upgrades_lumen[this.data_id].appear = "false";
                data_upgrades_lumen[parseInt(this.data_id) + 1].appear = "true";
                check_upgrades();
                upgrades_buyed++;
            } else if (data_upgrades_lumen[this.data_id].id == "Illumination V") {
                upgrade_rateUp();
                data_upgrades_lumen[this.data_id].appear = "false";
                check_upgrades();
                upgrades_buyed++;
            }
        }
console.log(data_upgrades_lumen);
    }, false);
}

// Achievements

function check_achievement(achievement_number) {
    achievements_data[achievement_number].acquire = "true";
    var li_id = 0;
    html_achievements.achievements_container.innerHTML = '';
    for (i = 0; i < achievements_data.length; i++) {

        if (achievements_data[i].acquire == "true") {
            html_achievements.achievements_container.innerHTML += '<li data-id ="' + li_id + '"><span class="achievement_icon"><img src="" alt=""></span><span class="achievement_content"></span></li>';
            html_achievements.achievements_li = document.querySelectorAll('.achievements ul li');

            html_achievements.achievements_li[li_id].querySelector(".achievement_content").innerHTML = achievements_data[i].id;
            html_achievements.achievements_li[li_id].querySelector(".achievement_icon img").src = achievements_data[i].src;
            li_id++;
        }
    }
}


function achievements_require() {
    if ((product_increment > 1000) && achievements_data[0].acquire != "true") {
        check_achievement(0);
    } else if ((batiments_on_galaxy.length > 0) && achievements_data[2].acquire != "true") {
        check_achievement(2);
    } else if ((upgrades_buyed >= 10) && achievements_data[3].acquire != "true") {
        check_achievement(3);
    } else if ((upgrades_buyed >= 15) && achievements_data[4].acquire != "true") {
        check_achievement(4);
    } else if ((upgrades_buyed >= 5) && achievements_data[5].acquire != "true") {
        check_achievement(5);
    } else if ((batiments_on_galaxy.length >= 10) && achievements_data[6].acquire != "true") {
        check_achievement(6);
    } else if ((batiments_on_galaxy.length >= 15) && achievements_data[7].acquire != "true") {
        check_achievement(7);
    } else if ((batiments_on_galaxy.length >= 5) && achievements_data[8].acquire != "true") {
        check_achievement(8);
    } else if ((light_duration >= 600) && achievements_data[9].acquire != "true") {
        check_achievement(9);
    } else if ((light_duration >= 900) && achievements_data[10].acquire != "true") {
        check_achievement(10);
    } else if ((light_duration >= 300) && achievements_data[11].acquire != "true") {
        check_achievement(11);
    }
}

function achievements_storage() {
    for (i = 0; i < achievements_data.length; i++) {
        if (achievements_data[i] == "true") {
            check_achievement(i);
        }
    }
}
achievements_storage();


// Responsive 

var open_tab_upgrades = document.querySelector('.open_upgrades');
var upgrades_container = document.querySelector('.improvments_container_upgrades');
var upgrades_is_open = false;

var open_tab_news = document.querySelector('.open_news');
var news_container = document.querySelector('.improvments.news');
var news_is_open = false;

open_tab_upgrades.addEventListener('click', function() {
    if (upgrades_is_open == false) {
        upgrades_container.style.transform = 'translateX(0)';
        open_tab_upgrades.style.transform = 'translateY(-50%) translateX(-255px) rotateZ(-90deg)';

        if (window.matchMedia("(max-width: 374px)").matches) {
            open_tab_news.style.zIndex = '-1';

            click.style.zIndex = '-1';
            document.querySelector('.moon_b').style.zIndex = '-2';
        }


        open_tab_upgrades.innerHTML = "close upgrades_";

        upgrades_is_open = true;
    } else if (upgrades_is_open == true) {
        upgrades_container.style.transform = 'translateX(150%)';
        open_tab_upgrades.style.transform = 'translateY(-50%) translateX(0px) rotateZ(-90deg)';

        if (window.matchMedia("(max-width: 400px)").matches) {
            open_tab_news.style.zIndex = '10';
            click.style.zIndex = '100';
        }



        open_tab_upgrades.innerHTML = "open upgrades_";

        upgrades_is_open = false;
    }
    if (news_is_open == true) {

        news_container.style.transform = 'translateX(-150%)';
        open_tab_news.style.transform = 'translateY(-50%) translateX(0px) rotateZ(90deg)';
        open_tab_news.innerHTML = "open news_";
        news_is_open = false;
    }
});

open_tab_news.addEventListener('click', function() {
    if (news_is_open == false) {
        news_container.style.transform = 'translateX(0)';
        open_tab_news.style.transform = 'translateY(-50%) translateX(255px) rotateZ(90deg)';

        if (window.matchMedia("(max-width: 374px)").matches) {
            open_tab_upgrades.style.zIndex = '-1';
            click.style.zIndex = '-1';
            document.querySelector('.moon_b').style.zIndex = '-2';
        }


        open_tab_news.innerHTML = "close news_";

        news_is_open = true;
    } else if (news_is_open == true) {
        news_container.style.transform = 'translateX(-150%)';
        open_tab_news.style.transform = 'translateY(-50%) translateX(0px) rotateZ(90deg)';

        if (window.matchMedia("(max-width: 400px)").matches) {
            open_tab_upgrades.style.zIndex = '10';
            click.style.zIndex = '100';
        }



        open_tab_news.innerHTML = "open news_";

        news_is_open = false;
    }
    if (upgrades_is_open == true) {
        upgrades_container.style.transform = 'translateX(150%)';
        open_tab_upgrades.style.transform = 'translateY(-50%) translateX(0px) rotateZ(-90deg)';

        open_tab_upgrades.innerHTML = "open upgrades_";

        upgrades_is_open = false;
    }
});


var open_tab_achievements = document.querySelector('.open_achievements');
var achievements_container = document.querySelector('.achievements');
var achievements_is_open = false;

open_tab_achievements.addEventListener('click', function() {
    if (achievements_is_open == true) {
        achievements_container.style.transform = 'translateY(-150%)';
        open_tab_achievements.style.transform = 'translateX(-50%) translateY(0px)';

        open_tab_achievements.innerHTML = "see achievements_";

        achievements_is_open = false;
    } else if (achievements_is_open == false) {
        achievements_container.style.transform = 'translateX(0%)';
        open_tab_achievements.style.transform = 'translateX(-50%) translateY(90%)';

        open_tab_achievements.innerHTML = "hide achievements_";

        achievements_is_open = true;
    }
});
