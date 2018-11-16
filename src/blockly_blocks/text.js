Blockly.Python['text_count'] = function(block) {
  var value_haystack = Blockly.Python.valueToCode(block, 'HAYSTACK', Blockly.Python.ORDER_ATOMIC) || '___';
  var value_needle = Blockly.Python.valueToCode(block, 'NEEDLE', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = value_haystack + '.count(' + value_needle + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['text_count'] = {
  init: function() {
    this.appendValueInput("HAYSTACK")
        .setCheck(null)
        .appendField("在");
    this.appendValueInput("NEEDLE")
        .setCheck(null)
        .appendField("中返回子串的数量");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['count'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to string.count!");
    }
    return block("text_count", func.lineno, {}, {
                    "NEEDLE": this.convert(args[0]),
                    "HAYSTACK": this.convert(func.value)
                }, {"inline": "true"});
}

Blockly.Python['text_comma'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var value_second = Blockly.Python.valueToCode(block, 'SECOND', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = value_first + ',' + value_second ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['text_comma'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck(null);
        //.appendField(",");
    this.appendValueInput("SECOND")
        .setCheck(null)
        .appendField(",");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
