'use strict';


let selectElements = [];
function HornGallery(horns) {
  this.title = horns.title;
  this.image_url = horns.image_url;
  this.description = horns.description;
  this.keyword = horns.keyword;
  this.horns=horns.horns;
}

HornGallery.prototype.renderObject = function () {

  let template = $('#photo-template').html();
  let makeObj = Mustache.render(template,this);
  $('main').append(makeObj);


  if (selectElements.includes(this.keyword)!== true) {
    selectElements.push(this.keyword);
  }


};


function read1() {
  const ajaxSetting = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-1.json', ajaxSetting).then(getData1);
}

function getData1(data) {
  data.forEach(makeObject);

  selectElements.forEach((item) => {
    $('select').append(`<option value=${item}>${item}</option>`);
  });
  function makeObject(item) {
    let newObj = new HornGallery(item);
    newObj.renderObject();
  }
}


read1();


function read2() {
  const ajaxSetting = {
    method: 'get',
    dataType: 'json'
  };


  $.ajax('data/page-2.json', ajaxSetting).then(getData2);
}

function getData2(data) {
  data.forEach(makeObjectTwo);
  selectElements.forEach((item) => {
    $('select').append(`<option value=${item}>${item}</option>`);
  });
  function makeObjectTwo(item) {
    let newObj = new HornGallery(item);
    newObj.renderObject();
  }
}

$('select').on('change', filterFunction);
function filterFunction() {
  let select = $(this).val();
  if (select === 'default') {
    $('div').show();
    // $('#photo-template').hide();
  } else {
    $('div').hide();
    $(`.${select}`).show();
  }

}

$('#page1').on('click', page1);
function page1() {

  $('div').hide();
  read1();

}

$('#page2').on('click', page2);
function page2() {
  $('div').hide();
  read2();
}

