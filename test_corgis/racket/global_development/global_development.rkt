#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "global_development.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out report)
    (struct-out rural-development)
    (struct-out urban-development)
    (struct-out health)
    (struct-out data)
    (struct-out infrastructure)
    get-reports
    main)

; Define the structs
(define-struct report
    (country data year))

(define-struct rural-development
    (arable-land-percent arable-land rural-population agricultural-land-percent rural-population-growth surface-area agricultural-land land-area))

(define-struct urban-development
    (urban-population-percent population-density urban-population-percent-growth))

(define-struct health
    (life-expectancy-at-birth,-total total-population life-expectancy-at-birth,-male population-growth life-expectancy-at-birth,-female birth-rate death-rate fertility-rate))

(define-struct data
    (infrastructure health rural-development urban-development))

(define-struct infrastructure
    (telephone-lines mobile-cellular-subscriptions telephone-lines-per-100-people mobile-cellular-subscriptions-per-100-people))



; Define the JSON->Struct mappers
(define (json->report jdata)
    (make-report
        (hash-ref jdata (string->symbol "Country"))
            (json->data (hash-ref jdata (string->symbol "Data")))
                (hash-ref jdata (string->symbol "Year"))
            ))

(define (json->rural-development jdata)
    (make-rural-development
        (hash-ref jdata (string->symbol "Arable Land Percent"))
            (hash-ref jdata (string->symbol "Arable Land"))
            (hash-ref jdata (string->symbol "Rural Population"))
            (hash-ref jdata (string->symbol "Agricultural Land Percent"))
            (hash-ref jdata (string->symbol "Rural Population Growth"))
            (hash-ref jdata (string->symbol "Surface Area"))
            (hash-ref jdata (string->symbol "Agricultural Land"))
            (hash-ref jdata (string->symbol "Land Area"))
            ))

(define (json->urban-development jdata)
    (make-urban-development
        (hash-ref jdata (string->symbol "Urban Population Percent"))
            (hash-ref jdata (string->symbol "Population Density"))
            (hash-ref jdata (string->symbol "Urban Population Percent Growth"))
            ))

(define (json->health jdata)
    (make-health
        (hash-ref jdata (string->symbol "Life Expectancy at Birth, Total"))
            (hash-ref jdata (string->symbol "Total Population"))
            (hash-ref jdata (string->symbol "Life Expectancy at Birth, Male"))
            (hash-ref jdata (string->symbol "Population Growth"))
            (hash-ref jdata (string->symbol "Life Expectancy at Birth, Female"))
            (hash-ref jdata (string->symbol "Birth Rate"))
            (hash-ref jdata (string->symbol "Death Rate"))
            (hash-ref jdata (string->symbol "Fertility Rate"))
            ))

(define (json->data jdata)
    (make-data
        (json->infrastructure (hash-ref jdata (string->symbol "Infrastructure")))
                (json->health (hash-ref jdata (string->symbol "Health")))
                (json->rural-development (hash-ref jdata (string->symbol "Rural Development")))
                (json->urban-development (hash-ref jdata (string->symbol "Urban Development")))
                ))

(define (json->infrastructure jdata)
    (make-infrastructure
        (hash-ref jdata (string->symbol "Telephone Lines"))
            (hash-ref jdata (string->symbol "Mobile Cellular Subscriptions"))
            (hash-ref jdata (string->symbol "Telephone Lines per 100 People"))
            (hash-ref jdata (string->symbol "Mobile Cellular Subscriptions per 100 People"))
            ))



; Define the services, and their helpers

(define (get-reports [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM development LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->report result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM development"
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