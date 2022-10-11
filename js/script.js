$(document).ready(function(){

     $.ajax({
          url: "https://pokeapi.co/api/v2/pokemon?limit=400&offset=0",
               method: 'GET',
               dataType: "json",
               beforeSend: function() {
                    document.getElementById("cards").innerHTML = `
                         <img src='./statics/img/loader.gif'>
                    `
               },
               success: function (data) {
                    let pokemons = data.results
                    document.getElementById("cards").innerHTML = ''
                    for (const pokemon in pokemons) {
                         if (pokemons.hasOwnProperty.call(pokemons, pokemon)) {
                              const element = pokemons[pokemon];
                              document.getElementById("cards").innerHTML += `
                                   <div class="col-sm-2 cardCustom">
                                        <div class="card">
                                             <img src="`+ getImg(element['url']) +`" class="card-img-top">
                                             <div class="card-body">
                                             <h5 class="card-title">` + element['name'] + `</h5>
                                             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.
                                             </p>
                                        </div>
                                   </div>
                              
                              `
                         }
                    }
               },
               complete: function() {
                    console.log('Completou com sucesso!');
               }
     });
});


function getImg(pokeUrl) {
     var frontImg
     $.ajax({
          url: pokeUrl,
               method: 'GET',
               async: false,
               dataType: "json",
               success: function (data) {
                    frontImg = data['sprites']['front_default'];
               }
     });
     return frontImg;
}

