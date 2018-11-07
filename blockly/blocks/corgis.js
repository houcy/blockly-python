/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview CORGIS big data blocks for Blockly.
 * @author acbart@vt.edu (Austin Cory Bart)
 */
'use strict';

goog.provide('Blockly.Blocks.corgis');

goog.require('Blockly.Blocks');

var WEATHER_HUE = 70,
    QUAKES_HUE = 60,
    STOCKS_HUE = 65,
    CRIME_HUE = 55,
    BOOKS_HUE = 50;

/*
 * Weather Data
 */
var CITIES = [['Blacksburg, VA', 'Blacksburg, VA'],
              ['Seattle, WA', 'Seattle, WA'],
              ['Miami, FL', 'Miami, FL'],
              ['San Jose, CA', 'San Jose, CA'],
              ['New York, NY', 'New York, NY']];

Blockly.Blocks['weather_temperature'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(WEATHER_HUE);
    this.appendDummyInput()
        .appendField("get temperature in")
        .appendField(new Blockly.FieldDropdown(CITIES), 'CITY');
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setTooltip('Returns a single temperature (number)');
  }
};

Blockly.Blocks['weather_forecasts'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(WEATHER_HUE);
    this.appendDummyInput()
        .appendField("get forecasted temperatures in")
        .appendField(new Blockly.FieldDropdown(CITIES), 'CITY');
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns a list of forecasted temperatures (list of number)');
  }
};

Blockly.Blocks['weather_highs_lows'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(WEATHER_HUE);
    this.appendDummyInput()
        .appendField("get highs and lows in")
        .appendField(new Blockly.FieldDropdown(CITIES), 'CITY');
    this.setInputsInline(false);
    this.setOutput(true, "dict");
    this.setTooltip('Returns a list of forecasted temperature highs and lows (dict of lists of numbers)');
  }
};

Blockly.Blocks['weather_report_forecasts'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(WEATHER_HUE);
    this.appendDummyInput()
        .appendField("get forecasted weather in")
        .appendField(new Blockly.FieldDropdown(CITIES), 'CITY');
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns a list of forecasted weather reports (list of dicts)');
  }
};

Blockly.Blocks['weather_report'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(WEATHER_HUE);
    this.appendDummyInput()
        .appendField("get weather in")
        .appendField(new Blockly.FieldDropdown(CITIES), 'CITY');
    this.setInputsInline(false);
    this.setOutput(true, "dict");
    this.setTooltip('Returns a weather report (dictionary)');
  }
};

Blockly.Blocks['weather_all_forecasts'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(WEATHER_HUE);
    this.appendDummyInput()
        .appendField("get all forecasted temperatures");
    this.setInputsInline(false);
    this.setOutput(true, "dict");
    this.setTooltip('Returns a list of dictionaries of forecasts and cities');
  }
};

/*
 * Stocks Data
 */
var COMPANIES = [['Facebook', 'FB'],
                 ['Apple', 'AAPL'],
                 ['Microsoft', 'MSFT'],
                 ['Google', 'GOOG']]

Blockly.Blocks['stocks_current'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(STOCKS_HUE);
    this.appendDummyInput()
        .appendField("get current stock of")
        .appendField(new Blockly.FieldDropdown(COMPANIES), 'TICKER');
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setTooltip('Returns a single stock change value (number)');
  }
};

Blockly.Blocks['stocks_past'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(STOCKS_HUE);
    this.appendDummyInput()
        .appendField("get past stock changes of")
        .appendField(new Blockly.FieldDropdown(COMPANIES), 'TICKER');
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns a list of the previous stock values');
  }
};

/*
 * Earthquake Data
 */
var EARTHQUAKES = [['magnitude', 'magnitude'],
                   ['depth', 'depth']]

Blockly.Blocks['earthquake_get'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(QUAKES_HUE);
    this.appendDummyInput()
        .appendField("get recent earthquakes'")
        .appendField(new Blockly.FieldDropdown(EARTHQUAKES), 'PROPERTY');
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns a property of an earthquake');
  }
};

Blockly.Blocks['earthquake_both'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(QUAKES_HUE);
    this.appendDummyInput()
        .appendField("get earthquakes magnitude and depth'");
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns magnitude and depth of multiple earthquakes');
  }
};

Blockly.Blocks['earthquake_all'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(QUAKES_HUE);
    this.appendDummyInput()
        .appendField("get complete earthquakes report'");
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns all properties of multiple earthquakes');
  }
};

