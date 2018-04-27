/**
 * Created by xiaoyang on 2017/7/17.
 */
var weburl=window.location.protocol+"//"+window.location.host+"/authz";
//获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return encodeURIComponent(r[2]); return "";
}

//校验参数是否为空
function isEmpty(input) {
    var _val = $.trim(input.val());
    return _val.length <= 0 ? true : false
}

//校验手机号
function checkMobile(input) {
    var sPhone = $.trim(input.val());
    if (sPhone.length > 10) {
        var mobile_test = /^((1[23456789]))+\d{9}$/;
        return mobile_test.test(sPhone)
    }
    return false;
}


//弹出提示信息
function showtip(msg,time)
{
    layer.open({
        content: msg,
        skin: 'msg',
        time: time
    });
}

//生成unikey
function generateUnikey() {
    return "010005"+uuid().replace(/-/g,"").substring(6);
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}


/**
 * 获取当前url中的参数
 * @param paras
 * @returns {*}
 */
function request(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}