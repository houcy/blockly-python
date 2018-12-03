

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
        var dataset = _IMPORTED_DATASETS["drugs"];
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
        if (!("drugs" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["drugs"];
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
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Year'}, {"type": "LiteralStr", "value": u'State'}, {"type": "LiteralStr", "value": u'Totals'}, {"type": "LiteralStr", "value": u'Rates'}, {"type": "LiteralStr", "value": u'Population'}], "values": [
				{"type": "NumType"}, 
				{"type": "StrType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Marijuana'}, {"type": "LiteralStr", "value": u'Pain Relievers Abuse Past Year'}, {"type": "LiteralStr", "value": u'Illicit Drugs'}, {"type": "LiteralStr", "value": u'Tobacco'}, {"type": "LiteralStr", "value": u'Alcohol'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'New Users'}, {"type": "LiteralStr", "value": u'Used Past Month'}, {"type": "LiteralStr", "value": u'Used Past Year'}, {"type": "LiteralStr", "value": u'Perceptions of Risk'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Abuse Past Year'}, {"type": "LiteralStr", "value": u'Dependence Past Year'}, {"type": "LiteralStr", "value": u'All Except Marijuana Used Past Month'}, {"type": "LiteralStr", "value": u'Cocaine Used Past Year'}, {"type": "LiteralStr", "value": u'Used Past Month'}, {"type": "LiteralStr", "value": u'Need Treatment Past Year'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Cigarette Past Month'}, {"type": "LiteralStr", "value": u'Use Past Month'}, {"type": "LiteralStr", "value": u'Perceptions of Risk'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Abuse Past Year'}, {"type": "LiteralStr", "value": u'Binge Past Month'}, {"type": "LiteralStr", "value": u'Perceptions of Risk'}, {"type": "LiteralStr", "value": u'Dependence Past Year'}, {"type": "LiteralStr", "value": u'In Minors'}, {"type": "LiteralStr", "value": u'Use Past Month'}, {"type": "LiteralStr", "value": u'Need Treatment Past Year'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Use'}, {"type": "LiteralStr", "value": u'Abuse'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Pain Relievers Abuse Past Year'}, {"type": "LiteralStr", "value": u'Illicit Drugs'}, {"type": "LiteralStr", "value": u'Alcohol'}, {"type": "LiteralStr", "value": u'Tobacco'}, {"type": "LiteralStr", "value": u'Marijuana'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Abuse Past Year'}, {"type": "LiteralStr", "value": u'Dependence Past Year'}, {"type": "LiteralStr", "value": u'All Except Marijuana Used Past Month'}, {"type": "LiteralStr", "value": u'Cocaine Used Past Year'}, {"type": "LiteralStr", "value": u'Used Past Month'}, {"type": "LiteralStr", "value": u'Need Treatment Past Year'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Abuse Past Year'}, {"type": "LiteralStr", "value": u'Binge Past Month'}, {"type": "LiteralStr", "value": u'Perceptions of Risk'}, {"type": "LiteralStr", "value": u'In Minors'}, {"type": "LiteralStr", "value": u'Dependence Past Year'}, {"type": "LiteralStr", "value": u'Use Past Month'}, {"type": "LiteralStr", "value": u'Need Treatment Past Year'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Use'}, {"type": "LiteralStr", "value": u'Abuse'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Cigarette Past Month'}, {"type": "LiteralStr", "value": u'Use Past Month'}, {"type": "LiteralStr", "value": u'Perceptions of Risk'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Perceptions of Risk'}, {"type": "LiteralStr", "value": u'Used Past Month'}, {"type": "LiteralStr", "value": u'Used Past Year'}, {"type": "LiteralStr", "value": u'New Users'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'26+'}, {"type": "LiteralStr", "value": u'18-25'}, {"type": "LiteralStr", "value": u'12-17'}, {"type": "LiteralStr", "value": u'12-20'}], "values": [
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