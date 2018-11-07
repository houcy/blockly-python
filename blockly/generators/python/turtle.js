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

goog.provide('Blockly.Python.turtle');

goog.require('Blockly.Python');

Blockly.Python['turtle_create'] = function(block) {
    Blockly.Python.definitions_['import_turtle'] = 'import turtle';
    var code = 'turtle.Turtle()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};


Blockly.Python['turtle_color'] = function(block) {
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.color('+color+')\n';
    return code;
};

Blockly.Python['turtle_shape'] = function(block) {
    var operator = block.getFieldValue('OP');
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.shape('+ "\"" + operator + "\"" + ')\n';
    return code;
};

Blockly.Python['turtle_move'] = function(block) {
    var operator = block.getFieldValue('OP');
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    var distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.'+operator+'('+distance+')\n';
    return code;
};

Blockly.Python['turtle_turn'] = function(block) {
    var operator = block.getFieldValue('OP');
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    var angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.'+operator+'('+angle+')\n';
    return code;
};

Blockly.Python['turtle_pen'] = function(block) {
    var operator = block.getFieldValue('OP');
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.'+ operator + '()\n';
    return code;
};

Blockly.Python['turtle_pen_set'] = function(block) {
    var operator = block.getFieldValue('OP');
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    var set = Blockly.Python.valueToCode(block, 'SET', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.'+ operator + '('+set+')\n';
    return code;
};

Blockly.Python['turtle_write'] = function(block) {
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    var text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.write('+text+', None, None, None)\n';
    return code;
};

Blockly.Python['turtle_circle'] = function(block) {
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    var radius = Blockly.Python.valueToCode(block, 'RADIUS', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.circle('+radius+')\n';
    return code;
};

Blockly.Python['turtle_goto'] = function(block) {
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    var x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
    var y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.goto('+x+','+y+')\n';
    return code;
};

Blockly.Python['turtle_speed'] = function(block) {
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    var speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.speed('+speed+')\n';
    return code;
};

Blockly.Python['turtle_fill'] = function(block) {
    var operator = block.getFieldValue('OP');
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.'+operator+'()\n';
    return code;
};
