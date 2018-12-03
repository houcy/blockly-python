#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "graduates.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out salaries)
    (struct-out reason-working-outside-field)
    (struct-out status)
    (struct-out grad-major)
    (struct-out demographics)
    (struct-out employer-type)
    (struct-out reason-for-not-working)
    (struct-out gender)
    (struct-out degrees)
    (struct-out education)
    (struct-out work-activity)
    (struct-out employment)
    (struct-out ethnicity)
    get-majors
    main)

; Define the structs
(define-struct salaries
    (lowest mean median standard-deviation highest quantity))

(define-struct reason-working-outside-field
    (no-job-available job-location working-conditions career-change family-related other pay/promotion))

(define-struct status
    (not-in-labor-force unemployed employed))

(define-struct grad-major
    (demographics education employment salaries year))

(define-struct demographics
    (gender total ethnicity))

(define-struct employer-type
    (educational-institution business/industry government))

(define-struct reason-for-not-working
    (no-need/want layoff family no-job-available student))

(define-struct gender
    (males females))

(define-struct degrees
    (doctorates professionals masters bachelors))

(define-struct education
    (major degrees))

(define-struct work-activity
    (development professional-service applied-research managing/supervising-people/projects computer-applications human-resources productions/operations/maintenance sales,-purchasing,-marketing qualitity/productivity-management design accounting/finance/contracts teaching basic-research other))

(define-struct employment
    (status employer-type reason-working-outside-field reason-for-not-working work-activity))

(define-struct ethnicity
    (whites asians minorities))



; Define the JSON->Struct mappers
(define (json->salaries jdata)
    (make-salaries
        (hash-ref jdata (string->symbol "Lowest"))
            (hash-ref jdata (string->symbol "Mean"))
            (hash-ref jdata (string->symbol "Median"))
            (hash-ref jdata (string->symbol "Standard Deviation"))
            (hash-ref jdata (string->symbol "Highest"))
            (hash-ref jdata (string->symbol "Quantity"))
            ))

(define (json->reason-working-outside-field jdata)
    (make-reason-working-outside-field
        (hash-ref jdata (string->symbol "No Job Available"))
            (hash-ref jdata (string->symbol "Job Location"))
            (hash-ref jdata (string->symbol "Working Conditions"))
            (hash-ref jdata (string->symbol "Career Change"))
            (hash-ref jdata (string->symbol "Family-related"))
            (hash-ref jdata (string->symbol "Other"))
            (hash-ref jdata (string->symbol "Pay/Promotion"))
            ))

(define (json->status jdata)
    (make-status
        (hash-ref jdata (string->symbol "Not in Labor Force"))
            (hash-ref jdata (string->symbol "Unemployed"))
            (hash-ref jdata (string->symbol "Employed"))
            ))

(define (json->grad-major jdata)
    (make-grad-major
        (json->demographics (hash-ref jdata (string->symbol "Demographics")))
                (json->education (hash-ref jdata (string->symbol "Education")))
                (json->employment (hash-ref jdata (string->symbol "Employment")))
                (json->salaries (hash-ref jdata (string->symbol "Salaries")))
                (hash-ref jdata (string->symbol "Year"))
            ))

(define (json->demographics jdata)
    (make-demographics
        (json->gender (hash-ref jdata (string->symbol "Gender")))
                (hash-ref jdata (string->symbol "Total"))
            (json->ethnicity (hash-ref jdata (string->symbol "Ethnicity")))
                ))

(define (json->employer-type jdata)
    (make-employer-type
        (hash-ref jdata (string->symbol "Educational Institution"))
            (hash-ref jdata (string->symbol "Business/Industry"))
            (hash-ref jdata (string->symbol "Government"))
            ))

(define (json->reason-for-not-working jdata)
    (make-reason-for-not-working
        (hash-ref jdata (string->symbol "No need/want"))
            (hash-ref jdata (string->symbol "Layoff"))
            (hash-ref jdata (string->symbol "Family"))
            (hash-ref jdata (string->symbol "No Job Available"))
            (hash-ref jdata (string->symbol "Student"))
            ))

(define (json->gender jdata)
    (make-gender
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            ))

(define (json->degrees jdata)
    (make-degrees
        (hash-ref jdata (string->symbol "Doctorates"))
            (hash-ref jdata (string->symbol "Professionals"))
            (hash-ref jdata (string->symbol "Masters"))
            (hash-ref jdata (string->symbol "Bachelors"))
            ))

(define (json->education jdata)
    (make-education
        (hash-ref jdata (string->symbol "Major"))
            (json->degrees (hash-ref jdata (string->symbol "Degrees")))
                ))

(define (json->work-activity jdata)
    (make-work-activity
        (hash-ref jdata (string->symbol "Development"))
            (hash-ref jdata (string->symbol "Professional Service"))
            (hash-ref jdata (string->symbol "Applied Research"))
            (hash-ref jdata (string->symbol "Managing/Supervising People/Projects"))
            (hash-ref jdata (string->symbol "Computer Applications"))
            (hash-ref jdata (string->symbol "Human Resources"))
            (hash-ref jdata (string->symbol "Productions/Operations/Maintenance"))
            (hash-ref jdata (string->symbol "Sales, Purchasing, Marketing"))
            (hash-ref jdata (string->symbol "Qualitity/Productivity Management"))
            (hash-ref jdata (string->symbol "Design"))
            (hash-ref jdata (string->symbol "Accounting/Finance/Contracts"))
            (hash-ref jdata (string->symbol "Teaching"))
            (hash-ref jdata (string->symbol "Basic Research"))
            (hash-ref jdata (string->symbol "Other"))
            ))

(define (json->employment jdata)
    (make-employment
        (json->status (hash-ref jdata (string->symbol "Status")))
                (json->employer-type (hash-ref jdata (string->symbol "Employer Type")))
                (json->reason-working-outside-field (hash-ref jdata (string->symbol "Reason Working Outside Field")))
                (json->reason-for-not-working (hash-ref jdata (string->symbol "Reason for Not Working")))
                (json->work-activity (hash-ref jdata (string->symbol "Work Activity")))
                ))

(define (json->ethnicity jdata)
    (make-ethnicity
        (hash-ref jdata (string->symbol "Whites"))
            (hash-ref jdata (string->symbol "Asians"))
            (hash-ref jdata (string->symbol "Minorities"))
            ))



; Define the services, and their helpers

(define (get-majors ) 
(let* [(result (query-list database 
                                   "SELECT data FROM graduates"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->grad-major result)
           )
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-majors")
    (displayln (length (time (get-majors ))))
    
    

    )