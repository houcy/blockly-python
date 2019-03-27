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

            $("#blockpy_formatclass").html('' +
                '<select id="formatclass" style="width: 180px;height: 30px;">' +
                '   <option value="0">=请选择班级=</option>' +
                '</select>'
            );
            $("#blockpy_course").html('' +
                '<select id="course" style="width: 180px;height: 30px;" >' +
                '   <option value="0">=请选择课程=</option>' +
                '</select>'
            );
            $("#blockpy_task").html('' +
                '<select id="task" style="width: 180px;height: 30px;" >' +
                '   <option value="0">=请选择作业=</option>' +
                '</select>'
            );

            var url = decodeURI(window.location.href);
            if ( url.indexOf( "?" ) == -1 ) {
                var username = $.cookie('username');
                var classid = $.cookie("blockpy_class_id");
                var classname = $.cookie("blockpy_class_name");
                get_class(username, classid);

                if (classid != 0) {
                    get_course(classid);
                }
            }

            $("#formatclass").change(function () {
                $.cookie("blockpy_class_id", $("#formatclass").val(), {path: "/", domain: window.FONT_DOMAIN});
                $.cookie("blockpy_class_name", $("#formatclass").find("option:selected").text(), {path: "/", domain: window.FONT_DOMAIN});
                $("#course").html("");
                $("#course").append("<option value='0'>" + "=请选择课程=" + "</option>");
                $("#task").html("");
                $("#task").append("<option value='0'>" + "=请选择作业=" + "</option>");
                var formatclass = $("#formatclass").val();
                if(formatclass == "0")
                    return false;
                get_course(formatclass);
            });

            $("#blockpy_course").change(function () {
                $("#task").html("");
                $("#task").append("<option value='0'>" + "=请选择作业=" + "</option>");
                var courseid = $("#course").val();
                if(courseid == "0")
                    return false;
                get_task(courseid);
            });

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
});

function get_class(username, classid) {
    $.ajax({
        url: window.BLOCKPY + 'blockpy_get_class/',
        type: 'POST',
        headers:{"X-CSRFToken":$.cookie('csrftoken')},
        data:{
            "username": username,
        },
        success: function (class_list) {
            var classes = class_list;
            var length = classes.length;
            if(length != 0) {
                for(var i=0; i<classes.length; i++){
                    var data = classes[i];
                    var classOpt = document.createElement(('option'));
                    classOpt.innerText = data.class_name;
                    classOpt.value = data.class_id;
                    $("#formatclass").append(classOpt);
                }
                $("#formatclass").val(classid);
            }
            else {
                $("#formatclass").html("");
                $("#formatclass").append("<option value='0'>" + "=暂时没有班级=" + "</option>");
                $("#course").html("");
                $("#course").append("<option value='0'>" + "=暂时没有课程=" + "</option>");
                $("#task").html("");
                $("#task").append("<option value='0'>" + "=暂时没有作业=" + "</option>");
            }
        }
    });
}

function get_course(classid) {
    $.ajax({
        url: window.BLOCKPY + 'blockpy_get_course/',
        type: 'POST',
        headers:{"X-CSRFToken":$.cookie('csrftoken')},
        data:{
            "classid": classid,
        },
        success: function (lesson_list) {
            var lessons = lesson_list;
            var length = lessons.length;
            if(length != 0) {
                for(var i=0; i<length; i++){
                    var data = lessons[i];
                    var courseOpt = document.createElement(('option'));
                    courseOpt.innerText = data.lesson_name;
                    courseOpt.value = data.lesson_id;
                    $("#course").append(courseOpt);
                }
            }
            else {
                $("#course").html("");
                $("#course").append("<option value='0'>" + "=暂时没有课程=" + "</option>");
                $("#task").html("");
                $("#task").append("<option value='0'>" + "=暂时没有作业=" + "</option>");
            }
        }
    });
}

function get_task(courseid) {
    $.ajax({
        url: window.BLOCKPY + 'blockpy_get_task/',
        type: 'POST',
        headers:{"X-CSRFToken":$.cookie('csrftoken')},
        data:{
            "courseid": courseid,
        },
        success: function (task_list) {
            var tasks = task_list;
            var length = tasks.length;
            if(length != 0) {
                for(var i=0; i<length; i++){
                    var data = tasks[i];
                    var taskOpt = document.createElement(('option'));
                    taskOpt.innerText = data.task_name;
                    taskOpt.value = data.task_id;
                    $("#task").append(taskOpt);
                }
            }
            else {
                $("#task").html("");
                $("#task").append("<option value='0'>" + "=暂时没有作业=" + "</option>");
            }
        }
    });
}