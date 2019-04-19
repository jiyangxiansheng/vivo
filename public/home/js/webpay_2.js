$(function() {
    orderInfoShowObj.init();
    channelShowObj.init();
    orderInfoShowObj.initCoupon();
    showPayObj.init();
    orderInfoShowObj.initEvent();

    channelShowObj.initEvent();
    showPayObj.initEvent();
})

var orderInfoShowObj = {
    useCoupon: 0,
    residueCoupon: '',
    init: function() {
        var that = this;
        this.computeUseCoupon();
        $('.voucher-box-phone').text(phoneNum);
        $('.showAmount').text(tradeOrder.totalFee);
        if (tradeOrder.orderExpireTime4View) {
            $('.order-limit').text(tradeOrder.orderExpireTime4View);
        } else {
            $('.order-limit').text('24小时');
        }
        $('.outTradeOrderNo').text(tradeOrder.outTradeOrderNo);
        $('.showOrderTime').text(tradeOrder.orderTime);
        $('.showGoodsName').html(tradeOrder.multiLineGoodsNameShow2);
        $('.recvInfo').text(tradeOrder.recvName + ' ' + tradeOrder.recvPhoneNum + ' ' + tradeOrder.recvAddr);
        $('#tradeOrderNum').val(tradeOrder.orderNumber)
    },
    initCoupon: function() {
        var that = this;
        $('.surplus').text(new Decimal(couponBalance).toFixed(2));
        $('.J-residue').text(this.residueCoupon);
        $('.J-usable').text(tradeOrder.couponCanUse);

        for (var i in hbfqList) {
            var hb = hbfqList[i];
            $('.installment-items .hbfq_fq_' + hb.num + ' .detail-num em').text(hb.eachPrinAndFeeUseCoupon + 'x ' + hb.num);
            $('.installment-items .hbfq_fq_' + hb.num + ' .detail-total em').text(hb.prinAndFeeUseCoupon);
            $('.installment-items .hbfq_fq_' + hb.num + ' .service-charge em').text(hb.eachFeeUseCoupon);
        }

        if (couponBalance && parseFloat(couponBalance) > 0) {
            $('.showCoupon').show();
        } else {
            $('.showCoupon').hide();
        }
        if (isCheckedCoupon == 1 || isCheckedCoupon == '1') {
            $('.voucher-check').addClass('checked');
            $('.voucher-text').toggleClass('hide');
            $('.stages-detail').toggleClass('hide');
            channelShowObj.hideOtherPayChannel();
        }
        that.showTotalFee();
    },
    initEvent: function() {
        var that = this;

        $('.spread-btn').click(function() {
            $(this).toggleClass('active')
            if ($('.detail-show').css("display") == "none") {
                $('.detail-show').css("display", "block");
            } else {
                $('.detail-show').css("display", "none")
            };
        });
        $('.voucher-check').click(function() {
            $(this).toggleClass('checked');
            $('.voucher-text').toggleClass('hide');
            $('.stages-detail').toggleClass('hide');
            channelShowObj.hideOtherPayChannel();
            that.showTotalFee();
        })
    },
    showTotalFee: function() {
        var that = this;
        if (orderInfoShowObj.isUseCoupon()) {
            that.useCoupon = 1;
            $('.amount-num-common em').text(tradeOrder.totalFeeUseCoupon);
        } else {
            that.useCoupon = 0;
            $('.amount-num-common em').text(tradeOrder.totalFee);
        }
        channelShowObj.fillHbfqPayTotal();
    },
    isUseCoupon: function() {
        return $('.showCoupon .voucher-check').hasClass('checked');
    },
    computeUseCoupon: function() {
        var totalFee = new Decimal(tradeOrder.totalFee);
        var coupon = new Decimal(couponBalance);

        if (totalFee.lte(coupon)) {
            tradeOrder.totalFeeUseCoupon = '0.00';
            this.residueCoupon = coupon.minus(totalFee).toFixed(2);
            tradeOrder.couponCanUse = tradeOrder.totalFee;
            for (var i in hbfqList) {
                var hb = hbfqList[i];
                hb.prinAndFeeUseCoupon = '0.00';
                hb.eachPrinAndFeeUseCoupon = '0.00';
                hb.feeUseCoupon = '0.00';
                hb.eachFeeUseCoupon = '0.00';
            }
        } else {
            this.residueCoupon = '0.00';
            tradeOrder.couponCanUse = coupon.toFixed(2);
            tradeOrder.totalFeeUseCoupon = totalFee.minus(coupon).toFixed(2);
            var tradeFee = totalFee.minus(coupon).times(100);

            for (var i in hbfqList) {
                var hb = hbfqList[i];
                var hbfqConf = {
                    sellerPercent: hb.sellerPercent,
                    feeRate: hb.feeRate,
                    num: hb.num
                }
                var data = computeHbfqFee(hbfqConf, tradeFee);
                hb.prinAndFeeUseCoupon = data.busAndFee;
                hb.eachPrinAndFeeUseCoupon = data.eachBusAndFee;
                hb.feeUseCoupon = data.fee;
                hb.eachFeeUseCoupon = data.eachFee;
            }
        }


    }

}


