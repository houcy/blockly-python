/**
 * Turtles!
 */
Blockly.Blocks['turtles_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("create new turtle");
    this.setOutput(true, 'Turtle');
    this.setColour(180);
    this.setTooltip('Creates a new turtle');
    this.setHelpUrl('');
  }
};

Blockly.Python['turtles_create'] = function(block) {
    Blockly.Python.definitions_['import_turtle'] = 'import turtle';
  var code = 'turtle.Turtle()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['turtles_color'] = {
  init: function() {
    this.appendValueInput("TURTLE")
        .setCheck("Turtle")
        .appendField("make turtle");
    this.appendValueInput("COLOR")
        .setCheck(null)
        .appendField("color");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setOutput(false);
    this.setInputsInline(true);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['turtles_color'] = function(block) {
  var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
  var color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = turtle+'.color('+color+')\n';
  return code;
};

Blockly.Blocks['turtles_forward'] = {
  init: function() {
    this.appendValueInput("TURTLE")
        .setCheck("Turtle")
        .appendField("make turtle");
    this.appendValueInput("DISTANCE")
        .setCheck(null)
        .appendField("move forward by");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(false);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['turtles_forward'] = function(block) {
  var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
  var distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = turtle+'.forward('+distance+')\n';
  return code;
};

Blockly.Blocks['turtles_backward'] = {
  init: function() {
    this.appendValueInput("TURTLE")
        .setCheck("Turtle")
        .appendField("make turtle");
    this.appendValueInput("DISTANCE")
        .setCheck(null)
        .appendField("move backward by");
    this.setPreviousStatement(true);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setOutput(false);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['turtles_backward'] = function(block) {
  var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
  var distance = Blockly.Python.valueToCode(block, 'DISTANCE', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = turtle+'.backward('+distance+')\n';
  return code;
};

Blockly.Blocks['turtles_left'] = {
  init: function() {
    this.appendValueInput("TURTLE")
        .setCheck("Turtle")
        .appendField("make turtle");
    this.appendValueInput("ANGLE")
        .setCheck(null)
        .appendField("turn left by");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(false);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['turtles_left'] = function(block) {
  var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
  var angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = turtle+'.left('+angle+')\n';
  return code;
};

Blockly.Blocks['turtles_right'] = {
  init: function() {
    this.appendValueInput("TURTLE")
        .setCheck("Turtle")
        .appendField("make turtle");
    this.appendValueInput("ANGLE")
        .setCheck(null)
        .appendField("turn right by");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setOutput(false);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['turtles_right'] = function(block) {
    var turtle = Blockly.Python.valueToCode(block, 'TURTLE', Blockly.Python.ORDER_ATOMIC);
    var angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = turtle+'.right('+angle+')\n';
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
    //console.log("aaaaa "+args[0]);
    return [block("turtle_shape", func.lineno, {'OP':this.convert(args[0])}, {
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
    if (args.length != 4) {
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

