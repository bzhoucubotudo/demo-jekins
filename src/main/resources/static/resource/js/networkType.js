/**
 * 1.页面加载完成
 * 2.判断当前网络类型
 * 3.如果是手机网络，则访问checkIpIsUnicom，判断是否是联通网络
 * 4.如果是联通，则跳转到免密登陆页面
 */
$().ready(function(){

    if(checkNetworkType() <= 4){
        $.ajax({
            url:weburl+'/anon/checkIpIsUnicom',
            type:"post",
            dataType:"json",
            contentType:"application/x-www-form-urlencoded",
            data:"",
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
                    showtip(data.error_description,1);
                }
                else{
                    showtip(data,5);
                    document.getElementById('oauth2info').innerHTML = data;
                }
            },
            complete : function(XMLHttpRequest,status){
                if(status=='timeout'){
                    showtip("网络通信错误，请稍后再试!",1);
                }
            }
        });
    }else{
        document.getElementById('oauth2info').innerHTML = "不是手机网络！";
    }

});

var NETWORK_TYPE_ENUM = {
    "CELLULAR":1,
    "2G":2,
    "3G":3,
    "4G":4,
    "ETHERNET":5,
    "BLUETOOTH":6,
    "MIXED":7,
    "NONE":8,
    "OTHER":9,
    "UNKNOWN":10,
    "WIFI":11,
    "WIMAX":12
}
function checkNetworkType() {
    var network_state = 'unknown';
    var ua = window.navigator.userAgent;
    var con = window.navigator.connection;
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

        for(var key in  con){
            document.getElementById('j_enum').innerHTML += '<br>'+key
        }
        var network = con.type;
        network_state = network;
    }
    document.getElementById('network_type').innerHTML = network_state;
    return NETWORK_TYPE_ENUM[network_state.toUpperCase()];
}