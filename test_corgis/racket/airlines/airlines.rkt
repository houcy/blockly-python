#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "airlines.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 100)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out #-of-delays)
    (struct-out flights)
    (struct-out minutes-delayed)
    (struct-out airport)
    (struct-out carriers)
    (struct-out airports)
    (struct-out statistics)
    (struct-out time)
    get-reports
    main)

; Define the structs
(define-struct #-of-delays
    (security carrier late-aircraft national-aviation-system weather))

(define-struct flights
    (cancelled on-time total delayed diverted))

(define-struct minutes-delayed
    (late-aircraft weather carrier security total national-aviation-system))

(define-struct airport
    (code name))

(define-struct carriers
    (total names))

(define-struct airports
    (airport statistics time))

(define-struct statistics
    (flights #-of-delays minutes-delayed carriers))

(define-struct time
    (month-name year label month))



; Define the JSON->Struct mappers
(define (json->#-of-delays jdata)
    (make-#-of-delays
        (hash-ref jdata (string->symbol "Security"))
            (hash-ref jdata (string->symbol "Carrier"))
            (hash-ref jdata (string->symbol "Late Aircraft"))
            (hash-ref jdata (string->symbol "National Aviation System"))
            (hash-ref jdata (string->symbol "Weather"))
            ))

(define (json->flights jdata)
    (make-flights
        (hash-ref jdata (string->symbol "Cancelled"))
            (hash-ref jdata (string->symbol "On Time"))
            (hash-ref jdata (string->symbol "Total"))
            (hash-ref jdata (string->symbol "Delayed"))
            (hash-ref jdata (string->symbol "Diverted"))
            ))

(define (json->minutes-delayed jdata)
    (make-minutes-delayed
        (hash-ref jdata (string->symbol "Late Aircraft"))
            (hash-ref jdata (string->symbol "Weather"))
            (hash-ref jdata (string->symbol "Carrier"))
            (hash-ref jdata (string->symbol "Security"))
            (hash-ref jdata (string->symbol "Total"))
            (hash-ref jdata (string->symbol "National Aviation System"))
            ))

(define (json->airport jdata)
    (make-airport
        (hash-ref jdata (string->symbol "Code"))
            (hash-ref jdata (string->symbol "Name"))
            ))

(define (json->carriers jdata)
    (make-carriers
        (hash-ref jdata (string->symbol "Total"))
            (hash-ref jdata (string->symbol "Names"))
                    ))

(define (json->airports jdata)
    (make-airports
        (json->airport (hash-ref jdata (string->symbol "Airport")))
                (json->statistics (hash-ref jdata (string->symbol "Statistics")))
                (json->time (hash-ref jdata (string->symbol "Time")))
                ))

(define (json->statistics jdata)
    (make-statistics
        (json->flights (hash-ref jdata (string->symbol "Flights")))
                (json->#-of-delays (hash-ref jdata (string->symbol "# of Delays")))
                (json->minutes-delayed (hash-ref jdata (string->symbol "Minutes Delayed")))
                (json->carriers (hash-ref jdata (string->symbol "Carriers")))
                ))

(define (json->time jdata)
    (make-time
        (hash-ref jdata (string->symbol "Month Name"))
            (hash-ref jdata (string->symbol "Year"))
            (hash-ref jdata (string->symbol "Label"))
            (hash-ref jdata (string->symbol "Month"))
            ))



; Define the services, and their helpers

(define (get-reports [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM airlines LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->airports result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM airlines"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->airports result)
           ))
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-reports")
    (displayln (length (time (get-reports false))))
    (displayln "Test get-reports")
    (displayln (length (time (get-reports true))))
    
    

    )