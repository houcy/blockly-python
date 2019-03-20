var $builtinmodule = function (name) {
"use strict";

    var mod = {};
    
    /*
    // Function Template
    new Sk.builtin.func(function () {
        // Body
    });
    
    // Class Template
    var class_constructor = function ($gbl, $loc) {
        $loc.__init__ = new Sk.builtin.func(function (self, parameters) {
            // Body
        });
        $loc._internalGenericGetAttr = Sk.builtin.object.prototype.GenericSetAttr;
    };
    Sk.misceval.buildClass(mod, class_constructor, class_name_as_string, []);
    */
    var types_list = [
        "UnknownType", "RecursedType",
        "FunctionType", "ClassType", "InstanceType",
        "NumType", "NoneType", "BoolType", "TupleType",
        "ListType", "StrType", "GeneratorType",
        "DictType", "ModuleType", "SetType"
    ]
    for (var i=0; i<types_list.length; i++) {
        var class_constructor = function ($gbl, $loc) {
            $loc.__init__ = new Sk.builtin.func(function (self, name, submodule, fields) {
                // Body
            });
        };
        mod[types_list[i]] = Sk.misceval.buildClass(mod, class_constructor, types_list[i], []);
    }
    
    var literals_list = [
        "LiteralNum", "LiteralBool", "LiteralNone", "LiteralStr", "LiteralTuple"
    ]
    for (var i=0; i<literals_list.length; i++) {
        var class_constructor = function ($gbl, $loc) {
            $loc.type = new Sk.builtin.func(function (self) {
                // Body
            });
        };
        mod[literals_list[i]] = Sk.misceval.buildClass(mod, class_constructor, literals_list[i], []);
    }
    
    mod.type_from_json = new Sk.builtin.func(function () {
        // Body
    });
    mod.type_to_literal = new Sk.builtin.func(function () {
        // Body
    });                                         
    
    return mod;

};
