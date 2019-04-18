function getMtypeOn(a, b) {
    if (a == b) {
        return 'class=on';
    }
}

$(function() {
    isLogin();
    var site_url = $("#footer").attr("data-url");
    var mtype = $("#mtype_index").val();
    if (mtype == 1) {
        index = 1;
    } else if (mtype == 20) {
        index = 2;
    } else if (mtype == 15) {
        index = 3;
    } else if (mtype == 30) {
        index = 4;
    } else if (mtype == 21) {
        index = 5;
    } else {
        index = 0;
    }



    var search_box = $(".search_box");
    $("#search_input").keydown(function(event) {
        var key = event.keyCode;
        var length = search_box.children("a").length;
        if (key == 13) {
            document.form_search.submit()
        }
        if (key == 38) {
            index--;
            if (index == -1) {
                index = length - 1
            }
        } else {
            if (key == 40) {
                index++;
                if (index == length) {
                    index = 0
                }
            }
        }
        if (key == 38 || key == 40) {
            search_box.children("a").removeClass("on");
            search_box.children("a:eq(" + index + ")").addClass("on");
            var chose = $("#search_box").children(".on").children("span.red").text();
            $("#search_input").val(chose);
            var mtype = $("#search_box").children(".on").attr("data-mtype");
            $("#mtype_index").val(mtype)
        }
        $(this).css({"color": "#333"})
    });
    $("#search_input").keyup(function(event) {
        var key = event.keyCode;
        if (key == 38 || key == 40) {
            return false
        }
        var keyword = safeStr($(this).val());

        if (keyword != "" && keyword != '请输入搜索内容') {
            var mtype = $("#mtype_index").val() > 0 ? $("#mtype_index").val() : 15;

            var li = "<a onclick=editSearchKeyword('" + keyword + "',15) data-mtype=15 id='search_mtype_15' " + getMtypeOn(mtype, '15') + "> 搜索含<span class='red'>" + keyword + "</span>的整站源码</a>\n\
<a onclick=editSearchKeyword('" + keyword + "',2) data-mtype=2 id='search_mtype_2'  " + getMtypeOn(mtype, '2') + "> 搜索含<span class='red'>" + keyword + "</span>的网页特效</a>\n\
   <a onclick=editSearchKeyword('" + keyword + "',1) data-mtype=1 id='search_mtype_1' " + getMtypeOn(mtype, '1') + "> 搜索含<span class='red'>" + keyword + "</span>的网站模板</a>\n\
<a onclick=editSearchKeyword('" + keyword + "',20) data-mtype=20 id='search_mtype_20' " + getMtypeOn(mtype, '20') + "> 搜索含<span class='red'>" + keyword + "</span>的PHP</a>\n\
<a onclick=editSearchKeyword('" + keyword + "',30) data-mtype=30 id='search_mtype_30' " + getMtypeOn(mtype, '30') + "> 搜索含<span class='red'>" + keyword + "</span>的视频教程</a>\n\
<a onclick=editSearchKeyword('" + keyword + "',21) data-mtype=21 id='search_mtype_21' " + getMtypeOn(mtype, '21') + "> 搜索含<span class='red'>" + keyword + "</span>的话题</a>";
            $("#search_box").html(li).removeClass("hide");
        } else {
            $("#search_box").html("").addClass("hide")
        }
    });
    $("#search_input").focus(function(event) {
        var key = event.keyCode;
        if (key == 38 || key == 40) {
            return false
        }
        var keyword = safeStr($(this).val());
        var mtype = $("#mtype_index").val() > 0 ? $("#mtype_index").val() : 15;


        if (keyword != "" && keyword != '请输入搜索内容') {
            var li = "<a onclick=editSearchKeyword('" + keyword + "',15) data-mtype=15 id='search_mtype_15'> 搜索含<span class='red'>" + keyword + "</span>的整站源码</a>\n\
<a onclick=editSearchKeyword('" + keyword + "',2) data-mtype=2 id='search_mtype_2'> 搜索含<span class='red'>" + keyword + "</span>的网页特效</a>\n\
   <a onclick=editSearchKeyword('" + keyword + "',1) data-mtype=1 id='search_mtype_1'> 搜索含<span class='red'>" + keyword + "</span>的网站模板</a>\n\
<a onclick=editSearchKeyword('" + keyword + "',20) data-mtype=20 id='search_mtype_20'> 搜索含<span class='red'>" + keyword + "</span>的PHP</a>\n\
<a onclick=editSearchKeyword('" + keyword + "',30) data-mtype=30 id='search_mtype_30'> 搜索含<span class='red'>" + keyword + "</span>的视频教程</a>\n\
<a onclick=editSearchKeyword('" + keyword + "',21) data-mtype=21 id='search_mtype_21'> 搜索含<span class='red'>" + keyword + "</span>的话题</a>";
            $("#search_box").html(li).removeClass("hide");
//            alert(mtype);
            $("#search_mtype_" + mtype).addClass("on").siblings("a").removeClass("on")
        } else {
            $("#search_box").html("").addClass("hide")
        }
    });
    $("#search_input").blur(function() {
        var is_hover = $("#search_input").attr("data-hover");
        if (is_hover != 1) {
            $("#search_box").addClass("hide")
        }
    });
    $("#search_box").hover(function() {
        $("#search_input").attr("data-hover", 1)
    }, function() {
        $("#search_input").attr("data-hover", 0)
    });
    if ($("img.lazy").length > 0) {
        $("img.lazy").lazyload({
            effect: "fadeIn"
        })
    }
    if ($(".emotion").length > 0) {
        $(".emotion").click(function() {
            var left = $(this).offset().left;
            var top = $(this).offset().top;
            var id = $(this).attr("data-id");
            $("#smileBoxOuter").css({
                "left": left,
                "top": top + 20
            }).show().attr("data-id", id)
        });
        $("#smileBoxOuter,.emotion").hover(function() {
            $("#smileBoxOuter").attr("is-hover", 1)
        },
                function() {
                    $("#smileBoxOuter").attr("is-hover", 0)
                });
        $(".emotion,#smileBoxOuter").blur(function() {
            var is_hover = $("#smileBoxOuter").attr("is-hover");
            if (is_hover != 1) {
                $("#smileBoxOuter").hide()
            }
        });
        $(".smileBox").find("a").click(function() {
            var textarea_id = $("#smileBoxOuter").attr("data-id");
            var textarea_obj = $("#reply_" + textarea_id).find("textarea");
            var textarea_val = textarea_obj.val();
            if (textarea_val == "发布评论") {
                textarea_obj.val("")
            }
            var title = "[" + $(this).attr("title") + "]";
            textarea_obj.val(textarea_obj.val() + title).focus();
            $("#smileBoxOuter").hide()
        });
        $("#smileBoxOuter").find(".smilePage").children("a").click(function() {
            $(this).addClass("current").siblings("a").removeClass("current");
            var index = $(this).index();
            $("#smileBoxOuter").find(".smileBox").eq(index).show().siblings(".smileBox").hide()
        });
        $(".comment_blockquote").hover(function() {
            $(".comment_action_sub").css({
                "visibility": "hidden"
            });
            $(this).find(".comment_action_sub").css({
                "visibility": "visible"
            })
        },
                function() {
                    $(".comment_action_sub").css({
                        "visibility": "hidden"
                    })
                })
    }
    if ($(".index-coupon-menus").length > 0) {
        $(".index-coupon-menus").children("li").click(function() {
            $(this).addClass("current").siblings("li").removeClass("current");
            var index = $(this).index();
            var parent_id = $(this).parents(".index_recommend").attr("id");
            $("#" + parent_id).find(".per").removeClass("current");
            $("#" + parent_id).find(".per").eq(index).addClass("current")
        })
    }
    if ($("#list_main").length > 0) {
        $("#list_main").children(".per").hover(function() {
            $(".like_merge").hide();
            var obj = $(this);
            obj.children(".like_merge").show();
            if ($("#head_username").text() != "") {
                if (obj.attr("is_collect") != 1) {
                    obj.attr("is_collect", 1);
                    $.get(getUrl("Ajax/isCollect"), {
                        mtype: $(this).attr("data-mtype"),
                        id: $(this).attr("data-id")
                    },
                    function(data) {
                        if (data == 1) {
                            obj.find(".like_status").addClass("lm_liked").removeClass("lm_like")
                        } else {
                            obj.find(".like_status").addClass("lm_like").removeClass("lm_liked")
                        }
                    })
                }
            }
        },
                function() {
                    $(".like_merge").hide()
                })
    }
    if ($("#detail-page").length > 0) {
        var id = $("#detail-page").attr("data-id");
        var mtype = $("#detail-page").attr("data-mtype");
        var totalnum = $("#detail-page").attr("data-totalnum");
        $("#comment_wrap").on("click", ".pager a", function() {
            var page = parseInt($(this).attr("data-page"));
            $("#detail-page").children("a").removeClass("current");
            $("#detail-page").children("a").eq(page - 1).addClass("current");
            $("#comment_wrap").html("<div style='padding:20px 0;text-align:center;'><img src='" + site_url + "Public/images/loading.gif'></div>");
            $.get(getUrl("Box/comments"), {
                p: page,
                id: id,
                totalnum: totalnum,
                mtype: mtype
            },
            function(data) {
                $("#comment_wrap").html(data)
            })
        })
    }
    if ($("#qrcode_box").length > 0) {
        $("#btn_demo").hover(function() {
            var left = $(this).offset().left;
            var top = $(this).offset().top;
            var id = $(this).attr("data-id");
            $("#qrcode_box").css({
                "left": left,
                "top": top + 55
            }).show()
        }, function() {
            $("#qrcode_box").fadeOut();
        })
    }
});
function editSearchKeyword(keyword, mtype) {
    $("#mtype_index").val(mtype);
    $("#keyword_head").val(encodeURI(keyword));
    document.form_search.submit()
}
function getUrl(strs) {
    var url = $("#footer").attr("data-url") + strs;
    return url
}
function goUrl(url) {
    if (url == -1) {
        history.go(-1)
    } else {
        document.location.href = url
    }
}
function toTaskObject(obj) {
    $("html,body").animate({
        scrollTop: $(obj).offset().top
    },
    800)
}
function checkInputBlur(obj) {
    var default_words = obj.attr("data-default");
    if (obj.val() == "") {
        obj.val(default_words);
        obj.css({
            "color": "#a9a9a9"
        })
    }
}
function checkInputFocus(obj) {
    var default_words = obj.attr("data-default");
    if (obj.val() == default_words) {
        obj.val("").css({
            "color": "#333333"
        })
    }

}
function blurInputLoginBox(obj) {
    var v = obj.val();
    if (v == "") {
        obj.removeClass("form_input-focus");
        obj.prev("div").removeClass("item_tip_focus")
    } else {
        obj.addClass("form_input-focus");
        obj.prev("div").addClass("item_tip_focus")
    }
}
function focusInputLoginBox(obj) {
    obj.addClass("form_input-focus");
    obj.prev("div").addClass("item_tip_focus")
}

