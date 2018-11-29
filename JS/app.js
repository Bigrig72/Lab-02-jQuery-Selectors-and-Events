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
  hornClone.attr('class', this.title);
}

Horns.readJson = () => {
  $.get('/../DATA/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Horns.allHorns.push(new Horns(obj));
      });
    })
    .then(Horns.loadHorns)
}

Horns.loadHorns = () => {
  // let hornOptions = $(`#keywords`);
  // let uniqueKeywords = [];
  // $.each(Horns.allKeywords, function(i, el) {
  //   if($.inArray(el, uniqueKeywords) === -1) uniqueKeywords.push(el);
  //   hornOptions.append(`<option>${uniqueKeywords[i]}</option>`);
  // });

  let hornOptions = $('#keywords');
  for (let i = 0; i < Horns.allHorns.length; i++) {
    if($.inArray(i, Horns.allKeywords) >= 0) {
      Horns.allKeywords.push(Horns.allHorns[i].keyword);
      hornOptions.append(`<option>${Horns.allHorns[i].keyword}</option>`);
    } else {
      continue;
    }
  }
  // let hornOptions = $('#keywords');
  // for (let i = 0; i < Horns.allHorns.length; i++) {
  //   hornOptions.append(`<option>${Horns.allHorns[i].keyword}</option>`);
  // }

  //How to remove duplicates in drop down???

  console.log(Horns.allHorns);
  // Horns.allhorns.forEach(horn => horn.render());
  for (let i = 0; i < Horns.allHorns.length; i++) {
    Horns.allHorns[i].render();
    console.log(i);
  }
}

$(() => Horns.readJson());
