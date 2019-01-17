

var $builtinmodule = function(name)
{
    var mod = {};
    
    mod.get = new Sk.builtin.func(function(property, index, index_value) {
        Sk.builtin.pyCheckArgs("get", arguments, 3, 3);
        Sk.builtin.pyCheckType("property", "string", Sk.builtin.checkString(property));
        Sk.builtin.pyCheckType("index", "string", Sk.builtin.checkString(index));
        Sk.builtin.pyCheckType("index_value", "string", Sk.builtin.checkString(index_value));
        property = property.v;
        index = index.v;
        index_value = index_value.v;
        var dataset = _IMPORTED_DATASETS["state_crime"];
        var data = [];
        if (index != '(None)') {
            for (var i = 0; i < dataset[property].data.length; i += 1) {
                if (dataset[index].data[i] == index_value) {
                    data.push(dataset[property].data[i]);
                }
            }
        } else {
            data = dataset[property].data;
        }
        return Sk.ffi.remapToPy(data);
    });
    
    
    mod.get_all_crimes = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_all_crimes", arguments, 0, 0);
        if (!("state_crime" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["state_crime"];
        }
    });
    
    
    mod._tifa_definitions = new Sk.builtin.func(function() {
        return Sk.ffi.remapToPy({"type": "ModuleType",
            "fields": {
                'get': {
                    "type": "FunctionType",
                    "name": 'get',
                    "returns": {
                        "type": "ListType", 
                        "empty": false, 
                        "subtype": {"type": "NumType"}
                    }
                },
            
                'get_all_crimes': {
                    "type": "FunctionType", 
                    "name": 'get_all_crimes',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'State'}, {"type": "LiteralStr", "value": u'Data'}, {"type": "LiteralStr", "value": u'Year'}], "values": [
				{"type": "StrType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Population'}, {"type": "LiteralStr", "value": u'Rates'}, {"type": "LiteralStr", "value": u'Totals'}], "values": [
					{"type": "NumType"}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Violent'}, {"type": "LiteralStr", "value": u'Property'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'All'}, {"type": "LiteralStr", "value": u'Murder'}, {"type": "LiteralStr", "value": u'Rape'}, {"type": "LiteralStr", "value": u'Robbery'}, {"type": "LiteralStr", "value": u'Assault'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Burglary'}, {"type": "LiteralStr", "value": u'Larceny'}, {"type": "LiteralStr", "value": u'All'}, {"type": "LiteralStr", "value": u'Motor'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Violent'}, {"type": "LiteralStr", "value": u'Property'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'All'}, {"type": "LiteralStr", "value": u'Murder'}, {"type": "LiteralStr", "value": u'Rape'}, {"type": "LiteralStr", "value": u'Robbery'}, {"type": "LiteralStr", "value": u'Assault'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Burglary'}, {"type": "LiteralStr", "value": u'Larceny'}, {"type": "LiteralStr", "value": u'All'}, {"type": "LiteralStr", "value": u'Motor'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}]}, 
				{"type": "NumType"}]}},
                }
            
            }
        });
    });

    return mod;
}