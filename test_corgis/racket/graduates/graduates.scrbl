#lang scribble/manual
 
@title{ graduates }
@author{+email "Austin Cory Bart (<a href="mailto:acbart@vt.edu">acbart@vt.edu</a>)" ""}

@section{Structs}
 
{'overview': 'The data in this library comes from the National Survey of Recent College Graduates.  Included is information about employment numbers, major information, and the earnings of different majors. Many majors were not available before 2010, so their values have been recorded as 0 (note that this may affect the averages shown in the bar charts).\n', 'short': 'This library holds data about employment of new graduates by major.', 'citation': 'https://www.nsf.gov/statistics/srvyrecentgrads/'}



@section{Functions}

@defproc[(disconnect-graduates ) void]{
        Establishes that data will be retrieved locally.
        @itemlist[
            @item{@racket[filename] --- A cache file to use. Defaults to @racket{"cache.json"}.
		]}

@defproc[(disconnect-graduates ) void]{
        Establishes that data will be accessed online.
        @itemlist[]}

