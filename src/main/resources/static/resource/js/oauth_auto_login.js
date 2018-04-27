/**
 * Created by xiaoy35 on 2017/11/28.
 */
var openapi_url = window.location.protocol+"//"+window.location.host + "/openapi/networkauth"
$(document).ready(function () {

    var loginModel = $('input[name="login_model"]').val();
    var loginError = $('input[name="login_error"]').val();
    var failtype = $('input[name="failtype"]').val();
    var selectpage = $('input[name="selectpage"]').val();
    var unikey = $('input[name="unikey"]').val();

    //if(failtype == "fail"){
    //    $('#regist').css("display","none");
    //    $('#pwd_login').css("display","none");
    //    $('#sms_login').css("display","none");
    //}
    // 1:免密 12：免密和验证码 14：免密和密码 124：免密、验证码、密码三种
    $('#regist').css("display","none");
    if(selectpage == '1'){
        $('#pwd_login').css("display","none");
        $('#sms_login').css("display","none");
    }else if(selectpage == '12'){
        $('#pwd_login').css("display","none");
        if (loginError != '') {
            showError(loginError);
        }
    }else if(selectpage == '14'){
        $('#sms_login').css("display","none");
        if (loginError != '') {
            showError(loginError);
        }
    }else{
        if (loginError != '') {
            showError(loginError);
        }
    }

    //配置实时取号，实际就是发送一个http请求，url里面携带unikey
    //http://open.wostore.cn/openapi/networkauth/precheck?unikey=010005c5e6d5e2f24c51c6e1395aca9c
    $.get(openapi_url + "/realTimeGetphone?unikey="+unikey);

    $('.free_register_mes_blue').on('click',function(){
        window.location.href = '/authz/resource/html/disclaimer.html?back_url=' + window.location.href;
        //window.location.href = '/authz/resource/html/disclaimer.html';
    });

    //密码登录
    $('#pwd_login').on('click', function () {
        $('input[name="loginmode"]').val(2);
        var search  = $('#freePasswordLoginForm').serialize();
        window.location.href = weburl + '/oauth/authorize?' + search;
    });

    //验证码登录
    $('#sms_login').on('click',function(){
        $('input[name="loginmode"]').val(1);
        var search = $('#freePasswordLoginForm').serialize();
        window.location.href = weburl + '/oauth/authorize?' + search;
    });

    $('#regist').on('click',function(){
        var search = $('#freePasswordLoginForm').serialize();
        window.location.href = '/authz/regist?back_url=' + weburl +"/oauth/authorize?"+ search;
    })

    $('#auto_login').on("click", function () {
        $('#freePasswordLoginForm').submit();
    });

})