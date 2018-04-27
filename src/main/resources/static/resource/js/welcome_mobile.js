/**
 * 1.页面加载完成
 * 2.获取code码
 * 3.用Code发送Post请求，获取access_token和open_id
 * 4.显示信息
 */
$().ready(function(){
    var code = request("code");
    var state = request("state");
    var form_data = "client_id=mobile" +
                    "&client_secret=mobile" +
                    "&grant_type=authorization_code" +
                    "&redirect_uri=" + weburl + "/demo/welcome_mobile" +
                    "&code=" + code +
                    "&state=" + state;
    $.ajax({
        url:weburl+'/oauth/token',
        type:"post",
        dataType:"json",
        contentType:"application/x-www-form-urlencoded",
        data:form_data,
        async:true,
        timeout : 30000,
        error:function(data){
            if(data.responseText.error){
                showtip(data.responseText.error_description,1);
            }else{
                showtip("网络通信错误，请稍后再试!",1);
            }
        },
        success: function(data){
            if(data.error){
                $("#user_info").addClass("hide");
                showtip(data.error_description,1);
            }
            else{
                $("#show_open_id_info").text(data.open_id);
                $("#show_access_token_info").text(data.access_token);
                $("#user_info").removeClass("hide");
            }
        },
        complete : function(XMLHttpRequest,status){
            if(status=='timeout'){
                showtip("网络通信错误，请稍后再试!",1);
            }
        }
    });
})