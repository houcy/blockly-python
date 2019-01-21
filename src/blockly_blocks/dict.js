Blockly.Blocks['dicts_create_with'] = {
    /**
     * Block for creating a dict with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function() {
        this.setInputsInline(false);
        this.setColour(280);
        this.itemCount_ = 0;
        this.updateShape_();
        this.setOutput(true, 'dict');
        this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_TOOLTIP);
    },
    /**
     * Create XML to represent dict inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function(workspace) {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the dict inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    fixEmpty_: function() {
        if (this.itemCount_ > 0) {
            this.getInput("START").fieldRow[0].setText("创建字典");
        } else {
            this.getInput("START").fieldRow[0].setText("创建空字典");
        }
    },
    addRow: function(i) {
        if (!this.getInput('VALUE'+ i)) {
            this.appendValueInput('VALUE' + i)
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(
                      new Blockly.FieldTextInput(
                          Blockly.Msg.DICTS_CREATE_WITH_ITEM_KEY),
                     'KEY'+i)
               .appendField(Blockly.Msg.DICTS_CREATE_WITH_ITEM_MAPPING);
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
        var that = this;
        function addField(field, block, e) {
            var rect = field.fieldGroup_.getBoundingClientRect();
            var yPosition = e.clientY;
            if (yPosition < rect.top+rect.height/2) {
                that.itemCount_ += 1;
                that.addRow(that.itemCount_);
            } else {
                if (that.itemCount_ > 0) {
                    that.removeInput('VALUE' + that.itemCount_);
                    that.itemCount_ -= 1;
                }
            }
            that.fixEmpty_();
        }
        var clickablePlusMinus = new Blockly.FieldClickImage("images/plus_minus_v.png", 24, 24, '+', addField, '-2px');
        // Rebuild block.
        if (!this.getInput("START")) {
            this.appendDummyInput('START')
                .appendField("dictionary of")
                .appendField(clickablePlusMinus);
        }
        this.fixEmpty_();
        for (var i = 1; i <= this.itemCount_; i++) {
            this.addRow(i);
        }
    }
};
Blockly.Python['dicts_create_with'] = function(block) {
    var value_keys = Blockly.Python.valueToCode(block, 'keys', Blockly.   Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = new Array(block.itemCount_);

    for (var n = 1; n <= block.itemCount_; n++) {
        var key = Blockly.Python.quote_(block.getFieldValue('KEY' + n));
        var value = Blockly.Python.valueToCode(block, 'VALUE' + n,
                Blockly.Python.ORDER_NONE) || '___';
        code[n-1] = key +": "+ value;
    }
    code = '{' + code.join(', ') + '}';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_get_literal'] = {
  init: function() {
       this.appendValueInput('VAR')
        .appendField("访问字典");
    this.appendValueInput('VALUE')
        .appendField("中键")
        // .appendField(this.newQuote_(true))
        // .appendField(new Blockly.FieldTextInput(
        //              Blockly.Msg.DICTS_CREATE_WITH_ITEM_KEY),
        //              'ITEM')
        // .appendField(this.newQuote_(false))
        .setCheck(['String','Number']);
    this.appendDummyInput()
        .appendField("的值");
    this.setOutput(true);
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(280);
    //this.setOutput(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    //var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });*/
  }
};

Blockly.Python['dict_get_literal'] = function(block) {
    // var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
    //   Blockly.Variables.NAME_TYPE);
    var variable = Blockly.Python.valueToCode(block, 'VAR',
      Blockly.Python.ORDER_NONE) || '___';
    var key = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '___';
    var code = variable + '[' + key + ']';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_add'] = {
    init: function() {
        this.appendValueInput('VAR')
            .appendField("设置");
        this.appendValueInput('ITEM')
            .appendField("键")
            .setCheck('String');
        this.appendValueInput('VALUE')
            .appendField("的值为")
            .setCheck();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setColour(280);
        //this.setOutput(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        //var thisBlock = this;
        /*this.setTooltip(function() {
          return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
              thisBlock.getFieldValue('VAR'));
        });*/
    }
};

Blockly.Python['dict_add'] = function(block) {
    var variable = Blockly.Python.valueToCode(block, 'VAR',
      Blockly.Python.ORDER_NONE) || '___';
    var value = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '___';
    var key = Blockly.Python.valueToCode(block, 'ITEM',
        Blockly.Python.ORDER_NONE) || '___';
    var code = variable + '[' + key + ']' + ' = ' + value + '\n';
    return code;
};

