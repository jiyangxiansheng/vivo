!function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var e=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),n=function(){function n(){t(this,n),this.headView=!0,this.connViewFlag=!1,this.headHeight=$(".vp-head-wrap").height(),this.scrollT=window.scrollY||window.pageYOffset,this.winHeight=$(window).height(),this.isSupportWebp=$("html").hasClass("webpSupport")}return e(n,[{key:"init",value:function(){this.lazyImage(),this.bindEvents(),this.buryPoint(),this.handleScroll()}},{key:"lazyImage",value:function(){var t=$("main img.lazyload"),e=this,n=500,i=$(window).scrollTop()||0;t.each(function(){var t=$(this);if(t.offset().top-i-n<e.winHeight+t.height()&&(t.data("src")||t.data("srcset"))){var a=new Image,o=e.isSupportWebp?t.data("srcset").split(" ")[0]:t.data("src");a.src=o,a.onload=function(){t.attr("src",o).removeClass("lazyload"),t.removeAttr("data-src").removeAttr("data-srcset")}}})}},{key:"bindEvents",value:function(){var t=this,e=$(window),n=$(".v-btn-play");n.on("click",function(e){var n=$(".js-nav");t.handlePlay(e),t.scrollT<t.headHeight&&n.css({marginTop:-t.scrollT+"px"})}),e.scroll(function(){$("#J_video").length&&"none"!==$("#J_video").css("display")||t.handleScroll()}),e.scroll(this.throttle(function(){t.lazyImage(),t.buryPoint()},200)),e.resize(this.throttle(function(){t.lazyImage()},200))}},{key:"throttle",value:function(t,e){var n=0,i=this;return function(){var a=Date.now();if(a-n>e){for(var o=arguments.length,r=Array(o),s=0;o>s;s++)r[s]=arguments[s];t.call(i,r),n=a}}}},{key:"buryPoint",value:function(){var t=$(".js-connection"),e=t.offset().top,n=$(window).height(),i=window.scrollY||window.pageYOffset;n+i>e?this.connViewFlag||(this.connViewFlag=!0,setTimeout(function(){$("footer").attr("data-track",'{type:"click",params:{version:"2.3.0",cfrom:"1019"}}').trigger("click").removeAttr("data-track")},0)):this.connViewFlag=!1}},{key:"handleScroll",value:function(){var t=$(".js-nav"),e=window.scrollY||window.pageYOffset;this.scrollT=e,this.headView&&e>this.headHeight?(this.headView=!this.headView,t.css({position:"fixed",top:"0"})):!this.headView&&e<=this.headHeight&&(this.headView=!this.headView,t.css({position:"absolute",top:this.headHeight+"px"}))}},{key:"handlePlay",value:function(t){{var e=$(t.target),n=e.data("url"),i=e.data("poster");new Video({mount:"#J_video",url:n,post:i,closeCallback:function(){$(".js-nav").css({marginTop:0})}})}}}]),n}();$(function(){(new n).init()})}]);