function getLoginError(obj, tip) {
    obj.next(".error").text(tip).show();
    obj.parent().find(".grey").hide();
}
function getLoginRight(obj) {
    obj.next(".error").hide();
    obj.nextAll(".icon-loginright").css({
        "display": "inline-block"
    });
}
function checkEmailPattern(email) {
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!pattern.test(email)) {
        return false;
    }
}


function showTipLoginBox(words) {
    $("#windown_box").find(".notice_error").text(words).show();
    setTimeout("hideNoticeLoginBox()", 3000)
}
function hideNoticeLoginBox() {
    $("#windown_box").find(".notice_error").fadeOut(1000)
}
function showWindowBox() {
    $.post(getUrl("Box/logins"), {}, function(data) {
        $("#windown_box").html(data).modal("show").css({"width": "460px", "marginLeft": "-230px"});
    })
}
function showPwdPayBox() {
    $.post(getUrl("Box/pwd_pay"), {}, function(data) {
        $("#windown_box").html(data).modal("show").css({"width": "460px", "marginLeft": "-230px"});
    })
}
function hideWindowBox() {
    $("#windown_box").modal("hide")
}
function animateShowTip(obj, tip) {
    obj.text(tip);
    var top = obj.attr("data-top");
    obj.animate({
        top: top,
        "height": "16px"
    },
    500)
}
function animateHideTip(obj) {
    var foot = obj.attr("data-foot");
    obj.animate({
        top: foot,
        "height": "0"
    },
    500)
}
function subcomment(id, mtype, pid, pid_sub) {
    var pid_common = pid;
    if (pid_sub > 0) {
        pid_common = pid_sub
    }
    var textarea_obj = $("#reply_" + pid_common).find("textarea");
    var comment = textarea_obj.val();
    comment = comment == "发布评论" ? "" : comment;
    if (comment == "") {
        animateShowTip($("#comment_tip_" + pid_common), "您是不是忘了说点什么？");
        setTimeout("animateHideTip($('#comment_tip_" + pid_common + "'))", 3000);
        return false
    }
//    comment = encodeURIComponent(comment);

    $.post(getUrl("Ajax/subcomment"), {
        id: id,
        mtype: mtype,
        content: comment,
        pid: pid,
        pid_sub: pid_sub,
        key: $("#footer").attr("data-key")
    },
    function(data) {
        var li = "";
        if (data.code == -1) {
            showWindowBox();
            $("#windown_box").attr("data-func", "subcomment('" + id + "', '" + mtype + "', '" + pid + "', '" + pid_sub + "')")
        } else {
            if (data.code == 200) {
                var username = $(".comment_avatar").find(".username").text();
                if (pid_common == 0) {
                    var num = parseInt($("#comments_num").text());
                    $("#comments_num").text(num + 1);
                    var avatar = $(".comment_avatar").find(".avatar").attr("src");
                    var lou_tip = "";
                    if (num == 0) {
                        lou_tip = "沙发"
                    } else {
                        if (num == 1) {
                            lou_tip = "椅子"
                        } else {
                            if (num == 2) {
                                lou_tip = "板凳"
                            } else {
                                lou_tip = num + "楼"
                            }
                        }
                    }
                    li = "<li class='comment_list clearfix'><div class='comment_avatar'><span class='userPic'>\n<img width='36' height='36' src='" + avatar + "'></span><span class='grey'>" + lou_tip + "</span></div>\n<div class='comment_conBox'><div class='comment_avatar_time'><div class='time'>刚刚</div>" + username + "</div>\n<div class='comment_conWrap clearfix'><div class='comment_con'>" + data.comment + "</div></div></div></li>";
                    $(".comment_listBox").prepend(li)
                } else {
                    var length_reply = parseInt($("#comment_" + pid_common).find(".comment_blockquote").length);
                    li = "<blockquote class='comment_blockquote'><div class='comment_floor'>" + (length_reply + 1) + "</div><div class='comment_conWrap'>\n<div class='comment_con'>" + username + "：<p> " + data.comment + "</p></div></div></blockquote>";
                    $("#comment_" + pid).find(".blockquote_wrap").append(li);
                    $("#reply_" + pid).hide();
                    if (pid_sub > 0) {
                        $("#reply_" + pid_sub).hide()
                    }
                }
                if (data.points > 0) {
                    showSuccessTip("评论成功，获得" + data.points + "积分！")
                } else {
                    showSuccessTip("评论成功！")
                }
                textarea_obj.val("")
            } else {
                animateShowTip($("#comment_tip_" + pid_common), data.error);
                setTimeout("animateHideTip($('#comment_tip_" + pid_common + "'))", 3000)
            }
        }
    },
            "json")
}
function subSuggest() {
    var name = $("#contact_name").val();
    var email = $("#contact_email").val();
    var message = $("#contact_message").val();
    if (name == "" || name == "称呼") {
        alert("清输入称呼！");
        return false
    }
    if (email == "" || email == "邮箱地址") {
        alert("清输入邮箱地址！");
        return false
    }
    if (message == "" || message == "信息") {
        alert("清输入信息！");
        return false
    }
    $.get(getUrl("Ajax/subSuggest"), {
        name: name,
        email: email,
        message: message
    },
    function(data) {
        if (data == -1) {
            showWindowBox();
            $("#windown_box").attr("data-func", "subSuggest()")
        } else {
            if (data > 0) {
                $("#suggest").remove();
                $(".thanks").removeClass("hide")
            }
        }
    })
}
function isLogin() {
    var mtype = $("#footer").attr("data-mtype");
    var id = $("#footer").attr("data-id");
    var code = $("#footer").attr("data-code");
    var returnUrl = $("#footer").attr("data-return");
    $.post(getUrl("Ajax/isLogin"), {
        mtype: mtype,
        id: id,
        code: code,
        returnUrl: returnUrl
    },
    function(data) {
        $('#footer').attr("data-key", data.key)
        loginSuccess(data)
    },
            "json")
}
function loginSuccess(data) {
    var username = data.username;
    if (username) {
        $(".username").text(username);
        $(".avatar").attr("src", data.avatar);
        $(".haslogin").removeClass("hide");
        $(".nologin").addClass("hide");
        if (data.is_collect == 1) {
            $(".poster_likes ").children(".like_status").addClass("lm_liked").removeClass("lm_like")
        }
//        if (data.msg_num > 0) {
//            $("#msg_notify").html("<em>" + data.msg_num + "</em>");
//        }
        hideWindowBox();
        var func = $("#windown_box").attr("data-func");
        if (func) {
            eval(func)
        }

        $("#nav_login").remove();
        // setInterval("getMsgNum()", 500000);//500秒请求一次
        if ($("#topic-edit").length > 0) {
            var uid_detail = $("#topic-edit").attr("data-uid");
            if (data.userid == uid_detail) {
                $("#topic-edit").show();
            }
        }
        if (data.is_vip == 1) {
            $(".icon_vip").show()
        }

    }
    $("#login_area").slideDown();
}
function getMsgNum() {
    $.get(getUrl("Ajax/getMsgNum"), {
    },
            function(data) {
                if (data > 0) {
                    $("#msg_notify").html("<em>" + data + "</em>");
                } else {
                    $("#msg_notify").html("");
                }
            })
}
function reply_btn(id) {
    $(".reply_area").hide();
    $("#reply_" + id).slideToggle(500,
            function() {
                $("#reply_" + id).find("textarea").focus()
            })
}
function getCollect(obj, id, mtype) {
    $.get(getUrl("Ajax/getCollect"), {
        mtype: mtype,
        id: id
    },
    function(data) {
        if (data > 0) {
            obj.children(".like_status").addClass("lm_liked").removeClass("lm_like")
        } else {
            obj.children(".like_status").addClass("lm_like").removeClass("lm_liked")
        }
        obj.parents(".per").attr("is_collect", 1)
    })
}
function hideMsgBox() {
    $("#msg-box").fadeOut()
}
function showSuccessTip(data) {
    $("#msg-box").show();
    $("#msg-box-content").html(data);
    setTimeout("hideMsgBox()", 2000)
}

