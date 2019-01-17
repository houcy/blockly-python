

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
        var dataset = _IMPORTED_DATASETS["graduates"];
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
    
    
    mod.get_majors = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_majors", arguments, 0, 0);
        if (!("graduates" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["graduates"];
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
            
                'get_majors': {
                    "type": "FunctionType", 
                    "name": 'get_majors',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Demographics'}, {"type": "LiteralStr", "value": u'Education'}, {"type": "LiteralStr", "value": u'Employment'}, {"type": "LiteralStr", "value": u'Salaries'}, {"type": "LiteralStr", "value": u'Year'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Gender'}, {"type": "LiteralStr", "value": u'Total'}, {"type": "LiteralStr", "value": u'Ethnicity'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "NumType"}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Whites'}, {"type": "LiteralStr", "value": u'Asians'}, {"type": "LiteralStr", "value": u'Minorities'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Major'}, {"type": "LiteralStr", "value": u'Degrees'}], "values": [
					{"type": "StrType"}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Doctorates'}, {"type": "LiteralStr", "value": u'Professionals'}, {"type": "LiteralStr", "value": u'Masters'}, {"type": "LiteralStr", "value": u'Bachelors'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Status'}, {"type": "LiteralStr", "value": u'Employer Type'}, {"type": "LiteralStr", "value": u'Reason Working Outside Field'}, {"type": "LiteralStr", "value": u'Reason for Not Working'}, {"type": "LiteralStr", "value": u'Work Activity'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Not in Labor Force'}, {"type": "LiteralStr", "value": u'Unemployed'}, {"type": "LiteralStr", "value": u'Employed'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Educational Institution'}, {"type": "LiteralStr", "value": u'Business/Industry'}, {"type": "LiteralStr", "value": u'Government'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'No Job Available'}, {"type": "LiteralStr", "value": u'Job Location'}, {"type": "LiteralStr", "value": u'Working Conditions'}, {"type": "LiteralStr", "value": u'Career Change'}, {"type": "LiteralStr", "value": u'Family-related'}, {"type": "LiteralStr", "value": u'Other'}, {"type": "LiteralStr", "value": u'Pay/Promotion'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'No need/want'}, {"type": "LiteralStr", "value": u'Layoff'}, {"type": "LiteralStr", "value": u'Family'}, {"type": "LiteralStr", "value": u'No Job Available'}, {"type": "LiteralStr", "value": u'Student'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Development'}, {"type": "LiteralStr", "value": u'Professional Service'}, {"type": "LiteralStr", "value": u'Applied Research'}, {"type": "LiteralStr", "value": u'Managing/Supervising People/Projects'}, {"type": "LiteralStr", "value": u'Computer Applications'}, {"type": "LiteralStr", "value": u'Human Resources'}, {"type": "LiteralStr", "value": u'Productions/Operations/Maintenance'}, {"type": "LiteralStr", "value": u'Sales, Purchasing, Marketing'}, {"type": "LiteralStr", "value": u'Qualitity/Productivity Management'}, {"type": "LiteralStr", "value": u'Design'}, {"type": "LiteralStr", "value": u'Accounting/Finance/Contracts'}, {"type": "LiteralStr", "value": u'Teaching'}, {"type": "LiteralStr", "value": u'Basic Research'}, {"type": "LiteralStr", "value": u'Other'}], "values": [
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
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Lowest'}, {"type": "LiteralStr", "value": u'Mean'}, {"type": "LiteralStr", "value": u'Median'}, {"type": "LiteralStr", "value": u'Standard Deviation'}, {"type": "LiteralStr", "value": u'Highest'}, {"type": "LiteralStr", "value": u'Quantity'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "NumType"}]}},
                }
            
            }
        });
    });

    return mod;
}