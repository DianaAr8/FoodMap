window.onload = (() => {
  let search = $('#input-search');
  let restaurants = Object.keys(data);
  console.log(restaurants);

  // Se cargan los lugares de la base de datos craeda (data.js) y se inyectan a page.html mediante templetes string
  const displayRestaurants = () => {
    $.each(restaurants, (i) => {
      let paintRestaurants = `<div class="collection col-xs-8 col-sm-8 col-md-6"><a id="${restaurants[i]}">
                        <span class="caption">
                          <span>${data[restaurants[i]].name}</span>
                          <span> Dirección: ${data[restaurants[i]].adress}</span>
                          <span> Contacto: ${data[restaurants[i]].phone}</span>
                          <span>Calificación: ${data[restaurants[i]].ranking}</span>
                          </span>
                          </a>
                      </div>`;
      $('#results .row').append(paintRestaurants);
      $('#' + restaurants[i]).css({
        // url sirve para traer la imagen de cada restaurnte 
        'background-image': 'url(' + data[restaurants[i]].image + ')'
      });
    });
  }

  displayRestaurants();

  // Se crea función para filtro por tipo de comida 
  const searchFilter = () => {
    let searchPlace = search.val();
    $('.collection').hide();
    // each se utiliza para iterar en la coleccion
    $('.collection a').each(function () {
      let arrFood = data[$(this).attr('id')].food;
      for (let i = 0; i < arrFood.length; i++) {
        if (arrFood[i].indexOf(searchPlace) !== -1 || ((data[$(this).attr('id')].name).toLowerCase()).indexOf(searchPlace.toLowerCase()) !== -1) {
          //parent devuelve el elemento principal directo del DOM
          // fadeIn se utilizo para que en la busqueda aparecieran rápido los restaurantes con el criterio de búsqueda se puede utilizar fast(200 milliseconds) o slow (600 milliseconds)
          // this selecciona al elemento que activo el evento, es decir que el evento corra de forma individual
          $(this).parent().fadeIn('slow');

        }
      }
    });
  }
  //el evento tiene lugar cuando el usuario deja de pulsar una tecla
  search.keyup(searchFilter);

  // Crea un hoover que muestra la información del lugar
  function toShow() {
    $(this).css('opacity', '2');
  }

  // Regresa la imagen original
  function hide() {
    $(this).css('opacity', '0');
  }


  $('.caption').mouseover(toShow).mouseout(hide);


});
