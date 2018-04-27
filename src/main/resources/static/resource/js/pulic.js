var weburl=window.location.protocol+"//"+window.location.host+"/authz";
$(document).ready(function() {
  iconChange()
})

/**
 * @description input样式修改
 */
function iconChange () {
  var input = $('input')
  $(input).each(function () {
    $(this).blur(function () {
      if (this.value) {
        var name = $(this).prev('span')[0]
        if (name.className.indexOf('active') == -1) {
          name.className += '-active'
          $(this).parent()[0].className += ' el-input-active'
        }
      } else {
        var name = $(this).prev('span')[0]
        var parent = $(this).parent()[0]
        if (name.className.indexOf('active') != -1) {
          name.className = name.className.replace('-active', '')
          parent.className = parent.className.replace(' el-input-active', '')
        }
      }
    })
    $(this).focus(function () {
      var name = $(this).prev('span')[0]
      if (name.className.indexOf('active') == -1) {
        name.className += '-active'
        $(this).parent()[0].className += ' el-input-active'
      }
    })
    //$(this).on('input propertychange', function () {
    //  //verification(this)
    //
    //})
    $('input,button').focus(function(){
      $('.tips').css('visibility', 'hidden').text("");
    })
  })
}

/**
 * 验证码倒计时
 * @type {number}
 */
var countdown = 60;
function settime(val) {
  if (countdown == 0) {
    val.removeAttr("disabled").removeClass('code-countdown');
    val.text("获取验证码");
    countdown = 60;
    return;
  } else {
    val.attr("disabled", true).addClass('code-countdown');
    val.text(countdown + "S后可重新获取");
    countdown--;
  }
  setTimeout(function () {
    settime(val)
  }, 1000)
}

/**
 * 错误提示
 * @param errmsg
 */
function showError(errmsg){
  $('.tips').css('visibility', 'visible').html(errmsg);
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