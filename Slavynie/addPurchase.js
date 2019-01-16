var db = require("./connect.js").db;
var $ = require("jquery");



$(document).ready(function(){
	$('#add_purchase').click(function(){
		let name = String($('#name').val());
		let col = String($('#col').val());
	
if(name == "" || col == "")
            {
                alert("Заполните все поля!");
              }
else{
	db.none('select * from purchase_add($1,$2)',[name, col])
	.then(() => {
		location.reload();
	})
	.catch(error =>{
		console.log(error);
		location.reload();
	})
}

	});
});