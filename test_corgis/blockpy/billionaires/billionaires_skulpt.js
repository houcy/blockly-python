

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
        var dataset = _IMPORTED_DATASETS["billionaires"];
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
    
    
    mod.get_billionaires = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_billionaires", arguments, 0, 0);
        if (!("billionaires" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["billionaires"];
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
            
                'get_billionaires': {
                    "type": "FunctionType", 
                    "name": 'get_billionaires',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'name'}, {"type": "LiteralStr", "value": u'demographics'}, {"type": "LiteralStr", "value": u'rank'}, {"type": "LiteralStr", "value": u'location'}, {"type": "LiteralStr", "value": u'year'}, {"type": "LiteralStr", "value": u'company'}, {"type": "LiteralStr", "value": u'wealth'}], "values": [
				{"type": "StrType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'gender'}, {"type": "LiteralStr", "value": u'age'}], "values": [
					{"type": "StrType"}, 
					{"type": "NumType"}]}, 
				{"type": "NumType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'gdp'}, {"type": "LiteralStr", "value": u'region'}, {"type": "LiteralStr", "value": u'citizenship'}, {"type": "LiteralStr", "value": u'country code'}], "values": [
					{"type": "NumType"}, 
					{"type": "StrType"}, 
					{"type": "StrType"}, 
					{"type": "StrType"}]}, 
				{"type": "NumType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'founded'}, {"type": "LiteralStr", "value": u'sector'}, {"type": "LiteralStr", "value": u'type'}, {"type": "LiteralStr", "value": u'name'}, {"type": "LiteralStr", "value": u'relationship'}], "values": [
					{"type": "NumType"}, 
					{"type": "StrType"}, 
					{"type": "StrType"}, 
					{"type": "StrType"}, 
					{"type": "StrType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'worth in billions'}, {"type": "LiteralStr", "value": u'how'}, {"type": "LiteralStr", "value": u'type'}], "values": [
					{"type": "NumType"}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'category'}, {"type": "LiteralStr", "value": u'from emerging'}, {"type": "LiteralStr", "value": u'industry'}, {"type": "LiteralStr", "value": u'was political'}, {"type": "LiteralStr", "value": u'inherited'}, {"type": "LiteralStr", "value": u'was founder'}], "values": [
						{"type": "StrType"}, 
						{"type": "NumType"}, 
						{"type": "StrType"}, 
						{"type": "NumType"}, 
						{"type": "StrType"}, 
						{"type": "NumType"}]}, 
					{"type": "StrType"}]}]}},
                }
            
            }
        });
    });

    return mod;
}