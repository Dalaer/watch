window.onload = function(){
	// 判断参数
	var href = location.href.split( "?" )[1];
	var arr = href.split( "&" );
	var id = arr[arr.length-1].split( "=" )[1];
	$.ajax( {
		type : "get" ,
		url : "http://127.0.0.1/watch/js/data1.json?date=" + new Date().getTime() ,
		async : true ,
		success : function(res){
			var attr = arr[0].split( "=" )[1];
			var direction = arr[1].split( "=" )[1];
			if( arr.length > 2 ){
				for( var i in res[attr] ){
					// 判断是否是一个数组
					var obj = res[attr][i][direction];
					if( obj instanceof Array ){
						for( var i in obj ){
							if( obj[i].id == id ){
								$( ".bigm_right" ).find( "h3" ).html( obj[i].name );
								$( ".now_price" ).html( obj[i].sell.split( "￥" )[1] )
							}
						}
					}else{
						if( obj.id == id ){
							$( ".bigm_right" ).find( "h3" ).html( obj.name );
							$( ".now_price" ).html( obj.sell.split( "￥" )[1] );
							return;
						}
					}
				}
			}else{
				for( var i in res[attr] ){
					if( res[attr][i].id == id ){
						$( ".bigm_right" ).find( "h3" ).html( res[attr][i].name );
						$( ".now_price" ).html( res[attr][i].sell.split( "￥" )[1] );
					}
				}
			}
		} 
	})
	
	// 导航栏的特效
	$( ".nav_center" ).find( "ul li a" ).hover( function(){
		$(this).addClass( "on" ).parent().siblings().removeClass( "on" );
	} , function(){
		$(this).removeClass( "on" ).parent().siblings().removeClass( "on" );
	} )

	// 移入attention 时，注意框会出来
	$( ".icon_attention" ).hover( function(){
		$( ".ic_attention_box" ).fadeIn( 1000 )
	} , function(){
		$( ".ic_attention_box" ).fadeOut( 1000 )
	} )

	// 鼠标划上会有小框出来
	$( ".pro_right" ).find( "li span" ).hover( function(){
		$( this ).addClass( "on" ).parent().siblings().find( "span" ).removeClass( "on" )
				.end().end().find( "div" ).fadeIn( 500 )
	} , function(){
		$( this ).removeClass( "on" ).parent().siblings().find( "span" ).removeClass( "on" )
				.end().end().find( "div" ).fadeOut( 500 )
	} )


	// 放大镜
	// 鼠标移入 鼠标移动 鼠标划上
	$( ".bigl_top" ).hover( function(){
		$( this ).find( ".big_img" ).animate( { "opacity" : 1 } )
		$( ".mask" ).css( "display" , "block" )
	} ,function(){
		$( this ).find( ".big_img" ).animate( { "opacity" : 0 } )
		$( ".mask" ).css( "display" , "none" )
	} )
	// 鼠标移动
	$( ".bigl_top" ).mousemove( function( e ){
		var e = e || event;
		var x = e.pageX - $(this).offset().left - $(".mask").width()/2;
		var y = e.pageY - $(this).offset().top - $(".mask").height()/2;
		var maxL = $(this).width() - $(".mask").width() - 10;
		var maxT = $(this).height() - $(".mask").height() - 10;
		x = Math.max( 10 , Math.min( x , maxL ) );
		y = Math.max( 10 , Math.min( y , maxT ) );
		$(".mask").css( { "left" : x , "top" : y } );
		var bx = x*( $( ".big_img" ).find( "img" ).width() - $(this).width() ) / ( $(this).width() - $(".mask").width() );
		var by = y*( $( ".big_img" ).find( "img" ).height() - $(this).height() ) / ( $(this).height() - $(".mask").height() );
		$( ".big_img" ).find( "img" ).css( { "left" : -bx , "top" : -by } );
	} )

	// 鼠标划上换图
	// 默认第一个是完全显示的
	$( ".bigc_content ul li:first" ).addClass( "opacity" );
	$( ".bigc_content" ).find( "ul li" ).mouseenter( function(){
		$(this).addClass( "opacity" ).siblings().removeClass( "opacity" );
		$( ".normal_img" ).find( "img" ).eq( $(this).index() ).css( "display" , "block" )
							.siblings().css( "display" , "none" );
		$( ".big_img" ).find( "img" ).eq( $(this).index() ).css( "display" , "block" )
							.siblings().css( "display" , "none" );

	} )


	// 点击数量的加减
	$( ".num_right" ).find( "span" ).click( function(){
		if( $( "#count" ).val() == 1 && $(this).data( "num" ) == "-1" ){
			return;
		}
		$( "#count" ).val( Number($( "#count" ).val()) + Number($(this).data( "num" ) ) );
		return false;
	} )


	// 点击加入购物车	
	var crr = [];
	$( ".add" ).click( function(){
		function goods(){
			var goods = getCookie( "goods" );
			var num = 0;
			if( goods ){
				for( var i in goods ){
					num += Number(goods[i].count);
				}
				$( ".use_a1" ).find( "em" ).css( "display" , "block" ).html( num );
				$( "#shopcar" ).addClass( "change" ).html( "购物车("+num+")" )
			}else{
				$( ".use_a1" ).find( "em" ).css( "display" , "none" )
				$( "#shopcar" ).removeClass( "change" ).html( "购物车" )
			}
		}
		
		var pro = {};
		pro = {
			"id" : id ,
			"name" : $( ".bigm_right" ).find( "h3" ).html() ,
			"sell" : $( ".now_price" ).html() , 
			"count" : Number($( "#count" ).val()) 
		}
		var flag = true; // 如果值为真，就将对象存入cookie中
		// 判断这个东西在cookie中有无
		var brr = getCookie( "goods" );
		if( brr.length > 0 ){
			crr = brr ;
			for( var i in crr ){
				if( id == crr[i].id ){
					crr[i].count += Number(pro.count);
					flag = false;
					break;
				}
			}
		}
		if( flag ){
			crr.push( pro )
		}
		// 判断现在的数量，将所有的东西都存进到一个对象中，然后存到cookie中---姓名 单价 数量 小计
		setCookie( "goods" , JSON.stringify( crr ) );
		goods();
		return false;
	} )

}