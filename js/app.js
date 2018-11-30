'use strict';

function Horns(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;

}

Horns.allHorns = [];
Horns.allKeywords = [];


Horns.prototype.render = function () {
  $('div[class="photo-container"]').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');
  let hornHtml = $('#photo-template').html();
  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.keyword);
}

Horns.readJson = () => {
  $.get('/../data/page-1.json')
    .then(data => {
      console.log(data);
      data.forEach(horn => {
        Horns.allHorns.push(new Horns(horn));
      });
    })
    .then(Horns.loadHorns)
    .then(Horns.handleFilter);
}

Horns.loadHorns = () => {
  let hornOptions = $('#keywords');

  for (let i = 0; i < Horns.allHorns.length; i++) {
    if (!Horns.allKeywords.includes(Horns.allHorns[i].keyword)) {
      Horns.allKeywords.push(Horns.allHorns[i].keyword);
    }
  }

  for (let i = 0; i < Horns.allKeywords.length; i++) {
    hornOptions.append(`<option value=${Horns.allKeywords[i]}>${Horns.allKeywords[i]}</option>`);
  }

  for (let i = 0; i < Horns.allHorns.length; i++) {
    Horns.allHorns[i].render();
  }
}

Horns.handleFilter = () => {
  $('select').on('change', function () {
    let selectedHorn = $(this).val();
    if (selectedHorn !== 'Filter by Keyword') {
      $('div').hide();
      
      Horns.allHorns.forEach(horn => {
        if(selectedHorn === horn.keyword){
          $(`div[class="${selectedHorn}"]`).addClass('filtered').fadeIn();
        }
      });
      // $(`option[value="${selectedHorn}"]`).fadeIn();
    }
  })
}


$(() => Horns.readJson());