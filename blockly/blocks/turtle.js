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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.turtle');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.turtle.HUE = 180;

Blockly.Blocks['turtle_create'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_CREATE);
        this.setOutput(true, 'Turtle');
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('Creates a new turtle');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_shape'] = {
    init: function() {
        var OPERATORS =
            [[Blockly.Msg.TURTLE_SHAPE_TURTLE,'turtle'],
                [Blockly.Msg.TURTLE_SHAPE_CLASSIC,'classic'],
                [Blockly.Msg.TURTLE_SHAPE_CIRCLE,'circle'],
                [Blockly.Msg.TURTLE_SHAPE_SQUARE,'square'],
                [Blockly.Msg.TURTLE_SHAPE_TRIANGLE,'triangle']];
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_SHAPE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_color'] = {
    init: function() {
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendValueInput("COLOR")
            .setCheck(null)
            .appendField(Blockly.Msg.TURTLE_COLOR);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_move'] = {
    init: function() {
        var OPERATORS =
            [[Blockly.Msg.TURTLE_MOVE_FOR,'forward'],
                [Blockly.Msg.TURTLE_MOVE_BACK,'backward']];
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_MOVE_WARD);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.appendValueInput("DISTANCE")
            .setCheck(null)
            .appendField(Blockly.Msg.TURTLE_MOVE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_MOVE_BY);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setOutput(false);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_turn'] = {
    init: function() {
        var OPERATORS =
            [[Blockly.Msg.TURTLE_TURN_LEFT,'left'],
                [Blockly.Msg.TURTLE_TURN_RIGHT,'right']];
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendValueInput("ANGLE")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_TURN_BY);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setOutput(false);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_pen'] = {
    init: function() {
        var OPERATORS =
            [[Blockly.Msg.TURTLE_PEN_UP,'penup'],
                [Blockly.Msg.TURTLE_PEN_DOWN,'pendown']];
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_PEN);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_pen_set'] = {
    init: function() {
        var OPERATORS =
            [[Blockly.Msg.TURTLE_PEN_COLOR,'pencolor'],
                [Blockly.Msg.TURTLE_PEN_SIZE,'pensize']];
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_PEN);
        this.appendValueInput("SET")
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_write'] = {
    init: function() {
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField(Blockly.Msg.TURTLE_WRITE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_circle'] = {
    init: function() {
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendValueInput("RADIUS")
            .setCheck(null)
            .appendField(Blockly.Msg.TURTLE_RADIUS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_CIRCLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_goto'] = {
    init: function () {
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendValueInput("X")
            .setCheck(null)
            .appendField(Blockly.Msg.TURTLE_GOTO);
        this.appendValueInput("Y")
            .setCheck(null)
            .appendField(",");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
}

Blockly.Blocks['turtle_speed'] = {
    init: function() {
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendValueInput("SPEED")
            .setCheck(null)
            .appendField(Blockly.Msg.TURTLE_SPEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['turtle_fill'] = {
    init: function() {
        var OPERATORS =
            [[Blockly.Msg.TURTLE_BEGIN_FILL,'begin_fill'],
                [Blockly.Msg.TURTLE_END_FILL,'end_fill']];
        this.appendValueInput("TURTLE")
            .setCheck("Turtle")
            .appendField(Blockly.Msg.TURTLE_MAKE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.appendDummyInput()
            .appendField(Blockly.Msg.TURTLE_FILL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setOutput(false);
        this.setInputsInline(true);
        this.setColour(Blockly.Blocks.turtle.HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
