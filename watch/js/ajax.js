//ajax的封装
function ajax( url ){
	var pro = new Promise( function( success , failed ){
		var ajax = null;
		if( window.XMLHttpRequest ){
			ajax = new XMLHttpRequest();
		}else{
			ajax = new ActiveOBject( "Microsoft.XMLHTTP" )
		};
		ajax.open( "get" , url );
		ajax.send();
		ajax.onreadystatechange = function(){
			if( ajax.status == 200 && ajax.readyState == 4 ){
				success( ajax.responseText )
			}

			setTimeout( function(){
				failed( "未获取数据" )
			} ,3000 )
		}
	} );
	return pro;

}