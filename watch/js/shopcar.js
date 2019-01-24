window.onload = function(){
	var arr = getCookie( "goods" );
	if( arr.length > 0 ){
		var str = "";
		for( var i in arr ){
			var pro = arr[i];
			var price = arr[i].sell.split( "," ).join("");
			console.log( price )
			str += `<div class="store_goods">
						<div class="store_top">
							<span class="select_tik fl"><input type="checkbox" class="ck1"></span>
							<a href="javascript:;">瑞士爱宝时官方旗舰店</a>
						</div>
						<div class="store_bottom hasheight">
							<div class="goods_right hasheight">
								<span class="sele_tix"><input type="checkbox" class="ck"></span>
								<a href="javascript:;" class="fl">
									<div class="goods_img fl">
										<img src="img/shop.jpg" alt="">
									</div>
									<div class="goods_txt fl">
										<p class="p1">${pro.name}</p>
										<p class="p2">真皮 黑色 牛皮</p>
									</div>
								</a>
								<ul class="fr">
									<li class="goods_price fl">￥<em>${pro.sell}</em></li>
									<li class="goods_num" data-id="${pro.id}">
										<span data-num="-1">-</span>
										<input type="text" value="${pro.count}" class="goods_num_count" style="outline:0">
										<span data-num="1">+</span>
									</li>
									<li class="total_price">
										￥<em>${ price * pro.count }</em>
									</li>
									<li class="others">
										<a href="javascript:;" class="delete_goods">删除</a>
										<a href="javascript:;" class="move_to">移入收藏</a>
									</li>
								</ul>
							</div>
						</div>
					</div>`
		}
		$( ".cart_content" ).html( str );
	}


	// 点击+-时 数量变化
	$( ".goods_num" ).on( "click" , "span" , function(){
		var num = $( this ).data( "num" );
		var count = $( this ).parent().find( "input" );
		
		var id = $( this ).parent().data( "id" );
		var totalprice = $( this ).parent().parent().find( ".total_price" ).find( "em" );
		if( $( ".goods_num_count" ).val() == 1 && num == "-1" ){
			return;
	 	}
	 	for( var i in arr ){
	 		var price = arr[i].sell.split( "," ).join("");
	 		if( id == arr[i].id ){
	 			arr[i].count += Number(num);
	 			count.val( arr[i].count );
	 			totalprice.html( arr[i].count * price );
	 			setCookie( "goods" , JSON.stringify( arr ) );
	 			break;
	 		}
	 	}
		account();
	 	return false;
	} )


	// 全选按钮
	$( ".select_all" ).click( function(){
		$( ".ck" ).prop( "checked" , $(this).prop( "checked" ) );
		$( ".ck1" ).prop( "checked" , $(this).prop( "checked" ) );
		$( ".select_all" ).prop( "checked" , $(this).prop( "checked" ) );
		account();
	} )


	// 删除
	$( ".delete_goods" ).click( function(){
		var id = $(this).parent().parent().find( ".goods_num" ).data( "id" );
		for( var i in arr ){
			if( id == arr[i].id ){
				arr.splice( i , 1 );
				$(this).parent().parent().parent().parent().parent().remove();
				setCookie( "goods" , JSON.stringify( arr ) );
				break;
			}
		}
		account();
	} )

	// 结算
	function account(){
		var sum = 0;
		var count = 0;
		// 遍历所有的复选框
		$( ".ck:checked" ).each( function(){
			count += Number($(this).parent().parent().find( ".goods_num" ).find( "input" ).val());
			sum += Number($(this).parent().parent().find( ".total_price" ).find( "em" ).html());
		} )
		$( ".select_goods" ).html( count );
		$( ".settle_price" ).find( "span" ).html( sum );
	}
}