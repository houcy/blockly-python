

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
        var dataset = _IMPORTED_DATASETS["earthquakes"];
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
    
    
    mod.get_earthquakes = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_earthquakes", arguments, 0, 0);
        if (!("earthquakes" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["earthquakes"];
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
            
                'get_earthquakes': {
                    "type": "FunctionType", 
                    "name": 'get_earthquakes',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'impact'}, {"type": "LiteralStr", "value": u'id'}, {"type": "LiteralStr", "value": u'location'}, {"type": "LiteralStr", "value": u'time'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'magnitude'}, {"type": "LiteralStr", "value": u'significance'}, {"type": "LiteralStr", "value": u'gap'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "StrType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'distance'}, {"type": "LiteralStr", "value": u'full'}, {"type": "LiteralStr", "value": u'name'}, {"type": "LiteralStr", "value": u'longitude'}, {"type": "LiteralStr", "value": u'depth'}, {"type": "LiteralStr", "value": u'latitude'}], "values": [
					{"type": "NumType"}, 
					{"type": "StrType"}, 
					{"type": "StrType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'full'}, {"type": "LiteralStr", "value": u'hour'}, {"type": "LiteralStr", "value": u'second'}, {"type": "LiteralStr", "value": u'month'}, {"type": "LiteralStr", "value": u'epoch'}, {"type": "LiteralStr", "value": u'year'}, {"type": "LiteralStr", "value": u'day'}, {"type": "LiteralStr", "value": u'minute'}], "values": [
					{"type": "StrType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}]}},
                }
            
            }
        });
    });

    return mod;
}