/*
 * Crime Data
 */

var YEARS = [];
for (var i = 1960; i <= 2012; i+= 5) {
    YEARS.push([''+i, ''+i]);
}
var STATES = [['Alaska', 'alaska'], ['California', 'california'],
              ['Delaware', 'delaware'], ['Florida', 'florida'],
              ['Maryland', 'maryland'], ['Nevada', 'nevada'],
              ['New Jersey', 'new jersey'], ['New York', 'new york'],
              ['Pennsylvania', 'pennsylvania'], ['Texas', 'texas'],
              ['Virginia', 'virginia']];
Blockly.Blocks['crime_state'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(CRIME_HUE);
    this.appendDummyInput()
        .appendField("get")
        .appendField(new Blockly.FieldDropdown([['property', 'property'],
                                                ['violent', 'violent'],
                                                ['both kinds', 'both']]), 'TYPE')
        .appendField("crime rates in")
        .appendField(new Blockly.FieldDropdown(STATES), 'STATE');
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns all of the crime rates in the those states since 1960');
  }
};

Blockly.Blocks['crime_year'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(CRIME_HUE);
    this.appendDummyInput()
        .appendField("get crime rates in")
        .appendField(new Blockly.FieldDropdown(YEARS), 'YEAR');
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns all of the crime rates reports for the given year by state');
  }
};

Blockly.Blocks['crime_all'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(CRIME_HUE);
    this.appendDummyInput()
        .appendField("get all crime reports");
    this.setInputsInline(false);
    this.setOutput(true, "dict");
    this.setTooltip('Returns all of the crime rates reports');
  }
};

/*
 * Book Data
 */
Blockly.Blocks['books_get'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(BOOKS_HUE);
    this.appendDummyInput()
        .appendField("get books");
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns a list of books (list of dict)');
  }
};


var airlines_INDEXES = [
    ["(None)", "(None)"],

    ["Code", "Code"] ,
    ["Label", "Label"]
];

