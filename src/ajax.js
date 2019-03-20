
$(document).ready(function () {
        var token = $.cookie("token");
        var sessionid = $.cookie("sessionid");
        if(token != null && sessionid != null){
            $("#sign-up-in").html('' +
            '<div class="btn-group">' +
            '   <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            '       ' + $.cookie('username') + '<span class="caret"></span>' +
            '   </button>' +
            '   <ul class="dropdown-menu">' +
            '       <li><a href="/mywork/" target="_blank">我的作品</a></li><li role="separator" class="divider"></li>' +
            '       <li><a id="sign_out" onclick="sign_out()" >注销</a></li>' +
            '   </ul>' +
            '</div>'
        );
        }
        else{
            $("#sign-up-in").html('' +
                '<div class="btn-group">' +
                '   <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                '       ' + '未登录' + '<span class="caret"></span>' +
                '   </button>' +
                '   <ul class="dropdown-menu">' +
                '       <li><a id="back" href="/" >返回首页</a></li>' +
                '   </ul>' +
                '</div>'
            );
        }
/*
        $(".save").click(function () {
            var filename = document.getElementById("production_name").value;
            var username = $.cookie('username');
            var code = this.main.model.programs['__main__']();

            //console.log(code+"ssssssssss");
            if(token != null && sessionid != null) {
                $.ajax({
                    url: '/upload/',
                    type: 'POST',
                    headers:{"X-CSRFToken":$.cookie('csrftoken')},
                    data:{
                        "name": filename,
                        "username": username,
                        "code": code,
                    },

                     success: function (data) {
                        data = JSON.parse(data);
                        if (data.status) {
                            alert("保存成功");
                        }
                        else {
                            alert("好像出了点问题，保存失败");
                        }
                    }
                })
            }
            else{
                alert("您未登录，无法上传作品到云端");
            }
        })*/

    });
function sign_out() {
    var flag = confirm("系统可能不会保存您的修改，确定注销？");
    if(flag){
        $.ajax({
        type: 'get',
        url: '/website/logout/',
        success: function () {
            window.location.reload();
        }
    })
    }
}
function back() {
    var flag = confirm("离开该页面可能不会保存您的修改，确定离开？");
    if(flag){
        window.location.href= '/';
    }
}
