// 点击对应的登陆手段  显示对应的登录界面
// 会员登录
$( ".member_login" ).click( function(){
	$( this ).addClass( "on" ).parent().siblings().find( "a" ).removeClass( "on" );
	$( ".member" ).css( "display" , "block" ).nextAll().css( "display" , "none" );


} )

// 用户名登录
$( ".username_login" ).click( function(){
	$( ".username" ).css( "display" , "block" )
					.prev().css( "display" , "none" )
					.end().next().css( "display" , "none" )
} )

// 扫码登录
$( ".scanCode_login" ).click( function(){
	$( this ).addClass( "on" ).parent().siblings().find( "a" ).removeClass( "on" );
	$( ".scanCode" ).css( "display" , "block" )
					.prev().css( "display" , "none" )
					.prev().css( "display" , "none" )
} )



// --------------------会员登录-----------------------------------------------------------------------------------------
$( "#btn_member" ).click( function(){
	// 是否为空就点击登录
	if( $( "#phone" ).val() == "" ){
		$( "#phone" ).next().html( "请填入您的手机号码" )
	}else if( $( "#ma" ).val() == "" ){
		$( "#ma" ).next().next().html( "verifyCode:[不能为空]" )
	}else if( $("#email").val() == "" ){
		$( "#email" ).parent().find( "i" ).html( "短信验证码不能为空！" )
	}else if( flagP && flagI && flagE ){
		$.ajax({
			type : "get" ,
			url : `http://127.0.0.1/watch/php/log_reg.php?status=login&phone=${strP}` ,
			async : true ,
			success : function( res ){
				switch( Number(res) ){
					case 0 : alert( "登录成功！将直接跳转到首页哦~" );location.href="../index.html?phone="+strP;break;
					case 2 : alert( "用户名不存在！" );break;
				}
			}
		})
	}else{
		return false;
	}
} )

// 手机号
var strP = "";
var flagP = false;

$( "#phone" ).blur( function(){
	strP = $(this).val();
	let reg = /^1[35678]\d{9}$/;
	if( reg.test( strP ) ){
		flagP = true;
		$( this ).next().html( "" )
	}else{
		$( this ).next().html( "请正确填写手机号码" )
	}
} )
// 图形验证码
var strI = "";
var flagI = false;
// 将验证码放到图形box中
$( ".img" ).html( charcters() );
// 点击 换一张图片
$( ".img" ).click( function(){ $(this).html( charcters() );return false; } )
$( "#ma" ).blur( function(){
	strI = $(this).val();
	if( strI == $( ".img" ).text() ){
		$(this).next().next().html( "" );
		flagI = true;
	}else if( strI == "" ){
		$(this).next().next().html( "请填写图形验证码" );
	}else{
		$(this).next().next().html( "图形验证码不匹配" )
	}
} )
// 获取验证码
var strE = "";
var flagE = false;
var i = 180;
var num = 0 ;
$( ".email_ma" ).click( function(){
	// 先判断手机号是否填写
	if( $( "#phone" ).val() == "" ){
		$( "#phone" ).next().html( "请填写手机号码" )
	}else if( $( "#ma" ).val() == "" ){
		$("#ma").next().next().html( "verifyCode:[不能为空]" );
	}else{
		// 如果现在正在倒数，判断i的大小，如果在3分钟内，直接出去，没有事件再发生
		if( i >0 && i < 180 ){
			$(this).next().html( "该手机获取验证码过于频繁" )
			return;
		}
		// 先变内容，再判断，不然就直接出去了
		var timer = setInterval( function(){
			$( this ).html( "剩余秒数："+i );
			i--;
			if( i < 0 ){
				clearInterval( timer );
				// 重新更定i，重新开始定时
				i = 180;
				$( this ).html( "重新获取验证码" )
			}
		}.bind( this ) , 1000 )
		// 判断内容
		if( $(this).html().indexOf( "秒" ) == -1 ){
			num = numa();
			alert( "这是验证码：" + num + "，(一定记住哦！！！)" );
			$( this ).next().html( "该短信验证码3分钟内有效" )
			return;
		}
	}
} )
$( "#email" ).blur( function(){
	strE = $(this).val();
	if( strE == num ){
		$(this).parent().find( "i" ).html( "" );
		flagE = true;
	}else{
		$(this).parent().find( "i" ).html( "短信验证码不匹配哦！" )
	}
} )


// -----------------------用户登录----------------------------------------------------------------------------
$( "#btn_user" ).click( function(){
	if( $( ".user_phone" ).val() == "" ){
		$( ".user_phone" ).next().html( "请填写手机号" )
	}else if( $( ".user_pwd" ).val() == "" ){
		$( ".user_pwd" ).next().html( "请正确填写密码" )
	}else if( flagUp && flagUw ){
		console.log( conUp )
		$.ajax({
			type : "get" ,
			url : `http://127.0.0.1/watch/php/log_reg.php?status=login&phone=${conUp}&pwd=${conUw}` ,
			async : true ,
			success : function( res ){
				switch( Number(res) ){
					case 0 :{
						alert( "登录成功！将直接跳转到首页哦~" );
						// 将数据存入cookie中
						var pro = { "phone" : conUp };
						setCookie( "user" , JSON.stringify( pro ) );
						location.href="index.html";
						break;
					};
					case 1 : alert( "密码不正确！" );break;
					case 2 : alert( "用户名不存在！" );break;
				}
			}
		})
	}else{
		return false;
	}
} )

// 手机号
var conUp = "";
var flagUp = false;
$( "#user_phone" ).blur( function(){
	conUp = $(this).val();
	let reg = /^1[3587]\d{9}$/;
	if( reg.test( conUp ) ){
		$(this).next().html( "" );
		flagUp = true
	}else{
		$(this).next().html( "请正确填写手机号" );
	}
} )
// 密码
var conUw = "";
var flagUw = false;
$( "#user_pwd" ).blur( function(){
	conUw = $(this).val();
	if( conUw == "" ){
		$( this ).next().html( "请正确填写密码" )
	}else{
		$( this ).next().html("");
		flagUw = true;
	}
} )