var db = require("./connect.js").db;
const Handlebars = require('Handlebars');
const moment = require('moment');
var $ = require("jquery");
var exports = module.exports = {};
var tableExport = require('tableexport');

exports.getDish = async function(){
  let resault;
  await db.any('SELECT * from Dish')
    .then(function (data) {
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = document.getElementById("new-tamplate").innerHTML;
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;

        let table = $('#table1').tableExport({
bootstrap: false,
formats: ['xlsx'],
filename: 'dish',
position: 'top',
});
      
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;
}

exports.getDishOption = async function(){
  let resault;
  await db.any('SELECT * from Products')
    .then(function (data) {
      resault = data;
      data.map((data, index)=>{ 

$("#name_product").append($('<option id="count" value="'+ data.name_product +'">'+ data.name_product +'</option>')); 
      
    })
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;
}

// exports.getDishOption2 = async function(){
//   let resault;
//   await db.any('SELECT * from Products')
//     .then(function (data) {
//       resault = data;
//       data.map((data, index)=>{ 

// $("#name_product2").append($('<option id="count" value="'+ data.name_product +'">'+ data.name_product +'</option>')); 
      
//     })
//     })
//     .catch(function (error) {
//       console.error('ERROR:', error);
//     })
//     return resault;
// }

exports.getProduct = async function(){
  let resault;
  await db.any('SELECT * from Products left join Category_of_product ON Products.fkey_category = Category_of_product.Id_category')
    .then(function (data) {
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = document.getElementById("new-tamplate").innerHTML;
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;

        let table = $('#table1').tableExport({
bootstrap: false,
formats: ['xlsx'],
filename: 'products',
position: 'top',
});
      
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;
}

exports.getPurchase = async function(){
  let resault;
  await db.any('SELECT * FROM Purchase LEFT JOIN Products ON Purchase.fkey_product = Products.Id_product')
    .then(function (data) {
      for (let i = 0; i < data.length; i++){
        data[i]['date_of_supply'] = transformationsDate(data[i]['date_of_supply']);
      }
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = document.getElementById("new-tamplate").innerHTML;
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;

        let table = $('#table1').tableExport({
bootstrap: false,
formats: ['xlsx'],
filename: 'purchase',
position: 'top',
});
      
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;
}

exports.getPurchaseOption = async function(){
  let resault;
  await db.any('SELECT * from Products')
    .then(function (data) {
      resault = data;
      data.map((data, index)=>{ 

$("#name").append($('<option id="count" value="'+ data.name_product +'">'+ data.name_product +'</option>')); 
      
    })
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;
}

exports.getWork = async function(){
  let resault;
  await db.any('select * from Purchase LEFT JOIN Products ON fkey_product = Id_product where date_part(\'month\', Date_of_supply) = date_part(\'month\', now())')
    .then(function (data) {
      for (let i = 0; i < data.length; i++){
        data[i]['date_of_supply'] = transformationsDate(data[i]['date_of_supply']);
      }
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = document.getElementById("new-tamplate").innerHTML;
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;

          let table = $('#table1').tableExport({
bootstrap: false,
formats: ['xlsx'],
filename: 'work_of_month',
position: 'top',
});
      
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;
}


exports.getOtchet = async function(){
  let resault;
  await db.any('SELECT name_product, SUM(count_of_use_products), count(Count_of_use_products) FROM Cooking LEFT JOIN Products ON fkey_product = Id_product GROUP BY Name_product')
    .then(function (data) {
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = document.getElementById("new-tamplate").innerHTML;
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;

        let table = $('#table1').tableExport({
bootstrap: false,
formats: ['xlsx'],
filename: 'otchet',
position: 'top',
});
      })
    }


function transformationsDate(date){ 
date = moment(date).format('YYYY-MM-DD'); 
return date; 
};