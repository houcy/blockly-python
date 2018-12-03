#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "state_crime.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out totals)
    (struct-out report)
    (struct-out rates)
    (struct-out violent)
    (struct-out property)
    (struct-out data)
    (struct-out property)
    (struct-out violent)
    get-all-crimes
    main)

; Define the structs
(define-struct totals
    (violent property))

(define-struct report
    (state data year))

(define-struct rates
    (violent property))

(define-struct violent
    (all murder rape robbery assault))

(define-struct property
    (burglary larceny all motor))

(define-struct data
    (population rates totals))

(define-struct property
    (burglary larceny all motor))

(define-struct violent
    (all murder rape robbery assault))



; Define the JSON->Struct mappers
(define (json->totals jdata)
    (make-totals
        (json->violent (hash-ref jdata (string->symbol "Violent")))
                (json->property (hash-ref jdata (string->symbol "Property")))
                ))

(define (json->report jdata)
    (make-report
        (hash-ref jdata (string->symbol "State"))
            (json->data (hash-ref jdata (string->symbol "Data")))
                (hash-ref jdata (string->symbol "Year"))
            ))

(define (json->rates jdata)
    (make-rates
        (json->violent (hash-ref jdata (string->symbol "Violent")))
                (json->property (hash-ref jdata (string->symbol "Property")))
                ))

(define (json->violent jdata)
    (make-violent
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Murder"))
            (hash-ref jdata (string->symbol "Rape"))
            (hash-ref jdata (string->symbol "Robbery"))
            (hash-ref jdata (string->symbol "Assault"))
            ))

(define (json->property jdata)
    (make-property
        (hash-ref jdata (string->symbol "Burglary"))
            (hash-ref jdata (string->symbol "Larceny"))
            (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Motor"))
            ))

(define (json->data jdata)
    (make-data
        (hash-ref jdata (string->symbol "Population"))
            (json->rates (hash-ref jdata (string->symbol "Rates")))
                (json->totals (hash-ref jdata (string->symbol "Totals")))
                ))

(define (json->property jdata)
    (make-property
        (hash-ref jdata (string->symbol "Burglary"))
            (hash-ref jdata (string->symbol "Larceny"))
            (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Motor"))
            ))

(define (json->violent jdata)
    (make-violent
        (hash-ref jdata (string->symbol "All"))
            (hash-ref jdata (string->symbol "Murder"))
            (hash-ref jdata (string->symbol "Rape"))
            (hash-ref jdata (string->symbol "Robbery"))
            (hash-ref jdata (string->symbol "Assault"))
            ))



; Define the services, and their helpers

(define (get-all-crimes [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM crime LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->report result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM crime"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->report result)
           ))
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-all-crimes")
    (displayln (length (time (get-all-crimes false))))
    (displayln "Test get-all-crimes")
    (displayln (length (time (get-all-crimes true))))
    
    

    )