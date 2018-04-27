/**
 * Created by xiaoyang on 2017/11/23.
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


    $("a[name='link-password-login']").on("click", function () {
        //密码登录
        $('input[name="loginmode"]').val(2);
        var search = $(this).parents("form").serialize();
        window.location.href = weburl + '/oauth/authorize?' + search;
    });

    $("a[name='link-sms-login']").on("click", function () {
        //验证码登录
        $('input[name="loginmode"]').val(1);
        var search = $(this).parents("form").serialize();
        window.location.href = weburl + '/oauth/authorize?' + search;
    });


    $('a[name="regist"]').on('click', function () {
        var search = $(this).parents("form").serialize();
        window.location.href = '/authz/regist?back_url=' + weburl +"/oauth/authorize?"+ search;
    });
    $('a[name="findpwd"]').on('click', function () {
        var search = $(this).parents("form").serialize();
        window.location.href = '/authz/findpwd?back_url=' + weburl +"/oauth/authorize?"+ search;
    });



    /**
     * 免密登录
     * 两个特殊参数：unikey和imsi
     * 分别对应username和password
     */
    $('#j-free-password-login').on("click", function () {
        $('#freePasswordLoginForm').submit();
    });


});

