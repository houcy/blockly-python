#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "school_scores.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out between-500-to-600)
    (struct-out verbal)
    (struct-out a)
    (struct-out a-minus)
    (struct-out math)
    (struct-out natural-sciences)
    (struct-out between-300-to-400)
    (struct-out between-200-to-300)
    (struct-out d-or-lower)
    (struct-out between-40-60k)
    (struct-out female)
    (struct-out a-plus)
    (struct-out male)
    (struct-out foreign-languages)
    (struct-out less-than-20k)
    (struct-out between-600-to-700)
    (struct-out math)
    (struct-out no-response)
    (struct-out state)
    (struct-out english)
    (struct-out family-income)
    (struct-out gpa)
    (struct-out arts/music)
    (struct-out verbal)
    (struct-out record)
    (struct-out verbal)
    (struct-out mathematics)
    (struct-out verbal)
    (struct-out between-400-to-500)
    (struct-out between-60-80k)
    (struct-out verbal)
    (struct-out c)
    (struct-out b)
    (struct-out math)
    (struct-out gender)
    (struct-out social-sciences/history)
    (struct-out academic-subjects)
    (struct-out math)
    (struct-out more-than-100k)
    (struct-out total)
    (struct-out between-80-100k)
    (struct-out score-ranges)
    (struct-out math)
    (struct-out between-700-to-800)
    (struct-out math)
    (struct-out between-20-40k)
    (struct-out verbal)
    get-all
    main)

; Define the structs
(define-struct between-500-to-600
    (math verbal))

(define-struct verbal
    (males females total))

(define-struct a
    (math verbal test-takers))

(define-struct a-minus
    (math verbal test-takers))

(define-struct math
    (males females total))

(define-struct natural-sciences
    (average-gpa average-years))

(define-struct between-300-to-400
    (math verbal))

(define-struct between-200-to-300
    (math verbal))

(define-struct d-or-lower
    (math verbal test-takers))

(define-struct between-40-60k
    (verbal math test-takers))

(define-struct female
    (test-takers math verbal))

(define-struct a-plus
    (math verbal test-takers))

(define-struct male
    (test-takers math verbal))

(define-struct foreign-languages
    (average-gpa average-years))

(define-struct less-than-20k
    (verbal math test-takers))

(define-struct between-600-to-700
    (math verbal))

(define-struct math
    (males females total))

(define-struct no-response
    (math verbal test-takers))

(define-struct state
    (code name))

(define-struct english
    (average-gpa average-years))

(define-struct family-income
    (between-40-60k more-than-100k less-than-20k between-60-80k between-20-40k between-80-100k))

(define-struct gpa
    (a c b no-response d-or-lower a-plus a-minus))

(define-struct arts/music
    (average-gpa average-years))

(define-struct verbal
    (males females total))

(define-struct record
    (gender year gpa state academic-subjects family-income total score-ranges))

(define-struct verbal
    (males females total))

(define-struct mathematics
    (average-gpa average-years))

(define-struct verbal
    (males females total))

(define-struct between-400-to-500
    (math verbal))

(define-struct between-60-80k
    (verbal math test-takers))

(define-struct verbal
    (males females total))

(define-struct c
    (math verbal test-takers))

(define-struct b
    (math verbal test-takers))

(define-struct math
    (males females total))

(define-struct gender
    (male female))

(define-struct social-sciences/history
    (average-gpa average-years))

(define-struct academic-subjects
    (social-sciences/history natural-sciences arts/music foreign-languages english mathematics))

(define-struct math
    (males females total))

(define-struct more-than-100k
    (math verbal test-takers))

(define-struct total
    (test-takers math verbal))

(define-struct between-80-100k
    (math verbal test-takers))

(define-struct score-ranges
    (between-400-to-500 between-200-to-300 between-700-to-800 between-600-to-700 between-500-to-600 between-300-to-400))

(define-struct math
    (males females total))

(define-struct between-700-to-800
    (math verbal))

(define-struct math
    (males females total))

(define-struct between-20-40k
    (verbal math test-takers))

(define-struct verbal
    (males females total))



