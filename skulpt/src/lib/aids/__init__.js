

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
        var dataset = _IMPORTED_DATASETS["aids"];
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
        if (!("aids" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["aids"];
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
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'HIV Prevalence'}, {"type": "LiteralStr", "value": u'AIDS-Related Deaths'}, {"type": "LiteralStr", "value": u'New HIV Infections'}, {"type": "LiteralStr", "value": u'People Living with HIV'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Young Men'}, {"type": "LiteralStr", "value": u'Adults'}, {"type": "LiteralStr", "value": u'Young Women'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Adults'}, {"type": "LiteralStr", "value": u'All Ages'}, {"type": "LiteralStr", "value": u'AIDS Orphans'}, {"type": "LiteralStr", "value": u'Children'}, {"type": "LiteralStr", "value": u'Female Adults'}, {"type": "LiteralStr", "value": u'Male Adults'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Incidence Rate Among Adults'}, {"type": "LiteralStr", "value": u'Adults'}, {"type": "LiteralStr", "value": u'All Ages'}, {"type": "LiteralStr", "value": u'Children'}, {"type": "LiteralStr", "value": u'Female Adults'}, {"type": "LiteralStr", "value": u'Male Adults'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Total'}, {"type": "LiteralStr", "value": u'Adults'}, {"type": "LiteralStr", "value": u'Male Adults'}, {"type": "LiteralStr", "value": u'Female Adults'}, {"type": "LiteralStr", "value": u'Children'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
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