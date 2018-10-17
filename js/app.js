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
Horns.objKey = [];

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


Horns.selectList = function () {
  Horns.keyword = [];
  Horns.allhorn.forEach( horn => {
    Horns.keyword.push(horn.keyword);
  });
  Horns.keyword = Horns.keyword.filter(onlyUnique).sort();

  let obj = {};
  obj.keyword = 'Select A Creature';
  Horns.objKey.push(obj);

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
  let page = event.target.id;
  console.log('page is selected', page);
  
})



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