var channelShowObj = {
    hasInitShowAlipayQR: 0,
    hasInitShowAlipayQRUseCoupon: 0,
    hasInitShowWechatQR: 0,
    hasInitShowWechatQRUseCoupon: 0,
    isShowQr: 0,
    init: function(){
        var that = this;
        that.initChannelInfo();
        that.initHbfq();

        if (hbfqList.length > 0 && payMethod == 'ali_pay_hbfq') {
            $('.huabei-detail').addClass('active');
            that.showHbfq();
            // 显示分期金额
            $('.stage-pay').show();
            $('.common-pay').hide();
            // 移除支付按钮禁用
            $('.pay-btn').removeClass('disabled');
        }else if (!hbfqList || hbfqList.length <= 0 || payMethod != 'ali_pay_hbfq') {
            var lastPayWay = that.getLastPayWay();
            if (!lastPayWay) lastPayWay = channelInfo[channelIdx["1"]].channel;
            var hasPayWay = false;
            for(var i in channelIdx){
                if(lastPayWay == channelInfo[channelIdx[i]].channel){
                    hasPayWay = true;
                    break;
                }
            }
            if(!hasPayWay)lastPayWay = channelInfo[channelIdx["1"]].channel;

            if(lastPayWay == 1)lastPayWay = 5;
            $('.item-detail[paychannel=' + lastPayWay + ']').addClass('active');
            if ((lastPayWay == 5 || lastPayWay == 2) && !(orderInfoShowObj.residueCoupon && parseFloat(orderInfoShowObj.residueCoupon) > 0 && orderInfoShowObj.isUseCoupon())) {
                $('.item-detail[paychannel=' + lastPayWay + ']').next().show();
                that.isShowQr = 1;
                // showPayObj.prePay();
                $('.surePay').addClass('disabled');
            } else {
                $('.surePay').removeClass('disabled');
            }
            // 隐藏分期金额
            $('.stage-pay').hide();
            $('.common-pay').show();
        }
    },
    initChannelInfo: function() {
        var that = this;
        var chn = {};
        var count = 1;
        for (var i in channelIdx) {
            var core = channelIdx[i];
            chn[i] = channelInfo[core];
            if (channelActInfo[core]) {
                chn[i].actTitle = channelActInfo[core];
            }
            count++;
        }
        var chnHtml = template('chnHtml', { list: chn, count: count });
        $('.chnList').html(chnHtml);

    },
    initHbfq: function() {
        var that = this;
        if (!hbfqList || hbfqList.length <= 0) return;
        if (isNaN(fq_num)) fq_num = 3;
        else fq_num = parseInt(fq_num);
        var core = 'ali_pay_hbfq';
        var chn = channelInfo[core];
        if (channelActInfo[core]) {
            chn.actTitle = channelActInfo[core];
        }
        chn.freeFee = 0;
        for (var i in hbfqList) {
            if (hbfqList[i].feeDouble == 0) {
                chn.freeFee = 1;
                break;
            }
        }

        var chnHtml = template('hbfqHtml', { chn: chn, fq_num: fq_num, hbfqList: hbfqList });
        $('.pay-installment').html(chnHtml);

        $('.item-detail').removeClass('active');
        that.hideHbfq();
        that.fillHbfqPayTotal();
    },
    initEvent: function() {
        var that = this;
        //支付方式选择
        $('.pay-method').on('click', ".item-detail", function() {
            $(".item-detail").removeClass('active');
            $(".item-detail").next().hide();
            $(this).addClass('active');
            if ($(this).parent().hasClass('alipay') || $(this).parent().hasClass('wechat')) {
                $(this).next().show();
                $('.pay-btn').addClass('disabled');
                if($(this).parent().hasClass('alipay'))that.openAlipay();
                if($(this).parent().hasClass('wechat')) {
                    console.log('openWechatPay', 'initEvent');
                    // 此处有一次微信二维码请求
                    // 每次点击微信支付有两次请求，屏蔽这一次
                    // that.openWechatPay();
                }
                // 此处有一次微信二维码请求
                showPayObj.prePay();
            } else {
                $('.pay-btn').removeClass('disabled');
            }
            if ($(this).hasClass('huabei-detail')) {
                $('.pay-btn').html('立即分期');
                $('.installment-detail').show();
                // 支付金额是否显示分期
                $('.stage-pay').show();
                $('.common-pay').hide();
            } else {
                $('.pay-btn').html('确认支付');
                $('.installment-detail').hide();
                $('.stage-pay').hide();
                $('.common-pay').show();
            }
        });

        $('.pay-installment').on('click', '.installment-item', function() {
            $('.installment-item').removeClass('active');
            $(this).addClass('active');
            orderInfoShowObj.showTotalFee();
            that.fillHbfqPayTotal();
        });
    },
    hideOtherPayChannel: function() {
        if (tradeOrder.totalFeeUseCoupon && parseFloat(tradeOrder.totalFeeUseCoupon) == '0.00'&& orderInfoShowObj.isUseCoupon()) {
            $('.pay-method').addClass('hide');
            $('.pay-btn').removeClass('disabled');
        } else {
            $('.pay-method').removeClass('hide');
            var paychannel = $('.item-detail.active').attr('paychannel');
            if (paychannel == '5' || paychannel == '2' || paychannel == 5 || paychannel == 2) {
                $('.pay-btn').addClass('disabled');
                $('.item-code').hide();
                $('.item-detail[paychannel=' + paychannel + ']').next().show();
                showPayObj.prePay();
            }
        }
    },
    openAlipay: function(hasUseCoupon) {
        if(orderInfoShowObj.isUseCoupon() && this.hasInitShowAlipayQRUseCoupon != 1 && hasUseCoupon && hasUseCoupon == 1){
            this.getAlipayQR();
            this.hasInitShowAlipayQRUseCoupon = 1;
            this.hasInitShowAlipayQR = 0;
        }else if(!orderInfoShowObj.isUseCoupon() && this.hasInitShowAlipayQR != 1){
            this.getAlipayQR();
            this.hasInitShowAlipayQRUseCoupon = 0;
            this.hasInitShowAlipayQR = 1;
        }
    },
    openWechatPay: function() {
        if(orderInfoShowObj.isUseCoupon() && this.hasInitShowWechatQRUseCoupon != 1){
            this.getWechatQR();
            this.hasInitShowWechatQRUseCoupon = 1;
            this.hasInitShowWechatQR = 0;
        }else if(!orderInfoShowObj.isUseCoupon() && this.hasInitShowWechatQR != 1){
            this.getWechatQR();
            this.hasInitShowWechatQRUseCoupon = 0;
            this.hasInitShowWechatQR = 1;
        } else if (showPayObj.wechatQRTimeOut == 1) {
            this.getWechatQR();
            showPayObj.wechatQRTimeOut = 0;
        }
    },
    getAlipayQR: function() {
        var that = this;
        if (!ctx) ctx = '';
        var isCheckedCashCoupon = $('#isCheckedCashCoupon').val();
        var code = $.trim($('#code').val());
        $.ajax({
            url: ctx + "/alipay/getPayQr.oo",
            data: { 'tradeOrderNum': tradeOrder.orderNumber, isCheckedCashCoupon: isCheckedCashCoupon, verifiCode: code },
            type: "POST",
            success: function(resultStr) {
                var result = eval('(' + resultStr + ')');
                if (result.code == 200 && result.qr) {
                    $('.showAlipayQR').attr('src', result.qr);
                    $('.amount-num-common em').text(result.payAmount);
                    showPayObj.wechatCheckStatus();
                } else if (result.code == 300) {
                    showPayObj.wechatCheckStatus();
                } else {
                    showPayObj.showWechatPayError();
                }
            },
            error: function() {
                showPayObj.showWechatPayError();
            }
        });
    },
    getWechatQR: function() {
        var that = this;
        if (!ctx) ctx = '';
        var isCheckedCashCoupon = $('#isCheckedCashCoupon').val();
        var code = $.trim($('#code').val());
        $.ajax({
            url: ctx + "/wechat/getPayQr.oo",
            data: { 'tradeOrderNum': tradeOrder.orderNumber, isCheckedCashCoupon: isCheckedCashCoupon, verifiCode: code,channel: 'wechat_qr' },
            type: "POST",
            success: function(resultStr) {
                var result = eval('(' + resultStr + ')');
                if (result.code == 200 && result.qr) {
                    // $('.showWechatQR').attr('src', result.qr);
                    $('#qrcode').html("")
                    var qrcode = new QRCode(document.getElementById("qrcode"), {
                        text: result.qr,
                        width: 60,
                        height: 60,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });
                    $('.amount-num-common em').text(result.payAmount);
                    showPayObj.wechatCheckStatus();
                } else if (result.code == 300) {
                    showPayObj.wechatCheckStatus();
                } else {
                    showPayObj.showWechatPayError();
                }
            },
            error: function() {
                showPayObj.showWechatPayError();
            }
        });
    },
    setLastPayWay: function(payWay) {
        if (payWay != 6) { //花呗分期不需要记录
            $.cookie("lastPayWay", payWay, {
                expires: 90
            })
        }
    },
    getLastPayWay: function() {
        //获取以前的支付渠道，除花呗分期外
        var lastPayWay = jQuery.cookie('lastPayWay');
        return lastPayWay;
    },
    hideHbfq: function() {
        $('.huabei-detail').removeClass('active');
        $('.installment-detail').hide();
    },
    showHbfq: function() {
        $('.installment-detail').show();
    },
    fillHbfqPayTotal: function() {
        var fq_num = $('.installment-item.active').attr('fq_num');
        for (var i in hbfqList) {
            if (hbfqList[i].num == fq_num) {
                var hb = hbfqList[i];
                if (orderInfoShowObj.isUseCoupon()) {
                    $('.showFqInfo em').text(hb.eachPrinAndFeeUseCoupon + '* ' + hb.num);
                    $('.amount-num-fq em').text(hb.prinAndFeeUseCoupon)
                } else {
                    $('.showFqInfo em').text(hb.eachPrinAndFee + '* ' + hb.num);
                    $('.amount-num-fq em').text(hb.prinAndFee)
                }
                break;
            }
        }
    }
}

