#lang scribble/manual
 
@title{ video-games }
@author{+email "Austin Cory Bart (<a href="mailto:acbart@vt.edu">acbart@vt.edu</a>)" ""}

@section{Structs}
 
{'overview': '<i>This dataset requires special permission to use.</i><br><br>\nOriginally collected by Dr. Joe Cox, this dataset has information about the sales and playtime of over a thousand video games released between 2004 and 2010. The playtime information was collected from crowd-sourced data on "How Long to Beat".<br><br>\nSome more information can be found <a href="https://researchportal.port.ac.uk/portal/en/publications/what-makes-a-blockbuster-video-game(a6d848fe-38ae-4584-8c95-a0f735ec9b4c).html">here</a>.\n', 'short': 'This library has data about video games, including their play time and sales.', 'citation': 'Cox, Joe. "What makes a blockbuster video game? An empirical analysis of US sales data." Managerial and Decision Economics 35.3 (2014): 189-198.\n'}



@section{Functions}

@defproc[(disconnect-video-games ) void]{
        Establishes that data will be retrieved locally.
        @itemlist[
            @item{@racket[filename] --- A cache file to use. Defaults to @racket{"cache.json"}.
		]}

@defproc[(disconnect-video-games ) void]{
        Establishes that data will be accessed online.
        @itemlist[]}

