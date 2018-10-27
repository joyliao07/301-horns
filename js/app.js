'use strict';

function Horns (creature) {
  this.title = creature.title;
  this.picture = creature.image_url;
  this.description = creature.description;
  this.keyword = creature.keyword;
  this.hornNum = creature.horns;
  // this.render();
}


//SHOULD BE RENDER FROM Horns.allhorn, NOT DIRECTLY FROM 'THIS'
Horns.prototype.render = function () {
  let $newSection = $('#horn-template').html();
  let compiled = Handlebars.compile($newSection);
  $('#horn-display').append(compiled(this));
}


Horns.allhorn = [];
Horns.objKey = [{keyword: 'Select A Creature'}];
let page = 'page-2';
let sort = '';


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


Horns.selectList = function () {
  Horns.keyword = [];
  Horns.allhorn.forEach( horn => {
    Horns.keyword.push(horn.keyword);
  });
  Horns.keyword = Horns.keyword.filter(onlyUnique).sort();

  Horns.keyword.forEach( keyword => {
    let obj = {};
    obj.keyword = keyword;
    Horns.objKey.push(obj);
  });

  Horns.selectRender();
}


Horns.selectRender = function () {
  Horns.objKey.forEach( key => {
    let $newSelect = $('#select-template').html();
    let compiled = Handlebars.compile($newSelect);
    $('#select-horn').append(compiled(key));
  });
}


$('select#select-horn').on('change', function() {
  let selected = $(this).val();
  $('#horn-display div').hide();
  $(`.${selected}`).fadeIn(900);
})


$('a').on('click', function(){
  page = event.target.id;
  $('#horn-display').children().remove();
  $('option').remove();
  Horns.objKey = [{keyword: 'Select A Creature'}];
  Horns.allhorn = [];
  Horns.readJson();
})


$('input[type=radio]').on('click', function() {
  sort = this.value;
  $('#horn-display').children().remove();
  $('option').remove();
  Horns.objKey = [{keyword: 'Select A Creature'}];
  Horns.allhorn = [];
  Horns.readJson();

});


Horns.readJson = function (){
  $.get(`./data/${page}.json`, 'json')
    .then( data => {
      data.forEach( each => {
        Horns.allhorn.push(new Horns(each));
      });
      Horns.selectList();
      if (sort === 'by-title'){
        Horns.allhorn.sort((a, b) => a.title > b.title ? 1 : b.title > a.title ? -1 : 0);
      } else if (sort === 'by-horns'){
        Horns.allhorn.sort((a, b) => a.hornNum - b.hornNum);
      }
      Horns.allhorn.forEach(each => each.render());
    });
}










$(document).ready(function () {
  Horns.readJson();
})
