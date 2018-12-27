/**
 * Created by jiangxingguo on 2018/10/9.
 */

/**
 * @param options 弹窗基本配置信息
 * @constructor 构造方法
 */
function MyLayer(options) {
  this.options = options ;
}
/**
 * 打开弹窗
 */
MyLayer.prototype.openLayer = function () {
  //console.log("ccccccc");
  var background_layer = document.createElement("div");
  background_layer.style.display = "none";
  background_layer.style.position = "absolute";
  background_layer.style.top = "0px";
  background_layer.style.left = "0px";
  background_layer.style.width = "100%";
  background_layer.style.height = "100%";
  background_layer.style.backgroundColor = "gray";
  background_layer.style.zIndex = "1001";
  background_layer.style.opacity = "0.8" ;
  var open_layer = document.createElement("div");
  open_layer.style.display = "none";
  open_layer.style.position = "absolute";
  open_layer.style.top = this.options.top === undefined ? "10%" : this.options.top;
  open_layer.style.left = this.options.left === undefined ? "10%" :this.options.left;
  open_layer.style.width = this.options.width === undefined ? "80%" : this.options.width;
  open_layer.style.height = this.options.height === undefined ? "80%" : this.options.height;
  open_layer.style.border = "1px solid lightblue";
  open_layer.style.borderRadius = "15px" ;
  open_layer.style.boxShadow = "4px 4px 10px #171414";
  open_layer.style.backgroundColor = "white";
  open_layer.style.zIndex = "1002";
  open_layer.style.overflow = "auto";
  var div_toolBar = document.createElement("div");
  div_toolBar.style.textAlign = "right";
  div_toolBar.style.paddingTop = "10px" ;
  div_toolBar.style.backgroundColor = "aliceblue";
  div_toolBar.style.height = "40px";
  var span_title = document.createElement("span");
  span_title.style.fontSize = "18px";
  span_title.style.color = "blue" ;
  span_title.style.float = "left";
  span_title.style.marginLeft = "20px";
  var span_title_content = document.createTextNode(this.options.title === undefined ? "" : this.options.title);
  span_title.appendChild(span_title_content);
  div_toolBar.appendChild(span_title);
  var span_close = document.createElement("span");
  span_close.style.fontSize = "16px";
  span_close.style.color = "blue" ;
  span_close.style.cursor = "pointer";
  span_close.style.marginRight = "20px";
  span_close.onclick = function () {
    open_layer.style.display = "none";
    background_layer.style.display = "none";
  };
  var span_close_content = document.createTextNode("关闭");
  span_close.appendChild(span_close_content);
  div_toolBar.appendChild(span_close);
  open_layer.appendChild(div_toolBar);
  var div_content = document.createElement("div");
  div_content.style.textAlign = "center";

  //var insertText = "<table><tr><td>any thing</td></tr></table>";
  //document.getElementById("div_content").innerHTML(insertText);
  //div_content.innerHTML = "<table border='1'><tr align='center'><td width=20%>Airlines</td><td width=60%>Information about flight delays in major aiports since 2003.</td><td width=20%><button>Load</button></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td><button>Load</button></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table>"

  var main_table = document.createElement("table");

  var first_line = document.createElement("tr");

  var first_1_column = document.createElement("td");
  first_1_column.style.width = "20%";
  first_1_column.style.fontWeight = "bold";
  first_1_column.style.textAlign = "center";
  //td.setAttribute('width',20%);

  var first_2_column = document.createElement("td");
  first_2_column.style.width = "60%";

  var first_3_column = document.createElement("td");
  first_3_column.style.width = "20%";
  first_1_column.style.textAlign = "center";

  var first_1_cell_text = document.createTextNode("Airlines");
  //first_1_cell_text.style.fontWeight = "bold";

  var first_2_cell_text = document.createTextNode("Information about flight delays in major aiports since 2003.");
  var first_3_button = document.createElement("button");
  var first_3_button_text = document.createTextNode("Load");

  var second_line = document.createElement("tr");
  var second_1_column = document.createElement("td");
  second_1_column.style.width = "20%";
  //td.setAttribute('width',20%);

  var second_2_column = document.createElement("td");
  second_2_column.style.width = "60%";

  var second_3_column = document.createElement("td");
  second_3_column.style.width = "20%";

  var second_1_cell_text = document.createTextNode("");
  var second_2_cell_text = document.createTextNode("");
  var second_3_cell_text = document.createTextNode("");



  first_1_column.appendChild(first_1_cell_text);
  first_2_column.appendChild(first_2_cell_text);
  first_3_column.appendChild(first_3_button);
  first_3_button.appendChild(first_3_button_text);

  //
  first_line.appendChild(first_1_column);
  first_line.appendChild(first_2_column);
  first_line.appendChild(first_3_column);

  second_1_column.appendChild(second_1_cell_text);
  second_2_column.appendChild(second_2_cell_text);
  second_3_column.appendChild(second_3_cell_text);
  second_line.appendChild(second_1_column);
  second_line.appendChild(second_2_column);
  second_line.appendChild(second_3_column);

  main_table.appendChild(first_line);
  main_table.appendChild(second_line);


  //var content_area = document.createTextNode(this.options.content === undefined ? "暂时没有数据集" : this.options.content);
  //div_content.appendChild(main_table);
  open_layer.appendChild(div_content);
  document.body.appendChild(open_layer);
  document.body.appendChild(background_layer);
  open_layer.style.display = "block" ;
  background_layer.style.display = "block";

  first_3_button.addEventListener('click',airlinesClicked);

}


