

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
        var dataset = _IMPORTED_DATASETS["airlines"];
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
    
    
    mod.get_reports = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_reports", arguments, 0, 0);
        if (!("airlines" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["airlines"];
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
            
                'get_reports': {
                    "type": "FunctionType", 
                    "name": 'get_reports',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Airport'}, {"type": "LiteralStr", "value": u'Statistics'}, {"type": "LiteralStr", "value": u'Time'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Code'}, {"type": "LiteralStr", "value": u'Name'}], "values": [
					{"type": "StrType"}, 
					{"type": "StrType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Flights'}, {"type": "LiteralStr", "value": u'# of Delays'}, {"type": "LiteralStr", "value": u'Minutes Delayed'}, {"type": "LiteralStr", "value": u'Carriers'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Cancelled'}, {"type": "LiteralStr", "value": u'On Time'}, {"type": "LiteralStr", "value": u'Total'}, {"type": "LiteralStr", "value": u'Delayed'}, {"type": "LiteralStr", "value": u'Diverted'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Security'}, {"type": "LiteralStr", "value": u'Carrier'}, {"type": "LiteralStr", "value": u'Late Aircraft'}, {"type": "LiteralStr", "value": u'National Aviation System'}, {"type": "LiteralStr", "value": u'Weather'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Late Aircraft'}, {"type": "LiteralStr", "value": u'Weather'}, {"type": "LiteralStr", "value": u'Carrier'}, {"type": "LiteralStr", "value": u'Security'}, {"type": "LiteralStr", "value": u'Total'}, {"type": "LiteralStr", "value": u'National Aviation System'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Total'}, {"type": "LiteralStr", "value": u'Names'}], "values": [
						{"type": "NumType"}, 
						{"type": "ListType", "subtype": 
							{"type": "StrType"}}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Month Name'}, {"type": "LiteralStr", "value": u'Year'}, {"type": "LiteralStr", "value": u'Label'}, {"type": "LiteralStr", "value": u'Month'}], "values": [
					{"type": "StrType"}, 
					{"type": "NumType"}, 
					{"type": "StrType"}, 
					{"type": "NumType"}]}]}},
                }
            
            }
        });
    });

    return mod;
}