function focusInputLoginArea(obj) {
    obj.next(".error").hide();
    obj.addClass("form_input-focus");
    obj.prev("div").addClass("item_tip_focus");
    obj.nextAll(".grey").show();
    obj.nextAll(".icon-loginright").hide();
}

function blurInputLoginArea(obj, is_sub) {
    var val = obj.val();
    var minlength = obj.attr("data-minlength");
    var maxlength = obj.attr("data-maxlength");
    var type = obj.attr("data-type");
    var equal = obj.attr("data-equal");
    var time_error = 0;
    if (val == "") {
        obj.removeClass("form_input-focus");
        obj.prev("div").removeClass("item_tip_focus");
        getLoginError(obj, "不能为空");

    } else {
        if (minlength > 0 && val.length < minlength) {
            getLoginError(obj, "长度至少" + minlength + "位");
            time_error++;
        }
        if (maxlength > 0 && val.length > maxlength) {
            getLoginError(obj, "长度最多" + maxlength + "位");
            time_error++;
        }
        if (type == 'email' && checkEmailPattern(val) == false) {
            getLoginError(obj, "邮箱格式不正确");
            time_error++;
        }
        if (equal != undefined && val != $(equal).val()) {
            getLoginError(obj, obj.attr("data-equal-error"));
            time_error++;
        }
        if (time_error == 0 && is_sub != 1) {
            if (type == 'username') {
                $.post(getUrl('Ajax/checkUsername'), {
                    username: val
                },
                function(data) {
                    if (data == -1) {
                        getLoginError(obj, '该用户名已被注册');
                    } else {
                        getLoginRight(obj);
                    }
                })
            } else if (type == 'email') {
//                $.post(getUrl('Ajax/checkEmail'), {
//                    email: val
//                },
//                function(data) {
//                    if (data == -1) {
//                        getLoginError(obj, '该电子邮箱已被注册');
//                    } else {
//                        getLoginRight(obj);
//                    }
//                })
            } else {
                getLoginRight(obj);
            }
        }
        obj.addClass("form_input-focus");
        obj.prev("div").addClass("item_tip_focus");
    }
    obj.nextAll(".grey").hide();
}
function addClickFunc(obj) {
    $(obj).click();
}
function checkInputKey(obj) {
    $("#keyword_head").val(encodeURI(obj.val()));
}
function searchSub() {
    var keywords = $('#search_input').val();
    if (keywords == '请输入搜索内容' || keywords == '') {
        $('#search_input').focus();
        return false;
    }
    $("#keyword_head").val(encodeURI(keywords));
    var mtype = $('#mtype_index').val();
    editSearchKeyword(keywords, mtype);
    return false;
}
function checkInputKeyup(obj) {
    var val = obj.val();
    $("input[name=keyword],#search_input").val(val);
}
function shareWeibo(id, mtype) {
    $.post(getUrl("Index/shareWeibo"), {
        mtype: mtype,
        id: id,
    }, function(data) {
        if (data.ret == -1) {
            showWindowBox();
            $("#windown_box").attr("data-func", "shareQq(" + id + ",'" + mtype + "')")
        } else if (data.ret == '100030') {
            alert("没有发表腾讯微博权限，请重新绑定，并勾选 头像右侧的”读取、发表腾讯微博信息“");
            location.href = "http://www.sucaihuo.com/Index/login/type/qq.html";
        } else if (data.ret == '0') {
            showSuccessTip(data.content)
        } else if (data.ret == 'qq_bind') {
            alert('你还没有绑定腾讯微博')
        } else if (data.ret == 'has_share') {
            alert('你今天在腾讯微博已分享过该篇文章，去分享其他文章吧！')
        } else {
            alert("发布微博过于频繁或您的QQ没有开通腾讯微博业务");
        }
    }, "json")
}
function getTemplatesMap(id) {
    $.post(getUrl("Box/templates_map"), {id: id}, function(data) {
        $('#templates_map').html(data).modal('show').css({"width": "460px", "marginLeft": "-230px"});
    })
}
function showWeinxiLoginBox(obj) {
    if (obj.hasClass("disabled"))
        return;
    obj.attr("disabled", "disabled").addClass("disabled");
    $.post(getUrl("Weixin/login"), {}, function(data) {
        $("#windown_box").html(data).modal("show").css({"width": "320px", "marginLeft": "-160px"});
        obj.removeAttr("disabled").removeClass("disabled");
    })
}
function closeWeinxiLoginBox() {
    $('#windown_box').modal('hide');
    clearInterval(t);
}

