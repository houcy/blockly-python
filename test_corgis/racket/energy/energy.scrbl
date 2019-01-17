#lang scribble/manual
 
@title{ energy }
@author{+email "Austin Cory Bart (<a href="mailto:acbart@vt.edu">acbart@vt.edu</a>)" ""}

@section{Structs}
 
{'overview': 'United States Government reports on consumption, production, expenditures, and prices of various fuel sources. This data comes from the US Energy Information Administration, which has historical data from 1960 to 2014. Information was not always available, in which case 0 was reported instead. In some cases, very tiny values were rounded down to zero.\n', 'short': 'United States Government reports on consumption, production, import, and export of various fuel sources.', 'citation': 'http://www.eia.gov/tools/faqs/'}



@section{Functions}

@defproc[(disconnect-energy ) void]{
        Establishes that data will be retrieved locally.
        @itemlist[
            @item{@racket[filename] --- A cache file to use. Defaults to @racket{"cache.json"}.
		]}

@defproc[(disconnect-energy ) void]{
        Establishes that data will be accessed online.
        @itemlist[]}

