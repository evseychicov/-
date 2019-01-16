var db = require("./connect.js").db;
const Handlebars = require('Handlebars');
var $ = require("jquery");
const moment = require('moment');
var exports = module.exports = {};

$(document).ready(function(){
$('#search_purchase').click(async function(){
  let search = String($('#purchase').val());
  let resault;
  await db.any('SELECT * FROM Purchase LEFT JOIN Products ON Purchase.fkey_product = Products.Id_product WHERE Products.name_product = $1',[search])
    .then(function (data) {
      for (let i = 0; i < data.length; i++){
        data[i]['date_of_supply'] = transformationsDate(data[i]['date_of_supply']);
      }
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = '{{#each news}} <tr id="news"> <td>{{name_product}}</td> <td>{{price_purchase}}</td> <td>{{date_of_supply}}</td> <td>{{count_of_purchase_products}}</td> </tr> {{/each}}';
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;
      
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;

});
});

$(document).ready(function(){
$('#search_product').click(async function(){
  let search = String($('#product').val());
  let resault;
  await db.any('SELECT * from Products left join Category_of_product ON Products.fkey_category = Category_of_product.Id_category WHERE Products.name_product = $1',[search])
    .then(function (data) {
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = '{{#each news}}<tr id="news"><td>{{name_product}}</td><td>{{count_available}}</td><td>{{name_category}}</td><td>{{unit_of_measurements}}</td></tr>{{/each}}';
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;
      
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;

});
});

$(document).ready(function(){
$('#search_dish').click(async function(){
  let search = String($('#dish').val());
  let resault;
  await db.any('SELECT * from Dish WHERE name_dish = $1',[search])
    .then(function (data) {
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = '{{#each news}}<tr id="news"><td>{{name_dish}}</td><td>{{price_dish}}</td></tr>{{/each}}';
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;
      
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;

});
});

$(document).ready(function(){
$('#search_work').click(async function(){
  let search = String($('#work').val());
  let resault;
  await db.any('select * from Purchase LEFT JOIN Products ON fkey_product = Id_product where date_part(\'month\', Date_of_supply) = date_part(\'month\', now()) AND Products.name_product = $1',[search])
    .then(function (data) {
      for (let i = 0; i < data.length; i++){
        data[i]['date_of_supply'] = transformationsDate(data[i]['date_of_supply']);
      }
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = '{{#each news}}<tr id="news"><td>{{price_purchase}}</td><td>{{date_of_supply}}</td><td>{{count_of_purchase_products}}</td><td>{{name_product}}</td></tr>{{/each}}';
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;
      
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;

});
});



$(document).ready(function(){
$('#search_otchet').click(async function(){
  let search = String($('#otchet').val());
  let resault;
  await db.any('SELECT name_product, SUM(count_of_use_products), count(Count_of_use_products) FROM Cooking LEFT JOIN Products ON fkey_product = Id_product WHERE name_product = $1 GROUP BY Name_product',[search])
    .then(function (data) {
      resault = data;
      console.log(data);
      var json = JSON.parse(JSON.stringify({news: data}));
        var rawTamplate = '{{#each news}}<tr id="news"><td scope="row">{{name_product}}</td><td>{{count}}</td><td>{{sum}}</td></tr>{{/each}}';
        var compiledTamplate = Handlebars.compile(rawTamplate);
        var genHTML = compiledTamplate(json);

        var news = document.getElementById("container");
        news.innerHTML = genHTML;
      
    })
    .catch(function (error) {
      console.error('ERROR:', error);
    })
    return resault;

});
});

function transformationsDate(date){ 
date = moment(date).format('YYYY-MM-DD'); 
return date; 
};
