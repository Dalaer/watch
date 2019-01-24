<?php
	header("content-type:text/html;charset=utf-8");
	header("Access-Control-Aallow-Origin");
	// 连接数据库
	$db = mysql_connect("localhost" , "root" , "root");
	// 选择数据源
	mysql_select_db( "db1822" , $db );
	// 设置字符格式
	mysql_query( "set name utf8" );

	// isset判断是否传过来参数
	$status = isset($_GET["status"]) ? $_GET["status"] : "";
	$phone = isset($_GET["phone"]) ? $_GET["phone"] : "";
	$pwd = isset($_GET["pwd"]) ? $_GET["pwd"] : "";

	// 查询
	$sql = "select * from phone where phone='$phone'";
	$res = mysql_query( $sql );
	$arr = mysql_fetch_array( $res );

	// 注册
	if( $status == "register" ){
		if( $arr ){
			echo 2;//已经被注册过了
		}else{
			$sql = "insert into phone(phone,pwd) values('$phone','$pwd')";
			$res = mysql_query( $sql );
			if( $res ){
				echo 0;//注册成功
			}else{
				echo 1;//注册失败
			}
		}
	}else{
		if( !$arr ){
			echo 2;//无用户名
		}else{
			if( $arr["pwd"] == $pwd ){
				echo 0;//登录成功
			}else{
				echo 1;//密码不正确
			}
		}
	}
?>