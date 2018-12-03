

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
        var dataset = _IMPORTED_DATASETS["broadway"];
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
    
    
    mod.get_shows = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_shows", arguments, 0, 0);
        if (!("broadway" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["broadway"];
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
            
                'get_shows': {
                    "type": "FunctionType", 
                    "name": 'get_shows',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Date'}, {"type": "LiteralStr", "value": u'Statistics'}, {"type": "LiteralStr", "value": u'Show'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Full'}, {"type": "LiteralStr", "value": u'Day'}, {"type": "LiteralStr", "value": u'Month'}, {"type": "LiteralStr", "value": u'Year'}], "values": [
					{"type": "StrType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Gross'}, {"type": "LiteralStr", "value": u'Performances'}, {"type": "LiteralStr", "value": u'Attendance'}, {"type": "LiteralStr", "value": u'Capacity'}, {"type": "LiteralStr", "value": u'Gross Potential'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Type'}, {"type": "LiteralStr", "value": u'Name'}, {"type": "LiteralStr", "value": u'Theatre'}], "values": [
					{"type": "StrType"}, 
					{"type": "StrType"}, 
					{"type": "StrType"}]}]}},
                }
            
            }
        });
    });

    return mod;
}