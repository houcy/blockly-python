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
        .appendField("中返回子串");
    this.appendDummyInput('DUMMY')
        .appendField("的数量");
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

Blockly.Blocks['text_'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(DATA_HUE);
    this.appendDummyInput()
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(this.newQuote_(false));
    this.setOutput(true, 'String');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          Blockly.Msg.TEXT_TEXT_TOOLTIP;
    });
  },
  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @this Blockly.Block
   * @private
   */
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.Python['text_'] = function(block) {
  // Text value.
  var code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
  console.log("aaa "+code);
  return [code, Blockly.Python.ORDER_ATOMIC];
};

//新添 blocks/text.js的镜像 方便调试
Blockly.Blocks['text_getSubstring_'] = {
  /**
   * Block for getting substring.
   * @this Blockly.Block
   */
  init: function() {
    this['WHERE_OPTIONS_1'] =
        [[Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, 'FROM_START'],
         [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, 'FROM_END'],
         [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, 'FIRST']];
    this['WHERE_OPTIONS_2'] =
        [[Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, 'FROM_START'],
         [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, 'FROM_END'],
         [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, 'LAST']];
    this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('STRING')
        .setCheck('String')
        .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);//自文本
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    if (Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    }
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP);
  },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
    container.setAttribute('at1', isAt1);
    var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    container.setAttribute('at2', isAt2);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var isAt1 = (xmlElement.getAttribute('at1') == 'true');
    var isAt2 = (xmlElement.getAttribute('at2') == 'true');
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
  },
  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independant of each other.
   * @param {number} n Specify first or second input (1 or 2).
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function(n, isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('PRE' + n, true);
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      /*if (Blockly.Msg.ORDINAL_NUMBER_PREFIX) {
          this.appendDummyInput('PRE' + n)
              .appendField(Blockly.Msg.ORDINAL_NUMBER_PREFIX);
      }*/
      this.appendValueInput('AT' + n).setCheck('Number');
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL' + n)
            //.appendField('第di')
            .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    // Move tail, if present, to end of block.
    if (n == 2 && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
          //.appendField("test");
    }
    var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
        function(value) {
          var newAt = (value == 'FROM_START') || (value == 'FROM_END');
          // The 'isAt' variable is available due to this function being a
          // closure.
          if (newAt != isAt) {
            var block = this.sourceBlock_;
            block.updateAt_(n, newAt);
            // This menu has been destroyed and replaced.
            // Update the replacement.
            block.setFieldValue(value, 'WHERE' + n);
            return null;
          }
          return undefined;
        });

    this.getInput('AT' + n)
        .appendField(menu, 'WHERE' + n);
    this.judge(n);
      //console.log("n: "+this['WHERE_OPTIONS_' + n]);
    if (n == 1) {
      this.moveInputBefore('AT1', 'AT2');
      if(isAt == 1)
        this.moveInputBefore('ORDINAL1', 'AT2');
    }
    if(n == 2 && isAt == 0)
      this.removeInput('TAIL', true);
  },
  judge:function(n)
  {
    if(this.getInput('AT'+n).type == Blockly.INPUT_VALUE)
      this.getInput('AT' + n)
           .appendField(Blockly.Msg.ORDINAL_NUMBER_PREFIX);
      //this.removeInput('PRE' + n, true);
  }
};

Blockly.Python['text_getSubstring_'] = function(block) {
  // Get substring.
  var text = Blockly.Python.valueToCode(block, 'STRING',
      Blockly.Python.ORDER_MEMBER) || '___';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  switch (where1) {
    case 'FROM_START':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1');
      if (at1 == '0') {
        at1 = '';
      }
      break;
    case 'FROM_END':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1', 0, true);
      break;
    case 'FIRST':
      var at1 = '';
      break;
    default:
      throw 'Unhandled option (text_getSubstring)';
  }
  switch (where2) {
    case 'FROM_START':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 0);
      break;
    case 'FROM_END':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 0, true);
      // Ensure that if the result calculated is 0 that sub-sequence will
      // include all elements as expected.
      if (!Blockly.isNumber(String(at2))) {
        Blockly.Python.definitions_['import_sys'] = 'import sys';
        at2 += ' or sys.maxsize';
      } else if (at2 == '0') {
        at2 = '';
      }
      break;
    case 'LAST':
      var at2 = '';
      break;
    default:
      throw 'Unhandled option (text_getSubstring)';
  }
  var code = text + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.Python.ORDER_MEMBER];
};


