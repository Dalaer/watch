// cookie的有关函数
function setCookie( key , val , exp ){
	if( exp ){
		var now = new Date();
		now.getDate( now.getDate() + exp );
		document.cookie = `${key}=${val};expeires=${now}`
	}else{
		document.cookie = `${key}=${val}`
	}
}

function getCookie( key ){
	var str = document.cookie;
	if( str ){
		arr = str.replace( /;\s/g , ";" ).split( ";" );//因为cookie中会有一些空格和分号组成的无意义字符，将他们分开，组成一个字符串
		for( var i in arr ){//遍历数组，找到对应的键值
			item = arr[i].split( "=" );
			if( key == item[0] ){
				oldCookie = item[1];
				return JSON.parse( oldCookie );
			}
		}
		return [];
	}
	return [];
}

function removeCookie( key ){
	setCookie( key , "" , -1 )
}


function rand( min , max ){
	return Math.round( Math.random()*(max-min) + min )
}
function color(){
	var str = "0123456789abcdef";
	var con = "#";
	for( var i = 0 ; i < 6 ; i++ ){
		con += str.charAt( rand( 0 , 15 ) )
	}
	return con;
}

// 验证码（大写英语）
function charcters(){
	var str = "";
	for( var i = 0 ; i < 4 ; i++ ){
		var code = rand( 65 , 90 );
		let c = String.fromCharCode( code );
		str += `<i style="color: ${color()};display:inline-block;font-size:25px;">${c}</i>`;
	}
	return str;
}

// 数字验证码
function numa(){
	var str = "";
	for( var i = 0 ; i < 6 ; i++ ){
		str += rand( 0 , 9 )
	}
	return str;
}