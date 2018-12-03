#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "broadway.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out date)
    (struct-out statistics)
    (struct-out production)
    (struct-out show)
    get-shows
    main)

; Define the structs
(define-struct date
    (full day month year))

(define-struct statistics
    (gross performances attendance capacity gross-potential))

(define-struct production
    (date statistics show))

(define-struct show
    (type name theatre))



; Define the JSON->Struct mappers
(define (json->date jdata)
    (make-date
        (hash-ref jdata (string->symbol "Full"))
            (hash-ref jdata (string->symbol "Day"))
            (hash-ref jdata (string->symbol "Month"))
            (hash-ref jdata (string->symbol "Year"))
            ))

(define (json->statistics jdata)
    (make-statistics
        (hash-ref jdata (string->symbol "Gross"))
            (hash-ref jdata (string->symbol "Performances"))
            (hash-ref jdata (string->symbol "Attendance"))
            (hash-ref jdata (string->symbol "Capacity"))
            (hash-ref jdata (string->symbol "Gross Potential"))
            ))

(define (json->production jdata)
    (make-production
        (json->date (hash-ref jdata (string->symbol "Date")))
                (json->statistics (hash-ref jdata (string->symbol "Statistics")))
                (json->show (hash-ref jdata (string->symbol "Show")))
                ))

(define (json->show jdata)
    (make-show
        (hash-ref jdata (string->symbol "Type"))
            (hash-ref jdata (string->symbol "Name"))
            (hash-ref jdata (string->symbol "Theatre"))
            ))



; Define the services, and their helpers

(define (get-shows [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM broadway LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->production result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM broadway"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->production result)
           ))
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-shows")
    (displayln (length (time (get-shows false))))
    (displayln "Test get-shows")
    (displayln (length (time (get-shows true))))
    
    

    )