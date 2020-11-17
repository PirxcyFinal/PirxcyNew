let cosmetics = [];

function create_result(result) {
    if (result.images.featured) {
        var image_url = result.images.featured;
    } else if (result.images.icon) {
        var image_url = result.images.icon;
    } else if (result.images.other) {
        var image_url = result.images.other;
    } else if (result.images.smallIcon) {
        var image_url = result.images.smallIcon;
    }
    return `<div class="wow animated fadeIn" data-wow-delay=".15s" style="width: 16rem;"><a class="project card text-dark"><img class="card-img-top ${result.rarity.value}" src="${image_url}" alt="${result.name}"><div class="card-body"><h5 class="card-title card-name">${result.name}</h5></div></a></div>`
};

function load_more_cosmetics() {
    cosmetics.slice(0, 21).forEach(cosmetic => {
        document.getElementById('results-container').innerHTML += create_result(cosmetic);
    });
    cosmetics = cosmetics.slice(21, cosmetics.length);
};
let results_container = document.getElementById('results-container');
$.getJSON(`https://fortnite-api.com/v2/cosmetics/br/new`, function(data) {
    document.getElementById('found_cosmetics').innerHTML = ``;
    document.getElementById('results-container').innerHTML = '';
    data.data.items.slice(0, 21).forEach(cosmetic => {
        results_container.innerHTML += create_result(cosmetic);
    });
    cosmetics = data.data.items.slice(21, data.data.items.length);
    if (cosmetics.length > 0) {
        document.getElementById('load_more').innerHTML = `<div class="input-group mt-5 px-3"><a class="m-1 btn btn-outline-primary btn-md btn-block" href="javascript:about(1)" onclick="load_more_cosmetics()">Cargar Mas</a></div>`
    } else {
        document.getElementById('load_more').innerHTML = '';
    }
})