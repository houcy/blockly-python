
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
            '       <li><a href="/mywork/" target="_blank">作品管理</a></li><li role="separator" class="divider"></li>' +
            '       <li><a id="back" href="/" >返回首页</a></li>' +
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
                '       <li><a id="back" href="https://blockpytest.tuopinpin.com/" >返回首页</a></li>' +
                '   </ul>' +
                '</div>'
            );
        }
    });