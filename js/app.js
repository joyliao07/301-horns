'use strict';

function Horns (creature) {
  this.title = creature.title;
  this.picture = creature.image_url;
  this.description = creature.description;
  this.keyword = creature.keyword;
  this.hornNum = creature.horns;
  this.render();
}


Horns.prototype.render = function () {
  let $newSection = $('#horn-template').html();
  let compiled = Handlebars.compile($newSection);
  $('#horn-display').append(compiled(this));
}


Horns.allhorn = [];
Horns.keyword = [];


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


Horns.selectList = function () {
  Horns.allhorn.forEach( horn => {
    Horns.keyword.push(horn.keyword);
  });
  Horns.keyword = Horns.keyword.filter(onlyUnique).sort();
  Horns.selectRender();
}


Horns.selectRender = function () {
  Horns.keyword.forEach( key => {
    console.log('key is: ', key);
    let $newSelect = $('#select-template').html();
    let compiled = Handlebars.compile($newSelect);
    $('#select-display').append(compiled(key));
  });
}







Horns.readJson = function (){
  $.get('./data/page-1.json', 'json')
    .then( data => {
      data.forEach( each => {
        Horns.allhorn.push(new Horns(each));
      });
      Horns.selectList();
    });
}










$(document).ready(function () {
  Horns.readJson();
})
