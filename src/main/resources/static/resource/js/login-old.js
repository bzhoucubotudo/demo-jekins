/**
 * Created by xiaoyang on 2017/7/14.
 */
function showSafeValidatePage(mobile, showName, userNcommame) {
    commBlock.showSafeCodePage(),
        commLogin.userNameInput.val(userNcommame),
        safeLogin.showSafeValidatePage(mobile, showName)
}
var showDivIndex = parseInt(pageInfo.showDivIndex)
    , commBlock = {
        $commLoginGroup: $("#commLogin-group"),
        $smsLoginGroup: $("#smsLogin-group"),
        $safeVcodeGroup: $("#safe-Validate-group"),
        $commLoginPage: $("#commLogin-page"),
        $vcodePage: $("#commVcode-page"),
        $smsLoginPage: $("#smsLogin-page"),
        $commUserNameClear: $(".juser-name-box .delete"),
        $commPwdClear: $(".juser-pwd-box .delete"),
        $commVocodeClear: $(".jpic-vcode-box .delete"),
        $smsPhoneClear: $(".jsms-phone-box .delete"),
        $smsCodeClear: $(".jsms-code-box .delete"),
        $safeCodeClear: $(".jsafe-code-box .delete"),
        $commErrorTip: $("#j-error-tip"),
        $commLoginBtnBox: $(".login-button-box"),
        $bottomTip: $(".e-service"),
        init: function() {
            var smsBack = $(".smsPage-back")
                , accountBack = $(".accountPage-back")
                , eService = $(".e-service")
                , powerList = $(".getPowerUl")[0]
                , powerLen = powerList.getElementsByTagName("li").length;
            7 >= powerLen && eService.removeClass("e-service-more"),
                $.trim(pageInfo.backURL).length <= 0 ? 2 == pageInfo.showDivIndex ? smsBack.attr("class", "ui-button pull-left") : accountBack.attr("class", "ui-button pull-left") : 2 == pageInfo.showDivIndex ? (smsBack.attr("class", "ui-button ui-button-back pull-left"),
                    smsBack.attr("href", pageInfo.backURL),
                    smsBack.off("click")) : (accountBack.attr("class", "ui-button ui-button-back pull-left"),
                    accountBack.attr("href", pageInfo.backURL),
                    accountBack.off("click"))
        },
        showCommLoginPage: function() {
            commBlock.$smsLoginGroup.addClass("hide"),
                commBlock.$safeVcodeGroup.addClass("hide"),
                commBlock.$commLoginGroup.removeClass("hide")
        },
        showSmsLoginPage: function() {
            commBlock.$commLoginGroup.addClass("hide"),
                commBlock.$safeVcodeGroup.addClass("hide"),
                commBlock.$smsLoginGroup.removeClass("hide")
        },
        showSafeCodePage: function() {
            commBlock.$smsLoginGroup.addClass("hide"),
                commBlock.$commLoginGroup.addClass("hide"),
                commBlock.$safeVcodeGroup.removeClass("hide")
        },
        showErrorInfo: function(targetPage, msg) {
            commBlock.$commErrorTip.html("");
            var $errorTips = $("<div></div>", {
                "class": "error-tip-other",
                html: msg
            });
            $errorTips.css({
                display: "inline-block"
            }),
                $errorTips.appendTo(commBlock.$commErrorTip),
                setTimeout(function() {
                    $errorTips.remove()
                }, 2e3)
        },
        clearTimeoutSendBtn: function() {
            smsLogin.smsSendBtn.removeAttr("disabled"),
                safeLogin.safeGetCode.removeAttr("disabled")
        },
        loginCallback: function(data) {
            var result = parseInt(data.result);
            commBlock.loadingLogin(commBlock.$commLoginGroup, !1),
                commBlock.clearTimeoutSendBtn(),
                1e4 == result || 0 == result ? location.href = data.toUrl : -1001 == result || -1101 == result ? (reloadCaptcha(),
                (0 == showDivIndex || 1 == showDivIndex) && commLogin.showVcodePage(),
                    commLogin.vcodeInput.val(""),
                    commBlock.showErrorInfo(commBlock.$vcodePage, data.msg)) : -4051 == result ? (commBlock.showSafeCodePage(),
                    safeLogin.showSafeValidatePage(data.mobile, data.showName)) : (commLogin.vcodeInput.val(""),
                    2 === showDivIndex ? smsLogin.showSmsPhonePage() : 3 === showDivIndex ? safeLogin.safeVcodeInput.val("") : commLogin.showLoginPage(),
                    commBlock.showErrorInfo(null, data.msg))
        },
        changeIconClear: function(targetIcon, flag) {
            flag ? targetIcon.css({
                display: "block"
            }) : targetIcon.css({
                display: "none"
            })
        },
        checkEmpty: function(input) {
            var _val = $.trim(input.val());
            return _val.length <= 0 ? !1 : !0
        },
        checkMobile: function(input) {
            var sPhone = $.trim(input.val());
            if (sPhone.length > 10) {
                var mobile_test = /^((1[34578]))+\d{9}$/;
                return mobile_test.test(sPhone)
            }
            return !1
        },
        loadingLogin: function(targetBtn, flag) {
            flag ? (commLogin.submitFormBtn.attr("disabled", !0),
                commLogin.vCodeCompleteBtn.attr("disabled", !0),
                safeLogin.safeLoginBtn.attr("disabled", !0),
                smsLogin.smsSubmitBtn.attr("disabled", !0),
                commBlock.$commLoginBtnBox.addClass("loadingBtn"),
                commLogin.submitFormBtn.val("登录中..."),
                smsLogin.smsSubmitBtn.val("登录中..."),
                commLogin.vCodeCompleteBtn.val("登录中..."),
                safeLogin.safeLoginBtn.val("登录中...")) : (commLogin.submitFormBtn.removeAttr("disabled"),
                commLogin.vCodeCompleteBtn.removeAttr("disabled"),
                safeLogin.safeLoginBtn.removeAttr("disabled"),
                smsLogin.smsSubmitBtn.removeAttr("disabled"),
                commBlock.$commLoginBtnBox.removeClass("loadingBtn"),
                smsLogin.smsSubmitBtn.removeClass("loadingBtn"),
                commLogin.submitFormBtn.val("登录"),
                smsLogin.smsSubmitBtn.val("登录"),
                commLogin.vCodeCompleteBtn.val("登录"),
                safeLogin.safeLoginBtn.val("登录"))
        }
    };