var showPayObj = {
    interval: 0,
    wechatQRTimeOut: 0,
    wechatQRInterval: 0,
    countDownTimer: 0,
    countDownInterval: 60,
    countDownTimeout: 60,
    preChannel: 0,
    init: function () {
      if(channelShowObj.isShowQr == 1 && isCheckedCoupon != 1){
          this.prePay();
      }
    },
    initEvent: function() {
        var that = this;


        $('.cancel-btn').click(function() {
            $('#popup').hide();
        });
        $('.surePay').click(function() {
            if ($(this).hasClass('disabled')) {
                return ;
            }
            that.prePay();
        });
        $('.refreshWechatQR').click(function() {
            that.prePay();
        });
        $("html, body").animate({ scrollTop: $("#orderDetail").offset().top }, { duration: 500, easing: "swing" });
        $('.goVerify').click(function() {
            if ($(this).hasClass("disabled")) return;
            if (!$('#code').val() || $('#code').val().length < 6) {
                $('.err-tip').text('请输入手机验证码').show();
                return;
            }
            $(this).addClass("disabled");
            that.verifyCode();
        });
        $('.voucher-code-btn').click(function() {
            if ($(this).hasClass("disabled")) return;
            that.getVerifyCode();
        })
        $('.load-btn').click(function() {
            _track(clickAlipayBtnObj);
            that.prePay(1);
        });
        $('.complete-btn').click(function () {
            showPayObj.checkStatus(myOrders);
            myOrders();
        });
        $('.other-btn').click(function () {
            showPayObj.checkStatus(showPayObj.notPayInWechat);
            $('.message-box').hide()
            $('#popup').hide();
        });
    },
    prePay: function(channel) {
        var that = this;
        //预支付，检查鼓励金是否满足支付
        if (parseFloat(couponBalance) > 0 && orderInfoShowObj.isUseCoupon()) {
            if (that.chitVerify()) {
                $('.message-box').hide()
                $('.voucher-box').show()
                $('#popup').show();
                $('#code').val('');
                $('.err-tip').text('');
                $('.voucher-box-btn').addClass('disabled');
                $('.voucher-code-btn').removeClass('disabled').text('获取验证码');
                showPayObj.preChannel = channel;
            }
        } else {
            that.pay(channel);
        }
    },
    pay: function(channel, hasUseCoupon) {
        if (orderInfoShowObj.isUseCoupon()) $('#isCheckedCashCoupon').val(1);
        else $('#isCheckedCashCoupon').val(0);
        //TODO 判断足额支付逻辑需要再修改
        if(!channel){
            channel = $('.pay-method .item-detail.active').attr('paychannel');
        }
        channelShowObj.setLastPayWay(channel);
        $('#tradeOrderNum').val(tradeOrder.orderNumber);
        $('#payChannel').val(channel);
        $('#couponAount').val(couponBalance);
        var code = $.trim($('#code').val());
        $('#verifiCode').val(code);

        if (channel == '6') {
            var fq_num = $('.installment-item.active').attr('fq_num');
            $('#hb_fq_num').val(fq_num);
            for (var i in hbfqList) {
                if (hbfqList[i].num == fq_num) {
                    if (orderInfoShowObj.isUseCoupon()) {
                        $('#eachPrinAndFee').val(hbfqList[i].eachPrinAndFeeUseCoupon);
                    } else {
                        $('#eachPrinAndFee').val(hbfqList[i].eachPrinAndFee);
                    }
                    $('#sp').val(hbfqList[i].sellerPercent);
                    break;
                }
            }
        }

        _track(clickPayBtnObj);
        if (!ctx) ctx = '';
        if (parseFloat(couponBalance) > 0 && orderInfoShowObj.isUseCoupon() &&
            (orderInfoShowObj.residueCoupon && parseFloat(orderInfoShowObj.residueCoupon) > 0)) {
            var form = $("#payChannelForm");
            form.attr("action", ctx + "/cashcoupon/pay.oo");
            form.submit();
            return;
        }

        if (channel == '5') {
            channelShowObj.openAlipay(hasUseCoupon);
            this.wechatCheckStatus();
            return;
        } else if (channel == '2') {
            this.wechatPay();
            this.wechatCheckStatus();
            return;
        }
        $('.message-box').hide()
        $('#popup').show();
        if (channel == '6' && showTiE == 1) {
            $('.hbzf-box').show()
        } else {
            $('.common-box').show()
        }
        this.redirectToChannel();

    },
    wechatPay: function() {
        var that = this;
        clearTimeout(that.wechatQRInterval);
        $('.prcode-hint').hide();
        that.wechatQRTimeOut = 1;
        console.log('openWechatPay', 'wechatPay');
        channelShowObj.openWechatPay();
        that.wechatQRInterval = setTimeout(function() {
            that.wechatQRTimeOut = 0;
            $('.prcode-hint').show();
        }, 10 * 60 * 1000);
    },
    redirectToChannel: function() {
        var form = $("#payChannelForm");
        if (!ctx) ctx = '';
        form.attr("action", ctx + '/payorder/channel.oo');
        form.attr("target", "_blank");
        form.submit();
        $('.weixin-paying').show();
    },
    // 安全验证
    verifyCode: function() {
        var that = this;
        if (!ctx) ctx = '';
        var code = $.trim($('#code').val());
        $.ajax({
            async: false,
            url: ctx + '/verificationcode/validate.oo',
            dataType: 'JSON',
            data: { code: code, tradeOrderNum: tradeOrder.orderNumber },
            type: "POST",
            success: function(res) {
                if (res && res.retCode == 200) {
                    $("#popup").hide();
                    $('#verifiCode').val(code);
                    $('#isCheckedCashCoupon').val(1);
                    that.isCheckedCashCoupon = 1;

                    //校验代金券余额是否有变化
                    if (that.chitVerify()) {
                        that.pay(showPayObj.preChannel, 1);
                    }
                } else {
                    $('.err-tip').text(res.retMsg).show();
                }

                $('.goVerify').removeClass('disabled');
            }
        });
    },
    getVerifyCode: function() {
        var that = this;
        if (!ctx) ctx = '';
        $.get(ctx + '/verificationcode/getcode.oo?tradeOrderNum=' + tradeOrder.orderNumber,
            function(res) {
                //var res = eval('(' + resultStr + ')');
                if (res && res.retCode == 200) {
                    showPayObj.countDown();
                    $('.err-tip').text('验证码已发送到您的手机，请注意查收').show();
                    $('.voucher-code-btn').removeClass('disabled');
                    $('.voucher-box-btn').removeClass('disabled');
                } else {
                    $('.err-tip').text('验证码发送失败，请稍后再试').show();
                }
            }, 'json');
    },
    countDown: function() {
        if (showPayObj.countDownTimeout > 0) {
            $('.voucher-code-btn').addClass('disabled').text(--showPayObj.countDownTimeout + 's后重新获取');
            showPayObj.countDownTimer = setTimeout(showPayObj.countDown, 1000);
        } else {
            clearTimeout(showPayObj.countDownTimer);
            $('.voucher-code-btn').removeClass('disabled').text('点击重新获取');
            showPayObj.countDownTimeout = showPayObj.countDownInterval;
        }
    },
    // 验证换新鼓励金金额是否有变化
    chitVerify: function() {
        var isNotChange = true;
        if (!ctx) ctx = '';
        $.ajax({
            async: false,
            url: ctx + "/reclaim/cashacct/querybalace.oo",
            dataType: 'JSON',
            data: { tradeOrderNum: tradeOrder.orderNumber, balace: couponBalance },
            type: "POST",
            success: function(res) {
                if (res && res.retCode == 200) {
                    if (!res.isEq) {
                        isNotChange = false;
                        couponBalance = res.balace;
                        orderInfoShowObj.init();
                        orderInfoShowObj.initCoupon();
                        $('.message-box').hide()
                        $('#popup').show();
                        $('.voucher-change').show()
                    }
                } else {
                    alert('服务器异常，请重试。如果重试还有问题，请反馈给商城客服人员。');
                }
            }
        });
        return isNotChange;
    },
    showWechatPayError: function () {
        this.removeWechatCheckStatus();
    },
    removeWechatCheckStatus: function () {
        var that = this;
        if(that.interval >= 0){
            clearInterval(that.interval);
            that.interval = -1;
        }
    },
    notPayInWechat: function() {},
    wechatCheckStatus: function() {
        var that = this;
        if (that.interval > 0) return;
        that.interval = setInterval(function() {
            that.checkStatus(showPayObj.notPayInWechat);
        }, 3000);
    },
    checkStatus: function(callback) {
        var that = this;
        if (!ctx) ctx = '';
        $.ajax({
            url: ctx + "/payorder/checkstatus.oo",
            data: { "tradeOrderNum": tradeOrder.orderNumber },
            type: "POST",
            success: function(resultStr) {
                var result = eval('(' + resultStr + ')');
                if (result.code == 200) {
                    if (result.success == 1) {
                        that.removeWechatCheckStatus();
                        //已支付成功,跳转到支付成功界面
                        if (undefined == result.returnUrl || "" == result.returnUrl) {
                            window.location = ctx + "/payorder/success.oo?tradeOrderNum=" + tradeOrder.orderNumber;
                        } else {
                            location.href = result.returnUrl;
                        }
                    } else {
                        //待支付,停留在收银台页面
                        callback();
                    }
                } else {
                    that.removeWechatCheckStatus();
                    //处理失败,跳转异常界面
                    window.location = ctx + "/casher/exception.jsp";
                }
            },
            error: function() {
                that.removeWechatCheckStatus();
            }
        });
    },

};


