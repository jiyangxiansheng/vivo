<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//前台路由组
Route::group([], function(){
	//前台首页
	Route::get('/', 'Home\IndexController@index');
});


//后台登录页面
//
Route::group([],function () {
	//后台首页
	Route::get('/admins','Admin\IndexController@index');
	//商品分类
	Route::get('/admin/cates','Admin\GoodsController@cates');
	//添加分类
	Route::get('/admin/cates/create','Admin\GoodsController@create');
	//修改分类
	Route::get('/admin/cates/edit','Admin\GoodsController@edit');
});
