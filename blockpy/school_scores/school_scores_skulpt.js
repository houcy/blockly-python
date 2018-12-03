

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
        var dataset = _IMPORTED_DATASETS["school_scores"];
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
    
    
    mod.get_all = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_all", arguments, 0, 0);
        if (!("school_scores" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["school_scores"];
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
            
                'get_all': {
                    "type": "FunctionType", 
                    "name": 'get_all',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Gender'}, {"type": "LiteralStr", "value": u'Year'}, {"type": "LiteralStr", "value": u'GPA'}, {"type": "LiteralStr", "value": u'State'}, {"type": "LiteralStr", "value": u'Academic Subjects'}, {"type": "LiteralStr", "value": u'Family Income'}, {"type": "LiteralStr", "value": u'Total'}, {"type": "LiteralStr", "value": u'Score Ranges'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Male'}, {"type": "LiteralStr", "value": u'Female'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Test-takers'}, {"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Test-takers'}, {"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "NumType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'A'}, {"type": "LiteralStr", "value": u'C'}, {"type": "LiteralStr", "value": u'B'}, {"type": "LiteralStr", "value": u'No response'}, {"type": "LiteralStr", "value": u'D or lower'}, {"type": "LiteralStr", "value": u'A plus'}, {"type": "LiteralStr", "value": u'A minus'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Code'}, {"type": "LiteralStr", "value": u'Name'}], "values": [
					{"type": "StrType"}, 
					{"type": "StrType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Social Sciences/History'}, {"type": "LiteralStr", "value": u'Natural Sciences'}, {"type": "LiteralStr", "value": u'Arts/Music'}, {"type": "LiteralStr", "value": u'Foreign Languages'}, {"type": "LiteralStr", "value": u'English'}, {"type": "LiteralStr", "value": u'Mathematics'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Average GPA'}, {"type": "LiteralStr", "value": u'Average Years'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Average GPA'}, {"type": "LiteralStr", "value": u'Average Years'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Average GPA'}, {"type": "LiteralStr", "value": u'Average Years'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Average GPA'}, {"type": "LiteralStr", "value": u'Average Years'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Average GPA'}, {"type": "LiteralStr", "value": u'Average Years'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Average GPA'}, {"type": "LiteralStr", "value": u'Average Years'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Between 40-60k'}, {"type": "LiteralStr", "value": u'More than 100k'}, {"type": "LiteralStr", "value": u'Less than 20k'}, {"type": "LiteralStr", "value": u'Between 60-80k'}, {"type": "LiteralStr", "value": u'Between 20-40k'}, {"type": "LiteralStr", "value": u'Between 80-100k'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}, {"type": "LiteralStr", "value": u'Test-takers'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Test-takers'}, {"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}], "values": [
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Between 400 to 500'}, {"type": "LiteralStr", "value": u'Between 200 to 300'}, {"type": "LiteralStr", "value": u'Between 700 to 800'}, {"type": "LiteralStr", "value": u'Between 600 to 700'}, {"type": "LiteralStr", "value": u'Between 500 to 600'}, {"type": "LiteralStr", "value": u'Between 300 to 400'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Math'}, {"type": "LiteralStr", "value": u'Verbal'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Males'}, {"type": "LiteralStr", "value": u'Females'}, {"type": "LiteralStr", "value": u'Total'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}]}]}},
                }
            
            }
        });
    });

    return mod;
}