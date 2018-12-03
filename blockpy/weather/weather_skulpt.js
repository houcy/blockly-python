

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
        var dataset = _IMPORTED_DATASETS["weather"];
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
    
    
    mod.get_weather = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_weather", arguments, 0, 0);
        if (!("weather" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["weather"];
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
            
                'get_weather': {
                    "type": "FunctionType", 
                    "name": 'get_weather',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Date'}, {"type": "LiteralStr", "value": u'Station'}, {"type": "LiteralStr", "value": u'Data'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Week of'}, {"type": "LiteralStr", "value": u'Year'}, {"type": "LiteralStr", "value": u'Full'}, {"type": "LiteralStr", "value": u'Month'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "StrType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'City'}, {"type": "LiteralStr", "value": u'State'}, {"type": "LiteralStr", "value": u'Code'}, {"type": "LiteralStr", "value": u'Location'}], "values": [
					{"type": "StrType"}, 
					{"type": "StrType"}, 
					{"type": "StrType"}, 
					{"type": "StrType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Precipitation'}, {"type": "LiteralStr", "value": u'Temperature'}, {"type": "LiteralStr", "value": u'Wind'}], "values": [
					{"type": "NumType"}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Max Temp'}, {"type": "LiteralStr", "value": u'Avg Temp'}, {"type": "LiteralStr", "value": u'Min Temp'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Direction'}, {"type": "LiteralStr", "value": u'Speed'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}]}},
                }
            
            }
        });
    });

    return mod;
}