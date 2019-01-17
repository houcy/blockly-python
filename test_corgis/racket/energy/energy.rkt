#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "energy.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out consumption)
    (struct-out industrial)
    (struct-out expenditure)
    (struct-out price)
    (struct-out report)
    (struct-out commercial)
    (struct-out commercial)
    (struct-out transportation)
    (struct-out electric-power)
    (struct-out industrial)
    (struct-out electric-power)
    (struct-out industrial)
    (struct-out refinery)
    (struct-out commercial)
    (struct-out production)
    (struct-out residential)
    (struct-out transportation)
    (struct-out transportation)
    (struct-out electric-power)
    (struct-out residential)
    get-reports
    main)

; Define the structs
(define-struct consumption
    (industrial transportation residential commercial refinery electric-power))

(define-struct industrial
    (other-petroleum-products kerosene natural-gas hydropower coal geothermal wood solar distillate-fuel-oil wind liquefied-petroleum-gases))

(define-struct expenditure
    (commercial industrial transportation residential electric-power))

(define-struct price
    (commercial industrial transportation electric-power))

(define-struct report
    (consumption price state production expenditure year))

(define-struct commercial
    (coal kerosene natural-gas distillate-fuel-oil liquefied-petroleum-gases))

(define-struct commercial
    (natural-gas kerosene hydropower coal geothermal wood solar distillate-fuel-oil wind liquefied-petroleum-gases))

(define-struct transportation
    (coal distillate-fuel-oil natural-gas liquefied-petroleum-gases))

(define-struct electric-power
    (coal distillate-fuel-oil natural-gas))

(define-struct industrial
    (other-petroleum-products kerosene natural-gas coal distillate-fuel-oil liquefied-petroleum-gases))

(define-struct electric-power
    (coal distillate-fuel-oil natural-gas))

(define-struct industrial
    (other-petroleum-products kerosene natural-gas coal distillate-fuel-oil liquefied-petroleum-gases))

(define-struct refinery
    (coal distillate-fuel-oil natural-gas liquefied-petroleum-gases))

(define-struct commercial
    (coal kerosene natural-gas distillate-fuel-oil liquefied-petroleum-gases))

(define-struct production
    (coal))

(define-struct residential
    (natural-gas kerosene coal geothermal wood distillate-fuel-oil liquefied-petroleum-gases))

(define-struct transportation
    (coal distillate-fuel-oil natural-gas liquefied-petroleum-gases))

(define-struct transportation
    (coal distillate-fuel-oil natural-gas liquefied-petroleum-gases))

(define-struct electric-power
    (coal distillate-fuel-oil wood natural-gas))

(define-struct residential
    (natural-gas kerosene coal wood distillate-fuel-oil liquefied-petroleum-gases))



; Define the JSON->Struct mappers
(define (json->consumption jdata)
    (make-consumption
        (json->industrial (hash-ref jdata (string->symbol "Industrial")))
                (json->transportation (hash-ref jdata (string->symbol "Transportation")))
                (json->residential (hash-ref jdata (string->symbol "Residential")))
                (json->commercial (hash-ref jdata (string->symbol "Commercial")))
                (json->refinery (hash-ref jdata (string->symbol "Refinery")))
                (json->electric-power (hash-ref jdata (string->symbol "Electric Power")))
                ))

(define (json->industrial jdata)
    (make-industrial
        (hash-ref jdata (string->symbol "Other Petroleum Products"))
            (hash-ref jdata (string->symbol "Kerosene"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Hydropower"))
            (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Geothermal"))
            (hash-ref jdata (string->symbol "Wood"))
            (hash-ref jdata (string->symbol "Solar"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Wind"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->expenditure jdata)
    (make-expenditure
        (json->commercial (hash-ref jdata (string->symbol "Commercial")))
                (json->industrial (hash-ref jdata (string->symbol "Industrial")))
                (json->transportation (hash-ref jdata (string->symbol "Transportation")))
                (json->residential (hash-ref jdata (string->symbol "Residential")))
                (json->electric-power (hash-ref jdata (string->symbol "Electric Power")))
                ))

(define (json->price jdata)
    (make-price
        (json->commercial (hash-ref jdata (string->symbol "Commercial")))
                (json->industrial (hash-ref jdata (string->symbol "Industrial")))
                (json->transportation (hash-ref jdata (string->symbol "Transportation")))
                (json->electric-power (hash-ref jdata (string->symbol "Electric Power")))
                ))

(define (json->report jdata)
    (make-report
        (json->consumption (hash-ref jdata (string->symbol "Consumption")))
                (json->price (hash-ref jdata (string->symbol "Price")))
                (hash-ref jdata (string->symbol "State"))
            (json->production (hash-ref jdata (string->symbol "Production")))
                (json->expenditure (hash-ref jdata (string->symbol "Expenditure")))
                (hash-ref jdata (string->symbol "Year"))
            ))

(define (json->commercial jdata)
    (make-commercial
        (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Kerosene"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->commercial jdata)
    (make-commercial
        (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Kerosene"))
            (hash-ref jdata (string->symbol "Hydropower"))
            (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Geothermal"))
            (hash-ref jdata (string->symbol "Wood"))
            (hash-ref jdata (string->symbol "Solar"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Wind"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->transportation jdata)
    (make-transportation
        (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->electric-power jdata)
    (make-electric-power
        (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            ))

(define (json->industrial jdata)
    (make-industrial
        (hash-ref jdata (string->symbol "Other Petroleum Products"))
            (hash-ref jdata (string->symbol "Kerosene"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->electric-power jdata)
    (make-electric-power
        (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            ))

(define (json->industrial jdata)
    (make-industrial
        (hash-ref jdata (string->symbol "Other Petroleum Products"))
            (hash-ref jdata (string->symbol "Kerosene"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->refinery jdata)
    (make-refinery
        (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->commercial jdata)
    (make-commercial
        (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Kerosene"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->production jdata)
    (make-production
        (hash-ref jdata (string->symbol "Coal"))
            ))

(define (json->residential jdata)
    (make-residential
        (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Kerosene"))
            (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Geothermal"))
            (hash-ref jdata (string->symbol "Wood"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->transportation jdata)
    (make-transportation
        (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->transportation jdata)
    (make-transportation
        (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))

(define (json->electric-power jdata)
    (make-electric-power
        (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Wood"))
            (hash-ref jdata (string->symbol "Natural Gas"))
            ))

(define (json->residential jdata)
    (make-residential
        (hash-ref jdata (string->symbol "Natural Gas"))
            (hash-ref jdata (string->symbol "Kerosene"))
            (hash-ref jdata (string->symbol "Coal"))
            (hash-ref jdata (string->symbol "Wood"))
            (hash-ref jdata (string->symbol "Distillate Fuel Oil"))
            (hash-ref jdata (string->symbol "Liquefied Petroleum Gases"))
            ))



; Define the services, and their helpers

(define (get-reports ) 
(let* [(result (query-list database 
                                   "SELECT data FROM energy"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->report result)
           )
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-reports")
    (displayln (length (time (get-reports ))))
    
    

    )