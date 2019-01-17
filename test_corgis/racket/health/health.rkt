#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "health.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out report)
    get-all-reports
    main)

; Define the structs
(define-struct report
    (loc number disease increase year population))



; Define the JSON->Struct mappers
(define (json->report jdata)
    (make-report
        (hash-ref jdata (string->symbol "loc"))
            (hash-ref jdata (string->symbol "number"))
            (hash-ref jdata (string->symbol "disease"))
            (hash-ref jdata (string->symbol "increase"))
            (hash-ref jdata (string->symbol "year"))
            (hash-ref jdata (string->symbol "population"))
            ))



; Define the services, and their helpers

(define (get-all-reports [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM health ORDER BY year, location, disease ASC LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->report result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM health ORDER BY year, location, disease ASC"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->report result)
           ))
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-all-reports")
    (displayln (length (time (get-all-reports false))))
    (displayln "Test get-all-reports")
    (displayln (length (time (get-all-reports true))))
    
    

    )