function downloadZipBox(is_original, points_type, points, id, mtype) {

    $.get(getUrl("Ajax/downloadZipBox"), {is_original: is_original, points: points, points_type: points_type, id: id, mtype: mtype}, function(data) {

        if (data.userid > 0) {
            $("#download_box").modal("show").css({"width": "560px", "marginLeft": "-280px"});

            $("#download_mymoney").html(data.money);
            var is_vip = data.is_vip;
            var is_download = data.is_download;
            $("#original_download_tip").show();
            if (is_vip == 1 && is_original == 1 && points_type == 0) {
                $("#points_money").html(data.money_vip);
            } else {
                $("#points_money").html(points);
            }
            if (points_type == 0) {
                $("#download_money").addClass("points_vip");
            }
            if (is_vip == 1 && is_original == 0 && points_type == 0) {
                $("#download_start").attr("data-tip", "免积分下载").text('免积分下载');
            }
            if (is_vip == 0) {
                $("#points_money").html(data.money_vip);
            }
            if (is_download == 1) {
                var points_type_words = points_type == 1 ? '火币' : '积分';
                $("#points_not_enough").show().html("已下载的素材再次下载永久不扣" + points_type_words + "！");
            }


        } else {
            showWindowBox();
            $("#windown_box").attr("data-func", "downloadZipBox(" + is_original + ",'" + points_type + "','" + points + "','" + id + "','" + mtype + "')")
            return false;
        }
    }, "json")

}
function downloadZip(id, mtype) {

    if (mtype != 1 && mtype != 2) {
        downloadZipLocal(id, mtype);
        return false;
    }

    if($('#installservice').is(':checked')) {
        var  install_service = 1;
    }else{
        var  install_service = 2;
    }

    if ($('#download_btn').hasClass("disabled")) {
        return false;
    }
    $('#download_btn').addClass("disabled");
    $("#download_start").text("努力下载中...");
    $("#points_not_enough").hide();

    $.get(getUrl("Download/zip"), {
        mtype: mtype,
        id: id,
        first: 1,
        install_service: install_service,
        pwd_pay: $("body").attr("pwd_pay")
    },
    function(data) {
        $('#download_btn').removeClass("disabled");

        $("#download_start").text($("#download_start").attr("data-tip"));
//        alert(data.result);
        if (data.code == 'login') {
            showWindowBox();
            $("#windown_box").attr("data-func", "downloadZip(" + id + ",'" + mtype + "')")
        } else if (data.code == 'pwd_pay') {
            showPwdPayBox();
            $("#windown_box").attr("data-func", "downloadZip(" + id + ",'" + mtype + "')")
        } else {

            if (data.result == 'points_not_enough') {
                $("#points_not_enough").show();
            } else {
                if (mtype == 1 || mtype == 2) {
                    if (data.code != 200) {
                        alert(data.result);
                        return;
                    }
                    location.href = data.result;
                }

                $('#download_box').modal('hide')
            }
        }
    }, "json")
}
function downloadZipLocal(id, mtype) {
    if ($('#download_btn').hasClass("disabled")) {
        return false;
    }
    $('#download_btn').addClass("disabled");
    $("#download_start").text("努力下载中...");
    $("#points_not_enough").hide();
    $.get(getUrl("Download/zip_local"), {
        mtype: mtype,
        id: id,
        first: 1
    },
    function(data) {
//                    alert(data.code);
        $('#download_btn').removeClass("disabled");

        $("#download_start").text($("#download_start").attr("data-tip"));
        if (data.result == 'login') {
            showWindowBox();
            $("#windown_box").attr("data-func", "downloadZipLocal(" + id + ",'" + mtype + "')")
        } else {

            if (data.code == 'points_not_enough' || data.code == 'huobi_not_enough') {
                $("#points_not_enough").show();
            } else {
                if (data.code == 'wangpan') {
                    if (data.wangpan_url != '') {
                        $("#download_result").html("百度网盘链接：<a href=" + data.wangpan_url + " target='_blank'>" + data.wangpan_url + "</a> 密码：" + data.wangpan_pwd + "，失效请联系管理员QQ 1556472052").show()
                    } else {
                        $("#download_result").html("该源码需要手动发货，请联系管理员QQ 1556472052").show()
                    }

                } else {
                    $("#download_result").html("该源码需要手动发货，请联系管理员QQ 416148489").show()
//                    location.href = "" + getUrl("Download/zip_local") + "/id/" + id + "/mtype/" + mtype + "/js/1.html";
//                    $('#download_box').modal('hide')
                }

            }
        }
    }, "json")
}
function sublogin() {
    var email = $("#email").val();
    if (email == "") {
        showTipLoginBox("请输入用户名/邮箱！");
        return false
    } else {
        var pwd = $("#pwd").val();
        if (pwd == "") {
            showTipLoginBox("请输入密码！");
            return false
        }
    }
    $.post(getUrl("Login/check"), {
        username: email,
        pwd: pwd
    },
    function(data) {
        if (data.error != '') {
            showTipLoginBox(data.error)
        } else {
            loginSuccess(data)
        }
    },
            "json")
}
function pay_pwd_confirm() {
    var pwd = $("#pwd").val();
    if (pwd == "") {
        showTipLoginBox("请输入下载密码！");
        return false
    }
    $.post(getUrl("Login/pwd_pay_check"), {
        pwd: pwd
    },
    function(data) {
        if (data.code == 'right') {
            $("body").attr("pwd_pay", pwd);
            hideWindowBox();
            var func = $("#windown_box").attr("data-func");
            if (func) {
                eval(func)
            }
        } else {
            showTipLoginBox("下载密码错误！");
        }
    },
            "json")
}
function safeStr(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
(function($) {
    $.fn.extend({
        Scroll: function(opt, callback) {
//参数初始化
            if (!opt)
                var opt = {};
            var _btnUp = $("#" + opt.up);//Shawphy:向上按钮
            var _btnDown = $("#" + opt.down);//Shawphy:向下按钮
            var timerID;
            var _this = this.eq(0).find("ul:first");
            var lineH = _this.find("li:first").height(), //获取行高
                    line = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10), //每次滚动的行数，默认为一屏，即父容器高度
                    speed = opt.speed ? parseInt(opt.speed, 10) : 500; //卷动速度，数值越大，速度越慢（毫秒）
            timer = opt.timer //?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
            if (line == 0)
                line = 1;
            var upHeight = 0 - line * lineH;
//滚动函数
            var scrollUp = function() {
                _btnUp.unbind("click", scrollUp); //Shawphy:取消向上按钮的函数绑定
                _this.animate({
                    marginTop: upHeight
                }, speed, function() {
                    for (i = 1; i <= line; i++) {
                        _this.find("li:first").appendTo(_this);
                    }
                    _this.css({marginTop: 0});
                    _btnUp.bind("click", scrollUp); //Shawphy:绑定向上按钮的点击事件
                });
            }
//Shawphy:向下翻页函数
            var scrollDown = function() {
                _btnDown.unbind("click", scrollDown);
                for (i = 1; i <= line; i++) {
                    _this.find("li:last").show().prependTo(_this);
                }
                _this.css({marginTop: upHeight});
                _this.animate({
                    marginTop: 0
                }, speed, function() {
                    _btnDown.bind("click", scrollDown);
                });
            }
//Shawphy:自动播放
            var autoPlay = function() {
                if (timer)
                    timerID = window.setInterval(scrollUp, timer);
            };
            var autoStop = function() {
                if (timer)
                    window.clearInterval(timerID);
            };
//鼠标事件绑定
            _this.hover(autoStop, autoPlay).mouseout();
            _btnUp.css("cursor", "pointer").click(scrollUp).hover(autoStop, autoPlay);//Shawphy:向上向下鼠标事件绑定
            _btnDown.css("cursor", "pointer").click(scrollDown).hover(autoStop, autoPlay);
        }
    })
})(jQuery);
$(function() {
    if ($("#scrollDiv").length > 0) {
        $("#scrollDiv").Scroll({line: 1, speed: 500, timer: 3E3, up: "but_up", down: "but_down"});
    }
});
function topBody() {
    $('body,html').animate({scrollTop: 0}, 300);
}
function showSourceDEMO(id) {

    $.post(getUrl("Box/showSourceDEMO"), {id: id}, function(data) {
        var item = "";
        if (data.demo_url != '') {
            item += "<div class='item' id='url_pc'><label>PC端：</label><a href='" + data.demo_url + "' target='_blank'>" + data.demo_url + "</a></div>";
        }
        if (data.url_wap != '') {
            item += "<div class='item' id='url_wap'><label>手机wap：</label><a href='" + data.url_wap + "' target='_blank'>" + data.url_wap + "</a></div>";
        }


        if (data.url_words != 0) {

            item += "<div class='item' id='url_word'>" + data.url_words + "</div>";
        }
        if (data.url_weixin != 0) {
            item += " <div class='item' id='url_weixin'><label>微信扫码：</label><div class='url_weixin'><img src='/Box/qrcode?url=" + data.url_weixin + "'></div></div>";
        }

        if (data.url_logo != 0) {
            item += "<div class='item' id='url_logo'><label> </label><div class='url_weixin'><img src='" + data.url_logo + "'></div></div>";
        }

        var div_inner = "<div class='pop_title'>\n\
        <div class='pop_name'>演示</div>\n\
        <i class='pop_close' onclick=getModalHide('#source_box')></i>\n\
    </div>\n\
    <div class='pop_content' style='padding:20px 70px 50px 70px'>" + item + "</div>";
        $("#source_box").html(div_inner);
        $("#source_box").modal("show").css({"width": "560px", "marginLeft": "-280px"});


    }, "json")

}
function getModalHide(id) {
    $(id).modal('hide')
}