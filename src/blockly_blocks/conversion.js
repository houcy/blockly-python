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
        .appendField("int");
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(125);
    this.setTooltip('');
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
        .appendField("float");
    this.setInputsInline(true);
    this.setOutput(true, 'string');
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
        .appendField("str");
    this.setInputsInline(true);
    this.setOutput(true, 'string');
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
        .appendField("bool");
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
        .appendField("type");
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
        .setCheck(null)
        .appendField("eval");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(125);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
