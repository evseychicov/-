var db = require("./connect.js").db;
var $ = require("jquery");




$(document).ready(function(){
	$('#add_dish').click(function(){
		let name = String($('#name').val());
		
		let price = String($('#price').val());
		
		// let name_prod = String($('#name_product').val());

		// let col_product = String($('#col_product').val());
		
	
		
		

		
	
if(name == "" || price == "")
            {
                alert("Заполните все поля!");
              }
else{
	db.query('INSERT INTO Dish(name_dish, price_dish) VALUES($1,$2)',[name, price])
	.then(async () => {
		var formElements = [];
		let tmpMas = document.getElementsByName("cik");
		for(let i = 0; i < tmpMas.length; i++) {
			formElements.push({
				name: tmpMas[i].children[0].value,
				amount: tmpMas[i].children[1].value
			})
			db.query("SELECT * FROM three_insert($1,$2,$3)",[name, formElements[i].name, formElements[i].amount])
			// await db.query("UPDATE Products set Count_available = Count_available-"+ formElements[i].amount + "WHERE Name_product ='" + formElements[i].name + "'");
			// db.query("SELECT id_dish, id_product FROM Dish LEFT JOIN Products ON name_product ='" + formElements[i].name + "' WHERE name_dish='" + name + "'")
			// .then((data) =>{
			// 	console.log(data);
			// 	var a = data[i].id_dish;
			// 	var b = data[i].id_product;
			// 	console.log(a);
			// 	console.log(b);
			// db.query("INSERT INTO Cooking(count_of_use_products, fkey_dish, fkey_product) VALUES (" + formElements[i].amount + "," + data[i].id_dish + "," + data[i].id_product + ")");
			// })
			// .catch(error =>{
			// 	console.log(error);
			// })
			
		}
		location.reload();
	})
	.catch(error =>{
		console.log(error);
	})
		
	
}

});

$('#add_product').click(function(){
let handle = $('#handle').html();
	$('#clear_div').append(handle);

})


});