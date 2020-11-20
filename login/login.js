//
$("#goto-register").click(function () {
  $("#login").hide().next().show();
});
//
$("#goto-login").click(function () {
  $("#register").hide().prev().show();
});

//-----------------------------------------------注册模块

//验证
var form = layui.form;
form.verify({
  changdu: [/^\S{6,12}$/, "长度6~12位，不能有空格"],
  same: function (val) {
    var pwd = $(".pwd").val();
    if (pwd !== val) return "两次密码不一致哟~";
  },
});

$("#register .layui-form").on("submit", function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "http://ajax.frontend.itheima.net/api/reguser",
    data: data,
    success: function (res) {
      console.log(res);

      layer.msg(res.message);

      if (res.status === 0) {
        // 注册成功，显示登录的盒子
        $("#login").show().next().hide();

        // 清空注册的表单(reset是dom方法，所以把jQuery对象转成DOM对象)
        $("#register form")[0].reset();
      }
    },
  });
});

//-----------------------------------------------登录模块
$("#login form").on("submit", function (e) {
  e.preventDefault();

  // 收集账号、密码
  var data = $(this).serialize();
  // ajax提交
  $.ajax({
    type: "POST",
    url: "http://ajax.frontend.itheima.net/api/login",
    data: data,
    success: function (res) {
      // 无论登录成功，还是失败，都给提示
      layer.msg(res.message);
      if (res.status === 0) {
        // 把token保存到本地存储
        localStorage.setItem("token", res.token);
        // 跳转到index.html
        location.href = "/index.html";
      }
    },
  });
});
