Blockly.Blocks['plot_legend'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(Blockly.Blocks.plot.HUE);
    this.appendDummyInput()
        .appendField("显示图例");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(false);
    this.setTooltip('Makes the legend appear');
  }
};

Blockly.Python['plot_legend'] = function(block) {
    Blockly.Python.definitions_['import_matplotlib'] = 'import matplotlib.pyplot as plt';
    var code = 'plt.legend()\n';
    return code;
};

Blockly.Blocks['plot_'] = {
    /**
     * Block for printing multiple things (including nothing)
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.plot.HUE);
        this.itemCount_ = 1;
        this.updateShape_();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['plot_item']));
        //this.setInputsInline(true);
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
                                 'plot_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var x = 0; x < this.itemCount_; x++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'plot_item');
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
            input.setCheck('Array')
            input.appendField("生成折线图 Y轴为");
            this.setInputsInline(false);
        }
        else if(this.itemCount_==2)
        {
            this.appendValueInput('PRINT1')
                .appendField("生成折线图 X轴为")
                .setCheck('Array');
            this.appendValueInput('PRINT0')
                .setCheck('Array')
                .appendField("Y轴为");
            this.setInputsInline(false);
        }
        else if(this.itemCount_>=3)
        {
            this.appendValueInput('PRINT1')
                .setCheck('Array')
                .appendField("生成折线图 X轴为");
            this.appendValueInput('PRINT0')
                .setCheck('Array')
                .appendField("Y轴为");
            this.appendValueInput('PRINT2')
                .setCheck('String')
                .appendField("颜色为：");
        }




    }
};

Blockly.Blocks['plot_container'] = {
  // Container.
  init: function() {
    this.setColour(Blockly.Blocks.plot.HUE);
    this.appendDummyInput()
        .appendField('plot');
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.contextMenu = false;
  }
};
Blockly.Blocks['plot_item'] = {
  // Add items.
  init: function() {
    this.setColour(Blockly.Blocks.plot.HUE);
    this.appendDummyInput()
        .appendField('变量');
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.contextMenu = false;
  }
};

Blockly.Python['plot_'] = function(block) {
  Blockly.Python.definitions_['import_matplotlib'] = 'import matplotlib.pyplot as plt';
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
      code = 'plt.plot(' + inner_prints[0] + ')\n';
  } else {
      code = 'plt.plot(' + inner_prints.join(', ') + ')\n';
  }
  return code;
};
