

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
        var dataset = _IMPORTED_DATASETS["business_dynamics"];
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
    
    
    mod.get_businesses = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_businesses", arguments, 0, 0);
        if (!("business_dynamics" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["business_dynamics"];
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
            
                'get_businesses': {
                    "type": "FunctionType", 
                    "name": 'get_businesses',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'State'}, {"type": "LiteralStr", "value": u'Data'}, {"type": "LiteralStr", "value": u'Year'}], "values": [
				{"type": "StrType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Job Destruction'}, {"type": "LiteralStr", "value": u'Number of Firms'}, {"type": "LiteralStr", "value": u'Job Creation'}, {"type": "LiteralStr", "value": u'Calculated'}, {"type": "LiteralStr", "value": u'Firm Exits'}, {"type": "LiteralStr", "value": u'Establishments'}, {"type": "LiteralStr", "value": u'DHS Denominator'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Continuers'}, {"type": "LiteralStr", "value": u'Count'}, {"type": "LiteralStr", "value": u'Rate'}, {"type": "LiteralStr", "value": u'Rate/Deaths'}, {"type": "LiteralStr", "value": u'Deaths'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "NumType"}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Count'}, {"type": "LiteralStr", "value": u'Continuers'}, {"type": "LiteralStr", "value": u'Rate'}, {"type": "LiteralStr", "value": u'Rate/Births'}, {"type": "LiteralStr", "value": u'Births'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Reallocation Rate'}, {"type": "LiteralStr", "value": u'Net Job Creation'}, {"type": "LiteralStr", "value": u'Net Job Creation Rate'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Count'}, {"type": "LiteralStr", "value": u'Establishment Exit'}, {"type": "LiteralStr", "value": u'Job Destruction'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Exited Rate'}, {"type": "LiteralStr", "value": u'Entered Rate'}, {"type": "LiteralStr", "value": u'Entered'}, {"type": "LiteralStr", "value": u'Exited'}, {"type": "LiteralStr", "value": u'Physical Locations'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "NumType"}]}, 
				{"type": "NumType"}]}},
                }
            
            }
        });
    });

    return mod;
}