var airlines_INDEX_VALUES = {
    "(None)": [],

    "Code": [

        ["ATL", "ATL"] ,
        ["BOS", "BOS"] ,
        ["BWI", "BWI"] ,
        ["CLT", "CLT"] ,
        ["DCA", "DCA"] ,
        ["DEN", "DEN"] ,
        ["DFW", "DFW"] ,
        ["DTW", "DTW"] ,
        ["EWR", "EWR"] ,
        ["FLL", "FLL"] ,
        ["IAD", "IAD"] ,
        ["IAH", "IAH"] ,
        ["JFK", "JFK"] ,
        ["LAS", "LAS"] ,
        ["LAX", "LAX"] ,
        ["LGA", "LGA"] ,
        ["MCO", "MCO"] ,
        ["MDW", "MDW"] ,
        ["MIA", "MIA"] ,
        ["MSP", "MSP"] ,
        ["ORD", "ORD"] ,
        ["PDX", "PDX"] ,
        ["PHL", "PHL"] ,
        ["PHX", "PHX"] ,
        ["SAN", "SAN"] ,
        ["SEA", "SEA"] ,
        ["SFO", "SFO"] ,
        ["SLC", "SLC"] ,
        ["TPA", "TPA"]
    ],
    "Label": [

        ["2003/06", "2003/06"] ,
        ["2003/07", "2003/07"] ,
        ["2003/08", "2003/08"] ,
        ["2003/09", "2003/09"] ,
        ["2003/10", "2003/10"] ,
        ["2003/11", "2003/11"] ,
        ["2003/12", "2003/12"] ,
        ["2004/01", "2004/01"] ,
        ["2004/02", "2004/02"] ,
        ["2004/03", "2004/03"] ,
        ["2004/04", "2004/04"] ,
        ["2004/05", "2004/05"] ,
        ["2004/06", "2004/06"] ,
        ["2004/07", "2004/07"] ,
        ["2004/08", "2004/08"] ,
        ["2004/09", "2004/09"] ,
        ["2004/10", "2004/10"] ,
        ["2004/11", "2004/11"] ,
        ["2004/12", "2004/12"] ,
        ["2005/01", "2005/01"] ,
        ["2005/02", "2005/02"] ,
        ["2005/03", "2005/03"] ,
        ["2005/04", "2005/04"] ,
        ["2005/05", "2005/05"] ,
        ["2005/06", "2005/06"] ,
        ["2005/07", "2005/07"] ,
        ["2005/08", "2005/08"] ,
        ["2005/09", "2005/09"] ,
        ["2005/10", "2005/10"] ,
        ["2005/11", "2005/11"] ,
        ["2005/12", "2005/12"] ,
        ["2006/01", "2006/01"] ,
        ["2006/02", "2006/02"] ,
        ["2006/03", "2006/03"] ,
        ["2006/04", "2006/04"] ,
        ["2006/05", "2006/05"] ,
        ["2006/06", "2006/06"] ,
        ["2006/07", "2006/07"] ,
        ["2006/08", "2006/08"] ,
        ["2006/09", "2006/09"] ,
        ["2006/10", "2006/10"] ,
        ["2006/11", "2006/11"] ,
        ["2006/12", "2006/12"] ,
        ["2007/01", "2007/01"] ,
        ["2007/02", "2007/02"] ,
        ["2007/03", "2007/03"] ,
        ["2007/04", "2007/04"] ,
        ["2007/05", "2007/05"] ,
        ["2007/06", "2007/06"] ,
        ["2007/07", "2007/07"] ,
        ["2007/08", "2007/08"] ,
        ["2007/09", "2007/09"] ,
        ["2007/10", "2007/10"] ,
        ["2007/11", "2007/11"] ,
        ["2007/12", "2007/12"] ,
        ["2008/01", "2008/01"] ,
        ["2008/02", "2008/02"] ,
        ["2008/03", "2008/03"] ,
        ["2008/04", "2008/04"] ,
        ["2008/05", "2008/05"] ,
        ["2008/06", "2008/06"] ,
        ["2008/07", "2008/07"] ,
        ["2008/08", "2008/08"] ,
        ["2008/09", "2008/09"] ,
        ["2008/10", "2008/10"] ,
        ["2008/11", "2008/11"] ,
        ["2008/12", "2008/12"] ,
        ["2009/01", "2009/01"] ,
        ["2009/02", "2009/02"] ,
        ["2009/03", "2009/03"] ,
        ["2009/04", "2009/04"] ,
        ["2009/05", "2009/05"] ,
        ["2009/06", "2009/06"] ,
        ["2009/07", "2009/07"] ,
        ["2009/08", "2009/08"] ,
        ["2009/09", "2009/09"] ,
        ["2009/10", "2009/10"] ,
        ["2009/11", "2009/11"] ,
        ["2009/12", "2009/12"] ,
        ["2010/01", "2010/01"] ,
        ["2010/02", "2010/02"] ,
        ["2010/03", "2010/03"] ,
        ["2010/04", "2010/04"] ,
        ["2010/05", "2010/05"] ,
        ["2010/06", "2010/06"] ,
        ["2010/07", "2010/07"] ,
        ["2010/08", "2010/08"] ,
        ["2010/09", "2010/09"] ,
        ["2010/10", "2010/10"] ,
        ["2010/11", "2010/11"] ,
        ["2010/12", "2010/12"] ,
        ["2011/01", "2011/01"] ,
        ["2011/02", "2011/02"] ,
        ["2011/03", "2011/03"] ,
        ["2011/04", "2011/04"] ,
        ["2011/05", "2011/05"] ,
        ["2011/06", "2011/06"] ,
        ["2011/07", "2011/07"] ,
        ["2011/08", "2011/08"] ,
        ["2011/09", "2011/09"] ,
        ["2011/10", "2011/10"] ,
        ["2011/11", "2011/11"] ,
        ["2011/12", "2011/12"] ,
        ["2012/01", "2012/01"] ,
        ["2012/02", "2012/02"] ,
        ["2012/03", "2012/03"] ,
        ["2012/04", "2012/04"] ,
        ["2012/05", "2012/05"] ,
        ["2012/06", "2012/06"] ,
        ["2012/07", "2012/07"] ,
        ["2012/08", "2012/08"] ,
        ["2012/09", "2012/09"] ,
        ["2012/10", "2012/10"] ,
        ["2012/11", "2012/11"] ,
        ["2012/12", "2012/12"] ,
        ["2013/01", "2013/01"] ,
        ["2013/02", "2013/02"] ,
        ["2013/03", "2013/03"] ,
        ["2013/04", "2013/04"] ,
        ["2013/05", "2013/05"] ,
        ["2013/06", "2013/06"] ,
        ["2013/07", "2013/07"] ,
        ["2013/08", "2013/08"] ,
        ["2013/09", "2013/09"] ,
        ["2013/10", "2013/10"] ,
        ["2013/11", "2013/11"] ,
        ["2013/12", "2013/12"] ,
        ["2014/01", "2014/01"] ,
        ["2014/02", "2014/02"] ,
        ["2014/03", "2014/03"] ,
        ["2014/04", "2014/04"] ,
        ["2014/05", "2014/05"] ,
        ["2014/06", "2014/06"] ,
        ["2014/07", "2014/07"] ,
        ["2014/08", "2014/08"] ,
        ["2014/09", "2014/09"] ,
        ["2014/10", "2014/10"] ,
        ["2014/11", "2014/11"] ,
        ["2014/12", "2014/12"] ,
        ["2015/01", "2015/01"] ,
        ["2015/02", "2015/02"] ,
        ["2015/03", "2015/03"] ,
        ["2015/04", "2015/04"] ,
        ["2015/05", "2015/05"] ,
        ["2015/06", "2015/06"] ,
        ["2015/07", "2015/07"] ,
        ["2015/08", "2015/08"] ,
        ["2015/09", "2015/09"] ,
        ["2015/10", "2015/10"] ,
        ["2015/11", "2015/11"] ,
        ["2015/12", "2015/12"] ,
        ["2016/01", "2016/01"]
    ]
}

