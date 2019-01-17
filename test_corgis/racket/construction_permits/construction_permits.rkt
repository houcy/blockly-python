#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "construction_permits.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out number-of-permits)
    (struct-out permit)
    (struct-out period)
    (struct-out valuations)
    get-records
    main)

; Define the structs
(define-struct number-of-permits
    (2-units 5+-units 3-4-units 1-unit))

(define-struct permit
    (number-of-permits period valuations name))

(define-struct period
    (month month-name full year))

(define-struct valuations
    (2-units 5+-units 3-4-units 1-unit))



; Define the JSON->Struct mappers
(define (json->number-of-permits jdata)
    (make-number-of-permits
        (hash-ref jdata (string->symbol "2 units"))
            (hash-ref jdata (string->symbol "5+ units"))
            (hash-ref jdata (string->symbol "3-4 units"))
            (hash-ref jdata (string->symbol "1 unit"))
            ))

(define (json->permit jdata)
    (make-permit
        (json->number-of-permits (hash-ref jdata (string->symbol "Number of Permits")))
                (json->period (hash-ref jdata (string->symbol "Period")))
                (json->valuations (hash-ref jdata (string->symbol "Valuations")))
                (hash-ref jdata (string->symbol "Name"))
            ))

(define (json->period jdata)
    (make-period
        (hash-ref jdata (string->symbol "month"))
            (hash-ref jdata (string->symbol "month name"))
            (hash-ref jdata (string->symbol "full"))
            (hash-ref jdata (string->symbol "year"))
            ))

(define (json->valuations jdata)
    (make-valuations
        (hash-ref jdata (string->symbol "2 units"))
            (hash-ref jdata (string->symbol "5+ units"))
            (hash-ref jdata (string->symbol "3-4 units"))
            (hash-ref jdata (string->symbol "1 unit"))
            ))



; Define the services, and their helpers

(define (get-records [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM construction_permits LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->permit result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM construction_permits"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->permit result)
           ))
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-records")
    (displayln (length (time (get-records false))))
    (displayln "Test get-records")
    (displayln (length (time (get-records true))))
    
    

    )