#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "labor.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out time)
    (struct-out employment-population-ratio)
    (struct-out participation-rate)
    (struct-out counts)
    (struct-out black-or-african-american)
    (struct-out counts)
    (struct-out asian)
    (struct-out counts)
    (struct-out unemployment-rate)
    (struct-out counts)
    (struct-out participation-rate)
    (struct-out white)
    (struct-out result)
    (struct-out unemployment-rate)
    (struct-out data)
    (struct-out employment-population-ratio)
    (struct-out black-or-african-american)
    (struct-out counts)
    (struct-out asian)
    (struct-out civilian-labor-force)
    (struct-out black-or-african-american)
    (struct-out civilian-noninstitutional-population)
    (struct-out not-in-labor-force)
    (struct-out employed)
    (struct-out white)
    (struct-out white)
    (struct-out counts)
    (struct-out unemployed)
    (struct-out asian)
    get-results
    main)

; Define the structs
(define-struct time
    (month-name month year))

(define-struct employment-population-ratio
    (all men women))

(define-struct participation-rate
    (all men women))

(define-struct counts
    (all men women))

(define-struct black-or-african-american
    (counts employment-population-ratio))

(define-struct counts
    (all men women))

(define-struct asian
    (participation-rate counts))

(define-struct counts
    (all men women))

(define-struct unemployment-rate
    (all men women))

(define-struct counts
    (all men women))

(define-struct participation-rate
    (all men women))

(define-struct white
    (counts unemployment-rate))

(define-struct result
    (data time))

(define-struct unemployment-rate
    (all men women))

(define-struct data
    (civilian-noninstitutional-population not-in-labor-force unemployed civilian-labor-force employed))

(define-struct employment-population-ratio
    (all men women))

(define-struct black-or-african-american
    (participation-rate counts))

(define-struct counts
    (all men women))

(define-struct asian
    (counts unemployment-rate))

(define-struct civilian-labor-force
    (white black-or-african-american asian))

(define-struct black-or-african-american
    (counts unemployment-rate))

(define-struct civilian-noninstitutional-population
    (white black-or-african-american asian))

(define-struct not-in-labor-force
    (white black-or-african-american asian))

(define-struct employed
    (white black-or-african-american asian))

(define-struct white
    (counts employment-population-ratio))

(define-struct white
    (participation-rate counts))

(define-struct counts
    (all men women))

(define-struct unemployed
    (white black-or-african-american asian))

(define-struct asian
    (counts unemployment-rate))



; Define the JSON->Struct mappers
(define (json->time jdata)
    (make-time
        (hash-ref jdata (string->symbol "Month Name"))
            (hash-ref jdata (string->symbol "Month"))
            (hash-ref jdata (string->symbol "Year"))
            ))

(define (json->employment-population-ratio jdata)
    (make-employment-population-ratio
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->participation-rate jdata)
    (make-participation-rate
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->counts jdata)
    (make-counts
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->black-or-african-american jdata)
    (make-black-or-african-american
        (json->counts (hash-ref jdata (string->symbol "Counts")))
                (json->employment-population-ratio (hash-ref jdata (string->symbol "Employment-Population Ratio")))
                ))

(define (json->counts jdata)
    (make-counts
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->asian jdata)
    (make-asian
        (hash-ref jdata (string->symbol "Participation Rate"))
            (hash-ref jdata (string->symbol "Counts"))
            ))

(define (json->counts jdata)
    (make-counts
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->unemployment-rate jdata)
    (make-unemployment-rate
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->counts jdata)
    (make-counts
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->participation-rate jdata)
    (make-participation-rate
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->white jdata)
    (make-white
        (json->counts (hash-ref jdata (string->symbol "Counts")))
                (json->unemployment-rate (hash-ref jdata (string->symbol "Unemployment Rate")))
                ))

