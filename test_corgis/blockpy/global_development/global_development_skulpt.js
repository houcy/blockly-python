

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
        var dataset = _IMPORTED_DATASETS["global_development"];
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
        if (!("global_development" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["global_development"];
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
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Country'}, {"type": "LiteralStr", "value": u'Data'}, {"type": "LiteralStr", "value": u'Year'}], "values": [
				{"type": "StrType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Infrastructure'}, {"type": "LiteralStr", "value": u'Health'}, {"type": "LiteralStr", "value": u'Rural Development'}, {"type": "LiteralStr", "value": u'Urban Development'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Telephone Lines'}, {"type": "LiteralStr", "value": u'Mobile Cellular Subscriptions'}, {"type": "LiteralStr", "value": u'Telephone Lines per 100 People'}, {"type": "LiteralStr", "value": u'Mobile Cellular Subscriptions per 100 People'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Life Expectancy at Birth, Total'}, {"type": "LiteralStr", "value": u'Total Population'}, {"type": "LiteralStr", "value": u'Life Expectancy at Birth, Male'}, {"type": "LiteralStr", "value": u'Population Growth'}, {"type": "LiteralStr", "value": u'Life Expectancy at Birth, Female'}, {"type": "LiteralStr", "value": u'Birth Rate'}, {"type": "LiteralStr", "value": u'Death Rate'}, {"type": "LiteralStr", "value": u'Fertility Rate'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Arable Land Percent'}, {"type": "LiteralStr", "value": u'Arable Land'}, {"type": "LiteralStr", "value": u'Rural Population'}, {"type": "LiteralStr", "value": u'Agricultural Land Percent'}, {"type": "LiteralStr", "value": u'Rural Population Growth'}, {"type": "LiteralStr", "value": u'Surface Area'}, {"type": "LiteralStr", "value": u'Agricultural Land'}, {"type": "LiteralStr", "value": u'Land Area'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Urban Population Percent'}, {"type": "LiteralStr", "value": u'Population Density'}, {"type": "LiteralStr", "value": u'Urban Population Percent Growth'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "NumType"}]}},
                }
            
            }
        });
    });

    return mod;
}