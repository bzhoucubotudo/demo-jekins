/**
 * Created by xiaoyang on 2017/7/17.
 */
$(document).ready(function () {

    var username = $('#username');
    var password = $('#password');

    /**
     * 是否报错返回
     * 如果以下两个参数不为空，则是报错返回
     * @type {*}
     */
    var loginModel = $('input[name="login_model"]').val();
    var loginError = $('input[name="login_error"]').val();
    /**
     * IP是否是联通网关
     * @type {*}
     */
    var isUnicom = $('input[name="isUnicom"]').val();

    //登录失败，返回错误信息
    if (loginModel || loginError)
        pageinit(loginModel, loginError);
    else {
        //如果是联通网关
        if(isUnicom){
            //如果用户用的是手机网路
            if(checkNetworkType() <=4){
                showTargetDivOnly("free_pwd");
            }else{
                //默认短信验证码登录
                showTargetDivOnly("sms");
            }
        }else{
            //如果不是联通网络，则默认短信验证码登录
            showTargetDivOnly("sms");
        }
    }

    $("a[name='link-password-login']").on("click", function () {
        showTargetDivOnly("pwd");
    });

    $("a[name='link-sms-login']").on("click", function () {
        showTargetDivOnly("sms");
    });

    $("a[name='link-free-password-login']").on("click", function () {
        showTargetDivOnly("free_pwd");
    });


    /**
     * 用户名密码登录方式
     */
    $('#j-login').on("click", function () {
        if (isEmpty(username)) {
            showtip("请输入用户名", 1);
            return;
        }

        if (isEmpty(password)) {
            showtip("请输入密码", 1);
            return;
        }

        $('#loginForm').submit();
    });

    $('a[name="regist"]').on('click', function () {
        var search = $(this).parents("form").serialize();
        window.location.href = '/authz/regist?back_url=' + weburl +"/oauth/authorize?"+ search;
    });
    $('a[name="findpwd"]').on('click', function () {
        var search = $(this).parents("form").serialize();
        window.location.href = '/authz/findpwd?back_url=' + weburl +"/oauth/authorize?"+ search;
    });


    var smsUserCode = $('#j-sms-userName');
    var smsUserCodeDel = $('.jsms-phone-box .delete');
    var smsPassword = $('#j-sms-password');
    smsUserCode.on("keyup", function () {
        smsUserCodeDel.css("display", "block");
    });

    smsUserCodeDel.on("click", function () {
        smsUserCodeDel.css("display", "none");
        smsUserCode.val("");
    });

    /**
     * 获取短信验证码
     */
    $('#j-sms-send').on("click", function () {
        if (isEmpty(smsUserCode)) {
            showtip("请输入手机号", 1);
            return;
        }
        if (!checkMobile(smsUserCode)) {
            showtip("您输入的手机号不合法", 1);
            return;
        }
        var param = {"phone": smsUserCode.val()};
        $.ajax({
            url: weburl + '/sms/getSmsCode',
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(param),
            async: true,
            timeout: 30000,
            error: function () {
                showtip("网络通信错误，请稍后再试!", 1);
            },
            success: function (data) {
                if (data.code == '1') {
                    showtip("验证码发送失败", 1);
                }
                else if (data.code == '0') {
                    settime($('#j-sms-send'));
                }
            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    showtip("网络通信错误，请稍后再试!", 1);
                }
            }
        });

    });
    /**
     * 验证码登录方式
     */
    $('#j-sms-login').on("click", function () {
        if (isEmpty(smsUserCode)) {
            showtip("请输入手机号", 1);
            return;
        }
        if (smsUserCode.val().length < 11) {
            showtip("您输入的手机号不合法", 1);
            return;
        }
        if (isEmpty(smsPassword)) {
            showtip("请输入验证码", 1);
            return;
        }
        //var md5 = hex_md5(smsPassword.val());
        //console.log(md5);
        $('#smsloginForm').submit();
    })

    var countdown = 60;

    function settime(val) {
        if (countdown == 0) {
            val.removeAttr("disabled");
            val.text("获取验证码");
            countdown = 60;
            return;
        } else {
            val.attr("disabled", true);
            val.text(countdown + "秒");
            countdown--;
        }
        setTimeout(function () {
            settime(val)
        }, 1000)
    }

    /**
     * 免密登录
     * 两个特殊参数：unikey和imsi
     * 分别对应username和password
     */
    $('#j-free-password-login').on("click", function () {
        $('#freePasswordLoginForm').submit();
    });

    function pageinit() {

        if (loginModel == '0') {
            //免密登陆
            showTargetDivOnly("free_pwd");
            showtip(loginError, 1);
        } else if (loginModel == '1') {
            //验证码登录
            showTargetDivOnly("sms");
            showtip(loginError, 1);
        } else if (loginModel == '2') {
            showTargetDivOnly("pwd");
            showtip(loginError, 1);
        }
    }



    /**
     * 1.页面加载完成
     * 2.判断当前网络类型并返回对应的数值
     * TODO NETWORK_TYPE_ENUM类型完善或者模糊匹配
     */
    function checkNetworkType() {
        var NETWORK_TYPE_ENUM = {
            "CELLULAR":1,
            "2G":2,
            "3G":3,
            "3GNET":3,
            "4G":4,
            "ETHERNET":5,
            "BLUETOOTH":6,
            "MIXED":7,
            "NONE":8,
            "OTHER":9,
            "UNKNOWN":10,
            "WIFI":11,
            "WIMAX":12
        };
        var ua = window.navigator.userAgent;
        var con = window.navigator.connection;
        var network_state = 'unknown';
        // 如果是微信
        if(/MicroMessenger/.test(ua)){
            // 如果是微信6.0以上版本，用UA来判断
            if(/NetType/.test(ua)){
                var type = ua.match(/NetType\/(\S*)/);
                network_state = type[1];
                // 如果是微信6.0以下版本，调用微信私有接口WeixinJSBridge
            }else{
                alert('not 6.0')
                document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
                    WeixinJSBridge.invoke('getNetworkType',{},function(e){
                        network_state = e.err_msg;
                    });
                });
            }
            // 如果支持navigator.connection
        }else if(con){
            var network = con.type;
            network_state = network;
        }

        // $('#network_type').text(network_state);

        return NETWORK_TYPE_ENUM[network_state.toUpperCase()];
    }


    /**
     * 控制指定的div显示
     * 并隐藏其他div
     * target: pwd，密码登录；sms，验证码登录；free_pwd，免密登录。
     * @param target
     */
    function showTargetDivOnly(target) {
        if (target == "pwd"){
            $('#passwordLogin').removeClass("hide");
            $('#smsLogin').addClass("hide");
            $('#freePasswordLogin').addClass("hide");
        }
        if (target == "sms"){
            $('#smsLogin').removeClass("hide");
            $('#passwordLogin').addClass("hide");
            $('#freePasswordLogin').addClass("hide");
        }
        if (target == "free_pwd"){
            $('#freePasswordLogin').removeClass("hide");
            $('#passwordLogin').addClass("hide");
            $('#smsLogin').addClass("hide");
        }
    }

    // function handsup() {
    //     if (checkNetworkType() <= 4) {
    //         $.ajax({
    //             url: weburl + '/anon/checkIpIsUnicom',
    //             type: "post",
    //             dataType: "json",
    //             contentType: "application/x-www-form-urlencoded",
    //             data: "",
    //             async: true,
    //             timeout: 30000,
    //             error: function (data) {
    //                 if (data.responseText.error) {
    //                     showtip(data.responseText.error_description, 1);
    //                 } else {
    //                     showtip("网络通信错误，请稍后再试!", 1);
    //                 }
    //             },
    //             success: function (data) {
    //                 if (data.error) {
    //                     showtip(data.error_description, 1);
    //                 }
    //                 else {
    //                     showtip(data, 5);
    //
    //                     $('#oauth2info').text(data);
    //
    //                 }
    //             },
    //             complete: function (XMLHttpRequest, status) {
    //                 if (status == 'timeout') {
    //                     showtip("网络通信错误，请稍后再试!", 1);
    //                 }
    //             }
    //         });
    //     } else {
    //         $('#oauth2info').text("不是手机网络！");
    //     }
    // }
    //
    // handsup();

});

