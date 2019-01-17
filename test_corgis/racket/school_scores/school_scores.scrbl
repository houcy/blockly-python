#lang scribble/manual
 
@title{ school-scores }
@author{+email "Austin Cory Bart (<a href="mailto:acbart@vt.edu">acbart@vt.edu</a>)" ""}

@section{Structs}
 
{'overview': 'SAT Scores from across the country\n', 'short': 'SAT scores for students across the United States, organized by year and state.', 'citation': "<a href='https://nces.ed.gov/ccd/aboutCCD.asp'>https://nces.ed.gov/ccd/aboutCCD.asp</a>"}



@section{Functions}

@defproc[(disconnect-school-scores ) void]{
        Establishes that data will be retrieved locally.
        @itemlist[
            @item{@racket[filename] --- A cache file to use. Defaults to @racket{"cache.json"}.
		]}

@defproc[(disconnect-school-scores ) void]{
        Establishes that data will be accessed online.
        @itemlist[]}

