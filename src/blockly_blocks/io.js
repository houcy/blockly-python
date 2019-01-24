Blockly.Blocks['text_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("输入")
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput("with prompt"), "MESSAGE")
        .appendField(this.newQuote_(false));
    this.setOutput(true, "String");
    this.setColour(75);
    this.setTooltip('输入模块');
    this.setHelpUrl('');
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

Blockly.Blocks['text_print_multiple'] = {
    /**
     * Block for printing multiple things (including nothing)
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(75);
        this.itemCount_ = 1;
        this.updateShape_();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['text_print_multiple_item']));
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
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
                                 'text_print_multiple_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.itemCount_; x++) {
          var itemBlock = Blockly.Block.obtain(workspace, 'text_print_multiple_item');
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
            var i = 0;
            while (this.getInput('PRINT' + i)) {
                this.removeInput('PRINT' + i);
                i++;
            }
        }

        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField("打印");
        } else {
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('PRINT' + i);
                if (i == 0) {
                    input.appendField("打印");
                }
            }
        }
    }
};

Blockly.Blocks['text_print_multiple_container'] = {
  // Container.
  init: function() {
    this.setColour(Blockly.Blocks.utility.HUE);
    this.appendDummyInput()
        .appendField('打印');
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};
Blockly.Blocks['text_print_multiple_item'] = {
  // Add items.
  init: function() {
    this.setColour(Blockly.Blocks.utility.HUE);
    this.appendDummyInput()
        .appendField('item');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Python['text_print_multiple'] = function(block) {
  // Create a list with any number of elements of any type.
  var inner_prints = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
    inner_prints[n] = Blockly.Python.valueToCode(block, 'PRINT' + n,
        Blockly.Python.ORDER_NONE) || '___';
  }
  var code;
  if (block.itemCount_ == 1) {
      code = 'print(' + inner_prints.join(', ') + ')\n';
  } else {
      code = 'print(' + inner_prints.join(', ') + ')\n';
  }
  return code;
};

Blockly.Blocks['text_print_end'] = {
  // Add items.
  init: function() {
    this.setColour(75);
    this.appendDummyInput()
        .appendField('end =')
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(""), "MESSAGE")
        .appendField(this.newQuote_(false));
    this.setInputsInline(true);
    this.setOutput(true);
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
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

Blockly.Python['text_print_end'] = function(block) {
  // Create a list with any number of elements of any type.
  var code = Blockly.Python.quote_(block.getFieldValue('MESSAGE'));
  code = "end ="+code;
  return [code, Blockly.Python.ORDER_ATOMIC];
};
