Blockly.Python['conversion_int'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = 'int(' + value_first + ')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['conversion_int'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck(null)
        .appendField("将");
    this.appendDummyInput("name")
        .appendField("变为整型");
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(125);
    this.setTooltip('将XXXXXXX');
    this.setHelpUrl('');
  }
};

Blockly.Python['conversion_float'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = 'float(' + value_first + ')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['conversion_float'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck(null)
        .appendField("将");
    this.appendDummyInput("name")
        .appendField("变为浮点型");
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(125);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['conversion_str'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = 'str(' + value_first + ')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['conversion_str'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck(null)
        .appendField("将");
    this.appendDummyInput("name")
        .appendField("变为字符串型");
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(125);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['conversion_bool'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = 'bool(' + value_first + ')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['conversion_bool'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck(null)
        .appendField("将");
    this.appendDummyInput("name")
        .appendField("变为布尔型");
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(125);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['conversion_type'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = 'type(' + value_first + ')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['conversion_type'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck(null)
        .appendField("返回");
    this.appendDummyInput("name")
        .appendField("的类型");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(125);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['conversion_eval'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = 'eval(' + value_first + ')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['conversion_eval'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck('String')
        .appendField("将");
    this.appendDummyInput("name")
        .appendField("求值并返回计算结果");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(125);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['conversion_chr'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck('Number')
        .appendField("将");
    this.appendDummyInput("TAIL")
        .appendField("按Unicode码解码");
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(125);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['conversion_chr'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = 'chr(' + value_first + ')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['conversion_ord'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = 'ord(' + value_first + ')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['conversion_ord'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck(null)
        .appendField("将");
    this.appendDummyInput("TAIL")
        .appendField("按Unicode码编码");
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(125);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
