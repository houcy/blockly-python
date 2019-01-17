

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
        var dataset = _IMPORTED_DATASETS["energy"];
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
        if (!("energy" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["energy"];
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
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Consumption'}, {"type": "LiteralStr", "value": u'Price'}, {"type": "LiteralStr", "value": u'State'}, {"type": "LiteralStr", "value": u'Production'}, {"type": "LiteralStr", "value": u'Expenditure'}, {"type": "LiteralStr", "value": u'Year'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Industrial'}, {"type": "LiteralStr", "value": u'Transportation'}, {"type": "LiteralStr", "value": u'Residential'}, {"type": "LiteralStr", "value": u'Commercial'}, {"type": "LiteralStr", "value": u'Refinery'}, {"type": "LiteralStr", "value": u'Electric Power'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Other Petroleum Products'}, {"type": "LiteralStr", "value": u'Kerosene'}, {"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Hydropower'}, {"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Geothermal'}, {"type": "LiteralStr", "value": u'Wood'}, {"type": "LiteralStr", "value": u'Solar'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Wind'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Kerosene'}, {"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Geothermal'}, {"type": "LiteralStr", "value": u'Wood'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Kerosene'}, {"type": "LiteralStr", "value": u'Hydropower'}, {"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Geothermal'}, {"type": "LiteralStr", "value": u'Wood'}, {"type": "LiteralStr", "value": u'Solar'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Wind'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Wood'}, {"type": "LiteralStr", "value": u'Natural Gas'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Commercial'}, {"type": "LiteralStr", "value": u'Industrial'}, {"type": "LiteralStr", "value": u'Transportation'}, {"type": "LiteralStr", "value": u'Electric Power'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Kerosene'}, {"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Other Petroleum Products'}, {"type": "LiteralStr", "value": u'Kerosene'}, {"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Natural Gas'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "StrType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}], "values": [
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Commercial'}, {"type": "LiteralStr", "value": u'Industrial'}, {"type": "LiteralStr", "value": u'Transportation'}, {"type": "LiteralStr", "value": u'Residential'}, {"type": "LiteralStr", "value": u'Electric Power'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Kerosene'}, {"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Other Petroleum Products'}, {"type": "LiteralStr", "value": u'Kerosene'}, {"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Natural Gas'}, {"type": "LiteralStr", "value": u'Kerosene'}, {"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Wood'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Liquefied Petroleum Gases'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Coal'}, {"type": "LiteralStr", "value": u'Distillate Fuel Oil'}, {"type": "LiteralStr", "value": u'Natural Gas'}], "values": [
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