// 判断有无cookie 转到首页时，转换内容
// window.onload = function(){
	var pro = getCookie( "user" );
	if( pro != "" ){
		var phone = pro.phone;
		$( "#login" ).html( "您好！  "+phone );
		$( "#register" ).html( "退出" );
		$( "#register" ).click( function(){
			alert( "退出成功！" );
			removeCookie( "user" );
			location.href = "http://127.0.0.1/watch/login.html"
		} )
	}else{
		$( "#register" ).click( function(){
			location.href = "http://127.0.0.1/watch/register.html"
		} )
	}


	// ----------------------------------------------------------------------------------------------------------------------
	// 美女的脸
	$( ".face" ).hover( function(){
		$( ".face_kuang" ).css( "display" , "block" ).animate( { "right" : 80 , "opacity" : 1 } )
		return false;
	} , function(){
		$( ".face_kuang" ).animate( { "right" : 75 , "opacity" : 0 } ).css( "display" , "none" )
	} )
	$( ".fk_x" ).click( function(){
		$( ".face_kuang" ).animate( { "right" : 75 , "opacity" : 0 } ).css( "display" , "none" )
	} )

	// 几个功能
	$( ".use" ).find( "a" ).each( function(){
		$( this ).hover( function(){
			$( this ).css( "background" , "#f1f1f1" )
					.find( "i:eq(0)" ).css( "display" , "none" )
					.next().css( "display" , "block" )
					.next().fadeIn(300)
		} , function(){
			$( this ).css( "background" , "#fff" )
					.find( "i:eq(0)" ).css( "display" , "block" )
					.next().css( "display" , "none" )
					.next().fadeOut( 300 )
		} )
	} )

	// 返回顶部
	$( ".use_a5" ).click( function(){
		$( "html , body" ).animate( {"scrollTop" : 0 });
	} )


	// ------------------------------------------------------------------------------------------------------------------------
	// 客户服务
	$( ".servie_a" ).hover(function(){
		$( this ).find( "a:first" ).addClass( "a_border" )
				.next().slideDown( 100 )
	} , function(){
		$( this ).find( "a:first" ).removeClass( "a_border" )
				.next().slideUp( 100 )
	})
	
	// 购物车
	var goods = getCookie( "goods" );
	var num = 0;
	if( goods.length > 0){
		for( var i in goods ){
			num += Number(goods[i].count);
		}
		$( ".use_a1" ).find( "em" ).css( "display" , "block" ).html( num );
		$( "#shopcar" ).addClass( "change" ).html( "购物车（"+num+"）" )
	}else{
		$( ".use_a1" ).find( "em" ).css( "display" , "none" )
		$( "#shopcar" ).removeClass( "change" ).html( "购物车" )
	}

	// 点击购物车---跳转到购物车页面
	$( "#shopcar" ).click( function(){
		location.href = "http://127.0.0.1/watch/shopcar.html"
	} )

// }