$(document).ready(function(){



    CryptoJS.AES.encrypt("Message", "Secret Passphrase");
    var str = '{"phonescrip":"55EEA9815479D2B0A856BFCBE960A27E6D01D8A308ABC468CC51D12DD07221CE11881EF83AA52BE718C2136303EB9D20D8440B5F38FC8ABB8C0CFB82FD22C4081960D997286C9FAA983F4EAAB5DC7EB8BB3F8EE583879C3A7691FE3BE99CB18B147B5723AA7880086289177D5AAE5D9EE2F56647B7442C6FB755D2CB12B08860","openId":"igpQStpB1iC82zDBEpuheJRcXOYk9Y0m7xB_sfECD3iXNpVWo76E","securityphone":"187****5645"}';
    str=CryptoJS.enc.Utf8.parse(str);

    var key = 'F713503E4DA34C11';

    var iv = '';
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);


    var encrypted = CryptoJS.AES.encrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });


    encrypted = encrypted.toString();

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    decrypted = CryptoJS.enc.Utf8.stringify(decrypted);

//alert("decrypted： "+decrypted.toString());
//            var cmTokenRequest=buildCmTokenRequest();
    ckRequest();

//            getAuthToken();
});

var httpsBaseCmPath="/httpscmserver";
var baseCmPath="/ajaxserver";
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

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
    return uuid.toString().replace(/-/g,"");
}

function ckRequest() {
    //{"ver":"1.0","interfacever":"3.0","sdkver":"quick_login_android_5.3.1.180116","appid":"300011846519",
    //    "msgid":"d71b74c0aeff45839fdf24c1278b2e98","timestamp":"20180329093107402","sign":"AAA15A062A2AEC266769FBCD108F4B78","keyid":"863254038307152da28ef25d83a4c0190fd32c46445c518"}
    //{"ver":"1.0","interfacever":"3.0","sdkver":"quick_login_android_5.3.1.180116","appid":"300011846519",
    //    "msgid":"6f4d449039c045c7958ec1d92e486a4d","timestamp":"20180405105743087",
    //    "sign":"46C5C71B8D7590AB9DEC009F3BE36149","keyid":"8695270205813465178d149119e49148f35b1731ac47d54"}

    var param={};
    var appKey="4C68F66E35B51861A4F76ACCEA1ACE1E";
    //var appKey="4C78F66E35B51861A4F76ACCEA1ACE1E";
    param.ver="1.0";
    param.interfacever="3.0";
    param.sdkver="quick_login_android_5.3.1.180116";
    param.appid="300011846519";
    var traceId=uuid();
    //param.msgid="d71b74c0aeff45839fdf24c1278b2e98";
    param.msgid=uuid();
    console.log(param.msgid);
    param.timestamp=new Date().Format("yyyyMMddhhmmssSS").replace("S","");
//    param.timestamp="20180403114009098";
    param.keyid="869527020581346"+uuid();

    //param.keyid="8695270205813465178d149119e49148f35b1731ac47d54";
//    param.keyid="869527020581346"+uuid();
    var sign =param.ver + param.sdkver + param.appid + param.msgid + param.keyid + param.timestamp + appKey;
    sign = CryptoJS.MD5(sign);
    sign = sign.toString().toUpperCase();
    param.sign=sign;
    //param={"ver":"1.0","interfacever":"3.0","sdkver":"quick_login_android_5.3.1.180116","appid":"300011846519","msgid":"d09e4a9c772d401c8aa3ff1202afd147","timestamp":"20180329102120492","sign":"347214A666A7797B665A1925904074DB","keyid":"863254038307152fb018a788a4741edb898cdf77867fa8f"};
    //param={"ver":"1.0","interfacever":"3.0","sdkver":"quick_login_android_5.3.1.180116","appid":"300011846519","msgid":"d71b74c0aeff45839fdf24c1278b2e98","timestamp":"20180329093107402","sign":"AAA15A062A2AEC266769FBCD108F4B78","keyid":"863254038307152da28ef25d83a4c0190fd32c46445c518"};
    console.log("ckRequest ss: "+JSON.stringify(param));
    $.ajax({
        //url:httpsBaseCmPath+"/rs/ckRequest",
        url:"https://www.cmpassport.com/unisdk/rs/ckRequest",
        //url:baseCmPath+"/rs/ckRequest",
        //dataType: "jsonp",
        type: "POST",
        headers: {
            "traceId": traceId
        },
        data: JSON.stringify(param),
        success:function(data, status){
            console.log("status: " + status);
            if (status == "success") {
                console.log("data: ckRequest post response" + JSON.stringify(data));
                alert("ckRequest traceId: " +traceId);
                getphonescrip(data.privateKey, param.keyid, traceId);
            }
        }
    });
}