function myOrders() { //订单中心
    window.location.href = myOrdersUrl;
}

function payHelpCenter(){ //支付帮助中心
    window.open(payHelpCenterUrl);
}

//埋点数据上报
function _track(sendObj){
    if($.cookie('vivo_fe_vftcookid') != undefined){
        sendObj.cookid = $.cookie('vivo_fe_vftcookid');
    }
    if($.cookie('login_flag') != undefined){
        sendObj.login_flag = $.cookie('login_flag');
    }
    var url = 'https://stpc.vivo.com.cn/shop/flyHeart?' + $.param(sendObj);
    new Image().src = url ;
    return url;
}

var finishLoadingObj = {
    cfrom : '5600',
    pageview : '商城收银台页',
    vivoshopOrderNo : tradeOrder.outTradeOrderNo, //商城订单号
    openid : tradeOrder.openId, //商城订单号
    is_done : '1',
    visittime : new Date().getTime(),// 上报时的时间戳 new Date().getTime()
    version : 1, // 老版本商城标识
    visittype : 'pc',
    source_from: $.cookie('source_from') == undefined ? '0': $.cookie('source_from')
};
var clickPayBtnObj = {
    cfrom : '5602',
    pageview : '商城收银台页',
    vivoshopOrderNo :tradeOrder.outTradeOrderNo, //商城订单号
    openid : tradeOrder.openId, //商城订单号
    is_done : '1',
    visittime : new Date().getTime(),// 上报时的时间戳 new Date().getTime()
    version : 1, // 老版本商城标识
    visittype : 'pc',
    source_from: $.cookie('source_from') == undefined ? '0': $.cookie('source_from')
};

var clickAlipayBtnObj = {
    cfrom : '5601',
    pageview : '商城收银台页',
    vivoshopOrderNo :tradeOrder.outTradeOrderNo, //商城订单号
    openid : tradeOrder.openId, //商城订单号
    is_done : '1',
    visittime : new Date().getTime(),// 上报时的时间戳 new Date().getTime()
    version : 1, // 老版本商城标识
    visittype : 'pc',
    source_from: $.cookie('source_from') == undefined ? '0': $.cookie('source_from')
};
_track(finishLoadingObj);
