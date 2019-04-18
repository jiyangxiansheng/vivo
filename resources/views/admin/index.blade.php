@extends('layout.admins')
@section('title','后台首页')
@section('content')
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>主要内容区main</title>
<link href="/static/Include/css/css.css" type="text/css" rel="stylesheet">
<link href="/static/Include/css/main.css" type="text/css" rel="stylesheet">
<link rel="shortcut icon" href="/static/Include/images/main/favicon.ico">
<style>
body{overflow-x:hidden;  padding:15px 0px 10px 5px;}
#main{ font-size:12px;}
#main span.time{ font-size:14px; color:#528dc5; width:100%; padding-bottom:10px; float:left}
#main div.top{ width:100%; background:url(/static/Include/images/main/main_r2_c2.jpg) no-repeat 0 10px; padding:0 0 0 15px; line-height:35px; float:left}
#main div.sec{ width:100%; background:url(/static/Include/images/main/main_r2_c2.jpg) no-repeat 0 15px; padding:0 0 0 15px; line-height:35px; float:left}
.left{ float:left}
#main div a{ float:left}
#main span.num{  font-size:30px; color:#538ec6; font-family:"Georgia","Tahoma","Arial";}
.left{ float:left}
div.main-tit{ font-size:14px; font-weight:bold; color:#4e4e4e; background:url(/static/Include/images/main/main_r4_c2.jpg) no-repeat 0 33px; width:100%; padding:30px 0 0 20px; float:left}
div.main-con{ width:100%; float:left; padding:10px 0 0 20px; line-height:36px;}
div.main-corpy{ font-size:14px; font-weight:bold; color:#4e4e4e; background:url(/static/Include/images/main/main_r6_c2.jpg) no-repeat 0 33px; width:100%; padding:30px 0 0 20px; float:left}
div.main-order{ line-height:30px; padding:10px 0 0 0;}
.img{width:100%;height:300px;background:url(/static/image/timg2.gif);background-size:100% 100%;margin-bottom:10px;}
</style>
</head>
<body>
	<div class="img"></div>
<!--main_top-->
<table width="99%" border="0" cellspacing="0" cellpadding="0" id="main">
  <tbody>

  <tr>
    <td colspan="2" align="left" valign="top">
    <span class="time"><strong>你好！admin</strong><u>[超级管理员]</u></span>
    <div class="top"><span class="left">您上次的登灵时间：2012-05-03  12:00   &nbsp;&nbsp;&nbsp;&nbsp;如非您本人操作，请及时</span><a href="index.html" target="mainFrame" onfocus="this.blur()">更改密码</a></div>
    <div class="sec">欢迎你<span class="num">登陆</span>后台管理！</div>
    </td>
  </tr>
  
  <tr>
    <td colspan="2" align="left" valign="top">
    <div class="main-corpy">系统提示</div>
    <div class="main-order">1=&gt;如您在使用过程有发现出错请及时与我们取得联系；为保证您得到我们的后续服务，强烈建议您购买我们的正版系统或向我们定制系统！<br>
2=&gt;强烈建议您将IE7以上版本或其他的浏览器</div>
    </td>
  </tr>
 </tbody>

</table>

</body></html>

@endsection