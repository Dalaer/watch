window.onload = function(){
	var url = "js/data1.json?date=" + new Date().getTime();
	var pro = ajax( url );
	pro.then( function( res ){
		// console.log( res);
		// var obj = JSON.parse(res);
		// console.log( JSON.parse(res) )
	} )
}