Blockly.Blocks['dict_delete'] = {
  init: function() {
       this.appendDummyInput()
        .appendField("删除字典")
        .appendField(new Blockly.FieldVariable(
        "Dict"), 'VAR');
    this.appendValueInput('ITEM')
        .appendField("中的键");
        // .appendField(this.newQuote_(true))
        // .appendField(new Blockly.FieldTextInput(
        //              Blockly.Msg.DICTS_CREATE_WITH_ITEM_KEY),
        //              'ITEM')
        // .appendField(this.newQuote_(false))
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(280);
    //this.setOutput(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    //var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });*/
  },
    customContextMenu: function(options) {
        if (!this.isCollapsed()) {
          var option = {enabled: true};
          var name = this.getFieldValue('VAR');
          var workspace = this;
          workspace.createVariable("count");
          option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
          var xmlField = goog.dom.createDom('field', null, name);
          xmlField.setAttribute('name', 'VAR');
          var xmlBlock = goog.dom.createDom('block', null, xmlField);
          xmlBlock.setAttribute('type', 'variables_get');
          option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
          options.push(option);
        }
    }
};

Blockly.Python['dict_delete'] = function(block) {
    var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
    var key = Blockly.Python.valueToCode(block, 'ITEM',
        Blockly.Python.ORDER_NONE) || '___';
    var code = "del " + variable + '[' + key + ']\n';
    return code;
};

Blockly.Blocks['dict_len'] = {
  // Set element at index.
  init: function() {
    this.setColour(280);
    this.appendValueInput('DICT')
        //.appendField('get') // TODO: fix this to be outside
        .setCheck('dict')
        .appendField("获取字典");
    this.appendDummyInput()
        .appendField("的长度");
    this.setInputsInline(true);
    this.setOutput(true,'Number');
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
  }
};

Blockly.Python['dict_len'] = function(block) {
  var dict = Blockly.Python.valueToCode(block, 'DICT',
      Blockly.Python.ORDER_MEMBER) || '___';
  var code = 'len(' + dict + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_max'] = {
  // Set element at index.
  init: function() {
    this.setColour(280);
    this.appendValueInput('DICT')
        //.appendField('get') // TODO: fix this to be outside
        .setCheck('dict')
        .appendField("获取字典");
    this.appendDummyInput()
        .appendField("的最大值");
    this.setInputsInline(true);
    this.setOutput(true,'Number');
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
  }
};

Blockly.Python['dict_max'] = function(block) {
  var dict = Blockly.Python.valueToCode(block, 'DICT',
      Blockly.Python.ORDER_MEMBER) || '___';
  var code = 'max(' + dict + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_min'] = {
  // Set element at index.
  init: function() {
    this.setColour(280);
    this.appendValueInput('DICT')
        //.appendField('get') // TODO: fix this to be outside
        .setCheck('dict')
        .appendField("获取字典");
    this.appendDummyInput()
        .appendField("的最小值");
    this.setInputsInline(true);
    this.setOutput(true,'Number');
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
  }
};

