Blockly.Blocks['controls_forEach'] = {
  /**
   * Block for 'for each' loop.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "令循环变量 %1 在 %2 中 ", //Blockly.Msg.CONTROLS_FOREACH_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "VAR",
          "check": "Tuple"
        },
        {
          "type": "input_value",
          "name": "LIST",
          "check": ['String', 'Array']
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.loops.HUE,
      "helpUrl": Blockly.Msg.CONTROLS_FOREACH_HELPURL
    });
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_DO);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.Msg.CONTROLS_FOREACH_TOOLTIP.replace('%1',
          Blockly.Python.valueToCode(thisBlock, 'VAR', Blockly.Python.ORDER_RELATIONAL) || '___');
    });
  },
  customContextMenu: Blockly.Blocks['controls_for'].customContextMenu
};

Blockly.Python['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Python.valueToCode(block, 'VAR',
      Blockly.Python.ORDER_RELATIONAL) || '___';
  var argument0 = Blockly.Python.valueToCode(block, 'LIST',
      Blockly.Python.ORDER_RELATIONAL) || '___';
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block.id) ||
      Blockly.Python.PASS;
  var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
  return code;
};

Blockly.Blocks['loop_range'] = {
    /**
     * Block for printing multiple things (including nothing)
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.loops.HUE);
        this.itemCount_ = 1;
        this.updateShape_();
        //this.setPreviousStatement(true);
        //this.setNextStatement(true);
        this.setOutput(true,'Array');
        this.setMutator(new Blockly.Mutator(['loop_range_item']));
        this.setInputsInline(true);
        this.setTooltip();
  },
    /**
     * Create XML to represent print inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function(workspace) {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = Blockly.Block.obtain(workspace,
                                 'loop_range_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.itemCount_; x++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'loop_range_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        var i = 0;
        while (itemBlock) {
            connections[i] = itemBlock.valueConnection_;
            itemBlock = itemBlock.nextConnection &&
                        itemBlock.nextConnection.targetBlock();
            i++;
        }
        this.itemCount_ = i;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            if (connections[i]) {
                this.getInput('PRINT' + i).connection.connect(connections[i]);
            }
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        // Store a pointer to any connected child blocks.
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var x = 0;
        while (itemBlock) {
            var input = this.getInput('PRINT' + x);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            x++;
            itemBlock = itemBlock.nextConnection &&
                        itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
        // Delete everything.
        if (this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else {
            if (this.getInput('Dummy')) {
                this.removeInput('Dummy');
            }
            var i = 0;
            while (this.getInput('PRINT' + i)) {
                this.removeInput('PRINT' + i);
                i++;
            }
        }
/*

        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField("range");
        } else if(this.itemCount_ <= 3){
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('PRINT' + i);
                if (i == 0) {
                    input.appendField("range");
                }
            }
        }
        else{
            this.itemCount_ = 3;
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('PRINT' + i);
                if (i == 0) {
                    input.appendField("range");
                }
            }
        }*/


        if(this.itemCount_ == 0||this.itemCount_ == 1)
        {
            var input = this.appendValueInput('PRINT0');
            input.appendField("从范围 0 到");
            this.appendDummyInput('Dummy')
                .appendField('前');
        }
        else if(this.itemCount_==2)
        {
            this.appendValueInput('PRINT1')
                .appendField("从范围");
            this.appendValueInput('PRINT0')
                .appendField("到");
            this.appendDummyInput('Dummy')
                .appendField('前');
        }
        else if(this.itemCount_>=3)
        {
            this.appendValueInput('PRINT1')
                .appendField("从范围");
            this.appendValueInput('PRINT0')
                .appendField("到");
            this.appendValueInput('PRINT2')
                .appendField("前每隔");
        }




    }
};

Blockly.Blocks['loop_range_container'] = {
  // Container.
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField('range');
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};
Blockly.Blocks['loop_range_item'] = {
  // Add items.
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField('变量');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Python['loop_range'] = function(block) {
  // Create a list with any number of elements of any type.
  if(block.itemCount_==0) block.itemCount_=1;
  if(block.itemCount_>=3) block.itemCount_=3;
  var inner_prints = new Array(block.itemCount_);
  if(block.itemCount_==1)
      inner_prints[0] = Blockly.Python.valueToCode(block, 'PRINT' + 0,
        Blockly.Python.ORDER_NONE) || '___';
  else if (block.itemCount_==2)
  {
      inner_prints[1] = Blockly.Python.valueToCode(block, 'PRINT' + 0,
        Blockly.Python.ORDER_NONE) || '___';
      inner_prints[0] = Blockly.Python.valueToCode(block, 'PRINT' + 1,
        Blockly.Python.ORDER_NONE) || '___';
  }
  else
  {
      inner_prints[1] = Blockly.Python.valueToCode(block, 'PRINT' + 0,
        Blockly.Python.ORDER_NONE) || '___';
      inner_prints[0] = Blockly.Python.valueToCode(block, 'PRINT' + 1,
        Blockly.Python.ORDER_NONE) || '___';
      inner_prints[2] = Blockly.Python.valueToCode(block, 'PRINT' + 2,
        Blockly.Python.ORDER_NONE) || '___';
  }
  /*for (var n = 0; n < block.itemCount_; n++) {
    inner_prints[n] = Blockly.Python.valueToCode(block, 'PRINT' + n,
        Blockly.Python.ORDER_NONE) || '___';
  }*/
  var code;
  if (block.itemCount_ == 1) {
      code = 'range(' + inner_prints.join(', ') + ')\n';
  } else {
      code = 'range(' + inner_prints.join(', ') + ')\n';
  }
  return code;
};

Blockly.Blocks['controls_repeat_'] = {
  /**
   * Block for repeat n times (internal number).
   * The 'controls_repeat_ext' block is preferred as it is more flexible.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "令变量 %1 重复 %2 次",
      "args0": [
          {
              "type": "field_variable",
              "name": "VAR",
              "variable": null
          },
          {
              "type": "field_number",
              "name": "TIMES",
              "value": 10,
              "min": 0,
              "precision": 1
          }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.loops.HUE,
      "tooltip": Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
      "helpUrl": Blockly.Msg.CONTROLS_REPEAT_HELPURL
    });
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
  },
    //customContextMenu: Blockly.Blocks['controls_for'].customContextMenu
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

Blockly.Python['controls_repeat_'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(parseInt(block.getFieldValue('TIMES'), 10));
  } else {
    // External number.
    var repeats = Blockly.Python.valueToCode(block, 'TIMES',
        Blockly.Python.ORDER_NONE) || '___';
  }
  if (Blockly.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = 'int(' + repeats + ')';
  }
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block.id) ||
      Blockly.Python.PASS;
  var loopVar = Blockly.Python.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = 'for ' + loopVar + ' in range(' + repeats + '):\n' + branch;
  return code;
};
