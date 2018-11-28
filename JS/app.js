'use strict';

function Horns(horn) {
  this.title = horn.name;
  this.image = horn.image;
  this.description = horn.hobbies;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horns.allHorns = [];

Horns.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');
  let hornHtml = $('#photo-template').html();
  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.title);
}

Horns.readJson = () => {
  $.get('../DATA/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Horns.allHorns.push(new Horns(obj))
      })
    })
    .then(Horns.loadHorns)
}

Horns.loadHorns = () => {
  Horns.allhorns.forEach( horn => horn.render());
}

$(() => Horns.readJson());