window.loginCallback = commBlock.loginCallback;
var commLogin = {
        userNameInput: $("#userName"),
        passWordInput: $("#password"),
        vcodeInput: $("#j-check-code"),
        submitFormBtn: $("#j-login"),
        vCodeCompleteBtn: $("#j-complete"),
        userInfo: $("#user_info"),
        loginForm: $("#loginForm"),
        vcodePage: $("#commVcode-page"),
        loginPage: $("#commLogin-page"),
        linkSMSLogin: $(".link-smsLogin"),
        vcodePageBack: $(".vcodePage-back"),
        accountPageBack: ".accountPage-back",
        changeCode: $("#G-change-code"),
        Captcha: $("#Captcha"),
        hiddenVcodeToken: $("#h_j_token"),
        hiddenVcodeInput: $("#h_j_code"),
        safeHiddendynamicCheck: $("#safe-dynamicCheck"),
        cimg: $("#cimg"),
        showVcodePage: function() {
            showDivIndex = 1,
                commLogin.vcodePage.removeClass("hide"),
                commLogin.loginPage.addClass("hide")
        },
        showLoginPage: function() {
            showDivIndex = 0,
                commLogin.vcodePage.addClass("hide"),
                commLogin.loginPage.removeClass("hide")
        },
        cabSubmitFrom: function() {
            var userNameCheckEmptyResult = !1;
            userNameCheckEmptyResult = pageInfo.mobileOnly ? commBlock.checkMobile(commLogin.userNameInput) : commBlock.checkEmpty(commLogin.userNameInput);
            var passwordCheckEmptyResult = !1;
            return userNameCheckEmptyResult ? (commBlock.changeIconClear(commBlock.$commUserNameClear, !0),
                passwordCheckEmptyResult = commBlock.checkEmpty(commLogin.passWordInput),
                passwordCheckEmptyResult ? {
                    result: !0,
                    msg: ""
                } : {
                    result: !1,
                    msg: "请输入密码"
                }) : (commBlock.changeIconClear(commBlock.$commUserNameClear, !1),
            {
                result: !1,
                msg: pageInfo.mobileOnly ? "请输入手机号" : "请输入账号"
            })
        },
        addEventListener: function() {
            var accountBack = $(".accountPage-back");
            accountBack.on("click", function() {
                2 === parseInt(pageInfo.showDivIndex) && commBlock.showSmsLoginPage()
            }),
                pageInfo.mobileOnly ? (commLogin.userNameInput.attr("placeholder", "手机号"),
                    commLogin.userNameInput.attr("maxlength", 11)) : commLogin.userNameInput.attr("placeholder", "手机号 / 固话 / 别名"),
                commLogin.cimg.on("click", function() {
                    _uxt.push(["_trackEvent", "授权wap账号密码登录", "更换", "图形验证码"])
                }),
                document.body.addEventListener("keydown", function(e) {
                    var keyCode = e.keyCode;
                    return 13 === keyCode ? !1 : void 0
                }),
                commLogin.userNameInput.on("blur", function() {
                    var userNameCheckEmptyResult = commLogin.cabSubmitFrom();
                    userNameCheckEmptyResult.result || commBlock.showErrorInfo(commBlock.$commLoginPage, userNameCheckEmptyResult.msg)
                }),
                commLogin.passWordInput.on("blur", function() {
                    var passwordCheckEmptyResult = commLogin.cabSubmitFrom();
                    passwordCheckEmptyResult.result || commBlock.showErrorInfo(commBlock.$commLoginPage, passwordCheckEmptyResult.msg)
                }),
                commLogin.userNameInput.on("input", function() {
                    commLogin.cabSubmitFrom()
                }),
                commLogin.passWordInput.on("input", function() {
                    var checkEmptyPwd = commBlock.checkEmpty(commLogin.passWordInput);
                    commBlock.changeIconClear(commBlock.$commPwdClear, checkEmptyPwd)
                }),
                commBlock.$commPwdClear.on("touchend", function() {
                    commLogin.passWordInput.val(""),
                        commBlock.$commPwdClear.css({
                            display: "none"
                        }),
                        _uxt.push(["_trackEvent", "授权wap登录框", "清除", "清除input的输入文字"])
                }),
                commBlock.$commUserNameClear.on("touchend", function() {
                    commLogin.userNameInput.val(""),
                        commBlock.$commUserNameClear.css({
                            display: "none"
                        }),
                        _uxt.push(["_trackEvent", "授权wap登录框", "清除", "清除input的输入文字"])
                }),
                commBlock.$commVocodeClear.on("touchend", function() {
                    commLogin.vcodeInput.val(""),
                        commBlock.$commVocodeClear.css({
                            display: "none"
                        }),
                        _uxt.push(["_trackEvent", "授权wap登录框", "清除", "清除input的输入文字"])
                }),
                commLogin.vcodeInput.on("input", function() {
                    var checkVcodeEmpty = commBlock.checkEmpty(commLogin.vcodeInput);
                    commBlock.changeIconClear(commBlock.$commVocodeClear, checkVcodeEmpty)
                }),
                commLogin.vcodeInput.on("blur", function() {
                    var trimVal = commLogin.vcodeInput.val().replace(/\u2006/g, "");
                    commLogin.vcodeInput.val(trimVal);
                    var checkVcodeEmptyResult = commBlock.checkEmpty(commLogin.vcodeInput);
                    checkVcodeEmptyResult || commBlock.showErrorInfo(commBlock.$vcodePage, "请输入验证码")
                }),
                commLogin.linkSMSLogin.on("click", function() {
                    showDivIndex = 2,
                        commBlock.showSmsLoginPage(),
                        _uxt.push(["_trackEvent", "授权wap登录框", "点击", "短信登录"])
                }),
                commLogin.submitFormBtn.on("click", function() {
                    var userNameCheckEmptyResult = commLogin.cabSubmitFrom();
                    if (!userNameCheckEmptyResult.result)
                        return commBlock.showErrorInfo(commBlock.$commLoginPage, userNameCheckEmptyResult.msg),
                            !1;
                    var inputCodeValEmpty = commBlock.checkEmpty(commLogin.vcodeInput)
                        , needCaptcha = !1;
                    if (inputCodeValEmpty)
                        commBlock.loadingLogin(commBlock.$commLoginGroup, !0),
                            commLogin.loginForm.submit();
                    else {
                        if (needCaptcha = commLogin.DisplayCapcha())
                            return -1 == needCaptcha ? commBlock.showErrorInfo(null, "网络繁忙，请稍后再试!") : (reloadCaptcha(),
                                commLogin.showVcodePage()),
                                !1;
                        -1 == needCaptcha ? commBlock.showErrorInfo(null, "网络繁忙，请稍后再试!") : (commBlock.loadingLogin(commBlock.$commLoginGroup, !0),
                            _uxt.push(["_trackEvent", "授权wap账号密码登录", "点击", "无需验证码的表单提交"]),
                            commLogin.loginForm.submit())
                    }
                }),
                commLogin.vcodePageBack.on("click", function() {
                    showDivIndex = 0,
                        commLogin.showLoginPage()
                }),
                commLogin.vCodeCompleteBtn.on("click", function() {
                    var vcodeVal = commLogin.vcodeInput.val()
                        , vcodeToken = commLogin.Captcha.find("input[name='captchaToken']").val()
                        , checkVcodeEmptyResult = commBlock.checkEmpty(commLogin.vcodeInput);
                    checkVcodeEmptyResult ? (commLogin.hiddenVcodeInput.val(vcodeVal),
                        commLogin.hiddenVcodeToken.val(vcodeToken),
                        commLogin.submitFormBtn.click(),
                        _uxt.push(["_trackEvent", "授权wap账号密码登录", "点击", "需要验证码的表单提交"])) : commBlock.showErrorInfo(null, "请输入验证码")
                }),
                $("input").on("focus", function() {
                    $(".error-tip").html(""),
                        commBlock.$bottomTip.addClass("hide")
                }),
                $("input").on("blur", function() {
                    $(".error-tip").html(""),
                        commBlock.$bottomTip.removeClass("hide")
                })
        },
        DisplayCapcha: function() {
            var hasCode = !1;
            return $.ajax({
                url: pageInfo.needcaptchaUrl,
                data: {
                    userName: commLogin.userNameInput.val(),
                    appId: pageInfo.appId,
                    apptype: "wap"
                },
                type: "post",
                dataType: "json",
                async: !1,
                timeout: "50000",
                success: function(ds) {
                    ds = parseInt(ds),
                        hasCode = 1 === ds ? !0 : !1
                },
                error: function(ds) {
                    hasCode = !1
                }
            }),
                hasCode
        }
    }
    , safeLogin = {
        safePageBack: $(".safePage-back"),
        safeGetCode: $("#j-safe-getCode"),
        safeVcodeInput: $("#j-safe-password"),
        safePhoneInput: $("#j-safe-phone"),
        safeUserNameInput: $("#j-safe-userName"),
        safeValidPhone: $(".safeValidPhone"),
        safeLoginBtn: $("#j-safe-login"),
        safeLoginForm: $("#safeValidateForm"),
        showSafeValidatePage: function(mobile, showName) {
            showDivIndex = 3,
                safeLogin.safeValidPhone.text(showName),
                safeLogin.safeUserNameInput.val(commLogin.userNameInput.val()),
                safeLogin.safePhoneInput.val(mobile)
        },
        addEventListener: function() {
            safeLogin.safePageBack.on("click", function() {
                2 == pageInfo.showDivIndex ? (showDivIndex = 2,
                    commBlock.showSmsLoginPage()) : (showDivIndex = 0,
                    commBlock.showCommLoginPage(),
                    commLogin.showLoginPage()),
                    commLogin.vcodeInput.val(""),
                    safeLogin.safeVcodeInput.val("")
            }),
                safeLogin.safeGetCode.on("click", function() {
                    clearTimeout(timmerfree),
                        safeLogin.getSmsVcode(),
                        safeLogin.safeVcodeInput.val(""),
                        _uxt.push(["_trackEvent", "授权wap二次验证登录", "点击", "获取验证码"])
                }),
                safeLogin.safeLoginBtn.on("click", function() {
                    var checkSafeCodeEmpty = commBlock.checkEmpty(safeLogin.safeVcodeInput);
                    checkSafeCodeEmpty ? (commBlock.loadingLogin(null, !0),
                        safeLogin.safeLoginForm.submit(),
                        _uxt.push(["_trackEvent", "授权wap二次验证登录", "点击", "表单提交"])) : commBlock.showErrorInfo(null, "请输入验证码")
                }),
                safeLogin.safeVcodeInput.on("input", function() {
                    var checkSafeCodeEmpty = commBlock.checkEmpty(safeLogin.safeVcodeInput);
                    commBlock.changeIconClear(commBlock.$safeCodeClear, checkSafeCodeEmpty)
                }),
                commBlock.$safeCodeClear.on("touchend", function() {
                    safeLogin.safeVcodeInput.val(""),
                        commBlock.$safeCodeClear.css({
                            display: "none"
                        }),
                        _uxt.push(["_trackEvent", "授权wap登录框", "清除", "清除input的输入文字"])
                })
        },
        setFreeTime: function(obj, countTime) {
            0 === countTime ? (obj.text("重发验证码"),
                obj.removeAttr("disabled"),
                countTime = 60,
                clearTimeout(timmerfree)) : (obj.attr("disabled", !0),
                obj.text(countTime + " 秒"),
                countTime--,
                timmerfree = setTimeout(function() {
                    safeLogin.setFreeTime(obj, countTime)
                }, 1e3))
        },
        getSmsVcode: function() {
            $.ajax({
                url: pageInfo.getSecondSmsCode,
                data: {
                    apptype: "wap",
                    appKey: pageInfo.appId,
                    mobile: safeLogin.safePhoneInput.val()
                },
                type: "post",
                dataType: "json",
                timeout: "50000",
                success: function(ds) {
                    var result = parseInt(ds.result);
                    0 === result || 20102 === result ? (clearTimeout(timmerfree),
                        safeLogin.setFreeTime(safeLogin.safeGetCode, 60),
                    20102 === result && commBlock.showErrorInfo(commBlock.$smsCodePage, ds.msg)) : (clearTimeout(timmerfree),
                        commBlock.showErrorInfo(commBlock.$phonePage, ds.msg))
                },
                error: function(e) {
                    clearTimeout(timmerfree),
                        commBlock.showErrorInfo(commBlock.$phonePage, "网络繁忙稍后再试")
                }
            })
        }
    }
    , timmerfree = null
    , smsLogin = {
        smsCodeInput: $("#j-sms-password"),
        smsPhoneInput: $("#j-sms-userName"),
        smsSubmitBtn: $("#j-sms-login"),
        smsSendBtn: $("#j-sms-send"),
        smsPhoneBack: $(".smsPage-back"),
        linkAccountLogin: $(".link-account-login"),
        smsloginForm: $("#smsloginForm"),
        showSmsPhonePage: function() {
            showDivIndex = 2
        },
        canClickNextBtn: function() {
            var checkSmsPhoneEmpty = commBlock.checkEmpty(smsLogin.smsPhoneInput);
            commBlock.changeIconClear(commBlock.$smsPhoneClear, checkSmsPhoneEmpty);
            var checkMobileResult = !1
                , checkSmsCodeEmpty = !1;
            return checkSmsPhoneEmpty ? (checkMobileResult = commBlock.checkMobile(smsLogin.smsPhoneInput),
                checkMobileResult ? (checkSmsCodeEmpty = commBlock.checkEmpty(smsLogin.smsCodeInput),
                    checkSmsCodeEmpty ? {
                        result: !0,
                        msg: ""
                    } : {
                        result: !1,
                        msg: "请输入验证码"
                    }) : {
                    result: !1,
                    msg: "手机号格式不对"
                }) : {
                result: !1,
                msg: "请输入手机号码"
            }
        },
        setFreeTime: function(obj, countTime) {
            0 === countTime ? (obj.text("重发验证码"),
                obj.removeAttr("disabled"),
                countTime = 60,
                clearTimeout(timmerfree)) : (obj.attr("disabled", !0),
                obj.text(countTime + " 秒"),
                countTime--,
                timmerfree = setTimeout(function() {
                    smsLogin.setFreeTime(obj, countTime)
                }, 1e3))
        },
        getSmsVcode: function() {
            $.ajax({
                url: pageInfo.sendSmsCode,
                data: {
                    apptype: "wap",
                    appKey: pageInfo.appId,
                    mobile: smsLogin.smsPhoneInput.val()
                },
                type: "post",
                dataType: "json",
                timeout: "50000",
                success: function(ds) {
                    var result = parseInt(ds.result);
                    0 === result || 20102 === result ? (clearTimeout(timmerfree),
                        smsLogin.setFreeTime(smsLogin.smsSendBtn, 60),
                    20102 === result && commBlock.showErrorInfo(commBlock.$smsCodePage, ds.msg)) : (clearTimeout(timmerfree),
                        commBlock.showErrorInfo(commBlock.$phonePage, ds.msg))
                },
                error: function(e) {
                    commBlock.showErrorInfo(commBlock.$phonePage, "网络繁忙稍后再试"),
                        clearTimeout(timmerfree)
                }
            })
        },
        addEventListener: function() {
            smsLogin.linkAccountLogin.on("click", function() {
                showDivIndex = 0,
                    commBlock.showCommLoginPage()
            }),
                smsLogin.smsPhoneInput.on("input", function() {
                    var inputVal = smsLogin.smsPhoneInput.val()
                        , inputLen = inputVal.length
                        , checkMobileResult = commBlock.checkMobile(smsLogin.smsPhoneInput);
                    inputLen >= 11 && !checkMobileResult && smsLogin.smsPhoneInput.val(inputVal.substring(0, 11));
                    var checkEmpty = commBlock.checkEmpty(smsLogin.smsPhoneInput);
                    commBlock.changeIconClear(commBlock.$smsPhoneClear, checkEmpty)
                }),
                smsLogin.smsCodeInput.on("input", function() {
                    var checkSmsCodeEmpty = commBlock.checkEmpty(smsLogin.smsCodeInput);
                    commBlock.changeIconClear(commBlock.$smsCodeClear, checkSmsCodeEmpty)
                }),
                smsLogin.smsPhoneBack.on("click", function() {
                    showDivIndex = 0,
                        commBlock.showCommLoginPage()
                }),
                smsLogin.smsSendBtn.on("click", function(e) {
                    var checkPhoneEmpty = commBlock.checkEmpty(smsLogin.smsPhoneInput);
                    checkPhoneEmpty ? (smsLogin.getSmsVcode(),
                        _uxt.push(["_trackEvent", "授权wap短信验证码登录", "点击", "获取验证码"])) : commBlock.showErrorInfo(null, "请输入手机号")
                }),
                smsLogin.smsSubmitBtn.on("click", function() {
                    var canClickSmsLoginBtn = smsLogin.canClickNextBtn();
                    canClickSmsLoginBtn.result ? (commBlock.loadingLogin(commBlock.$smsLoginGroup, !0),
                        smsLogin.smsloginForm.submit(),
                        _uxt.push(["_trackEvent", "授权wap短信验证码登录", "点击", "表单提交"])) : commBlock.showErrorInfo(null, canClickSmsLoginBtn.msg)
                }),
                commBlock.$smsPhoneClear.on("touchend", function() {
                    smsLogin.smsPhoneInput.val(""),
                        commBlock.$smsPhoneClear.css({
                            display: "none"
                        }),
                        _uxt.push(["_trackEvent", "授权wap登录框", "清除", "清除input的输入文字"])
                }),
                commBlock.$smsCodeClear.on("touchend", function() {
                    smsLogin.smsCodeInput.val(""),
                        commBlock.$smsCodeClear.css({
                            display: "none"
                        })
                })
        }
    };
commLogin.addEventListener(),
    safeLogin.addEventListener(),
    smsLogin.addEventListener(),
    commBlock.init(),
2 === showDivIndex && commBlock.showSmsLoginPage();
