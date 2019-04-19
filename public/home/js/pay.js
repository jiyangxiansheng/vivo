(function() {

    // 金额单位换算
    var AmountUtil = {

        // 元转换为分
        yuan2Fen: function(yuan) {
            return new Decimal(yuan).times(100).toFixed(2);
        },

        // 分转换为元
        fen2yuan: function(fen) {
            return new Decimal(fen).div(100).toFixed(2);
        }
    };

    // 计算: 总金额(本金+利息),每期的金额,总手续费(利息),每期的手续费
    function computeHbfqFee(hbfqConf, busMoney) {

        // 卖家费率
        var sellerPercent = hbfqConf.sellerPercent;
        // 支付宝规定的费率
        var feeRate = hbfqConf.feeRate;
        // 分期数
        var num = hbfqConf.num;

        // 计算买家费率=支付宝规定的费率*((100-商家承担的费率比例)/100)
        var realFeeRate = new Decimal(feeRate).times(new Decimal(100).minus(sellerPercent).div(10000)).toDP(6, Decimal.ROUND_HALF_UP);

        // 手续费=交易金额*买家费率
        var fee = new Decimal(busMoney).times(realFeeRate).toDP(0, Decimal.ROUND_HALF_EVEN);

        // 每期手续费
        var eachFee = fee.div(num).toDP(0, Decimal.ROUND_DOWN);

        // 应支付金额
        var busAndFee = new Decimal(busMoney).plus(fee);

        // 每期应还的金额
        var eachBusAndFee = new Decimal(busMoney).div(num).toDP(0, Decimal.ROUND_DOWN).plus(eachFee);

        return {
          busAndFee: AmountUtil.fen2yuan(busAndFee),
          eachBusAndFee: AmountUtil.fen2yuan(eachBusAndFee),
          fee: AmountUtil.fen2yuan(fee),
          eachFee: AmountUtil.fen2yuan(eachFee)
        };
    }

    window.computeHbfqFee = computeHbfqFee;

})();