Blockly.Python['dict_min'] = function(block) {
  var dict = Blockly.Python.valueToCode(block, 'DICT',
      Blockly.Python.ORDER_MEMBER) || '___';
  var code = 'min(' + dict + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_keys'] = {
  init: function() {
       this.appendDummyInput()
        .appendField("获得字典")
        .appendField(new Blockly.FieldVariable(
        "Dict"), 'VAR');
    this.appendDummyInput('VALUE')
        .appendField("中的键");
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(280);
    this.setOutput(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    //var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });*/
  },
    customContextMenu: function(options) {
        if (!this.isCollapsed()) {
          var option = {enabled: true};
          var name = this.getFieldValue('VAR');
          var workspace = this;
          workspace.createVariable("count");
          option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
          var xmlField = goog.dom.createDom('field', null, name);
          xmlField.setAttribute('name', 'VAR');
          var xmlBlock = goog.dom.createDom('block', null, xmlField);
          xmlBlock.setAttribute('type', 'variables_get');
          option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
          options.push(option);
        }
    }
};

Blockly.Python['dict_keys'] = function(block) {
    var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
    var code =  variable + '.keys()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_values'] = {
  init: function() {
       this.appendDummyInput()
        .appendField("获得字典")
        .appendField(new Blockly.FieldVariable(
        "Dict"), 'VAR');
    this.appendDummyInput('VALUE')
        .appendField("中的值");
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(280);
    this.setOutput(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    //var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });*/
  },
    customContextMenu: function(options) {
        if (!this.isCollapsed()) {
          var option = {enabled: true};
          var name = this.getFieldValue('VAR');
          var workspace = this;
          workspace.createVariable("count");
          option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
          var xmlField = goog.dom.createDom('field', null, name);
          xmlField.setAttribute('name', 'VAR');
          var xmlBlock = goog.dom.createDom('block', null, xmlField);
          xmlBlock.setAttribute('type', 'variables_get');
          option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
          options.push(option);
        }
    }
};

Blockly.Python['dict_values'] = function(block) {
    var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
    var code =  variable + '.values()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_items'] = {
  init: function() {
       this.appendDummyInput()
        .appendField("获得字典")
        .appendField(new Blockly.FieldVariable(
        "Dict"), 'VAR');
    this.appendDummyInput('VALUE')
        .appendField("中的键值对");
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(280);
    this.setOutput(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    //var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });*/
  },
    customContextMenu: function(options) {
        if (!this.isCollapsed()) {
          var option = {enabled: true};
          var name = this.getFieldValue('VAR');
          var workspace = this;
          workspace.createVariable("count");
          option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
          var xmlField = goog.dom.createDom('field', null, name);
          xmlField.setAttribute('name', 'VAR');
          var xmlBlock = goog.dom.createDom('block', null, xmlField);
          xmlBlock.setAttribute('type', 'variables_get');
          option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
          options.push(option);
        }
    }
};

Blockly.Python['dict_items'] = function(block) {
    var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
    var code =  variable + '.items()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_get'] = {
  init: function() {
       this.appendDummyInput()
        .appendField("获取字典")
        .appendField(new Blockly.FieldVariable(
        "Dict"), 'VAR');
       this.appendValueInput('KEY')
           .appendField("中的键");
    this.appendDummyInput()
        .appendField("的值");
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(280);
    this.setOutput(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    //var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });*/
  },
    customContextMenu: function(options) {
        if (!this.isCollapsed()) {
          var option = {enabled: true};
          var name = this.getFieldValue('VAR');
          var workspace = this;
          workspace.createVariable("count");
          option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
          var xmlField = goog.dom.createDom('field', null, name);
          xmlField.setAttribute('name', 'VAR');
          var xmlBlock = goog.dom.createDom('block', null, xmlField);
          xmlBlock.setAttribute('type', 'variables_get');
          option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
          options.push(option);
        }
    }
};

Blockly.Python['dict_get'] = function(block) {
    var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
    var key = Blockly.Python.valueToCode(block, 'KEY',
        Blockly.Python.ORDER_NONE) || '___';
    var code =  variable + '.get(' + key + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_pop'] = {
  init: function() {
       this.appendDummyInput()
        .appendField("删除并返回字典")
        .appendField(new Blockly.FieldVariable(
        "Dict"), 'VAR');
       this.appendValueInput('KEY')
           .appendField("中的键");
    this.appendDummyInput()
        .appendField("对应的值");
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(280);
    this.setOutput(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    //var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });*/
  },
    customContextMenu: function(options) {
        if (!this.isCollapsed()) {
          var option = {enabled: true};
          var name = this.getFieldValue('VAR');
          var workspace = this;
          workspace.createVariable("count");
          option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
          var xmlField = goog.dom.createDom('field', null, name);
          xmlField.setAttribute('name', 'VAR');
          var xmlBlock = goog.dom.createDom('block', null, xmlField);
          xmlBlock.setAttribute('type', 'variables_get');
          option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
          options.push(option);
        }
    }
};

Blockly.Python['dict_pop'] = function(block) {
    var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
    var key = Blockly.Python.valueToCode(block, 'KEY',
        Blockly.Python.ORDER_NONE) || '___';
    var code =  variable + '.pop(' + key + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['dict_clear'] = {
  init: function() {
       this.appendDummyInput()
        .appendField("删除字典")
        .appendField(new Blockly.FieldVariable(
        "Dict"), 'VAR');
    this.appendDummyInput('VALUE')
        .appendField("中的所有元素");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(280);
    //this.setOutput(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    //var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });*/
  },
    customContextMenu: function(options) {
        if (!this.isCollapsed()) {
          var option = {enabled: true};
          var name = this.getFieldValue('VAR');
          var workspace = this;
          workspace.createVariable("count");
          option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
          var xmlField = goog.dom.createDom('field', null, name);
          xmlField.setAttribute('name', 'VAR');
          var xmlBlock = goog.dom.createDom('block', null, xmlField);
          xmlBlock.setAttribute('type', 'variables_get');
          option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
          options.push(option);
        }
    }
};

Blockly.Python['dict_clear'] = function(block) {
    var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
    var code =  variable + '.clear()\n';
    return code;
};

Blockly.Blocks['func_global'] = {
  init: function() {
       this.appendDummyInput()
        .appendField("令变量")
        .appendField(new Blockly.FieldVariable(
        "variable"), 'VAR');
    this.appendDummyInput('VALUE')
        .appendField("可以全局引用");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(210);
    //this.setOutput(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    //var thisBlock = this;
    /*this.setTooltip(function() {
      return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });*/
  },
    customContextMenu: function(options) {
        if (!this.isCollapsed()) {
          var option = {enabled: true};
          var name = this.getFieldValue('VAR');
          var workspace = this;
          workspace.createVariable("count");
          option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
          var xmlField = goog.dom.createDom('field', null, name);
          xmlField.setAttribute('name', 'VAR');
          var xmlBlock = goog.dom.createDom('block', null, xmlField);
          xmlBlock.setAttribute('type', 'variables_get');
          option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
          options.push(option);
        }
    }
};

Blockly.Python['func_global'] = function(block) {
    var variable = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
    var code = 'global ' + variable + '\n';
    return code;
};
