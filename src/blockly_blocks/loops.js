Blockly.Blocks['controls_forEach'] = {
  /**
   * Block for 'for each' loop.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "令变量 %1 在 %2 中 ", //Blockly.Msg.CONTROLS_FOREACH_TITLE,
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
  console.log("blockly_blocks loop python");
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
        this.setOutput(true, 'Array');
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

        if (this.getInput('Dummy')) {
            this.removeInput('Dummy');
        }
        var i = 0;
        while (this.getInput('PRINT' + i)) {
            this.removeInput('PRINT' + i);
            i++;
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
            input.setCheck('Number')
            input.appendField("从范围 0 到");
            this.appendDummyInput('Dummy')
                .appendField('前');
        }
        else if(this.itemCount_==2)
        {
            this.appendValueInput('PRINT1')
                .appendField("从范围")
                .setCheck('Number');
            this.appendValueInput('PRINT0')
                .setCheck('Number')
                .appendField("到");
            this.appendDummyInput('Dummy')
                .appendField('前');
        }
        else if(this.itemCount_>=3)
        {
            this.appendValueInput('PRINT1')
                .setCheck('Number')
                .appendField("从范围");
            this.appendValueInput('PRINT0')
                .setCheck('Number')
                .appendField("到");
            this.appendValueInput('PRINT2')
                .setCheck('Number')
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
      code = 'range(' + inner_prints[0] + ')';
  } else {
      code = 'range(' + inner_prints.join(', ') + ')';
  }
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['math_pow'] = {
  /**
   * Block for advanced math operators with single operand.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 的 %2 次方",
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "NUM2",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": Blockly.Blocks.math.HUE,
      "helpUrl": Blockly.Msg.MATH_SINGLE_HELPURL
    });
  }
};

Blockly.Python['math_pow'] = function(block) {
  // Math operators with single operand.
    arg1 = Blockly.Python.valueToCode(block, 'NUM1',
        Blockly.Python.ORDER_MULTIPLICATIVE) || '___';
    arg2 = Blockly.Python.valueToCode(block, 'NUM2',
        Blockly.Python.ORDER_MULTIPLICATIVE) || '___';
    code = 'pow(' + arg1 + ',' + arg2 + ')';

    return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
};