function getphonescrip(privateKey,keyid,traceId){
    //{"ver":"1.0","sdkver":"quick_login_android_5.3.1.180116","appid":"300011846519","authtype":"3","smskey":"","imsi":"460006132153078",
    //    "imei":"869527020581346","operatortype":"1","networktype":"3","mobilebrand":"ZTE","mobilemodel":"ZTE+BV0800",
    //    "mobilesystem":"android7.0","clienttype":"0","msgid":"f59555d2e88e43b98c1773c7dd87cd05","timestamp":"20180405105743620",
    //    "acpuid":"NRD90M","adevmac":"02:00:00:00:00:00","asimnum":"898600710116f0174308","gwip":"192.168.3.65","acellid":"","alac":"",
    //    "amnc":"1","subimsi":"","subimei":"869527020581544","sign":"31367BD763E12D575BA27E3CE56C20CF"}
    var ver="1.0";
    var sdkver="quick_login_android_5.3.1.180116";
    var appid="300011846519";
    var authtype="3";
    var smskey="";
    var imsi="460006132153078";
    var imei="869527020581346";
    //var operatortype="1";
    var operatortype="1";
    var networktype="3";
    //var networktype="5";
    var mobilebrand="ZTE";
    var mobilemodel="ZTE+BV0800";
    var mobilesystem="android7.0";
    var clienttype="0";
    //var clienttype="4";
    //var msgid="af264ac7b2624ba8ac813a5797901c79";
    var msgid=uuid();
    var timestamp=new Date().Format("yyyyMMddhhmmssSS").replace("S","");
//    var timestamp="20180403114009098";
    alert("getphonescrip timestamp1: "+timestamp);
    var appkey="4C68F66E35B51861A4F76ACCEA1ACE1E";
    var acpuid="NRD90M";
    var adevmac="02:00:00:00:00:00";
    var asimnum="898600710116f0174308";
    var gwip="192.168.3.65";
    var acellid="";
    var alac="";
    var amnc="1";
    var subimsi="";
    var subimei="869527020581544";


    var sign=ver + sdkver + appid + authtype + smskey + imsi+ imei+ operatortype + networktype + mobilebrand + mobilemodel + mobilesystem + clienttype +
        msgid + timestamp + appkey+acpuid + adevmac + asimnum + gwip + acellid + alac + amnc + subimsi + subimei;
    sign = CryptoJS.MD5(sign);
    console.log("getphonescrip sign:"+sign);
    var reqdataBeforeEncrpt= {};
    reqdataBeforeEncrpt.ver=ver;
    reqdataBeforeEncrpt.sdkver=sdkver;
    reqdataBeforeEncrpt.appid=appid;
    reqdataBeforeEncrpt.authtype=authtype;
    reqdataBeforeEncrpt.smskey=smskey;
    reqdataBeforeEncrpt.imsi=imsi;
    reqdataBeforeEncrpt.imei=imei;
    reqdataBeforeEncrpt.operatortype=operatortype;
    reqdataBeforeEncrpt.networktype=networktype;
    reqdataBeforeEncrpt.mobilebrand=mobilebrand;
    reqdataBeforeEncrpt.mobilemodel=mobilemodel;
    reqdataBeforeEncrpt.mobilesystem=mobilesystem;
    reqdataBeforeEncrpt.clienttype=clienttype;
    reqdataBeforeEncrpt.msgid=msgid;
    reqdataBeforeEncrpt.timestamp=timestamp;
    reqdataBeforeEncrpt.acpuid=acpuid;
    reqdataBeforeEncrpt.adevmac=adevmac;
    reqdataBeforeEncrpt.asimnum=asimnum;
    reqdataBeforeEncrpt.gwip=gwip;
    reqdataBeforeEncrpt.acellid=acellid;
    reqdataBeforeEncrpt.alac=alac;
    reqdataBeforeEncrpt.amnc=amnc;
    reqdataBeforeEncrpt.subimsi=subimsi;
    reqdataBeforeEncrpt.subimei=subimei;
    reqdataBeforeEncrpt.sign=sign.toString().toUpperCase();
    //reqdataBeforeEncrpt={"ver":"1.0","sdkver":"quick_login_android_5.3.1.180116","appid":"300011846519","authtype":"3","smskey":"","imsi":"460027802181440","imei":"863254038307152","operatortype":"1","networktype":"3","mobilebrand":"Xiaomi","mobilemodel":"MI+6","mobilesystem":"android8.0.0","clienttype":"0","msgid":"af264ac7b2624ba8ac813a5797901c79","timestamp":"20180329102120941","acpuid":"OPR1.170623.027","adevmac":"02:00:00:00:00:00","asimnum":"89860117831009795484","gwip":"192.168.1.115","acellid":"","alac":"","amnc":"1","subimsi":"863254038307152","subimei":"863254038307152","sign":"DAF136D9A6D8695C3705B56765855E71"};
    //reqdataBeforeEncrpt={"ver":"1.0","sdkver":"quick_login_android_5.3.1.180116","appid":"300011846519","authtype":"3","smskey":"","imsi":"460006132153078","imei":"869527020581346","operatortype":"1","networktype":"3","mobilebrand":"ZTE","mobilemodel":"ZTE+BV0800","mobilesystem":"android7.0","clienttype":"0","msgid":"f59555d2e88e43b98c1773c7dd87cd05","timestamp":"20180405105743620","acpuid":"NRD90M","adevmac":"02:00:00:00:00:00","asimnum":"898600710116f0174308","gwip":"192.168.3.65","acellid":"","alac":"","amnc":"1","subimsi":"","subimei":"869527020581544","sign":"31367BD763E12D575BA27E3CE56C20CF"};
    var str =JSON.stringify(reqdataBeforeEncrpt);

    alert("reqdataBeforeEncrpt "+str);

    CryptoJS.AES.encrypt("Message", "Secret Passphrase");
//            var str = '{"phonescrip":"55EEA9815479D2B0A856BFCBE960A27E6D01D8A308ABC468CC51D12DD07221CE11881EF83AA52BE718C2136303EB9D20D8440B5F38FC8ABB8C0CFB82FD22C4081960D997286C9FAA983F4EAAB5DC7EB8BB3F8EE583879C3A7691FE3BE99CB18B147B5723AA7880086289177D5AAE5D9EE2F56647B7442C6FB755D2CB12B08860","openId":"igpQStpB1iC82zDBEpuheJRcXOYk9Y0m7xB_sfECD3iXNpVWo76E","securityphone":"187****5645"}';
    str=CryptoJS.enc.Utf8.parse(str.toString());
            //var key = 'F713503E4DA34C11';
//            console.log("data: getphonescrip post privateKey  "+privateKey);
    var key = privateKey;
    //var key="452F851B50B94F6D";
    var iv = '';


    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);

    var encrypted = CryptoJS.AES.encrypt(str, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    //{"interfacever":"4.0","ver":"1.0","keyid":"8695270205813465178d149119e49148f35b1731ac47d54",
    //    "reqdata":"HBtkFX7tB0EYLpSwx7nJEQ+QPE2AFOfaUuKbBHl\/FjYnkjxDs+Y+gNWQ0XgS wHXxwNbyBUWK6D+jm9SVKbborSP8GSyyzjQo3n7WbfaOpweoJ47TQLj5KYEx c1q180EOxFgIZ4ZRHQy6z6AUt+wigtHYXAWJk9lKuUTdQ+P39JMFM6YzBLP3 nVUeGQskLJAv8jjO0+\/BnAKLOEfnidYRNKbw6QYsRQI\/cF4RicHeSTOCMPEG U+rMxZwLzuIHu1\/EatpPt7B0PQ3wMppc7PwHnFylwqyXvgWuY1CbdM+f9wtJ l7t12IxiCzHO91o7eFfcGkbGsYxlKFl1\/Hce6TIDeDnJLWsI+OczJSLagJbY DACo1Xc4eM9WtlTupAIT19znMgQb8fkJOKOkcoRRddNzkYXP9PVYIVZMbGbE 6WHBY\/ZbY+lvtnbMK3Tc0JprVmK+EWXTbfz\/I7bfKDNgZv3EMWHQvZkpkJe2 eOKUXW1n8navpUnYta5ktzA2aisXgvzZpEQ6GhWikUHVmeQtQVMAgLN\/1kl5 oVy01\/EPugRCQztoYC48E4i9H2Nolw5k25jZdihNN6cOm4NUKORBCyGX0qv4 2LOU5rLIbIUYib21Dqsi6uDn1cYvNlm2uy\/dK0zkvP4925gf9WMkqddF9hjc awKY9Q\/Mo2gArd6Ig5NY0nlff8Vw4T\/RsADVhkz\/vqVODtW\/mMWK7\/fnKpyV 7fdUYw+uuD9d30ANrbEGVAmQFYLVIcTQZEckZ5qe8nRF635nSEHdnpH2F904 0Uo0M7xffQ=="}

    var param={};
    param.interfacever="4.0";
    param.ver="1.0";

    param.keyid=keyid;
    //        param.keyid="8695270205813465178d149119e49148f35b1731ac47d54";
    param.reqdata=encrypted.toString();

    //param={"interfacever":"4.0","ver":"1.0","keyid":"863254038307152fb018a788a4741edb898cdf77867fa8f","reqdata":"pATYljEvsqAVhr4177hVNKPWPt1r9DHY/ZmKyonODokldX/OFsL55VqoK/G+ 2yRQmk+H483Ep+DByrCbfIyOJvBBJsdNwp+npx0x/+1AMTxjOLuNTM5bLZI1 Y9+eUmtcaYfujqDxjkCZtJrPFShAzAA03c3wTEgZtWktcCtUCTapDnkb/+S6 zAZPYqIfWKqeUdtf1zxuzIjtrFzy210i1Kh3aAyNWGG5XXqfh163O+bajmft nX7PVJMF31YtsbPzqdP9fVX1hRysjKlh0ZFDxhwkam3XrpJCjL0N0/Uaj+xj BKw+XrSSCulg73G+uFN6Q95IRHHjOWICu3g8m9YiDAIkXov5CpPzMBwFwFib 3SebJlCkaMmAeUJDSoaZuk1gu8WXPAaCPNxZdIxXpwBSTWv6qAmaqMyn960p x92CxSuQPDpF1dKF2OO1SBvdeSMhFdvOr9jHzOQ+9Uq+RXw8gW135nQxPzrN AISo78r2+DhlFI+pXjwuFpxs/s4bJfZC0tyo0aPM6xJoUDPGJvklm3oey+M4 O1J5n5YiC6HE8cIZAetUknB3sNSKfvgthl2UtLKFgq06OoNpYxky0CkLyXqo u/r0MRMuOw9AYY7XSJ1iyi0miqXuVHEYFgzHcgpI1wLyyMuxMVmOd1tLgXhX 4qiGJCl8hX71kEcWLlN3mL9kcXCXHDQO/8FV5VAm4KbsJdu+0vwM6KBMj7sA o3ZW7657J6SGWzAoejCNRJp6oiIs/DZlVo0w0ABIrwe1Zz7QMIoHbQ3HXC4s It9rncUbN39J2RMLSthiBsyg3xuw8wc="}

    console.log("getphonescrip: ss request"+ JSON.stringify(param));
    alert("getphonescrip traceId: " +traceId);
    $.ajax({
        url: baseCmPath + "/rs/getphonescrip",
        type: "POST",
        headers: {
            "traceId": traceId
        },
        data: JSON.stringify(param),
        success: function (data, status) {
            console.log("status: " + status);
            alert("data: " + JSON.stringify(data));
            if (status = "success") {
//                            console.log("数据: \n" + JSON.stringify(resultdata) + "\n状态: " + status);
                var resultdata = data.resultdata;
                if (resultdata != null && resultdata != "") {
                    var decrypted = CryptoJS.AES.decrypt(resultdata, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    var resultdata = CryptoJS.enc.Utf8.stringify(decrypted);
                    console.log("resultdata: " + JSON.stringify(resultdata));
                    var phonescrip = resultdata.phonescrip;
                    alert("phonescrip: " + phonescrip);
                    getAuthToken(phonescrip);
                }
            }
        }
    });
}

function getAuthToken(phonescrip) {
    console.log("getAuthToken phonescrip: "+phonescrip);
//            {
//                "version":"0.1",
//                    "msgid":"74a82e2752cf4236b26b7c6de8d3b1be",
//                    "appid":"300011846519",
//                    "scrip":"55EEA9815479D2B0A856BFCBE960A27E6D01D8A308ABC468CC51D12DD07221CE11881EF83AA52BE718C2136303EB9D20D8440B5F38FC8ABB8C0CFB82FD22C4081960D997286C9FAA983F4EAAB5DC7EB8BB3F8EE583879C3A7691FE3BE99CB18B147B5723AA7880086289177D5AAE5D9EE2F56647B7442C6FB755D2CB12B08860",
//                    "sign":"586547819781655BCD3B9EEB8747778E",
//                    "interfacever":"2.0",
//                    "userCapaid":"200"
//            }

//            version + appid + appkey + script
    var version="0.1";
//            var msgid="74a82e2752cf4236b26b7c6de8d3b1be";
    var msgid=uuid();
    var appid="300011846519";
//            var script="55EEA9815479D2B0A856BFCBE960A27E6D01D8A308ABC468CC51D12DD07221CE11881EF83AA52BE718C2136303EB9D20D8440B5F38FC8ABB8C0CFB82FD22C4081960D997286C9FAA983F4EAAB5DC7EB8BB3F8EE583879C3A7691FE3BE99CB18B147B5723AA7880086289177D5AAE5D9EE2F56647B7442C6FB755D2CB12B08860";
    var script=phonescrip;
    var appkey="4C68F66E35B51861A4F76ACCEA1ACE1E";
    var sign = version+appid+appkey+script;
    sign = CryptoJS.MD5(sign);
    console.log("getAuthToken: "+sign);
//            alert(sign);
//            var param ={"version":"0.1","msgid":"74a82e2752cf4236b26b7c6de8d3b1be","appid":"300011846519","scrip":"55EEA9815479D2B0A856BFCBE960A27E6D01D8A308ABC468CC51D12DD07221CE11881EF83AA52BE718C2136303EB9D20D8440B5F38FC8ABB8C0CFB82FD22C4081960D997286C9FAA983F4EAAB5DC7EB8BB3F8EE583879C3A7691FE3BE99CB18B147B5723AA7880086289177D5AAE5D9EE2F56647B7442C6FB755D2CB12B08860","sign":"586547819781655BCD3B9EEB8747778E","interfacever":"2.0","userCapaid":"200"};
//            var param ={"version":"0.1","msgid":"74a82e2752cf4236b26b7c6de8d3b1be","appid":"300011846519","scrip":"55EEA9815479D2B0A856BFCBE960A27E6D01D8A308ABC468CC51D12DD07221CE11881EF83AA52BE718C2136303EB9D20D8440B5F38FC8ABB8C0CFB82FD22C4081960D997286C9FAA983F4EAAB5DC7EB8BB3F8EE583879C3A7691FE3BE99CB18B147B5723AA7880086289177D5AAE5D9EE2F56647B7442C6FB755D2CB12B08860","sign":"586547819781655BCD3B9EEB8747778E","interfacever":"2.0","userCapaid":"200"};
    var param ={};
    param.version=version;
    param.msgid=msgid;
    param.appid=appid;
    param.scrip=script;
    param.sign=sign;
    param.interfacever="2.0";
    param.userCapaid="200";
    $.post(baseCmPath+"/api/getAuthToken",
        JSON.stringify(param),
        function(data,status){
            alert("getAuthToken数据: \n" + JSON.stringify(data) + "\n状态: " + status);
            if(status="success"){
            }
        });

}

