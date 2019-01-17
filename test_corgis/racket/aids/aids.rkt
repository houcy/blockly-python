#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "aids.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out aids-related-deaths)
    (struct-out new-hiv-infections)
    (struct-out people-living-with-hiv)
    (struct-out hiv-prevalence)
    (struct-out report)
    (struct-out data)
    get-reports
    main)

; Define the structs
(define-struct aids-related-deaths
    (adults all-ages aids-orphans children female-adults male-adults))

(define-struct new-hiv-infections
    (incidence-rate-among-adults adults all-ages children female-adults male-adults))

(define-struct people-living-with-hiv
    (total adults male-adults female-adults children))

(define-struct hiv-prevalence
    (young-men adults young-women))

(define-struct report
    (country data year))

(define-struct data
    (hiv-prevalence aids-related-deaths new-hiv-infections people-living-with-hiv))



; Define the JSON->Struct mappers
(define (json->aids-related-deaths jdata)
    (make-aids-related-deaths
        (hash-ref jdata (string->symbol "Adults"))
            (hash-ref jdata (string->symbol "All Ages"))
            (hash-ref jdata (string->symbol "AIDS Orphans"))
            (hash-ref jdata (string->symbol "Children"))
            (hash-ref jdata (string->symbol "Female Adults"))
            (hash-ref jdata (string->symbol "Male Adults"))
            ))

(define (json->new-hiv-infections jdata)
    (make-new-hiv-infections
        (hash-ref jdata (string->symbol "Incidence Rate Among Adults"))
            (hash-ref jdata (string->symbol "Adults"))
            (hash-ref jdata (string->symbol "All Ages"))
            (hash-ref jdata (string->symbol "Children"))
            (hash-ref jdata (string->symbol "Female Adults"))
            (hash-ref jdata (string->symbol "Male Adults"))
            ))

(define (json->people-living-with-hiv jdata)
    (make-people-living-with-hiv
        (hash-ref jdata (string->symbol "Total"))
            (hash-ref jdata (string->symbol "Adults"))
            (hash-ref jdata (string->symbol "Male Adults"))
            (hash-ref jdata (string->symbol "Female Adults"))
            (hash-ref jdata (string->symbol "Children"))
            ))

(define (json->hiv-prevalence jdata)
    (make-hiv-prevalence
        (hash-ref jdata (string->symbol "Young Men"))
            (hash-ref jdata (string->symbol "Adults"))
            (hash-ref jdata (string->symbol "Young Women"))
            ))

(define (json->report jdata)
    (make-report
        (hash-ref jdata (string->symbol "Country"))
            (json->data (hash-ref jdata (string->symbol "Data")))
                (hash-ref jdata (string->symbol "Year"))
            ))

(define (json->data jdata)
    (make-data
        (json->hiv-prevalence (hash-ref jdata (string->symbol "HIV Prevalence")))
                (json->aids-related-deaths (hash-ref jdata (string->symbol "AIDS-Related Deaths")))
                (json->new-hiv-infections (hash-ref jdata (string->symbol "New HIV Infections")))
                (json->people-living-with-hiv (hash-ref jdata (string->symbol "People Living with HIV")))
                ))



; Define the services, and their helpers

(define (get-reports [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM aids LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->report result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM aids"
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