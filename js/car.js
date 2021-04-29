$(function() {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function() {
        // console.log($(this).prop("checked"));
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    $(".j-checkbox").change(function() {
        // if(被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        // console.log($(".j-checkbox:checked").length);
        // $(".j-checkbox").length 这个是所有的小复选框的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让当前的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    //增减商品数量模块
    $(".increment").click(function() {
        //先去获得文本框的值然后进行++
        var n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);
        //计算价格
        var p = $(this).parents(".p-num").siblings('.p-price').html();
        // console.log(p);
        //截取字符串带有￥不能进行计算
        p = p.substr(1);
        var pice = (p * n).toFixed(2);
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + pice);
        getSum();


    });
    //减少数量
    $(".decrement").click(function() {

        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        //计算价格
        var p = $(this).parents(".p-num").siblings('.p-price').html();
        // console.log(p);
        //截取字符串带有￥不能进行计算
        p = p.substr(1);
        var pice = (p * n).toFixed(2);
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + pice);
        getSum()
    });
    //用户修改文本框的值 计算 小计模块
    $(".itxt").change(function() {
        //获取当前文本框的值
        var n = $(this).val();
        // console.log(p);
        var p = $(this).parents(".p-num").siblings('.p-price').html();
        p = p.substr(1);
        var pice = (n * p).toFixed(2);
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + pice);

    });
    //计算总计和总额
    getSum();

    function getSum() {
        //计算总件数
        var count = 0;
        //计算总价格
        var money = 0;
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        //把得到的总件数放到文本框内
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        })
        $(".price-sum em").text("￥" + money.toFixed(2));

    };
    //删除操作
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        //计算总计和总额
        getSum();
    });
    //删除选定的复选框
    $(".remove-batch").click(function() {
            $(".j-checkbox:checked").parents(".cart-item").remove();
            //计算总计和总额
            getSum();
        })
        //清理购物车
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        //计算总计和总额
        getSum();
    })


})