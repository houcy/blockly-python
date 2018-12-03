

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
        var dataset = _IMPORTED_DATASETS["state_demographics"];
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
    
    
    mod.get_all_states = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_all_states", arguments, 0, 0);
        if (!("state_demographics" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["state_demographics"];
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
            
                'get_all_states': {
                    "type": "FunctionType", 
                    "name": 'get_all_states',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Ethnicities'}, {"type": "LiteralStr", "value": u'Age'}, {"type": "LiteralStr", "value": u'Miscellaneous'}, {"type": "LiteralStr", "value": u'Sales'}, {"type": "LiteralStr", "value": u'State'}, {"type": "LiteralStr", "value": u'Income'}, {"type": "LiteralStr", "value": u'Education'}, {"type": "LiteralStr", "value": u'Employment'}, {"type": "LiteralStr", "value": u'Housing'}, {"type": "LiteralStr", "value": u'Population'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'White Alone, not Hispanic or Latino'}, {"type": "LiteralStr", "value": u'Two or More Races'}, {"type": "LiteralStr", "value": u'Asian Alone'}, {"type": "LiteralStr", "value": u'Native Hawaiian and Other Pacific Islander Alone'}, {"type": "LiteralStr", "value": u'White Alone'}, {"type": "LiteralStr", "value": u'Hispanic or Latino'}, {"type": "LiteralStr", "value": u'Black Alone'}, {"type": "LiteralStr", "value": u'American Indian and Alaska Native Alone'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Percent Under 18 Years'}, {"type": "LiteralStr", "value": u'Percent 65 and Older'}, {"type": "LiteralStr", "value": u'Percent Under 5 Years'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Manufacturers Shipments'}, {"type": "LiteralStr", "value": u'Foreign Born'}, {"type": "LiteralStr", "value": u'Percent Female'}, {"type": "LiteralStr", "value": u'Language Other than English at Home'}, {"type": "LiteralStr", "value": u'Living in Same House +1 Years'}, {"type": "LiteralStr", "value": u'Mean Travel Time to Work'}, {"type": "LiteralStr", "value": u'Building Permits'}, {"type": "LiteralStr", "value": u'Veterans'}, {"type": "LiteralStr", "value": u'Land Area'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Retail Sales'}, {"type": "LiteralStr", "value": u'Merchant Wholesaler Sales'}, {"type": "LiteralStr", "value": u'Accommodation and Food Services Sales'}, {"type": "LiteralStr", "value": u'Retail Sales per Capita'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "StrType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Median Houseold Income'}, {"type": "LiteralStr", "value": u'Per Capita Income'}, {"type": "LiteralStr", "value": u'Persons Below Poverty Level'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u"Bachelor's Degree or Higher"}, {"type": "LiteralStr", "value": u'High School or Higher'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Private Non-farm Establishments'}, {"type": "LiteralStr", "value": u'Private Non-farm Employment Percent Change'}, {"type": "LiteralStr", "value": u'Firms'}, {"type": "LiteralStr", "value": u'Nonemployer Establishments'}, {"type": "LiteralStr", "value": u'Private Non-farm Employment'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Total'}, {"type": "LiteralStr", "value": u'Hispanic-Owned'}, {"type": "LiteralStr", "value": u'Native Hawaiian and Other Pacific Islander-Owned'}, {"type": "LiteralStr", "value": u'American Indian-Owned'}, {"type": "LiteralStr", "value": u'Black-Owned'}, {"type": "LiteralStr", "value": u'Asian-Owned'}, {"type": "LiteralStr", "value": u'Women-Owned'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Housing Units'}, {"type": "LiteralStr", "value": u'Units in Multi-Unit Structures'}, {"type": "LiteralStr", "value": u'Median Value of Owner-Occupied Units'}, {"type": "LiteralStr", "value": u'Households'}, {"type": "LiteralStr", "value": u'Persons per Household'}, {"type": "LiteralStr", "value": u'Homeownership Rate'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'2014 Population'}, {"type": "LiteralStr", "value": u'2010 Population'}, {"type": "LiteralStr", "value": u'Population per Square Mile'}, {"type": "LiteralStr", "value": u'Population Percent Change'}], "values": [
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