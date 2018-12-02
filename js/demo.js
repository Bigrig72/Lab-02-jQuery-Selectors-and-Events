'use strict';

//-----CALL THIS ON PAGE LOAD-----

$(() => {
  ImageHorns.readJson(1);
  ImageHorns.handleImageEvents();
  ImageHorns.handleNavEVents();
})



//-----BELOW ARE ALL THE FUNCTIONS-----

//ImageHorns constructor
function ImageHorns(item) {
  this.image_url = item.image_url;
  this.title = item.title;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

//ImageHorns Render function
ImageHorns.prototype.render = function () {
  let handlebarTemplate = Handlebars.compile($('#horn-template').html());
  return handlebarTemplate(this);
}


//ImageHorns readJson function
ImageHorns.readJson = (page) => {
  ImageHorns.allHorns = [];
  $('main').empty();

  $.get(`../data/page-${page}.json`).then(data => {

    data.forEach(item => {

      ImageHorns.allHorns.push(new ImageHorns(item));
    })

    ImageHorns.sortBy(ImageHorns.allHorns, 'title');

    ImageHorns.allHorns.forEach(image => {
      $('#photo-container').append(image.render());
    })

  }, 'json')
    .then(ImageHorns.populateFilter)
    .then(ImageHorns.handleFilter)
    .then(ImageHorns.handleSort);
}


//Image Horns sortBy function
ImageHorns.sortBy = (array, property) => {
  array.sort((a, b) => {
    let firstComparison = a[property];
    let secondComparison = b[property];
    return (firstComparison > secondComparison) ? 1 : (firstComparison < secondComparison) ? -1 : 0;
  });
}

//Image Horns populateFilter function
ImageHorns.populateFilter = () => {
  let hornKeywords = [];

  $('option').not(':first').remove();

  ImageHorns.allHorns.forEach(image => {
    if (!hornKeywords.includes(image.keyword))
      hornKeywords.push(image.keyword);
  })

  hornKeywords.sort();

  hornKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  })
}

//Image Horns handleFilter function
ImageHorns.handleFilter = () => {
  $('select').on('change', function () {

    let selected = $(this).val();
    if (selected !== 'Filter by Keyword') {
      $('div').hide();

      ImageHorns.allHorns.forEach(image => {
        if (selected === image.keyword) {
          $(`div[class=${selected}]`).addclass('filtered').fadein();
        }
      })
      $(`option[value=${selected}]`).fadein();
    }
  })
}

//Image Horns handleSort function
ImageHorns.handleSort = () => {
  $('input').on('change', function () {
    $('select').val('default');
    $('div').remove()

    ImageHorns.sortBy(ImageHorns.allHorns, $(this).attr('id'))
    ImageHorns.allHorns.forEach(image => {
      $(`#photo-container`).append(image.render());

    })
  })
}

//Image Horns handleImageEvents function
ImageHorns.handleImageEvents = () => {
  $('main').on('click', 'div', function (event) {
    event.stopPropagation();
    let $clone = $(this).clone();
    let elements = $clone[0].children;

    $('section').addclass('active').html(elements);
    $(window).scrollTop(0);
  });

  $('body').on('click', function () {
    $('section').empty();
    $('section').removeClass('active');
  })
}

//Image Horns handleNavEVents function
ImageHorns.handleNavEVents = () => {
  $('footer ul, header ul').on('click', 'li', function () {
    $('#photo-container').empty();
    ImageHorns.readJson($(this).attr('id'));
  })
}