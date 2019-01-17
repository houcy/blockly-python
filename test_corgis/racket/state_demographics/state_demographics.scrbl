#lang scribble/manual
 
@title{ state-demographics }
@author{+email "Ryan Whitcomb" ""}

@section{Structs}
 
{'overview': 'The following data set is summarized information obtained about states in the United States from 2007 through 2014 through the United States Census Bureau. However, this data is not available for these years; just the summarized data as of 2015. Information described in the data includes the age distributions, the education levels, employment statistics, ethnicity percents, houseold information, income, and other miscellneous statistics.\n', 'short': 'Demographic information for the states in the United States.', 'citation': 'http://www.census.gov/quickfacts/table/PST045215/00'}



@section{Functions}

@defproc[(disconnect-state-demographics ) void]{
        Establishes that data will be retrieved locally.
        @itemlist[
            @item{@racket[filename] --- A cache file to use. Defaults to @racket{"cache.json"}.
		]}

@defproc[(disconnect-state-demographics ) void]{
        Establishes that data will be accessed online.
        @itemlist[]}

