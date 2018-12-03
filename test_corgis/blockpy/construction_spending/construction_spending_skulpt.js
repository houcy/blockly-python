

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
        var dataset = _IMPORTED_DATASETS["construction_spending"];
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
    
    
    mod.get_spending = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_spending", arguments, 0, 0);
        if (!("construction_spending" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["construction_spending"];
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
            
                'get_spending': {
                    "type": "FunctionType", 
                    "name": 'get_spending',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'current'}, {"type": "LiteralStr", "value": u'annual'}, {"type": "LiteralStr", "value": u'time'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'combined'}, {"type": "LiteralStr", "value": u'private'}, {"type": "LiteralStr", "value": u'public'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'lodging'}, {"type": "LiteralStr", "value": u'educational'}, {"type": "LiteralStr", "value": u'total construction'}, {"type": "LiteralStr", "value": u'transportation'}, {"type": "LiteralStr", "value": u'power'}, {"type": "LiteralStr", "value": u'office'}, {"type": "LiteralStr", "value": u'nonresidential'}, {"type": "LiteralStr", "value": u'amusement and recreation'}, {"type": "LiteralStr", "value": u'residential'}, {"type": "LiteralStr", "value": u'public safety'}, {"type": "LiteralStr", "value": u'conservation and development'}, {"type": "LiteralStr", "value": u'commercial'}, {"type": "LiteralStr", "value": u'water supply'}, {"type": "LiteralStr", "value": u'health care'}, {"type": "LiteralStr", "value": u'sewage and waste disposal'}, {"type": "LiteralStr", "value": u'communication'}, {"type": "LiteralStr", "value": u'manufacturing'}, {"type": "LiteralStr", "value": u'religious'}, {"type": "LiteralStr", "value": u'highway and street'}], "values": [
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
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'lodging'}, {"type": "LiteralStr", "value": u'educational'}, {"type": "LiteralStr", "value": u'total construction'}, {"type": "LiteralStr", "value": u'transportation'}, {"type": "LiteralStr", "value": u'power'}, {"type": "LiteralStr", "value": u'office'}, {"type": "LiteralStr", "value": u'nonresidential'}, {"type": "LiteralStr", "value": u'amusement and recreation'}, {"type": "LiteralStr", "value": u'residential'}, {"type": "LiteralStr", "value": u'public safety'}, {"type": "LiteralStr", "value": u'conservation and development'}, {"type": "LiteralStr", "value": u'commercial'}, {"type": "LiteralStr", "value": u'water supply'}, {"type": "LiteralStr", "value": u'health care'}, {"type": "LiteralStr", "value": u'sewage and waste disposal'}, {"type": "LiteralStr", "value": u'communication'}, {"type": "LiteralStr", "value": u'manufacturing'}, {"type": "LiteralStr", "value": u'religious'}, {"type": "LiteralStr", "value": u'highway and street'}], "values": [
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
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'lodging'}, {"type": "LiteralStr", "value": u'educational'}, {"type": "LiteralStr", "value": u'total construction'}, {"type": "LiteralStr", "value": u'transportation'}, {"type": "LiteralStr", "value": u'power'}, {"type": "LiteralStr", "value": u'office'}, {"type": "LiteralStr", "value": u'nonresidential'}, {"type": "LiteralStr", "value": u'amusement and recreation'}, {"type": "LiteralStr", "value": u'residential'}, {"type": "LiteralStr", "value": u'public safety'}, {"type": "LiteralStr", "value": u'conservation and development'}, {"type": "LiteralStr", "value": u'commercial'}, {"type": "LiteralStr", "value": u'water supply'}, {"type": "LiteralStr", "value": u'health care'}, {"type": "LiteralStr", "value": u'sewage and waste disposal'}, {"type": "LiteralStr", "value": u'communication'}, {"type": "LiteralStr", "value": u'manufacturing'}, {"type": "LiteralStr", "value": u'religious'}, {"type": "LiteralStr", "value": u'highway and street'}], "values": [
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
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'combined'}, {"type": "LiteralStr", "value": u'private'}, {"type": "LiteralStr", "value": u'public'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'lodging'}, {"type": "LiteralStr", "value": u'educational'}, {"type": "LiteralStr", "value": u'total construction'}, {"type": "LiteralStr", "value": u'transportation'}, {"type": "LiteralStr", "value": u'power'}, {"type": "LiteralStr", "value": u'office'}, {"type": "LiteralStr", "value": u'nonresidential'}, {"type": "LiteralStr", "value": u'amusement and recreation'}, {"type": "LiteralStr", "value": u'residential'}, {"type": "LiteralStr", "value": u'public safety'}, {"type": "LiteralStr", "value": u'conservation and development'}, {"type": "LiteralStr", "value": u'commercial'}, {"type": "LiteralStr", "value": u'water supply'}, {"type": "LiteralStr", "value": u'health care'}, {"type": "LiteralStr", "value": u'sewage and waste disposal'}, {"type": "LiteralStr", "value": u'communication'}, {"type": "LiteralStr", "value": u'manufacturing'}, {"type": "LiteralStr", "value": u'religious'}, {"type": "LiteralStr", "value": u'highway and street'}], "values": [
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
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'lodging'}, {"type": "LiteralStr", "value": u'educational'}, {"type": "LiteralStr", "value": u'total construction'}, {"type": "LiteralStr", "value": u'transportation'}, {"type": "LiteralStr", "value": u'power'}, {"type": "LiteralStr", "value": u'office'}, {"type": "LiteralStr", "value": u'nonresidential'}, {"type": "LiteralStr", "value": u'amusement and recreation'}, {"type": "LiteralStr", "value": u'residential'}, {"type": "LiteralStr", "value": u'public safety'}, {"type": "LiteralStr", "value": u'conservation and development'}, {"type": "LiteralStr", "value": u'commercial'}, {"type": "LiteralStr", "value": u'water supply'}, {"type": "LiteralStr", "value": u'health care'}, {"type": "LiteralStr", "value": u'sewage and waste disposal'}, {"type": "LiteralStr", "value": u'communication'}, {"type": "LiteralStr", "value": u'manufacturing'}, {"type": "LiteralStr", "value": u'religious'}, {"type": "LiteralStr", "value": u'highway and street'}], "values": [
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
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'lodging'}, {"type": "LiteralStr", "value": u'educational'}, {"type": "LiteralStr", "value": u'total construction'}, {"type": "LiteralStr", "value": u'transportation'}, {"type": "LiteralStr", "value": u'power'}, {"type": "LiteralStr", "value": u'office'}, {"type": "LiteralStr", "value": u'nonresidential'}, {"type": "LiteralStr", "value": u'amusement and recreation'}, {"type": "LiteralStr", "value": u'residential'}, {"type": "LiteralStr", "value": u'public safety'}, {"type": "LiteralStr", "value": u'conservation and development'}, {"type": "LiteralStr", "value": u'commercial'}, {"type": "LiteralStr", "value": u'water supply'}, {"type": "LiteralStr", "value": u'health care'}, {"type": "LiteralStr", "value": u'sewage and waste disposal'}, {"type": "LiteralStr", "value": u'communication'}, {"type": "LiteralStr", "value": u'manufacturing'}, {"type": "LiteralStr", "value": u'religious'}, {"type": "LiteralStr", "value": u'highway and street'}], "values": [
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
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'month name'}, {"type": "LiteralStr", "value": u'month'}, {"type": "LiteralStr", "value": u'index'}, {"type": "LiteralStr", "value": u'period'}, {"type": "LiteralStr", "value": u'year'}], "values": [
					{"type": "StrType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "StrType"}, 
					{"type": "NumType"}]}]}},
                }
            
            }
        });
    });

    return mod;
}