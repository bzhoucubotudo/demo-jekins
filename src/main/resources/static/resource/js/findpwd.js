/**
 * Created by xiaoy35 on 2017/11/30.
 */
$(document).ready(function () {
    var phone = $('#phone');
    var newpassword = $('#new_password');
    var code = $('#code');
    var sendcode = $('#send_code');
    var findpwd = $('#findpwd');

    //页面初始化
    $('.mes_login').css('background', '#e5e5e5');
    $('.tips').css('visibility', 'hidden').text("");

    $('.top_banner_return').on('click', function () {
        window.location.href = decodeURIComponent(window.location.search.substr(10));
    });

    $('.free_register_mes_blue').on('click',function(){
        window.location.href = '/authz/resource/html/disclaimer.html?back_url=' + window.location.href;
        //window.location.href = '/authz/resource/html/disclaimer.html';
    });
    //输入完手机号校验
    var phoneflag ;
    phone.on('keyup', function () {
        newpassword.removeAttr('disabled');
        code.removeAttr('disabled');
        sendcode.removeAttr('disabled');
        findpwd.removeAttr('disabled');
        var phonenum = $(this).val();
        var param = {"phonenum": phonenum};
        if (phonenum.length == 11) {
            $.ajax({
                url: weburl + '/regist/checkIfExist',
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
                        showError("该手机号尚未注册");
                        newpassword.attr('disabled','true');
                        code.attr('disabled','true');
                        sendcode.attr('disabled','true');
                        findpwd.attr('disabled','true');
                        phoneflag = true;
                    } else if (data.code == '2000') {
                        $('.tips').css('visibility', 'hidden').text("");
                        phoneflag = false;
                    } else {
                        showError("系统错误,请稍后再试");
                    }
                },
                complete: function (XMLHttpRequest, status) {
                    if (status == 'timeout') {
                        showError("网络通信错误，请稍后再试!");
                    }
                }
            });
        }
    });

    //获取验证码
    sendcode.on('click',function(){
        if(sendcode.attr('disabled')){
            return;
        }
        if(newpassword.attr('disabled')){
            showError("该手机号尚未注册");
            return;
        }
        var param = {"phonenum":phone.val()};
        $.ajax({
            url:weburl+'/findpwd/getFindPwdCode',
            type:"post",
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify(param),
            async:true,
            timeout : 30000,
            error:function(){
                showError("网络通信错误，请稍后再试!");
            },
            success: function(data){
                if(data.code == '0')
                {
                    settime(sendcode);
                }else {
                    showError("系统错误请稍后再试");
                }
            },
            complete : function(XMLHttpRequest,status){
                if(status=='timeout'){
                    showError("网络通信错误，请稍后再试!");
                }
            }
        });
    });

    var regx = /^[a-zA-Z0-9_]+$/;
    $('#phone,#new_password,#code').on('input propertychange',function(){
        if(!phoneflag && code.val().length == 6 && newpassword.val().length > 6){
            $('.tips').css('visibility', 'hidden').text("");
            findpwd.css('background', '#74CB26');
            findpwd.attr('flag',false);
        }
    });

    //找回密码
    findpwd.on('click',function(){
        if(phoneflag){
            showError("该手机号尚未注册");
            return;
        }
        if(isEmpty(newpassword)){
            showError("密码不能为空");
            return;
        }else if(newpassword.val().length < 6){
            showError("密码最少6位");
            return;
        }else if(!regx.test(newpassword.val())){
            showError("密码只能大小写字母、数字及下划线");
            return;
        }
        if (findpwd.attr('flag') != 'false') {
            return;
        }
        var param = {
            "phonenum": phone.val(),
            "newpassword": newpassword.val(),
            "code": code.val()
        };

        $.ajax({
            url: weburl + '/findpwd/findPwd',
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
                if (data.code == '0') {
                    //密码找回成功,刷新页面
                    $('.tips').css('visibility', 'visible').html("注册成功，2S后返回原网页");
                    setTimeout(function(){
                        window.location.href = decodeURIComponent(window.location.search.substr(10));
                    },2000);
                } else if (data.code == '2002') {
                    //验证码错误
                    showError("验证码错误");
                } else if (data.code == '2003') {
                    showError("验证码已过期");
                } else if (data.code == '2004') {
                    showError("用户不存在");
                } else {
                    showError("系统错误,请稍后再试");
                }
            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    showError("网络通信错误，请稍后再试!");
                }
            }
        });
    });

});