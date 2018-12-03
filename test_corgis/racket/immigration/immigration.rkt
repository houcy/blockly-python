#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "immigration.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out record)
    (struct-out data)
    (struct-out refugees)
    (struct-out legal-permanant-residences)
    (struct-out nonimmigrant-admissions)
    (struct-out enforcement)
    get-records
    main)

; Define the structs
(define-struct record
    (country data year))

(define-struct data
    (enforcement legal-permanant-residences naturalizations-(birth) refugees nonimmigrant-admissions))

(define-struct refugees
    (arrived defensive-asylum affirmative))

(define-struct legal-permanant-residences
    (last-residence birth))

(define-struct nonimmigrant-admissions
    (birth last-residence))

(define-struct enforcement
    (non-criminal criminal apprehended inadmissable))



; Define the JSON->Struct mappers
(define (json->record jdata)
    (make-record
        (hash-ref jdata (string->symbol "Country"))
            (json->data (hash-ref jdata (string->symbol "Data")))
                (hash-ref jdata (string->symbol "Year"))
            ))

(define (json->data jdata)
    (make-data
        (json->enforcement (hash-ref jdata (string->symbol "Enforcement")))
                (json->legal-permanant-residences (hash-ref jdata (string->symbol "Legal permanant residences")))
                (hash-ref jdata (string->symbol "Naturalizations (Birth)"))
            (json->refugees (hash-ref jdata (string->symbol "Refugees")))
                (json->nonimmigrant-admissions (hash-ref jdata (string->symbol "Nonimmigrant Admissions")))
                ))

(define (json->refugees jdata)
    (make-refugees
        (hash-ref jdata (string->symbol "Arrived"))
            (hash-ref jdata (string->symbol "Defensive Asylum"))
            (hash-ref jdata (string->symbol "Affirmative"))
            ))

(define (json->legal-permanant-residences jdata)
    (make-legal-permanant-residences
        (hash-ref jdata (string->symbol "Last Residence"))
            (hash-ref jdata (string->symbol "Birth"))
            ))

(define (json->nonimmigrant-admissions jdata)
    (make-nonimmigrant-admissions
        (hash-ref jdata (string->symbol "Birth"))
            (hash-ref jdata (string->symbol "Last Residence"))
            ))

(define (json->enforcement jdata)
    (make-enforcement
        (hash-ref jdata (string->symbol "Non-criminal"))
            (hash-ref jdata (string->symbol "Criminal"))
            (hash-ref jdata (string->symbol "Apprehended"))
            (hash-ref jdata (string->symbol "Inadmissable"))
            ))



; Define the services, and their helpers

(define (get-records ) 
(let* [(result (query-list database 
                                   "SELECT data FROM immigration"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->record result)
           )
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-records")
    (displayln (length (time (get-records ))))
    
    

    )