var airlines_PROPERTIES = [
    ["Code", "Code"] ,
    ["Name", "Name"] ,
    ["# of Delays.Carrier", "# of Delays.Carrier"] ,
    ["# of Delays.Late Aircraft", "# of Delays.Late Aircraft"] ,
    ["# of Delays.National Aviation System", "# of Delays.National Aviation System"] ,
    ["# of Delays.Security", "# of Delays.Security"] ,
    ["# of Delays.Weather", "# of Delays.Weather"] ,
    ["Carriers.Total", "Carriers.Total"] ,
    ["Cancelled", "Cancelled"] ,
    ["Delayed", "Delayed"] ,
    ["Diverted", "Diverted"] ,
    ["On Time", "On Time"] ,
    ["Flights.Total", "Flights.Total"] ,
    ["Minutes Delayed.Carrier", "Minutes Delayed.Carrier"] ,
    ["Minutes Delayed.Late Aircraft", "Minutes Delayed.Late Aircraft"] ,
    ["Minutes Delayed.National Aviation System", "Minutes Delayed.National Aviation System"] ,
    ["Minutes Delayed.Security", "Minutes Delayed.Security"] ,
    ["Minutes Delayed.Total", "Minutes Delayed.Total"] ,
    ["Minutes Delayed.Weather", "Minutes Delayed.Weather"] ,
    ["Label", "Label"] ,
    ["Month", "Month"] ,
    ["Month Name", "Month Name"] ,
    ["Year", "Year"]
]

Blockly.Blocks['airlines_get'] = {
  init: function() {
    this.setColour(WEATHER_HUE);
    this.appendDummyInput('MAIN')
        .appendField("airlines.get")
        .appendField(new Blockly.FieldDropdown(airlines_PROPERTIES), "PROPERTY");
    this.appendDummyInput('SECOND')
        .appendField("filter")
        .appendField(new Blockly.FieldDropdown(airlines_INDEXES, function(option) {
                        this.sourceBlock_.updateShape_(option);
                    }), "INDEX")
    this.updateShape_("(None)");
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setTooltip('Returns a list of Airlines data.');
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('index', this.getFieldValue('INDEX'));
    container.setAttribute('index_value', this.getFieldValue('INDEX_VALUE'));
    container.setAttribute('module', "airlines")
    return container;
  },
  domToMutation: function(xmlElement) {
    var index = xmlElement.getAttribute('index');
    var index_value = xmlElement.getAttribute('index_value');
    this.updateShape_(index, index_value);
  },
  updateShape_: function(index, index_value) {
    var inputGroup = this.getInput('SECOND')
    var fieldExists = this.getField('INDEX_VALUE');
    if (fieldExists) {
        inputGroup.removeField('INDEX_VALUE');
    }
    this.setFieldValue(index, 'INDEX');
    if (index != undefined && index != '(None)') {
        inputGroup.appendField(new Blockly.FieldDropdown(airlines_INDEX_VALUES[index]), 'INDEX_VALUE')
        if (index_value != undefined) {
            this.setFieldValue(index_value, 'INDEX_VALUE');
        } else {
            this.setFieldValue(airlines_INDEX_VALUES[index][0][0], 'INDEX_VALUE');
        }
    }
  }
};

