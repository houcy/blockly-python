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
                url: '/openwork/',
                type: 'POST',
                headers:{"X-CSRFToken":$.cookie('csrftoken')},
                data:{
                    "username": $.cookie('username'),
                    "name": name,
                },
                success: function (data) {
                    data = JSON.parse(data);
                    document.cookie="productid="+data.productid;
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

                var stateObject = {};
                var newUrl = '/create/blockpy.html';
                //修改地址栏中的地址
                history.pushState(stateObject, "", newUrl);
                }
        });
    });
    var downloadButton = this.tag.find('.blockpy-toolbar-download');
    downloadButton.click(function() {
        var data = main.model.programs['__main__']();
        var filename = document.getElementById("production_name").value;
        if(filename == "" ||filename == "请输入作品名称"){
                    my.alert("系统提示", "不要忘记输入作品名称哦！");
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
            main.components.server.logEvent('editor', 'download')
        }
    });

    var uploadCloudButton = this.tag.find('.save');
    uploadCloudButton.click(function() {
            var filename = document.getElementById("production_name").value;
            var username = $.cookie('username');
            var token = $.cookie("token");
            var sessionid = $.cookie("sessionid");
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
                if(filename == "" ||filename == "请输入作品名称"){
                    my.alert("系统提示","不要忘记输入作品名称哦！");
                }
                else{
                    $.ajax({
                        url: '/upload/',
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
                                    my.alert("系统提示","作品名已存在，请重新填写！");
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
            else{
                my.alert("系统提示","您未登录，无法上传作品到云端！");
            }
    });

    var copyButton = this.tag.find('.copy');
    copyButton.click(function() {
            var filename = document.getElementById("production_name").value;
            var username = $.cookie('username');
            var token = $.cookie("token");
            var sessionid = $.cookie("sessionid");
            var code = main.model.programs['__main__']();
            var pi = $.cookie("productid");
            var flag = 1;
            if(token != null && sessionid != null) {
                if(filename == "" ||filename == "请输入作品名称"){
                    my.alert("系统提示","不要忘记输入作品名称哦！");
                }
                else{
                    $.ajax({
                        url: '/upload/',
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
                                    my.alert("系统提示","作品名已存在，请重新填写！");
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

                        document.getElementById("production_name").value = "请输入作品名称";
                        main.model.programs['__main__'](main.model.programs['starting_code']());
                        document.cookie="productid="+"";
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
                url: '/myworklist/',
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