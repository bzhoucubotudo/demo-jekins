/**
 * Created by xiaoy35 on 2017/11/28.
 */
$(document).ready(function () {

    var login_model = $('input[name="login_model"]').val();
    var loginError = $('input[name="login_error"]').val();
    var selectpage = $('input[name="selectpage"]').val();

    //页面初始化
    $('.mes_login').css('background', '#e5e5e5');
    $('.tips').css('visibility', 'hidden').text("");

    var username = $('#username');
    var password = $('#password');

    //// 1:免密 12：免密和验证码 14：免密和密码 124：免密、验证码、密码三种  2:验证码 4：密码 24：验证码和密码
    if(selectpage == '12' || selectpage == '2'){
        $('#link_pwd_login').css("display","none");
        smslogin();
    }else if(selectpage == '14' || selectpage == '4'){
        $('#link_sms_login').css("display","none");
        pwdlogin();
    }else{
        smslogin();
    }
    if (loginError != '') {
        showError(loginError);
    }

    //if (login_model == 0) {
    //    //免密登录失败后，默认跳转到验证码登录
    //    //验证码登录
    //    smslogin();
    //    if (loginError != '') {
    //        showError(loginError);
    //    }
    //} else if (login_model == 1) {
    //    //验证码登录
    //    smslogin();
    //    if (loginError != '') {
    //        showError(loginError);
    //    }
    //} else if (login_model == 2) {
    //    //密码登录
    //    pwdlogin();
    //    if (loginError != '') {
    //        showError(loginError);
    //    }
    //}

    $('#link_pwd_login').on('click', function () {
        pwdlogin();
    });
    $('#link_sms_login').on('click', function () {
        smslogin();
    });

    //注册
    $('#link_regist').on('click', function () {
        var sms_value = $('#sms_login').css('display');
        if (sms_value == 'none') {
            //页面是pwd_login
            var search = $('#loginForm').serialize();
            window.location.href = '/authz/regist?back_url=' + weburl + "/oauth/authorize?" + search;
        } else {
            //页面是sms_login
            var search = $('#smsloginForm').serialize();
            window.location.href = '/authz/regist?back_url=' + weburl + "/oauth/authorize?" + search;
        }
    });

    //找回密码
    $('a[name="findpwd"]').on('click', function () {
        var search = $('#loginForm').serialize();
        window.location.href = '/authz/findpwd?back_url=' + weburl + "/oauth/authorize?" + search;
    });

    //校验密码登录
    $('#username,#password').on('input propertychange', function () {
        if (!isEmpty(username) && !isEmpty(password)) {
            $('.tips').css('visibility', 'hidden').text("");
            $('#real_pwd_login').css('background', '#74CB26')
            $('#real_pwd_login').attr('flag','false');
        }

    });

    /**
     * 密码登录方式
     */
    $('#real_pwd_login').on("click", function () {
        if (isEmpty(username)) {
            showError("请输入用户名");
            return;
        } else if (isEmpty(password)) {
            showError("请输入密码");
            return;
        }
        if ($('#real_pwd_login').attr('flag') != 'false') {
            return;
        }
        $('#loginForm').submit();
    });

    /**
     * 验证码登录方式
     */
    var smsPhone = $('#sms_phone');
    var smsCode = $('#sms_code');
    $('#get_smscode').on("click", function () {
        if( $('#get_smscode').attr('disabled')){
            return;
        }
        if (isEmpty(smsPhone)) {
            showError("请输入手机号");
            return;
        }
        if (!checkMobile(smsPhone)) {
            showError("您输入的手机号不合法");
            return;
        }
        var param = {"phone": smsPhone.val()};
        $.ajax({
            url: weburl + '/sms/getSmsCode',
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(param),
            async: true,
            timeout: 30000,
            error: function () {
                showError("网络通信错误，请稍后再试!");
            },
            success: function (data) {
                if (data.code == '0') {
                    settime($('#get_smscode'));
                } else {
                    showError("验证码发送失败");
                }
            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    showError("网络通信错误，请稍后再试!");
                }
            }
        });

    });

    //校验验证码登录
    $('#sms_phone,#sms_code').on('input propertychange', function () {
        if (smsPhone.val().length == 11 && smsCode.val().length == 6) {
            $('.tips').css('visibility', 'hidden').text("");
            $('#real_sms_login').css('background', '#74CB26');
            $('#real_sms_login').attr('flag','false');
        }

    })

    $('#real_sms_login').on('click', function () {
        if (isEmpty(smsPhone)) {
            showError("请输入用户名");
            return;
        } else if (isEmpty(smsCode) && smsCode.val().length != 6) {
            showError("请输入正确验证码");
            return;
        }
        if ($('#real_sms_login').attr('flag') != 'false') {
            return;
        }
        $('#smsloginForm').submit();
    })

    $('.free_register_mes_blue').on('click',function(){
        var sms_value = $('#sms_login').css('display');
        if (sms_value == 'none') {
            //页面是pwd_login
            var search = $('#loginForm').serialize();
            window.location.href = '/authz/resource/html/disclaimer.html?back_url=' + weburl + "/oauth/authorize?" + search;
        } else {
            //页面是sms_login
            var search = $('#smsloginForm').serialize();
            window.location.href = '/authz/resource/html/disclaimer.html?back_url=' + weburl + "/oauth/authorize?" + search;
        }

        //window.location.href = '/authz/resource/html/disclaimer.html?back_url=' + window.location.href;
        //window.location.href = '/authz/resource/html/disclaimer.html';
    });

});


function smslogin() {
    $('#sms_login').css('display', 'block');
    $('#pwd_login').css('display', 'none');
    $('#div_title').html('短信验证码登录');
    $('title').text('短信验证码登录');
}

function pwdlogin() {
    $('#pwd_login').css('display', 'block');
    $('#sms_login').css('display', 'none');
    $('#div_title').html('密码登录');
    $('title').text('密码登录');
}

