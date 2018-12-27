/**
 * Turtles!
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
            .setCheck()
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
    var code = turtle+'.write('+text+')\n';
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

PythonToBlocks.KNOWN_MODULES['turtle'] = {
    "Turtle": ["turtle_create"]
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['forward'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.forward!");
    }
    return [block("turtle_move", func.lineno, {'OP':'forward'}, {
        "DISTANCE": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['backward'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.backward!");
    }
    return [block("turtle_move", func.lineno, {'OP':'backward'}, {
        "DISTANCE": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['left'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.left!");
    }
    return [block("turtle_turn", func.lineno, {'OP':'left'}, {
        "ANGLE": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['right'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.right!");
    }
    return [block("turtle_turn", func.lineno, {'OP':'right'}, {
        "ANGLE": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['shape'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.shape!");
    }

    //var shape = "\'" + eval(this.convert(args[0])) + "\'";
    //console.log(this.Str_value(args[0]));
    return [block("turtle_shape", func.lineno, {'OP':this.Str_value(args[0])}, {
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['color'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.color!");
    }
    //console.log("bbbbb "+this.convert(args[0]));
    return [block("turtle_color", func.lineno, {}, {
        "COLOR": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['penup'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments to turtle.penup!");
    }
    return [block("turtle_pen", func.lineno, {'OP':'penup'}, {
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['pendown'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments to turtle.pendown!");
    }
    return [block("turtle_pen", func.lineno, {'OP':'pendown'}, {
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['pencolor'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.pencolor!");
    }
    return [block("turtle_pen_set", func.lineno, {'OP':'pencolor'}, {
        "SET": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['pensize'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.pensize!");
    }
    return [block("turtle_pen_set", func.lineno, {'OP':'pensize'}, {
        "SET": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['write'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.write!");
    }
    return [block("turtle_write", func.lineno, {}, {
        "TEXT": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['circle'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.circle!");
    }
    return [block("turtle_circle", func.lineno, {}, {
        "RADIUS": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['goto'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 2) {
        throw new Error("Incorrect number of arguments to turtle.goto!");
    }
    return [block("turtle_goto", func.lineno, {}, {
        "X": this.convert(args[0]),
        "Y": this.convert(args[1]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['speed'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 1) {
        throw new Error("Incorrect number of arguments to turtle.speed!");
    }
    return [block("turtle_speed", func.lineno, {}, {
        "SPEED": this.convert(args[0]),
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['begin_fill'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments to turtle.begin_fill!");
    }
    return [block("turtle_fill", func.lineno, {'OP':'begin_fill'}, {
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

PythonToBlocks.KNOWN_ATTR_FUNCTIONS['end_fill'] = function(func, args, keywords, starargs, kwargs, node) {
    if (args.length != 0) {
        throw new Error("Incorrect number of arguments to turtle.end_fill!");
    }
    return [block("turtle_fill", func.lineno, {'OP':'end_fill'}, {
        "TURTLE": this.convert(func.value)
    }, {"inline": "true"})];
}

