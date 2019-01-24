// banner轮播图的js
var uli = document.getElementsByClassName( "banner_ul" )[0].children;
var oli = document.getElementsByClassName( "banner_ol" )[0].children;
var prev = document.getElementsByClassName( "small_arrow_right" )[0];
var next = document.getElementsByClassName( "small_arrow_left" )[0];
var timer = null;
var x = 0 ;
timer = setInterval( play , 3000 );
// 点击
for( let i = 0 ; i < uli.length ; i++ ){
	oli[i].onclick = function(){
		x = i-1;
		play();
	}
}
//点击箭头
prev.onclick = function(){
	clearInterval( timer );
	if( x == 0 ){
		x = uli.length;
	}
	x-=2;
	play();
	timer = setInterval( play , 3000 );
}
next.onclick = function(){
	clearInterval( timer );
	if( x == uli.length ){
		x = 0;
	}
	play();
	timer = setInterval( play , 3000 );
}

//定时器运动函数
function play(){
	x++;
	if( x == 7 ){
		x = 0
	}
	clear();
	run( uli[x] , { "opacity" : 100 } );
	oli[x].className = "active";
}

// 清空
function clear(){
	for( var i = 0 ; i < uli.length ; i++ ){
		run( uli[i] , { "opacity" : 0 } );
		oli[i].className = "";
	}
}

// --------------------------------------------------------------------------------------------------------
//倒计时
var now = new Date().getTime();
var target = new Date( "2019/2/5 00:00:00" );
var chuo = (target - now)/1000 ;//变成秒
var countDown = document.getElementsByClassName( "mtt_r_l" )[0];
var t_d = document.getElementsByClassName( "t_d" )[0];
var t_h = document.getElementsByClassName( "t_h" )[0];
var t_m = document.getElementsByClassName( "t_m" )[0];
var t_s = document.getElementsByClassName( "t_s" )[0];
time();

//分装一个倒计时的函数
function time(){
	if( chuo < 0 ){
		countDown.innerHtml = "已经结束了哦！"
		return;
	}
	//获取日
	var d = parseInt( chuo/3600/24 );
	var h = parseInt( (chuo-d*24*3600)/3600 );
	var m = parseInt( (chuo-d*24*3600-h*3600)/60 );
	var s = parseInt( chuo-d*3600*24-h*3600-m*60 );
	t_d.innerHTML = toTwo( d );
	t_h.innerHTML = toTwo( h );
	t_m.innerHTML = toTwo( m );
	t_s.innerHTML = toTwo( s );
}
var countDownTime = setInterval( function(){
	chuo--;
	time();
	if( chuo < 0 ){
		clearInterval( countDownTime );
	}
} , 1000 )
//确保是两位
function toTwo( x ){
	if( x < 10 ){
		x = "0"+x;
		return x;
	}else{
		return x;
	}
}

// ---------------------------------------------------------------------------------------------------------------
//轮播
var mtuli = document.getElementsByClassName( "mtbr_center_ul" )[0].children;
var mtoli = document.getElementsByClassName( "mtbr_center_ol" )[0].children;
var mlp = document.getElementsByClassName( "mtb_r_prev" )[0];
var mln = document.getElementsByClassName( "mtb_r_next" )[0];
var mtimer = null;
var mx = 0;
mtimer = setInterval( mplay , 2000 );
function mplay(){
	mx++;
	if( mx == mtuli.length ){
		mx = 0
	}
	mclear();
	run( mtuli[mx] , { "opacity" : 100 } );
	mtoli[mx].className = "mbtr_a";

}
//清空
function mclear(){
	for( var i = 0 ; i < mtuli.length ; i++ ){
		run( mtuli[i] , { "opacity" : 0 } );
		mtoli[i].className = "";
	}
}
//点击
mlp.onclick = function(){
	clearInterval( mtimer )
	if( mx == 0 ){
		mx = mtuli.length;
	}
	mx-=2;
	mplay();
	mtimer = setInterval( mplay , 2000 );
}
mln.onclick = function(){
	clearInterval( mtimer )
	if( mx == mtuli.length ){
		mx = 0;
	}
	mplay();
	mtimer = setInterval( mplay , 2000 );
}
for( let i = 0 ; i < mtoli.length ; i++ ){
	mtoli[i].onclick = function(){
		clearInterval( mtimer );
		mx = i-1;
		mplay();
		mtimer = setInterval( mplay , 2000 );
	}
}

//-------------------------------------------------------------------------------------------------------------------
//移入上划(第三块儿右边小图的上划特效)
$( ".mf_right" ).on( "mouseenter" , "a" , function(){
	$( this ).find( ".introduce" ).animate( { "top" : $( this ).height()*0.6 } );
} )
$( ".mf_right" ).on( "mouseleave" , "a" , function(){
	$( this ).find( ".introduce" ).animate( { "top" : $( this ).height() } )
} )


// -------------------------------------------------------------------------------------------------------------------
// 移入显示（第四块儿小图的上浮显示）
$( ".mfi_d1" ).find( "ul" ).on( "mouseenter" , "a" , function(){
	$( this ).find( ".mfi_im" ).fadeIn(100)
			.end().find( ".mfia_im" ).css( {"filter" : "blur(4px)"}  )
} )
$( ".mfi_d1" ).find( "ul" ).on( "mouseleave" , "a" , function(){
	$( this ).find( ".mfi_im" ).fadeOut(100)
			.end().find( ".mfia_im" ).css( {"filter" : "blur(0)"} )
} )

// ---------------------------------------------------------------------------------------------------------------------
// 移入变色儿（第五块儿底下的logo）
$( ".mfi_d1" ).find( "dl" ).on( "mouseenter" , "a" , function(){
	$( this ).find( "img" ).hide()
			.end().find( "span" ).show()
} )
$( ".mfi_d1" ).find( "dl" ).on( "mouseleave" , "a" , function(){
	$( this ).find( "span" ).hide()
			.end().find( "img" ).show()
} )





