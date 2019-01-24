// 从数据库中获取数据，动态创建
//运用jquery  ajax来获取
// window.onload = function(){
	// 第二块儿中间的小图轮播
	$.ajax({
		type: "get",
		url : "http://127.0.0.1/watch/js/data1.json?data=" + new Date().getTime(),
		async : true ,
		success : function(res){
			// 限时购中的轮播图--------
			$list = res.xianshigou;
			var str = "";
			var $uli = $( ".mtbc_center" ).find( "ul" );
			var $w = 190*3;
			for( var $i in $list ){
				var pro = $list[$i];
				str += `<li>
							<a href="http://127.0.0.1/watch/goods.html?alive=xianshigou&id=${pro.id}">
								<img src="img/${ pro.src }" alt="">
								<div class="mtbc_p">
									<p class="c_p">${ pro.name }</p>
									<div class="c_span">
										<span class="discount">
											<em>${ pro.discount }</em>折
										</span>
										<span class="xian_now">${ pro.sell }</span>
									</div>
									<p class="xian_prev">${ pro.prev }</p>
								</div>
							</a>
						</li>`
			}
			for( var $i in $list ){
				var pro = $list[$i]
				if( $i == 4 ){
					break;
				}
				str += `<li>
							<a href="http://127.0.0.1/watch/goods.html?alive=xianshigou&id=${pro.id}">
								<img src="img/${ pro.src }" alt="">
								<div class="mtbc_p">
									<p class="c_p">${ pro.name }</p>
									<div class="c_span">
										<span class="discount">
											<em>${ pro.discount }</em>折
										</span>
										<span class="xian_now">${ pro.sell }</span>
									</div>
									<p class="xian_prev">${ pro.prev }</p>
								</div>
							</a>
						</li>`
			}
			$uli.html( str );
			// 轮播
			var timer = null;
			var s = 0;
			timer = setInterval( play , 2000 );
			function play(){
				s++;
				if( s == 5 ){
					s = 1;
					$uli[0].style.left = 0;
				}
				run( $uli[0] , { "left" : -s*$w  } )
				
			}
			$( ".mtb_prev" ).click( function(){
				clearInterval( timer );
				if( s == 0 ){
					$uli[0].style.left = -4*$w + "px";
					s = 4;
				}
				s-=2;
				play();
				timer = setInterval( play , 2000 );
			} )
			$( ".mtb_next" ).click( function(){
				clearInterval( timer );
				if( s == 5 ){
					s=0;
				}
				play();
				timer = setInterval( play , 2000 );
			} )
		}
	})
	

	// ---------------------------------------------------------------------------------------------------------------------------
	// 达人甄选的轮播
	$.ajax({
		type : "get" ,
		url : "js/data1.json?date=" + new Date().getTime(),
		async : true ,
		success : function( res ){
			$daren = res.daren;
			function addstr( x ){
				var str = "" ;
				var pro = $daren[x];
				str += `<div class="mt_one">
							<div class="mtb_left">
								<a href="http://127.0.0.1/watch/goods.html?alive=daren&direction=left&id=${pro.left.id}"class="mtb_l_a a_h2">
									<img src="img/${ pro.left.src }" alt="" class="a_h2">
									<div class="mtb_l_p">
										<p class="mtb_p1">${ pro.left.name }</p>
										<p class="mtb_p2">${ pro.left.p2 }</p>
									</div>
									<i class="bg_img"></i>
								</a>
							</div>
							<div class="mth_right">
								<a href="http://127.0.0.1/watch/goods.html?alive=daren&direction=right&id=${pro.right[0].id}"><img src="img/${ pro.right[0].src }" alt=""></a>
								<a href="http://127.0.0.1/watch/goods.html?alive=daren&direction=right&id=${pro.right[1].id}"><img src="img/${ pro.right[1].src }" alt=""></a>
								<a href="http://127.0.0.1/watch/goods.html?alive=daren&direction=right&id=${pro.right[2].id}"><img src="img/${ pro.right[2].src }" alt=""></a>
								<a href="http://127.0.0.1/watch/goods.html?alive=daren&direction=right&id=${pro.right[3].id}"><img src="img/${ pro.right[3].src }" alt=""></a>
							</div>
						</div>`;
				return str;
			}
			
			var sname = "" ;
			for( var i = 0 ; i < $daren.length ; i++ ){
				var pro = $daren[i];
				sname += `<li><a href="javascript:;">${ pro.name }</a><i class="on_i"></i></li>`;
			}
			$( ".menu1" ).find( "ol" ).html( sname );
			$( ".menu1" ).find( "li a:first" ).addClass( "on" ).next().css( "display" , "block" );
			$( ".down1" ).html( addstr(0) );
			// 鼠标移入每一个时让其显示
			$( ".menu1 ol li" ).mouseenter(function(){
				$( ".down1" ).html( addstr( $(this).index() ) )
			} )
			
			// 点击前一个和后一个
			$( ".mtt_p" ).click( function(){
				var $i = 0;
				$( ".menu1" ).find( "a" ).each( function(i){
					if( $(this).hasClass( "on" ) ){
						$i = i;
					}
				} )
				if( $i == 0 ){
					$i = $daren.length;
				};
				$i--;
				$( ".down1" ).html( addstr($i) );
				$( ".menu1" ).find( "li" ).eq($i).find("a").addClass( "on" ).next().css( "display" , "block" )
							.end()
							.end().siblings().find( "a" ).removeClass( "on" ).next().css( "display" , "none" );
			} );
			$( ".mtt_n" ).click( function(){
				var $i = 0;
				$( ".menu1" ).find( "a" ).each( function(i){
					if( $(this).hasClass( "on" ) ){
						$i = i;
					}
				} )
				if( $i == $daren.length-1 ){
					$i = -1;
				};
				$i++;
				$( ".down1" ).html( addstr($i) );
				$( ".menu1" ).find( "li" ).eq($i).find("a").addClass( "on" ).next().css( "display" , "block" )
							.end()
							.end().siblings().find( "a" ).removeClass( "on" ).next().css( "display" , "none" );
			} )
			// // 让每一个小图鼠标划上有阴影
			// $( ".mt_one .mth_right" ).on( "mouseenter" , "a" , function(){
			// 	$( this ).css( "box-shadow" , "0 2px 10px 0 rgba( 0 , 0 , 0 , .5 )" )
			// })
			// $( ".mt_one .mth_right" ).on( "mouseleave" , "a" , function(){
			// 	$( this ).css( "box-shadow" , "none" )
			// })
			
		} 
	})


	// ------------------------------------------------------------------------------------------------------------------------
	// 排行榜
	$.ajax({
		type : "get" ,
		url : "js/data1.json?date=" + new Date().getTime(),
		success : function( res ){
			$pai = res.paihang;
			var smenu = "";
			for( var i in $pai ){
				var pro = $pai[i];
				smenu += `<li><a href="">${pro.name}</a><i class="on_i"></i></li>`
			}
			$( ".menu2" ).find( "ol" ).html( smenu )
			$( ".menu2" ).find( "li a:first" ).addClass( "on" ).next().css( "display" , "block" );
			// 左边
			function addleft( x ){
				var str = "" ;
				var pro = $pai[x].left;
				str += `<a href="http://127.0.0.1/watch/goods.html?alive=paihang&direction=left&id=${pro.id}" class="mtb_l_a a_h3">
							<img src="img/${pro.src}" alt="" class="a_h2">
							<div class="mtb_l_p">
								<p class="mtb_p1">${ pro.name }</p>
								<p class="mtb_p2">${ pro.p2 }</p>
							</div>
							<i class="bg_img"></i>
						</a>`;
				return str;
			}
			$( ".left3" ).html( addleft(0) );
			// 中间
			function addcenter( x ){
				var str = "" ;
				var pro = $pai[x].center;
				str += `<a href="http://127.0.0.1/watch/goods.html?alive=paihang&direction=center&id=${pro.id}" class="mfc_a">
							<i class="i_con i_bac">No.1</i>
							<div class="mfca_img">
								<img src="img/${pro.img}" alt="">
							</div>
							<div class="mfca_p">
								<p class="mfca_pimg"><img src="img/${pro.src}" alt=""></span>
								<p class="mfca_p1">${pro.name}</p>
								<span class="now_sell">${pro.sell}</span>
								<span class="now_count">/ 销量<b>${pro.count}</b></span>
								<span class="sp_check">立即查看</span>
							</div>
						</a>`;
				return str;
			}
			$( ".center3" ).html( addcenter( 0 ) );
			// 右边
			function addright( x ){
				var str = "";
				var arr = $pai[x].right;
				for( var i in arr){
					var pp = arr[i];
					var x = ++i ;
					str += `<li>
								<a href="http://127.0.0.1/watch/goods.html?alive=paihang&direction=right&id=${pp.id}">
									<i>No.${++x}</i>
									<img src="img/${pp.src}" alt="">
									<div class="introduce">
										<p class="inp1">${pp.name}</p>
										<span class="now_sell">${pp.sell}</span>
										<span class="now_count">/ 销量<b>${pro.count}</b></span>
									</div>
								</a>
							</li>`
				}
				return str;
			}
			$( ".mf_right" ).find( "ul" ).html( addright( 0 ) );
			// 鼠标移入让其对应显示
			$( ".menu2 ol li" ).mouseenter( function(){
				let $i = $( this ).index();
				$( ".left3" ).html( addleft($i) );
				$( ".center3" ).html( addcenter( $i ) );
				$( ".mf_right" ).find( "ul" ).html( addright( $i ) );
			} )
			// 点击前一个和后一个
			$( ".mf_p" ).click( function(){
				var $i = 0;
				$( ".menu2" ).find( "a" ).each( function(i){
					if( $(this).hasClass( "on" ) ){
						$i = i;
					}
				} )
				if( $i == 0 ){
					$i = $pai.length;
				};
				$i--;
				$( ".left3" ).html( addleft($i) );
				$( ".center3" ).html( addcenter( $i ) );
				$( ".mf_right" ).find( "ul" ).html( addright( $i ) );
				$( ".menu2" ).find( "li" ).eq($i).find("a").addClass( "on" ).next().css( "display" , "block" )
							.end()
							.end().siblings().find( "a" ).removeClass( "on" ).next().css( "display" , "none" );
			} );
			$( ".mf_n" ).click( function(){
				var $i = 0;
				$( ".menu2" ).find( "a" ).each( function(i){
					if( $(this).hasClass( "on" ) ){
						$i = i;
					}
				} )
				if( $i == $pai.length-1 ){
					$i = -1;
				};
				$i++;
				$( ".left3" ).html( addleft($i) );
				$( ".center3" ).html( addcenter( $i ) );
				$( ".mf_right" ).find( "ul" ).html( addright( $i ) );
				$( ".menu2" ).find( "li" ).eq($i).find("a").addClass( "on" ).next().css( "display" , "block" )
							.end()
							.end().siblings().find( "a" ).removeClass( "on" ).next().css( "display" , "none" );
			} ) 
		}
	})


	// ---------------------------------------------------------------------------------------------------------------
	// 品牌馆
	$.ajax({
		type : "get" ,
		url : "js/data1.json" ,
		success : function( res ){
			$logo = res.logo;
			var str = "" ;
			for( var i in $logo ){
				var pro = $logo[i];
				str += `<li><a href="">${pro.name}</a><i class="on_i"></i></li>`;
			}
			$( ".menu3" ).find( "ol" ).html( str );
			$( ".menu3" ).find( "li a:first" ).addClass( "on" ).next().css( "display" , "block" );

			// 大图上有小图显示
			function adddl( x ){
				var str = "";
				var trr = $logo[x].top;
				var srr = $logo[x].small;
				for( var i in trr ){
					str += `<li>
								<a href="">
									<img src="img/${trr[i]}" alt="" class="mfia_im">
									<div class="mfi_im">
										<img src="img/${srr[i]}" alt="">
									</div>
								</a>
							</li>`
				}
				return str;
			}
			$( ".mfi_d1" ).find( "ul" ).html( adddl(0) );
			// 下方的logo
			function addlogo( x ){
				var str = "";
				var pro = $logo[x].bottom;
				for( var i in pro ){
					var pp = pro[i];
					str += `<dd>
								<a href="">
									<img src="img/${pp.src}" alt="">
									<span class="ch_dl">${pp.name}</span>
								</a>
							</dd>`
				}
				return str;
			}
			$( ".mfi_d1" ).find( "dl" ).html( addlogo(0) );
			// 移入让每一个对应显示
			$( ".menu3 ol li" ).mouseenter( function(){
				var $i = $(this).index();
				$( ".mfi_d1" ).find( "dl" ).html( addlogo($i) );
				$( ".mfi_d1" ).find( "ul" ).html( adddl($i) );
			} )
			// 点击上一个下一个
			$( ".mfi_p" ).click( function(){
				var $i = 0;
				$( ".menu3" ).find( "a" ).each( function(i){
					if( $(this).hasClass( "on" ) ){
						$i = i;
					}
				} )
				if( $i == 0 ){
					$i = $logo.length;
				};
				$i--;
				$( ".mfi_d1" ).find( "dl" ).html( addlogo($i) );
				$( ".mfi_d1" ).find( "ul" ).html( adddl($i) );
				$( ".menu3" ).find( "li" ).eq($i).find("a").addClass( "on" ).next().css( "display" , "block" )
							.end()
							.end().siblings().find( "a" ).removeClass( "on" ).next().css( "display" , "none" );
			} );
			$( ".mfi_n" ).click( function(){
				var $i = 0;
				$( ".menu3" ).find( "a" ).each( function(i){
					if( $(this).hasClass( "on" ) ){
						$i = i;
					}
				} )
				if( $i == $logo.length-1 ){
					$i = -1;
				};
				$i++;
				$( ".mfi_d1" ).find( "dl" ).html( addlogo($i) );
				$( ".mfi_d1" ).find( "ul" ).html( adddl($i) );
				$( ".menu3" ).find( "li" ).eq($i).find("a").addClass( "on" ).next().css( "display" , "block" )
							.end()
							.end().siblings().find( "a" ).removeClass( "on" ).next().css( "display" , "none" );
			} ) 
		}
	})	



	// -----------------------------------------------------------------------------------------------------------------------
	//移入显示
	$( ".mt_menu" ).on(  "mouseenter" , "li" , function(){
		$( this ).find( "a" ).addClass( "on" ).next().css( "display" , "block" )
				.end()
				.end().siblings().find( "a" ).removeClass( "on" ).next().css( "display" , "none" )
	})
	$( ".mth_right" ).on( "mouseenter" , "a" , function(){
		$( this ).css( "box-shadow" , "0 2px 10px 0 rgba( 0 , 0 , 0 , .5 )" )
	} )
	$( ".mth_right" ).on( "mouseleave" , "a" , function(){
		$( this ).css( "box-shadow" , "none" )
	} )


	// ----------------------------------------------------------------------------------------------------------------------
	// 腕表资讯
	$.ajax({
		type : "get" ,
		url : "js/data1.json?date=" + new Date().getTime(),
		async : true ,
		success : function( res ){
			$wrist = res.wanbiao;
			var str = "";
			var pleft = $wrist.left;
			str += `<a href="" class="mtb_l_a a_h ms_a">
						<img src="img/${ pleft.src }" alt="" class="a_h">
						<div class="mtb_l_p">
							<p class="mtb_p1">${ pleft.p1 }</p>
							<p class="mtb_p2">${ pleft.p2 }</p>
						</div>
						<i class="play"></i>
						<i class="bg_img"></i>
					</a>`
			$( ".ms_left" ).html( str );
			var prr = $wrist.right;
			var srr = "";
			for( var i in prr ){
				var pro = prr[i];
				srr += `<li>
							<a href="">
								<img src="img/${pro.img}" alt="">
								<div class="msr_bottom">
									<p class="msrb_p1">${pro.p1}</p>
									<div class="msrb_d2">
										<span class="msd2_img"><img src="img/${pro.src}" alt=""></span>
										<span class="msd2_p">${pro.p}</span>
										<span class="msd2_t">${pro.t}</span>
									</div>
								</div>
							</a>
						</li>`
			}
			$( ".ms_right" ).find( "ul" ).html( srr );
		}
	})
	

	// ------------------------------------------------------------------------------------------------------------------------
	// 尊享服务
	$.ajax({
		type : "get" ,
		url : "js/data1.json?date=" + new Date().getTime() , 
		async : true ,
		success : function( res ){
			$enjoy = res.enjoy;
			var str = "";
			for( var i in $enjoy ){
				var pro = $enjoy[i];
				str += `<li>
							<a href="">
								<img src="img/${ pro.img }" alt="">
								<div class="mse_p">
									<h3>${ pro.h3 }/h3>
									<p>${ pro.p }</p>
								</div>
							</a>
						</li>`
			}
			$( ".msv_bottom" ).find( "ul" ).html( str );
		}
	})


	// -------------------------------------------------------------------------------------------------------------------
	// 晒单分享
	$.ajax({
		type : "get" ,
		url : "js/data1.json?date=" + new Date().getTime() ,
		async : true ,
		success : function( res ){
			$shai = res.shai;
			var str = "" ;
			for( var i in $shai ){
				var pro = $shai[i];
				str += `<li>
							<a href="">
								<div class="me_im"><img src="img/${pro.src}" alt=""></div>
								<div class="me_p">
									<p>${pro.p}</p>
								</div>
							</a>
						</li>`
			}
			$( ".me_bottom" ).find( "ul" ).html( str );
		}
	})


	// ----------------------------------------------------------------------------------------------------------------
	// 猜你喜欢
	$.ajax({
		type : "get" ,
		url : "js/data1.json?dare=" + new Date().getTime() ,
		async : true ,
		success : function( res ){
			$like = res.like;
			var str = "" ;
			for( var i in $like ){
				var pro = $like[i];
				str += `<li>
							<a href="http://127.0.0.1/watch/goods.html?alive=like&id=${pro.id}">
								<div class="mn_im">
									<img src="img/${ pro.src }" alt="">
								</div>
								<div class="mnb_p">
									<p class="mn_p1">${ pro.p1 }</p>
									<p class="mn_p2">${ pro.name }</p>
									<p class="mn_p3">${ pro.sell }</p>
								</div>
							</a>
						</li>`
			}
			for( var i in $like ){
				var pro = $like[i];
				if( i == 4 ){
					break;
				}
				str += `<li>
							<a href="http://127.0.0.1/watch/goods.html?alive=like&id=${pro.id}">
								<div class="mn_im">
									<img src="img/${ pro.src }" alt="">
								</div>
								<div class="mnb_p">
									<p class="mn_p1">${ pro.p1 }</p>
									<p class="mn_p2">${ pro.name }</p>
									<p class="mn_p3">${ pro.sell }</p>
								</div>
							</a>
						</li>`
			}
			$( ".mn_bottom" ).find( "ul" ).html( str );
			// 定时器
			var timer = null;
			var s = 0 ;
			var $w = $( ".mn_bottom" ).width();
			timer = setInterval( play , 3000 );
			function play(){
				s++;
				if( s == 6 ){
					s = 1;
					$( ".mn_bottom" ).find( "ul" ).css( "left" , 0 );
				}
				run( $( ".mn_bottom" ).find( "ul" )[0] , { "left" : -s*$w } );
				$( ".mn_bottom" ).find( "ol li" ).eq( s==5?0:s ).addClass( "mn_on" )
								.siblings().removeClass( "mn_on" )

			}
			// 点击前一个和后一个
			$( ".mn_p" ).click( function(){
				clearInterval( timer );
				var $i = 0;
				$( ".mn_bottom" ).find( "ol li" ).each( function(i){
					if( $(this).hasClass( "mn_on" ) ){
						$i = i;
					}
				} )
				if( $i == 0 ){
					$( ".mn_bottom" ).find( "ul" ).css( "left" , -5*$w );
					s = 5;
				};
				s-=2;
				play();
				timer = setInterval( play , 3000 );
			} );
			$( ".mn_n" ).click( function(){
				clearInterval( timer );
				var $i = 0;
				$( ".mn_bottom" ).find( "ol li" ).each( function(i){
					if( $(this).hasClass( "mn_on" ) ){
						$i = i;
					}
				} )
				if( $i == 6 ){
					s = 0;
				};
				play();
				timer = setInterval( play , 3000 );
			} );
			// 点击每一个ol li 让其对应显示
			$( ".mn_bottom" ).on( "click" , "li" , function(){
				$(this).addClass( "mn_on" )
						.siblings().removeClass( "mn_on" );
				run( $( ".mn_bottom" ).find( "ul" )[0] , { "left" : -$(this).index()*$w } )
			} )
		}
	})


	// --------------------------------------------------------------------------------------------------------------
	//	吸顶效果
	$( window ).scroll( function(){
		var $top = $( document ).scrollTop();
		if( $top >= 140 ){
			$( ".nav_fix" ).css( "display" , "block" );
		}else{
			$( ".nav_fix" ).css( "display" , "none" );
		}
	} )
 // }