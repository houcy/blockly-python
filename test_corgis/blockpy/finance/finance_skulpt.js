

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
        var dataset = _IMPORTED_DATASETS["finance"];
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
    
    
    mod.get_finances = new Sk.builtin.func(function() {
        Sk.builtin.pyCheckArgs("get_finances", arguments, 0, 0);
        if (!("finance" in _IMPORTED_COMPLETE_DATASETS)) {
            alert("This library has not finished loading yet. Please wait about 10 seconds and try again.")
        } else {
            return _IMPORTED_COMPLETE_DATASETS["finance"];
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
            
                'get_finances': {
                    "type": "FunctionType", 
                    "name": 'get_finances',
                    "returns": 
		{"type": "ListType", "subtype": 
			{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'State'}, {"type": "LiteralStr", "value": u'Totals'}, {"type": "LiteralStr", "value": u'Details'}, {"type": "LiteralStr", "value": u'Year'}], "values": [
				{"type": "StrType"}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Insurance trust  revenue'}, {"type": "LiteralStr", "value": u'Capital outlay'}, {"type": "LiteralStr", "value": u'State intergovernmental'}, {"type": "LiteralStr", "value": u'Miscellaneous'}, {"type": "LiteralStr", "value": u'Charges'}, {"type": "LiteralStr", "value": u'Construction'}, {"type": "LiteralStr", "value": u'Expenditure'}, {"type": "LiteralStr", "value": u'General revenue'}, {"type": "LiteralStr", "value": u'Miscellaneous commercial activity'}, {"type": "LiteralStr", "value": u'Other insurance trust revenue'}, {"type": "LiteralStr", "value": u"Worker's comp revenue"}, {"type": "LiteralStr", "value": u'Equipment and land'}, {"type": "LiteralStr", "value": u'Unemployment comp revenue'}, {"type": "LiteralStr", "value": u'Selective sales tax'}, {"type": "LiteralStr", "value": u'Sales tax'}, {"type": "LiteralStr", "value": u'License tax'}, {"type": "LiteralStr", "value": u'Federal intergovernmental'}, {"type": "LiteralStr", "value": u'General expenditure'}, {"type": "LiteralStr", "value": u'Utility revenue'}, {"type": "LiteralStr", "value": u'Revenue'}, {"type": "LiteralStr", "value": u'Tax'}, {"type": "LiteralStr", "value": u'Local intergovernmental'}, {"type": "LiteralStr", "value": u'Intergovernmental'}, {"type": "LiteralStr", "value": u'Employee retirement revenue'}], "values": [
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
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}, 
					{"type": "NumType"}]}, 
				{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Education'}, {"type": "LiteralStr", "value": u'Transportation'}, {"type": "LiteralStr", "value": u'Natural Resources'}, {"type": "LiteralStr", "value": u'Correction'}, {"type": "LiteralStr", "value": u'Utilities'}, {"type": "LiteralStr", "value": u'Health'}, {"type": "LiteralStr", "value": u'Public Welfare'}, {"type": "LiteralStr", "value": u'Financial Aid'}, {"type": "LiteralStr", "value": u'Welfare'}, {"type": "LiteralStr", "value": u'Waste'}, {"type": "LiteralStr", "value": u'Employment'}, {"type": "LiteralStr", "value": u'Intergovernmental'}, {"type": "LiteralStr", "value": u'Insurance Trust'}], "values": [
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Education-NEC Intergovernmental'}, {"type": "LiteralStr", "value": u'Education Equipment'}, {"type": "LiteralStr", "value": u'Edcation Assistance and Subsidies'}, {"type": "LiteralStr", "value": u'Education-NEC Expenditure Total'}, {"type": "LiteralStr", "value": u'Education Total'}, {"type": "LiteralStr", "value": u'Elementary Secondary Total Expenditure'}, {"type": "LiteralStr", "value": u'Education Equipment and Land'}, {"type": "LiteralStr", "value": u'Higher Education-NEC Total Expenditure'}, {"type": "LiteralStr", "value": u'Education Construction'}, {"type": "LiteralStr", "value": u'Elementary Secondary Intergovernmental'}, {"type": "LiteralStr", "value": u'Higher Education-NEC Intergovernmental'}, {"type": "LiteralStr", "value": u'Education Intergovernmental'}, {"type": "LiteralStr", "value": u'Higher Education-Auxilliary Total Expenditure'}, {"type": "LiteralStr", "value": u'Education Other Current Operation'}], "values": [
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
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Transit Subsidy Intergovernmental'}, {"type": "LiteralStr", "value": u'Airports'}, {"type": "LiteralStr", "value": u'Transit Subsidy Total Expenditure'}, {"type": "LiteralStr", "value": u'Highways'}, {"type": "LiteralStr", "value": u'Water Transport'}, {"type": "LiteralStr", "value": u'Parking'}], "values": [
						{"type": "NumType"}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Airports Intergovernmental'}, {"type": "LiteralStr", "value": u'Airports Total Expenditure'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "NumType"}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Regular Highways Intergovernmental'}, {"type": "LiteralStr", "value": u'Toll Highways Total Expenditure'}, {"type": "LiteralStr", "value": u'Highways Direct'}, {"type": "LiteralStr", "value": u'Highways Intergovernmental'}, {"type": "LiteralStr", "value": u'Highways Total Expenditure'}, {"type": "LiteralStr", "value": u'Highways Land and Equipment'}, {"type": "LiteralStr", "value": u'Highways Construction Total'}, {"type": "LiteralStr", "value": u'Regular Highways Total Expenditure'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Water Transport Intergovernmental'}, {"type": "LiteralStr", "value": u'Water Transport Total Expenditure'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Parking Total'}, {"type": "LiteralStr", "value": u'Parking Intergovernmental'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Fish and Game'}, {"type": "LiteralStr", "value": u'Natural Resources Total'}, {"type": "LiteralStr", "value": u'Natural Resources Intergovernmental'}, {"type": "LiteralStr", "value": u'Natural Resources NEC Total Expenditure'}, {"type": "LiteralStr", "value": u'Natural Resources Construction'}, {"type": "LiteralStr", "value": u'Parks'}, {"type": "LiteralStr", "value": u'Forestry'}, {"type": "LiteralStr", "value": u'Natural Resources Direct'}, {"type": "LiteralStr", "value": u'Natural Resources Equipment and Land'}, {"type": "LiteralStr", "value": u'Agriculture'}], "values": [
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Fish and Game Intergovernmental'}, {"type": "LiteralStr", "value": u'Fish and Game Total Expenditure'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Parks Total Expenditure'}, {"type": "LiteralStr", "value": u'Parks Intergovernmental'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Forestry Intergovernmental'}, {"type": "LiteralStr", "value": u'Forestry Total Expenditure'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Agriculture Intergovernmental'}, {"type": "LiteralStr", "value": u'Agriculture Total Expenditure'}, {"type": "LiteralStr", "value": u'Federal Agriculture Farm Income Intergovernmental'}, {"type": "LiteralStr", "value": u'Federal Agriculture Farm Income Total'}, {"type": "LiteralStr", "value": u'Federal Farm Credit Total'}, {"type": "LiteralStr", "value": u'Federal Farm Credit Intergovernmental'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Correction Intergovernmental'}, {"type": "LiteralStr", "value": u'Correction NEC Intergovernmental'}, {"type": "LiteralStr", "value": u'Correction NEC Total'}, {"type": "LiteralStr", "value": u'Correction Total'}, {"type": "LiteralStr", "value": u'Correction Institutions Total'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Water Utility Total Expenditure'}, {"type": "LiteralStr", "value": u'Gas Utility Total Expenditure'}, {"type": "LiteralStr", "value": u'Utilities Current Operation'}, {"type": "LiteralStr", "value": u'Utilities Total Expenditure'}, {"type": "LiteralStr", "value": u'Utilities Equipment and Land'}, {"type": "LiteralStr", "value": u'Utilities Construction'}, {"type": "LiteralStr", "value": u'Utilities Interest Total'}, {"type": "LiteralStr", "value": u'Transit Utility Total Expenditure'}, {"type": "LiteralStr", "value": u'Electric Utility Total Expenditure'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Health Total Expenditure'}, {"type": "LiteralStr", "value": u'Hospitals'}, {"type": "LiteralStr", "value": u'Health Intergovernmental'}], "values": [
						{"type": "NumType"}, 
						{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Own Hospitals Total Expenditure'}, {"type": "LiteralStr", "value": u'Hospital-Other Total Expenditure'}, {"type": "LiteralStr", "value": u'Hospitals Total Expenditure'}, {"type": "LiteralStr", "value": u'Hospitals Total Intergovernmental'}, {"type": "LiteralStr", "value": u'Hospitals Total Equipment and land'}, {"type": "LiteralStr", "value": u'Hospitals Total Construction'}, {"type": "LiteralStr", "value": u'Hospitals Total Current'}, {"type": "LiteralStr", "value": u'Hospital-Other Intergovernmental'}], "values": [
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}, 
							{"type": "NumType"}]}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Public Welfare Equipment and Land'}, {"type": "LiteralStr", "value": u'Public Welfare Intergovernmental'}, {"type": "LiteralStr", "value": u'Public Welfare Other Current Operation'}, {"type": "LiteralStr", "value": u'Public Welfare Direct Expenditure'}, {"type": "LiteralStr", "value": u'Public Welfare Construction'}, {"type": "LiteralStr", "value": u'Public Welfare Total Expenditure'}, {"type": "LiteralStr", "value": u'Public Welfare Assistance and Subsidies'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Federal Agency Securities Total'}, {"type": "LiteralStr", "value": u'Beginning Long Term Debt Total Outstanding'}, {"type": "LiteralStr", "value": u'Categorical Assistance Total Expenditure'}, {"type": "LiteralStr", "value": u'Cash Assistance Total Expenditure'}, {"type": "LiteralStr", "value": u'Categorical Assistance Intergovernmental'}, {"type": "LiteralStr", "value": u'Cash and Securities Total'}, {"type": "LiteralStr", "value": u'Assistance and Subsidies'}, {"type": "LiteralStr", "value": u'Cash Assistance Intergovernmental'}, {"type": "LiteralStr", "value": u'Borrowing Total'}, {"type": "LiteralStr", "value": u'Sinking Fund Total'}, {"type": "LiteralStr", "value": u'Securities Total'}, {"type": "LiteralStr", "value": u'Bond Fund Total'}, {"type": "LiteralStr", "value": u'Cash and Deposits Total'}], "values": [
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
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Welfare Institution Total Expenditure'}, {"type": "LiteralStr", "value": u'Welfare Vendor Payments Total'}, {"type": "LiteralStr", "value": u'Welfare NEC Total Expenditure'}, {"type": "LiteralStr", "value": u'Welfare NEC Intergovernmental'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Sewerage Total Expenditure'}, {"type": "LiteralStr", "value": u'Solid Waste Management Intergovernmental'}, {"type": "LiteralStr", "value": u'Sewerage Intergovernmental'}, {"type": "LiteralStr", "value": u'Solid Waste Management Total Expenditure'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Unemployment Comp Total Cash and Securities'}, {"type": "LiteralStr", "value": u'Employment Security Administration Expenditure Total'}, {"type": "LiteralStr", "value": u'Employee Retirement Total Cash and Securities'}, {"type": "LiteralStr", "value": u'Employment Security Administration Intergovernmental'}, {"type": "LiteralStr", "value": u'Employee Retirement Total Expenditure'}, {"type": "LiteralStr", "value": u'Unemployment Comp Total Expenditure'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}]}, 
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Intergovernmental to Combined and Unallocable'}, {"type": "LiteralStr", "value": u'Intergovernmental to Federal'}, {"type": "LiteralStr", "value": u'Intergovernmental to Municipalities'}, {"type": "LiteralStr", "value": u'Intergovernmental to Counties'}, {"type": "LiteralStr", "value": u'Intergovernmental to State'}, {"type": "LiteralStr", "value": u'Intergovernmental to Townships'}, {"type": "LiteralStr", "value": u'Intergovernmental to Special Districts'}, {"type": "LiteralStr", "value": u'Intergovernmental Expenditure'}, {"type": "LiteralStr", "value": u'Intergovernmental to Local'}, {"type": "LiteralStr", "value": u'Intergovernmental to School Districts'}], "values": [
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
					{"type": "DictType", "literals": [{"type": "LiteralStr", "value": u'Insurance Trust Other Securities'}, {"type": "LiteralStr", "value": u'Insurance Trust Cash and Deposits'}, {"type": "LiteralStr", "value": u'Insurance Trust State and Local Securities Total'}, {"type": "LiteralStr", "value": u'Insurance Trust Securities Total'}, {"type": "LiteralStr", "value": u'Insurance Trust Federal Agency Securities'}, {"type": "LiteralStr", "value": u'Insurance Trust Total Expenditure'}, {"type": "LiteralStr", "value": u'Insurance Trust'}, {"type": "LiteralStr", "value": u'Insurance Trust Cash and Securities'}, {"type": "LiteralStr", "value": u'Insurance Trust Federal Securities'}], "values": [
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
						{"type": "NumType"}, 
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