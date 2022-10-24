var limitPokemons = 18
var backPokemon = false
var selectedType = ""

$(document).ready(loadPokemons());

function loadPokemons() {

     $.ajax({
          url: "https://pokeapi.co/api/v2/pokemon?limit=" + limitPokemons + "&offset=0",
          method: 'GET',
          dataType: "json",
          beforeSend: function () {
               document.getElementById("cards").innerHTML = `
                         <img src='./statics/img/pokeLoader.gif'>
                    `
               document.getElementById("buttonMorePokemons").hidden = true
          },
          success: function (data) {
               let pokemons = data.results
               document.getElementById("cards").innerHTML = ''
               for (const pokemon in pokemons) {
                    if (pokemons.hasOwnProperty.call(pokemons, pokemon)) {
                         const element = pokemons[pokemon];
                         document.getElementById("cards").innerHTML += `
                                   <div id="ty`+ element['url'] +`" class="col-sm-2 cardCustom">
                                        <div class="card">
                                             <img id="`+ element['name'] + `" onmouseover="viraPokemon(false,'` + element['url'] + `','` + element['name'] + `')" onmouseout="viraPokemon(true,'` + element['url'] + `','` + element['name'] + `')" src="` + getImg(element['url']) + `" class="card-img-top">
                                             <div id="`+ element['url'] + `" class="card-header">              
                                             </div>
                                             <div class="card-body">
                                             <h5 class="card-title">` + element['name'] + `</h5>
                                        </div>
                                   </div>
                              `
                         for (const type in getType(element['url'])) {
                              if (Object.hasOwnProperty.call(getType(element['url']), type)) {
                                   const el = getType(element['url'])[type];
                                   switch (el['type']['name']) {
                                        case "grass":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-success">` + el['type']['name'] + `</span> `
                                             break;
                                        case "poison":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-dark">` + el['type']['name'] + `</span> `
                                             break;
                                        case "fire":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-danger">` + el['type']['name'] + `</span> `
                                             break;
                                        case "flying":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-info text-dark">` + el['type']['name'] + `</span> `
                                             break;
                                        case "water":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-primary">` + el['type']['name'] + `</span> `
                                             break;
                                        case "bug":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-success">` + el['type']['name'] + `</span> `
                                             break;
                                        case "normal":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-secondary">` + el['type']['name'] + `</span> `
                                             break;
                                        case "electric":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-warning text-dark">` + el['type']['name'] + `</span> `
                                             break;
                                        case "ground":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-secondary">` + el['type']['name'] + `</span> `
                                             break;
                                        case "fairy":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-danger">` + el['type']['name'] + `</span> `
                                             break;
                                        case "fighting":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-warning text-dark">` + el['type']['name'] + `</span> `
                                             break;
                                        case "psychic":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-dark">` + el['type']['name'] + `</span> `
                                             break;
                                        case "dragon":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-info text-dark">` + el['type']['name'] + `</span> `
                                             break;
                                        case "rock":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-dark">` + el['type']['name'] + `</span> `
                                             break;
                                        case "steel":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-secondary">` + el['type']['name'] + `</span> `
                                             break;
                                        case "ice":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-primary">` + el['type']['name'] + `</span> `
                                             break;
                                        case "ghost":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-dark">` + el['type']['name'] + `</span> `
                                             break;
                                        case "dark":
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-dark">` + el['type']['name'] + `</span> `
                                             break;
                                        default:
                                             document.getElementById(element['url']).innerHTML += `<span class="badge bg-light text-dark">` + el['type']['name'] + `</span> `
                                             break;
                                   }

                              }
                         }
                    }
               }
          },
          complete: function () {
               document.getElementById("buttonMorePokemons").hidden = false
          }
     });
}

function viraPokemon(isBack, pokeUrl, pokeName) {
     if (isBack) {
          backPokemon = false
          document.getElementById(pokeName).src = getImg(pokeUrl)
     } else {
          backPokemon = true
          document.getElementById(pokeName).src = getImg(pokeUrl)
     }
}

function getImg(pokeUrl) {
     var frontImg
     if (backPokemon) {
          $.ajax({
               url: pokeUrl,
               method: 'GET',
               async: false,
               dataType: "json",
               success: function (data) {
                    frontImg = data['sprites']['back_default'];
               }
          });
     } else {
          $.ajax({
               url: pokeUrl,
               method: 'GET',
               async: false,
               dataType: "json",
               success: function (data) {
                    frontImg = data['sprites']['front_default'];
               }
          });
     }
     return frontImg;
}

function getType(pokeUrl) {
     var Types
     let arrayTypes = []
     $.ajax({
          url: pokeUrl,
          method: 'GET',
          async: false,
          dataType: "json",
          success: function (data) {
               Types = data['types'];
               for (const isTypeFiltred in Types) {
                    if (Object.hasOwnProperty.call(Types, isTypeFiltred)) {
                         let element = Types[isTypeFiltred];
                         arrayTypes.push(element['type']['name'])     
                    }
               }
               if (!arrayTypes.includes('selectedType')) {
                    document.getElementById("ty"+pokeUrl).hidden = true
               }
          }
     });
     return Types;
}

function loadMorePokemons() {
     if (limitPokemons >= 382) {
          limitPokemons = 400
          loadPokemons()
          document.getElementById("buttonMorePokemons").hidden = true
     } else {
          limitPokemons += 18
          loadPokemons()
     }
}

function filterType(typeFiltered) {
     selectedType = typeFiltered;
}
