/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Dictionary blocks for Blockly.
 * @author acbart@vt.edu (Austin Cory Bart)
 */
'use strict';

goog.provide('Blockly.Blocks.dicts');

goog.require('Blockly.Blocks');


Blockly.Blocks.dicts.HUE = 0;


Blockly.Blocks['dict_get'] = {
  // Set element at index.
  init: function() {
    this.setColour(280);
    this.appendValueInput('ITEM');
    this.appendValueInput('DICT')
        .setCheck('dict')
        .appendField(Blockly.Msg.DICT_GET_TO);
    this.setInputsInline(false);
    this.setOutput(true);
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
  }
};

Blockly.Blocks['dict_get_literal'] = {
  // Set element at index.
  init: function() {
    this.setColour(280);
    this.appendValueInput('DICT')
        //.appendField('get') // TODO: fix this to be outside
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(
                     Blockly.Msg.DICTS_CREATE_WITH_ITEM_KEY),
                     'ITEM')
        .appendField(this.newQuote_(false))
        .setCheck('dict')
        .appendField(Blockly.Msg.DICT_GET_TO);
    this.setInputsInline(false);
    this.setOutput(true);
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
  },
  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @private
   */
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAA0UlEQVQY023QP0oDURSF8e8MImhlUIiCjWKhrUUK3YCIVkq6bMAF2LkCa8ENWLoNS1sLEQKprMQ/GBDks3kDM+Oc8nfPfTxuANQTYBeYAvdJLL4FnAFfwF2ST9Rz27kp5YH/kwrYp50LdaXHAU4rYNYzWAdeenx7AbgF5sAhcARsAkkyVQ+ACbAKjIGqta4+l78udXxc/LiJG+qvet0pV+q7+tHE+iJzdbGz8FhmOzVcqj/qq7rcKI7Ut1Leq70C1oCrJMMk343HB8ADMEzyVOMff72l48gwfqkAAAAASUVORK5CYII=';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAAvklEQVQY022PoapCQRRF97lBVDRYhBcEQcP1BwS/QLAqr7xitZn0HzRr8Rts+htmQdCqSbQIwmMZPMIw3lVmZu0zG44UAFSBLdBVBDAFZqFo8eYKtANfBC7AE5h8ZNOHd1FrDnh4VgmDO3ADkujDHPgHfkLZ84bfaLjg/hD6RFLq9z6wBDr+rvuZB1bAEDABY76pA2mGHyWSjvqmIemc4WsCLKOp4nssIj8wD8qS/iSVJK3N7OTeJPV9n72ZbV7iDuSc2BaQBQAAAABJRU5ErkJggg==';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.Blocks['dict_keys'] = {
  // Set element at index.
  init: function() {
    this.setColour(280);
    this.appendValueInput('DICT')
        .setCheck('dict')
        .appendField(Blockly.Msg.DICT_KEYS);
    this.setInputsInline(false);
    this.setOutput(true, 'Array');
    //this.setPreviousStatement(true);
    //this.setNextStatement(true);
  }
};

Blockly.Blocks['dicts_create_with'] = {
    /**
     * Block for creating a dict with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function() {
        console.log("init");
        this.setInputsInline(false);
        this.setColour(280);
        this.itemCount_ = 1;
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
            this.getInput("START").fieldRow[0].setText("dictionary of");
        } else {
            this.getInput("START").fieldRow[0].setText(Blockly.Msg.DICTS_CREATE_EMPTY_TITLE);
        }
    },
    addRow: function(i) {
        if (!this.getInput('VALUE'+i)) {
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