; Define the JSON->Struct mappers
(define (json->between-500-to-600 jdata)
    (make-between-500-to-600
        (json->math (hash-ref jdata (string->symbol "Math")))
                (json->verbal (hash-ref jdata (string->symbol "Verbal")))
                ))

(define (json->verbal jdata)
    (make-verbal
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->a jdata)
    (make-a
        (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->a-minus jdata)
    (make-a-minus
        (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->math jdata)
    (make-math
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->natural-sciences jdata)
    (make-natural-sciences
        (hash-ref jdata (string->symbol "Average GPA"))
            (hash-ref jdata (string->symbol "Average Years"))
            ))

(define (json->between-300-to-400 jdata)
    (make-between-300-to-400
        (json->math (hash-ref jdata (string->symbol "Math")))
                (json->verbal (hash-ref jdata (string->symbol "Verbal")))
                ))

(define (json->between-200-to-300 jdata)
    (make-between-200-to-300
        (json->math (hash-ref jdata (string->symbol "Math")))
                (json->verbal (hash-ref jdata (string->symbol "Verbal")))
                ))

(define (json->d-or-lower jdata)
    (make-d-or-lower
        (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->between-40-60k jdata)
    (make-between-40-60k
        (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->female jdata)
    (make-female
        (hash-ref jdata (string->symbol "Test-takers"))
            (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            ))

(define (json->a-plus jdata)
    (make-a-plus
        (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->male jdata)
    (make-male
        (hash-ref jdata (string->symbol "Test-takers"))
            (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            ))

(define (json->foreign-languages jdata)
    (make-foreign-languages
        (hash-ref jdata (string->symbol "Average GPA"))
            (hash-ref jdata (string->symbol "Average Years"))
            ))

(define (json->less-than-20k jdata)
    (make-less-than-20k
        (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->between-600-to-700 jdata)
    (make-between-600-to-700
        (json->math (hash-ref jdata (string->symbol "Math")))
                (json->verbal (hash-ref jdata (string->symbol "Verbal")))
                ))

(define (json->math jdata)
    (make-math
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->no-response jdata)
    (make-no-response
        (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->state jdata)
    (make-state
        (hash-ref jdata (string->symbol "Code"))
            (hash-ref jdata (string->symbol "Name"))
            ))

(define (json->english jdata)
    (make-english
        (hash-ref jdata (string->symbol "Average GPA"))
            (hash-ref jdata (string->symbol "Average Years"))
            ))

(define (json->family-income jdata)
    (make-family-income
        (json->between-40-60k (hash-ref jdata (string->symbol "Between 40-60k")))
                (json->more-than-100k (hash-ref jdata (string->symbol "More than 100k")))
                (json->less-than-20k (hash-ref jdata (string->symbol "Less than 20k")))
                (json->between-60-80k (hash-ref jdata (string->symbol "Between 60-80k")))
                (json->between-20-40k (hash-ref jdata (string->symbol "Between 20-40k")))
                (json->between-80-100k (hash-ref jdata (string->symbol "Between 80-100k")))
                ))

(define (json->gpa jdata)
    (make-gpa
        (json->a (hash-ref jdata (string->symbol "A")))
                (json->c (hash-ref jdata (string->symbol "C")))
                (json->b (hash-ref jdata (string->symbol "B")))
                (json->no-response (hash-ref jdata (string->symbol "No response")))
                (json->d-or-lower (hash-ref jdata (string->symbol "D or lower")))
                (json->a-plus (hash-ref jdata (string->symbol "A plus")))
                (json->a-minus (hash-ref jdata (string->symbol "A minus")))
                ))

(define (json->arts/music jdata)
    (make-arts/music
        (hash-ref jdata (string->symbol "Average GPA"))
            (hash-ref jdata (string->symbol "Average Years"))
            ))

(define (json->verbal jdata)
    (make-verbal
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->record jdata)
    (make-record
        (json->gender (hash-ref jdata (string->symbol "Gender")))
                (hash-ref jdata (string->symbol "Year"))
            (json->gpa (hash-ref jdata (string->symbol "GPA")))
                (json->state (hash-ref jdata (string->symbol "State")))
                (json->academic-subjects (hash-ref jdata (string->symbol "Academic Subjects")))
                (json->family-income (hash-ref jdata (string->symbol "Family Income")))
                (json->total (hash-ref jdata (string->symbol "Total")))
                (json->score-ranges (hash-ref jdata (string->symbol "Score Ranges")))
                ))

(define (json->verbal jdata)
    (make-verbal
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->mathematics jdata)
    (make-mathematics
        (hash-ref jdata (string->symbol "Average GPA"))
            (hash-ref jdata (string->symbol "Average Years"))
            ))

(define (json->verbal jdata)
    (make-verbal
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->between-400-to-500 jdata)
    (make-between-400-to-500
        (json->math (hash-ref jdata (string->symbol "Math")))
                (json->verbal (hash-ref jdata (string->symbol "Verbal")))
                ))

(define (json->between-60-80k jdata)
    (make-between-60-80k
        (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->verbal jdata)
    (make-verbal
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->c jdata)
    (make-c
        (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->b jdata)
    (make-b
        (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->math jdata)
    (make-math
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->gender jdata)
    (make-gender
        (json->male (hash-ref jdata (string->symbol "Male")))
                (json->female (hash-ref jdata (string->symbol "Female")))
                ))

(define (json->social-sciences/history jdata)
    (make-social-sciences/history
        (hash-ref jdata (string->symbol "Average GPA"))
            (hash-ref jdata (string->symbol "Average Years"))
            ))

(define (json->academic-subjects jdata)
    (make-academic-subjects
        (json->social-sciences/history (hash-ref jdata (string->symbol "Social Sciences/History")))
                (json->natural-sciences (hash-ref jdata (string->symbol "Natural Sciences")))
                (json->arts/music (hash-ref jdata (string->symbol "Arts/Music")))
                (json->foreign-languages (hash-ref jdata (string->symbol "Foreign Languages")))
                (json->english (hash-ref jdata (string->symbol "English")))
                (json->mathematics (hash-ref jdata (string->symbol "Mathematics")))
                ))

(define (json->math jdata)
    (make-math
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->more-than-100k jdata)
    (make-more-than-100k
        (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->total jdata)
    (make-total
        (hash-ref jdata (string->symbol "Test-takers"))
            (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            ))

(define (json->between-80-100k jdata)
    (make-between-80-100k
        (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->score-ranges jdata)
    (make-score-ranges
        (json->between-400-to-500 (hash-ref jdata (string->symbol "Between 400 to 500")))
                (json->between-200-to-300 (hash-ref jdata (string->symbol "Between 200 to 300")))
                (json->between-700-to-800 (hash-ref jdata (string->symbol "Between 700 to 800")))
                (json->between-600-to-700 (hash-ref jdata (string->symbol "Between 600 to 700")))
                (json->between-500-to-600 (hash-ref jdata (string->symbol "Between 500 to 600")))
                (json->between-300-to-400 (hash-ref jdata (string->symbol "Between 300 to 400")))
                ))

(define (json->math jdata)
    (make-math
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->between-700-to-800 jdata)
    (make-between-700-to-800
        (json->math (hash-ref jdata (string->symbol "Math")))
                (json->verbal (hash-ref jdata (string->symbol "Verbal")))
                ))

(define (json->math jdata)
    (make-math
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))

(define (json->between-20-40k jdata)
    (make-between-20-40k
        (hash-ref jdata (string->symbol "Verbal"))
            (hash-ref jdata (string->symbol "Math"))
            (hash-ref jdata (string->symbol "Test-takers"))
            ))

(define (json->verbal jdata)
    (make-verbal
        (hash-ref jdata (string->symbol "Males"))
            (hash-ref jdata (string->symbol "Females"))
            (hash-ref jdata (string->symbol "Total"))
            ))



; Define the services, and their helpers

(define (get-all ) 
(let* [(result (query-list database 
                                   "SELECT data FROM school_scores"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->record result)
           )
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-all")
    (displayln (length (time (get-all ))))
    
    

    )