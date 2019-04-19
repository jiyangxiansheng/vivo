seajs.config({
	base : "/template/vivo2015/js/",
	map: [['.js','.js?' + VERHASH]],
	alias : {
		"jquery" : "jquery.min.js",
		"superslide" : "jquery.SuperSlide.js",
		"hoverdir" : "jquery.hoverdir.js"
	}
});
//seajs.use("jquery");
seajs.use("main");
//seajs.use("/template/vivo2015/js/viewthread");