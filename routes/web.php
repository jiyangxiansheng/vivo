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

Route::get('/', function () {
    return view('welcome');
});

//后台登录页面
//
Route::group([],function () {

	Route::get('/admins','Admin\Indexcontroller@index');
});
Route::group([],function () {
	Route::get('/home', 'home\Homecontroller@index');
});