(define (json->result jdata)
    (make-result
        (json->data (hash-ref jdata (string->symbol "Data")))
                (json->time (hash-ref jdata (string->symbol "Time")))
                ))

(define (json->unemployment-rate jdata)
    (make-unemployment-rate
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->data jdata)
    (make-data
        (json->civilian-noninstitutional-population (hash-ref jdata (string->symbol "Civilian Noninstitutional Population")))
                (json->not-in-labor-force (hash-ref jdata (string->symbol "Not In Labor Force")))
                (json->unemployed (hash-ref jdata (string->symbol "Unemployed")))
                (json->civilian-labor-force (hash-ref jdata (string->symbol "Civilian Labor Force")))
                (json->employed (hash-ref jdata (string->symbol "Employed")))
                ))

(define (json->employment-population-ratio jdata)
    (make-employment-population-ratio
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->black-or-african-american jdata)
    (make-black-or-african-american
        (json->participation-rate (hash-ref jdata (string->symbol "Participation Rate")))
                (json->counts (hash-ref jdata (string->symbol "Counts")))
                ))

(define (json->counts jdata)
    (make-counts
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->asian jdata)
    (make-asian
        (hash-ref jdata (string->symbol "Counts"))
            (hash-ref jdata (string->symbol "Unemployment Rate"))
            ))

(define (json->civilian-labor-force jdata)
    (make-civilian-labor-force
        (json->white (hash-ref jdata (string->symbol "White")))
                (json->black-or-african-american (hash-ref jdata (string->symbol "Black or African American")))
                (json->asian (hash-ref jdata (string->symbol "Asian")))
                ))

(define (json->black-or-african-american jdata)
    (make-black-or-african-american
        (json->counts (hash-ref jdata (string->symbol "Counts")))
                (json->unemployment-rate (hash-ref jdata (string->symbol "Unemployment Rate")))
                ))

(define (json->civilian-noninstitutional-population jdata)
    (make-civilian-noninstitutional-population
        (hash-ref jdata (string->symbol "White"))
            (hash-ref jdata (string->symbol "Black or African American"))
            (hash-ref jdata (string->symbol "Asian"))
            ))

(define (json->not-in-labor-force jdata)
    (make-not-in-labor-force
        (hash-ref jdata (string->symbol "White"))
            (hash-ref jdata (string->symbol "Black or African American"))
            (hash-ref jdata (string->symbol "Asian"))
            ))

(define (json->employed jdata)
    (make-employed
        (json->white (hash-ref jdata (string->symbol "White")))
                (json->black-or-african-american (hash-ref jdata (string->symbol "Black or African American")))
                (json->asian (hash-ref jdata (string->symbol "Asian")))
                ))

(define (json->white jdata)
    (make-white
        (json->counts (hash-ref jdata (string->symbol "Counts")))
                (json->employment-population-ratio (hash-ref jdata (string->symbol "Employment-Population Ratio")))
                ))

(define (json->white jdata)
    (make-white
        (json->participation-rate (hash-ref jdata (string->symbol "Participation Rate")))
                (json->counts (hash-ref jdata (string->symbol "Counts")))
                ))

(define (json->counts jdata)
    (make-counts
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Men"))
            (hash-ref jdata (string->symbol "Women"))
            ))

(define (json->unemployed jdata)
    (make-unemployed
        (json->white (hash-ref jdata (string->symbol "White")))
                (json->black-or-african-american (hash-ref jdata (string->symbol "Black or African American")))
                (json->asian (hash-ref jdata (string->symbol "Asian")))
                ))

(define (json->asian jdata)
    (make-asian
        (hash-ref jdata (string->symbol "Counts"))
            (hash-ref jdata (string->symbol "Unemployment Rate"))
            ))



; Define the services, and their helpers

(define (get-results ) 
(let* [(result (query-list database 
                                   "SELECT data FROM labor"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->result result)
           )
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-results")
    (displayln (length (time (get-results ))))
    
    

    )