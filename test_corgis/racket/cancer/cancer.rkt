#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "cancer.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out age)
    (struct-out report)
    (struct-out data)
    get-reports
    main)

; Define the structs
(define-struct age
    (age-adjusted-rate age-adjusted-ci-lower age-adjusted-ci-upper))

(define-struct report
    (age year data area))

(define-struct data
    (count crude-rate crude-ci-upper crude-ci-lower sex race event-type population))



; Define the JSON->Struct mappers
(define (json->age jdata)
    (make-age
        (hash-ref jdata (string->symbol "Age Adjusted Rate"))
            (hash-ref jdata (string->symbol "Age Adjusted CI Lower"))
            (hash-ref jdata (string->symbol "Age Adjusted CI Upper"))
            ))

(define (json->report jdata)
    (make-report
        (json->age (hash-ref jdata (string->symbol "Age")))
                (hash-ref jdata (string->symbol "Year"))
            (json->data (hash-ref jdata (string->symbol "Data")))
                (hash-ref jdata (string->symbol "Area"))
            ))

(define (json->data jdata)
    (make-data
        (hash-ref jdata (string->symbol "Count"))
            (hash-ref jdata (string->symbol "Crude Rate"))
            (hash-ref jdata (string->symbol "Crude CI Upper"))
            (hash-ref jdata (string->symbol "Crude CI Lower"))
            (hash-ref jdata (string->symbol "Sex"))
            (hash-ref jdata (string->symbol "Race"))
            (hash-ref jdata (string->symbol "Event Type"))
            (hash-ref jdata (string->symbol "Population"))
            ))



; Define the services, and their helpers

(define (get-reports [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM cancer LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->report result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM cancer"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->report result)
           ))
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-reports")
    (displayln (length (time (get-reports false))))
    (displayln "Test get-reports")
    (displayln (length (time (get-reports true))))
    
    

    )