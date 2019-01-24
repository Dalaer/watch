
// ----------------------------------------------------------------------------------------------------------------------
// 手机号码
var strP = "";
var flagP = false;
$( "#phone" ).blur( function(){
	strP = $( "#phone" ).val();
	if( strP == "" ){
		$( this ).parent().next().text( "请输入手机号" )
	}else{
		let reg = /^1[356789]\d{9}$/;
		if( !reg.test( strP ) ){
			$( this ).parent().next().html( "请输入正确的手机号" );
			
		}else{
			$( this ).parent().next().html( "" );
			flagP = true;
		}
	}
} )

// ----------------------------------------------------------------------------------------------------------------------
// 图形验证码
var strI = "";
var flagI = false;
$( ".yanma" ).html( charcters() );
// 点击 换一张
$( ".yanma" ).click( function(){ $( this ).html( charcters() );return false; } )
$( "#yan" ).blur( function(){
	strI = $( "#yan" ).val();
	if( strI == "" ){
		$( this ).parent().next().html( "请输入图形验证码" );
	}else if( strI != $( ".yanma" ).text() ){
		$( this ).parent().next().html( "图形验证码不匹配" );
	}else{
		$( this ).parent().next().html( "" );
		flagI = true;
	}
} )



// ----------------------------------------------------------------------------------------------------------------------
// 短信验证码
var strE = "";
var flagE = false;
var num = "";
var i = 60;
$( ".email_ma" ).click( function(){
	if( $( "#yan" ).val() == "" ){
		$( "#yan" ).parent().next().html( "请填写图形验证码" )
	}else{	
		if( i > 0 && i < 60 ){
			return;
		}
		// 变内容
		var timer = setInterval( function(){
			$( this ).html( `剩余秒数:${i}` );
			i--;
			if( i == -1 ){
				clearInterval( timer );
				i = 60;
				$( this ).html( "重新获取" )
			}
		}.bind( this ) , 1000 )
		if( $( this ).text().indexOf( "秒" ) == -1 ){
			num = numa();
			alert( "验证码为----"+num+"，一定记住哦！！！" );
			return;
		}
	} 
} )
$( "#email" ).blur( function(){
	strE = $( this ).val();
	if( strE == "" ){
		$( this ).parent().next().html( "请填写短信验证码" )
	}else if( strE == num ){
		$( this ).parent().next().html( "" );
		flagE = true;
	}else{
		$( this ).parent().next().html( "短信验证码不匹配" );
	}
} )



// ---------------------------------------------------------------------------------------------------------------------------
// 密码
var strW = "";
var flagW = false;
$( "#pwd" ).blur( function(){
	strW = $( this ).val();
	let reg = /^.{6,10}$/;
	if( strW == "" ){
		$( this ).parent().next().html( "请输入密码" );
	}else if( reg.test( strW ) ){
		$( this ).parent().next().html( "" );
		flagW = true;
	}else{
		$( this ).parent().next().html( "密码应为6-20位任意字符组合" );
	}
} )


// ---------------------------------------------------------------------------------------------------------------------------
// 确认密码
var strWa = "";
var flagWa = false;
$( "#pwd_again" ).blur( function(){
	strWa = $( this ).val();
	if( strWa != strW ){
		$( this ).parent().next().html( "两次密码不一致，请检查您的密码" );
	}else{
		$( this ).parent().next().html( "" );
		flagWa = true;
	}
} )



$( "#btn" ).click( function(){
	console.log( flagP , flagI ,flagE,flagW,flagWa )
	if( flagP && flagI && flagE && flagW && flagWa ){
		$.ajax({
			type : "get" ,
			url : `http://127.0.0.1/watch/php/log_reg.php?status=register&phone=${strP}&pwd=${strW}` ,
			async : true ,
			success : function( res ){
				switch( Number(res) ){
					case 0 : {
						if( confirm( "注册成功！需要直接登陆么？" ) ){
							var pro = {};
							pro = {
								"phone" : strP ,
								"pwd" : strW 
							}
							setCookie( "user" , JSON.stringify( pro ) , 10 );
							location.href = "http://127.0.0.1/watch/index.html"; 
						}else{
							alert( "OK!我晓得了...." );
							location.href = "http://image.baidu.com/"
						}
						break;
					};
					case 1 : alert( "" ) ; break;
					case 2 : alert( "已经被注册过了！请重新注册一个吧！" ) ; break;
				}
			}
		})
		
	}else{
		alert( "请正确填写" );
	}
} );