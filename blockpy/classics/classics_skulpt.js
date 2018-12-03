

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
        var dataset = _IMPORTED_DATASETS["classics"];
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
    
    
    mod.get_books = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_books", arguments, 0, 0);
        if (!("classics" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["classics"];
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
            
                'get_books': {
                    "type": "FunctionType", 
                    "name": 'get_books',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'metrics'}, {"type": "LiteralStr", "value": u'bibliography'}, {"type": "LiteralStr", "value": u'metadata'}], "values": [
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'difficulty'}, {"type": "LiteralStr", "value": u'statistics'}, {"type": "LiteralStr", "value": u'sentiments'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'flesch reading ease'}, {"type": "LiteralStr", "value": u'automated readability index'}, {"type": "LiteralStr", "value": u'coleman liau index'}, {"type": "LiteralStr", "value": u'gunning fog'}, {"type": "LiteralStr", "value": u'linsear write formula'}, {"type": "LiteralStr", "value": u'dale chall readability score'}, {"type": "LiteralStr", "value": u'flesch kincaid grade'}, {"type": "LiteralStr", "value": u'smog index'}, {"type": "LiteralStr", "value": u'difficult words'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'polysyllables'}, {"type": "LiteralStr", "value": u'characters'}, {"type": "LiteralStr", "value": u'average sentence length'}, {"type": "LiteralStr", "value": u'words'}, {"type": "LiteralStr", "value": u'sentences'}, {"type": "LiteralStr", "value": u'syllables'}, {"type": "LiteralStr", "value": u'average sentence per word'}, {"type": "LiteralStr", "value": u'average letter per word'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'polarity'}, {"type": "LiteralStr", "value": u'subjectivity'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}]}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'publication'}, {"type": "LiteralStr", "value": u'title'}, {"type": "LiteralStr", "value": u'author'}, {"type": "LiteralStr", "value": u'languages'}, {"type": "LiteralStr", "value": u'subjects'}, {"type": "LiteralStr", "value": u'congress classifications'}, {"type": "LiteralStr", "value": u'type'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'month name'}, {"type": "LiteralStr", "value": u'full'}, {"type": "LiteralStr", "value": u'year'}, {"type": "LiteralStr", "value": u'day'}, {"type": "LiteralStr", "value": u'month'}], "values": [
						{"type": "StrType"}, 
						{"type": "StrType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "StrType"}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'death'}, {"type": "LiteralStr", "value": u'name'}, {"type": "LiteralStr", "value": u'birth'}], "values": [
						{"type": "NumType"}, 
						{"type": "StrType"}, 
						{"type": "NumType"}]}, 
					{"type": "ListType", "subtype": 
						{"type": "StrType"}}, 
					{"type": "ListType", "subtype": 
						{"type": "StrType"}}, 
					{"type": "ListType", "subtype": 
						{"type": "StrType"}}, 
					{"type": "StrType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'url'}, {"type": "LiteralStr", "value": u'downloads'}, {"type": "LiteralStr", "value": u'id'}, {"type": "LiteralStr", "value": u'rank'}, {"type": "LiteralStr", "value": u'formats'}], "values": [
					{"type": "StrType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'total'}, {"type": "LiteralStr", "value": u'types'}], "values": [
						{"type": "NumType"}, 
						{"type": "ListType", "subtype": 
							{"type": "StrType"}}]}]}]}},
                }
            
            }
        });
    });

    return mod;
}