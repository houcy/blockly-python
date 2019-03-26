/**
 * An object that manages the main toolbar, including the different mode buttons.
 * This doesn't actually have many responsibilities after the initial load.
 *
 * @constructor
 * @this {BlockPyToolbar}
 * @param {Object} main - The main BlockPy instance
 * @param {HTMLElement} tag - The HTML object this is attached to.
 */

document.write("<script language=javascript src='src/alert.js'></script>");

function BlockPyToolbar(main, tag) {
    this.main = main;
    this.tag = tag;

    // Holds the HTMLElement tags for each of the toolbar items
    this.tags = {};
    this.tags.mode_set_text = this.tag.find('.blockpy-mode-set-text');
    this.tags.filename_picker = this.tag.find('.blockpy-toolbar-filename-picker');

    // Actually set up the toolbar!
    this.activateToolbar();
}

BlockPyToolbar.prototype.notifyFeedbackUpdate = function() {
    this.tag.find(".blockpy-toolbar-feedback").show().fadeOut(7000);
}

/**
 * Register click events for more complex toolbar actions.
 */

BlockPyToolbar.prototype.activateToolbar = function() {
    var main = this.main;

    //从作品页打开作品时执行
    var url = decodeURI(window.location.href);
    if ( url.indexOf( "?" ) != -1 ){
        query_str = url.substr(url.indexOf('?')+1, url.length-1);
        r_params = query_str.split('&');
        params = {};
        for(var i in r_params){
            param = r_params[i].split('=');
            params[ param[0] ] = param[1];
        }
        var name = params["name"];
        document.getElementById("production_name").value = name;
            $.ajax({
                url: window.BLOCKPY + 'openwork/',
                type: 'POST',
                headers:{"X-CSRFToken":$.cookie('csrftoken')},
                data:{
                    "username": $.cookie('username'),
                    "name": name,
                },
                success: function (data) {
                    data = JSON.parse(data);
                    document.cookie="productid="+data.productid;
                    document.cookie="isTask="+data.isTask;
                    classid = data.classid;         //获取作品的班级id
                    lessonid = data.lessonid;       //获取作品的课程id
                    taskid = data.taskid;           //获取作品的作业id
                    if (data.isTask == "true") {
                        $("#formatclass").val(classid);     //选中作品当前班级
                    }
                    main.setCode(data.code);
                }
            })
    }

    this.tag.find('.blockpy-run').click(function() {
        main.components.server.logEvent('editor', 'run')
        main.components.engine.on_run();
    });
    this.tags.mode_set_text.click(function() {
        main.components.server.logEvent('editor', 'text')
        main.model.settings.editor("Text");
    });
    this.tag.find('.blockpy-toolbar-reset').click(function() {
        main.model.programs['__main__'](main.model.programs['starting_code']());
        //main.components.editor.updateBlocks();
        main.components.server.logEvent('editor', 'reset');
        if (main.model.assignment.parsons()) {
            main.components.editor.blockly.shuffle();
        }
    });
    this.tag.find('.blockpy-mode-set-blocks').click(function(event) {
        if (main.model.areBlocksUpdating()) {
            main.components.server.logEvent('editor', 'blocks')
            main.model.settings.editor("Blocks");
        } else {
            event.preventDefault();
            return false;
        }
    });
    /*this.tag.find('.blockpy-mode-set-instructor').click(function() {
        main.model.settings.editor("Instructor");
        main.components.server.logEvent('editor', 'instructor')
    });*/
    this.tag.find('.blockpy-mode-set-split').click(function(event) {
        if (main.model.areBlocksUpdating()) {
            main.model.settings.editor("Split");
            main.components.server.logEvent('editor', 'split')
        } else {
            event.preventDefault();
            return false;
        }
    });
    this.tag.find('.blockpy-toolbar-import').click(function() {
        main.components.corgis.openDialog();
        main.components.server.logEvent('editor', 'import')
    });
    this.tag.find('.blockpy-toolbar-history').click(function() {
        main.components.history.openDialog();
        main.components.server.logEvent('editor', 'history')
    });
    var instructorDialog = this.main.model.constants.container.find('.blockpy-instructor-popup');
    this.tag.find('.blockpy-toolbar-instructor').click(function() {
        instructorDialog.modal({'backdrop': false}).modal('show');
        instructorDialog.draggable({
            'handle': '.modal-title'
        });
        main.components.server.logEvent('editor', 'instructor')
    });
    this.tag.find('.blockpy-toolbar-english').click(function() {
        main.components.english.openDialog();
        main.components.server.logEvent('editor', 'english')
    });
    var uploadButton = this.tag.find('.blockpy-toolbar-upload');
    uploadButton.change(function() {
        my.confirm("温馨提醒", "确保已经保存修改的内容，是否继续？", function(flag) {
            if(flag) {
                var fr = new FileReader();
                var files = uploadButton[0].files;
                fr.onload = function (e) {
                    main.setCode(e.target.result)
                    main.components.server.logEvent('editor', 'upload')
                    //main.components.engine.on_run();
                };
                var index = files[0].name.lastIndexOf("\.");
                document.getElementById("production_name").value = files[0].name.substring(0,index);
                fr.readAsText(files[0]);
                uploadButton.val("");

                document.cookie="productid="+"";
                var stateObject = {};
                var newUrl = '/create/blockpy.html';
                //修改地址栏中的地址
                history.pushState(stateObject, "", newUrl);
                }
        });
    });
    var f = document.getElementById("_file");
    //var uploadFileButton = this.tag.find('.uploadfile');
    //console.log("************************uploadFileButton.change(function()uploadFileButton.change(function()uploadFileButton.change(function()");
    f.onchange=function() {
        console.log("uploadFileButton.change(function()uploadFileButton.change(function()uploadFileButton.change(function()");
        //var fr1 = new FileReader();
        var files1 = f.files[0];
        var fileName = files1.name;
        console.log(files1);

		var reader = new FileReader();//新建一个FileReader
        reader.readAsText(files1, "UTF-8");//读取文件
        reader.onload = function(e) { //读取完文件之后会回来这里
            console.log(e);
            var data = e.target.result; // 读取文件内容
            main.model.assignment.files.push(fileName);
            main.components.engine.uploadFile(fileName,data);
        }

    };
    var downloadButton = this.tag.find('.blockpy-toolbar-download');
    downloadButton.click(function() {
        var data = main.model.programs['__main__']();
        var filename = document.getElementById("production_name").value.trim();
        if(filename.length == 0){
                    my.alert("系统提示", "作品名称不能为空或者为空格哦！");
        }
        else{
            reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
            if ( !reg.test(filename) ){
                my.alert("系统提示", "作品名称不符号规则哦！");
            }
            else{
                var blob = new Blob([data], {type: 'text/plain'});
                if(window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveBlob(blob, filename);
                }
                else{
                    var elem = window.document.createElement('a');
                    elem.href = window.URL.createObjectURL(blob);
                    elem.download = filename;
                    document.body.appendChild(elem);
                    elem.click();
                    document.body.removeChild(elem);
                }
                main.components.server.logEvent('editor', 'download');
            }
        }
    });

    var uploadCloudButton = this.tag.find('.save');
    uploadCloudButton.click(function() {
            var filename = document.getElementById("production_name").value.trim();
            var username = $.cookie('username');
            var token = $.cookie("token");
            var sessionid = $.cookie("sessionid");
            var istask = $.cookie("isTask");
            var code = main.model.programs['__main__']();
            var pi = $.cookie("productid");
            var flag = 0;
            if (pi == ""){
                flag = 1;
            }
            /*var flag = document.cookie.indexOf("productid=")
            if (flag == -1){
                console.log("aaaaaaaaaaaaa");
            }*/
            if(token != null && sessionid != null) {
                if(filename.length == 0){
                    my.alert("系统提示", "作品名称不能为空或者为空格哦！");
                }
                else{
                    reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
                    if ( !reg.test(filename) ){
                        my.alert("系统提示", "作品名称不符号规则哦！");
                    }
                    else{
                        var format_classid = $("#formatclass").val();
                        var courseid = $("#course").val();
                        var taskid = $("#task").val();
                        var format_class = $("#formatclass").find("option:selected").text();
                        var course = $("#course").find("option:selected").text();
                        var task = $("#task").find("option:selected").text();
                        var prompt = "";
                        if (flag){
                            if (task == "=请选择作业=" || task == "=暂时没有作业="){
                                prompt = "当前未选择作业，是否继续上传？";
                            }
                            else {
                                prompt = "当前选择的作业：" + course + "—" + task + "（" + format_class + "），是否上传到该作业？";
                            }
                        }
                        else {
                            if (istask == "true") {
                                my.alert("系统提示", "当前作品属于作业内容，无法修改！");
                                return true;
                            }
                            else {
                                if (task == "=请选择作业=" || task == "=暂时没有作业="){
                                    prompt = "当前未选择作业，是否保存修改？";
                                }
                                else {
                                    prompt = "当前选择的作业：" + course + "—" + task + "（" + format_class + "），是否上传到该作业？";
                                }
                            }
                        }
                        my.confirm("温馨提醒", prompt, function(e) {
                                if(e) {
                                    $.ajax({
                                        url: window.BLOCKPY + 'upload/',
                                        type: 'POST',
                                        headers:{"X-CSRFToken":$.cookie('csrftoken')},
                                        data:{
                                            "name": filename,
                                            "username": username,
                                            "code": code,
                                            "productid": pi,
                                            "flag": flag,
                                            "format_classid":format_classid,
                                            "lessonid":courseid,
                                            "taskid":taskid,
                                        },
                                         success: function (data) {
                                            data = JSON.parse(data);
                                            //console.log(data.code);
                                            if (data.status) {
                                                if (data.taskIsExist) {
                                                    my.alert("系统提示","你已经上传过作品到该作业，不能重复提交哦！");
                                                    return true;
                                                }
                                                if(data.isExist) {
                                                    my.alert("系统提示","作品名已存在哦！");
                                                    return true;
                                                }

                                                document.cookie="productid="+data.productid;
                                                document.cookie="isTask="+data.isTask;
                                                document.getElementById("production_name").value = data.name;
                                                my.alert("系统提示","保存成功！");
                                                var stateObject = {};
                                                var newUrl = '/create/blockpy.html';
                                                //修改地址栏中的地址
                                                history.pushState(stateObject, "", newUrl);

                                            }
                                            else {
                                                my.alert("系统提示","好像出了点问题，保存失败！");
                                            }
                                        }
                                    })
                                }
                         });

                    }
                }
            }
            else{
                my.alert("系统提示","您未登录，无法上传作品到云端！");
            }
    });

   var copyButton = this.tag.find('.copy');
    copyButton.click(function() {
            var filename = document.getElementById("production_name").value.trim();
            var username = $.cookie('username');
            var token = $.cookie("token");
            var sessionid = $.cookie("sessionid");
            var code = main.model.programs['__main__']();
            var pi = $.cookie("productid");
            var flag = 1;
            if(token != null && sessionid != null) {
                if(filename.length == 0){
                    my.alert("系统提示", "作品名称不能为空或者为空格哦！");
                }
                else{
                    reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
                    if ( !reg.test(filename) ){
                        my.alert("系统提示", "作品名称不符号规则哦！");
                    }
                    else {
                        $.ajax({
                            url: window.BLOCKPY + 'upload/',
                            type: 'POST',
                            headers:{"X-CSRFToken":$.cookie('csrftoken')},
                            data:{
                                "name": filename,
                                "username": username,
                                "code": code,
                                "productid": pi,
                                "flag": flag,
                            },
                             success: function (data) {
                                data = JSON.parse(data);
                                //console.log(data.code);
                                if (data.status) {
                                    if(data.isExist) {
                                        my.alert("系统提示","作品名已存在哦！");
                                    }
                                    else{
                                        document.cookie="productid="+data.productid;
                                        document.getElementById("production_name").value = data.name;
                                        my.alert("系统提示","保存成功！");

                                        var stateObject = {};
                                        var newUrl = '/create/blockpy.html';
                                        //修改地址栏中的地址
                                        history.pushState(stateObject, "", newUrl);
                                    }
                                }
                                else {
                                    my.alert("系统提示","好像出了点问题，保存失败！");
                                }
                            }
                        })
                    }
                }
            }
            else{
                my.alert("系统提示","您未登录，无法上传作品到云端！");
            }
    });

    var newButton = this.tag.find('.new');
    newButton.click(function() {
            my.confirm("温馨提醒", "确保已经保存修改的内容，确定离开？", function(flag) {
                    if(flag) {
                        var stateObject = {};
                        var newUrl = '/create/blockpy.html';
                        //修改地址栏中的地址
                        history.pushState(stateObject, "", newUrl);

                        document.getElementById("production_name").value = "";
                        main.model.programs['__main__'](main.model.programs['starting_code']());
                        document.cookie="productid="+"";
                        document.cookie="isTask="+"";
                    }
             });
    });

    this.tag.find('.blockpy-toolbar-filename-picker label').click(function() {
        main.model.settings.filename($(this).data('filename'))
    });
     var myWorkButton = this.tag.find('.blockpy-toolbar-myWork');
    myWorkButton.click(function() {
        var username = $.cookie('username');
        var token = $.cookie("token");
        var sessionid = $.cookie("sessionid");
        if(token != null && sessionid != null) {
            $.ajax({
                url: window.BLOCKPY + 'myworklist/',
                type: 'POST',
                headers:{"X-CSRFToken":$.cookie('csrftoken')},
                data:{
                    "username": username,
                },
                success: function (data) {
                    data = JSON.parse(data);
                    //console.log(data['a']+"sssssssssssssss");

                    main.components.corgis.openWork(data);
                    //main.components.server.logEvent('editor', 'import')


                }
            })
        }
            else{
                my.alert("系统提示","您未登录，无法查看作品！");
            }

        /*var fr = new FileReader();
        var files = uploadButton[0].files;
        fr.onload = function(e) {
            main.setCode(e.target.result)
            main.components.server.logEvent('editor', 'upload')
            main.components.engine.on_run();
        };
        fr.readAsText(files[0]);
        uploadButton.val("");*/
    });
}
