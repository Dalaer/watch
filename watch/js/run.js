// 运动函数
function run( obj , json , fn ){
	clearInterval( obj.timer );
	obj.timer = setInterval( function(){
		var flag = true;
		for( var attr in json ){
			var cur = 0;
			if( attr == "opacity" ){
				cur = get( obj , attr ) * 100;
			}else{
				cur = parseInt( get( obj , attr ) )
			}

			var speed = (json[attr] - cur)/10;
			speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed ) ;

			if( cur != json[attr] ){
				flag = false
			}
			if( attr == "opacity" ){
				obj.style[attr] = (cur + speed)/100
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr]
			}else{
				obj.style[attr] = cur + speed + "px";
			}
		}

		if( flag ){
			clearInterval( obj.timer );
			if( fn ){
				fn()
			}
		}
	},30 )
}

// 获得样式值
function get( obj , attr ){
	if( window.getComputedStyle ){
		return window.getComputedStyle( obj , false )[attr]
	}else{
		return obj.currentStyle[attr]
	}
}