Blockly.Python['text_chr'] = function(block) {
  var value_first = Blockly.Python.valueToCode(block, 'FIRST', Blockly.Python.ORDER_ATOMIC) || '___';
  var code = 'chr(' + value_first + ')' ;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['text_chr'] = {
  init: function() {
    this.appendValueInput("FIRST")
        .setCheck(null)
        .appendField("将");
    this.appendDummyInput("TAIL")
        .appendField("按ASCII码编码");
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(125);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['text_replace'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput("OLD_STR")
        .setCheck('String')
        .appendField("将");
    this.appendValueInput("NOT_REPLACED_STR")
        .setCheck('String')
        .appendField("中的");
    this.appendValueInput("REPLACED_STR")
        .setCheck('String')
        .appendField("替换为");
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['text_replace'] = function(block) {
  var old_str = Blockly.Python.valueToCode(block, 'OLD_STR', Blockly.Python.ORDER_ATOMIC) || '___';
  var first = Blockly.Python.valueToCode(block, 'NOT_REPLACED_STR', Blockly.Python.ORDER_ATOMIC) || '___';
  var second = Blockly.Python.valueToCode(block, 'REPLACED_STR', Blockly.Python.ORDER_ATOMIC) || '___';

  var code =  old_str + ".replace(" + first +"," + second + ")";

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['text_join'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput("SUB_STRING")
        .setCheck(['String','Array'])
        .appendField("将");
    this.appendValueInput("JOIN_STR")
        .setCheck('String')
        .appendField("用");
    this.appendDummyInput("TAIL")
        .appendField("连接起来");
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['text_join'] = function(block) {
  var first = Blockly.Python.valueToCode(block, 'SUB_STRING', Blockly.Python.ORDER_ATOMIC) || '___';
  var second = Blockly.Python.valueToCode(block, 'JOIN_STR', Blockly.Python.ORDER_ATOMIC) || '___';

  var code =  second + ".join(" + first + ")";

  return [code, Blockly.Python.ORDER_ATOMIC];
};

/*PythonToBlocks.KNOWN_ATTR_FUNCTIONS['join'] = function(func, args, keywords, starargs, kwargs, node)
{
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments to text.join!");
    }
    return [block("text_join", func.lineno, {}, {
        "JOIN_STR": this.convert(args[0]),
        "SUB_STRING": this.convert(args[1]),
        "TEXT": this.convert(func.value)
    }, {"inline": "true"})];
}*/

Blockly.Blocks['text_charAt'] = {
  /**
   * Block for getting a character from the string.
   * @this Blockly.Block
   */
  init: function() {
    this.WHERE_OPTIONS =
        [[Blockly.Msg.TEXT_CHARAT_FROM_START, 'FROM_START'],
         [Blockly.Msg.TEXT_CHARAT_FROM_END, 'FROM_END'],
         [Blockly.Msg.TEXT_CHARAT_FIRST, 'FIRST'],
         [Blockly.Msg.TEXT_CHARAT_LAST, 'LAST'],
         [Blockly.Msg.TEXT_CHARAT_RANDOM, 'RANDOM']];
    this.setHelpUrl(Blockly.Msg.TEXT_CHARAT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.setOutput(true, 'String');
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField(Blockly.Msg.TEXT_CHARAT_INPUT_INTEXT);
    this.appendDummyInput('AT');
    this.setInputsInline(true);
    this.updateAt_(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var where = thisBlock.getFieldValue('WHERE');
      var tooltip = Blockly.Msg.TEXT_CHARAT_TOOLTIP;
      if (where == 'FROM_START' || where == 'FROM_END') {
        var msg = (where == 'FROM_START') ?
            Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP :
            Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP;
        tooltip += '  ' + msg.replace('%1',
            thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
      }
      return tooltip;
    });
  },
  /**
   * Create XML to represent whether there is an 'AT' input.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    container.setAttribute('at', isAt);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' input.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    // Note: Until January 2013 this block did not have mutations,
    // so 'at' defaults to true.
    var isAt = (xmlElement.getAttribute('at') != 'false');
    this.updateAt_(isAt);
  },
  /**
   * Create or delete an input for the numeric index.
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function(isAt) {
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT');
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck('Number');
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL')
            .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT');
    }
    if (Blockly.Msg.TEXT_CHARAT_TAIL) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_CHARAT_TAIL);
    }
    var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(value) {
      var newAt = (value == 'FROM_START') || (value == 'FROM_END');
      // The 'isAt' variable is available due to this function being a closure.
      if (newAt != isAt) {
        var block = this.sourceBlock_;
        block.updateAt_(newAt);
        // This menu has been destroyed and replaced.  Update the replacement.
        block.setFieldValue(value, 'WHERE');
        return null;
      }
      return undefined;
    });
    this.getInput('AT').appendField(menu, 'WHERE');
  }
};

Blockly.Python['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var text = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_MEMBER) || '___';
  switch (where) {
    case 'FIRST':
      var code = text + '[0]';
      return [code, Blockly.Python.ORDER_MEMBER];
    case 'LAST':
      var code = text + '[-1]';
      return [code, Blockly.Python.ORDER_MEMBER];
    case 'FROM_START':
      var at = Blockly.Python.getAdjustedInt(block, 'AT');
      var code = text + '[' + at + ']';
      return [code, Blockly.Python.ORDER_MEMBER];
    case 'FROM_END':
      var at = Blockly.Python.getAdjustedInt(block, 'AT', 0, true);
      var code = text + '[' + at + ']';
      return [code, Blockly.Python.ORDER_MEMBER];
    case 'RANDOM':
      Blockly.Python.definitions_['import_random'] = 'import random';
      var functionName = Blockly.Python.provideFunction_(
          'text_random_letter',
          ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(text):',
           '  x = int(random.random() * len(text))',
           '  return text[x];']);
      code = functionName + '(' + text + ')';
      return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
};

Blockly.Blocks['text_three_quote'] = {
  // Container.
  init: function() {
    this.appendDummyInput()
        .appendField(this.newQuote_(true))
        .appendField(this.newQuote_(true))
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextArea(''), 'TEXT')
        .appendField(this.newQuote_(false))
        .appendField(this.newQuote_(false))
        .appendField(this.newQuote_(false));
    //this.setPreviousStatement(true, null);
    //this.setNextStatement(true, null);
    //this.setOutput(true,null);
    //this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.setOutput(true, 'String');
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.Python['text_three_quote'] = function(block) {
  var text_body = block.getFieldValue('TEXT');
  // TODO: Assemble JavaScript into code variable.
  var code = '"""'+text_body+'"""';
  return [code, Blockly.Python.ORDER_ATOMIC];
  //return [code,;
};
