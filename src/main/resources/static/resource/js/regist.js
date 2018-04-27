/**
 * Created by xiaoy35 on 2017/11/29.
 */
$(document).ready(function(){

    //页面初始化
    $('.mes_login').css('background', '#e5e5e5');
    $('.tips').css('visibility', 'hidden').text("");

    //返回
    $('.top_banner_return').on('click', function () {
        window.location.href = decodeURIComponent(window.location.search.substr(10));
    });

    $('.free_register_mes_blue').on('click',function(){
        window.location.href = '/authz/resource/html/disclaimer.html?back_url=' + window.location.href;
        //window.location.href = '/authz/resource/html/disclaimer.html';
    });

    var phone = $('#phone');
    var password = $('#password');
    var code = $('#code');
    var get_smscode = $('#get_smscode');
    var realRegist = $('#real_regist');

    var phoneflag = true;
    //输入完手机号校验
    phone.on('keyup', function (){
        password.removeAttr('disabled');
        code.removeAttr('disabled');
        get_smscode.removeAttr('disabled');
        realRegist.removeAttr('disabled');
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
                        $('.tips').css('visibility', 'hidden').text("");
                        phoneflag = true;
                    } else if (data.code == '2000') {
                        showError("该手机号已被注册");
                        password.attr('disabled','true');
                        code.attr('disabled','true');
                        realRegist.attr('disabled','true');
                        phoneflag = false;
                    } else {
                        showError("系统错误请稍后再试");
                        phoneflag = false;
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
    var regx = /^[a-zA-Z0-9_]+$/;
    get_smscode.on('click',function(){
        if(get_smscode.attr('disabled')){
            return;
        }
        if(password.attr('disabled')){
            showError("该手机号已被注册");
            return;
        }else if(isEmpty(password) && password.val().length < 6){
            showError("密码最少6位");
            return;
        }else if(!regx.test(password.val())){
            showError("密码只能大小写字母、数字及下划线");
            return;
        }
        var param = {"phonenum":phone.val()};
        $.ajax({
            url:weburl+'/regist/getRegistSmsCode',
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
                    settime(get_smscode);
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

    $('#phone,#password,#code').on('input propertychange',function(){
       if(phoneflag && code.val().length == 6 && password.val().length > 6 ){
           $('.tips').css('visibility', 'hidden').text("");
           realRegist.css('background', '#74CB26');
           realRegist.attr('flag','false');
       }
    });

    //注册
    realRegist.on('click',function(){
        if(!phoneflag){
            showError("该手机号已被注册");
            return;
        }
        if(isEmpty(password) && password.val().length < 6){
            showError("密码最少6位");
            return;
        }else if(!regx.test(password.val())){
            showError("密码只能大小写字母、数字及下划线");
            return;
        }
        if (realRegist.attr('flag') != 'false') {
            return;
        }

        var param = {
            "phonenum":phone.val(),
            "password":password.val(),
            "code":code.val()
        };

        $.ajax({
            url:weburl+'/regist/registUser',
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
                    //注册成功,返回原页面
                    $('.tips').css('visibility', 'visible').html("注册成功，2S后返回原网页");
                    setTimeout(function(){
                        window.location.href = decodeURIComponent(window.location.search.substr(10));
                    },2000);
                }else if(data.code == '2002') {
                    //验证码错误
                    showError("验证码错误");
                }else if(data.code == '2003'){
                    showError("验证码已过期");
                }else{
                    showError("系统错误,请稍后再试");
                }
            },
            complete : function(XMLHttpRequest,status){
                if(status=='timeout'){
                    showError("网络通信错误，请稍后再试！");
                }
            }
        });


    })


});