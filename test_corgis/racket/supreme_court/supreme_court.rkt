#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "supreme_court.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out voting)
    (struct-out case)
    (struct-out issue)
    (struct-out court-case)
    (struct-out admin-action)
    (struct-out natural-court)
    (struct-out respondent)
    (struct-out laws)
    (struct-out decision)
    (struct-out start)
    (struct-out arguments)
    (struct-out majority-writer)
    (struct-out id)
    (struct-out source)
    (struct-out date-reargued)
    (struct-out majority-assigner)
    (struct-out petitioner)
    (struct-out lower-court)
    (struct-out end)
    (struct-out citation)
    (struct-out date)
    (struct-out origin)
    (struct-out date-argued)
    get-cases
    main)

; Define the structs
(define-struct voting
    (unclear minority majority majority-assigner majority-writer split-on-second))

(define-struct case
    (unusual disposition))

(define-struct issue
    (text id area))

(define-struct court-case
    (origin voting lower-court laws issue decision citation natural-court source arguments 3-judge-dc? docket id name))

(define-struct admin-action
    (state agency id))

(define-struct natural-court
    (start chief end period id))

(define-struct respondent
    (state id entity))

(define-struct laws
    (type id))

(define-struct decision
    (precedent-altered? case direction unconstitutional authority-1 authority-2 admin-action jurisdiction term date winning-party type dissent-agrees))

(define-struct start
    (month full day year))

(define-struct arguments
    (date-reargued date-argued respondent petitioner))

(define-struct majority-writer
    (long-name id name))

(define-struct id
    (case vote docket case-issues))

(define-struct source
    (state id name))

(define-struct date-reargued
    (month full day year))

(define-struct majority-assigner
    (long-name id name))

(define-struct petitioner
    (state id entity))

(define-struct lower-court
    (reasons disagreement? direction disposition))

(define-struct end
    (month full day year))

(define-struct citation
    (sct led us lexis))

(define-struct date
    (month full day year))

(define-struct origin
    (state id name))

(define-struct date-argued
    (month full day year))



; Define the JSON->Struct mappers
(define (json->voting jdata)
    (make-voting
        (hash-ref jdata (string->symbol "unclear"))
            (hash-ref jdata (string->symbol "minority"))
            (hash-ref jdata (string->symbol "majority"))
            (json->majority-assigner (hash-ref jdata (string->symbol "majority assigner")))
                (json->majority-writer (hash-ref jdata (string->symbol "majority writer")))
                (hash-ref jdata (string->symbol "split on second"))
            ))

(define (json->case jdata)
    (make-case
        (hash-ref jdata (string->symbol "unusual"))
            (hash-ref jdata (string->symbol "disposition"))
            ))

(define (json->issue jdata)
    (make-issue
        (hash-ref jdata (string->symbol "text"))
            (hash-ref jdata (string->symbol "id"))
            (hash-ref jdata (string->symbol "area"))
            ))

(define (json->court-case jdata)
    (make-court-case
        (json->origin (hash-ref jdata (string->symbol "origin")))
                (json->voting (hash-ref jdata (string->symbol "voting")))
                (json->lower-court (hash-ref jdata (string->symbol "lower court")))
                (json->laws (hash-ref jdata (string->symbol "laws")))
                (json->issue (hash-ref jdata (string->symbol "issue")))
                (json->decision (hash-ref jdata (string->symbol "decision")))
                (json->citation (hash-ref jdata (string->symbol "citation")))
                (json->natural-court (hash-ref jdata (string->symbol "natural court")))
                (json->source (hash-ref jdata (string->symbol "source")))
                (json->arguments (hash-ref jdata (string->symbol "arguments")))
                (hash-ref jdata (string->symbol "3 judge dc?"))
            (hash-ref jdata (string->symbol "docket"))
            (json->id (hash-ref jdata (string->symbol "id")))
                (hash-ref jdata (string->symbol "name"))
            ))

(define (json->admin-action jdata)
    (make-admin-action
        (hash-ref jdata (string->symbol "state"))
            (hash-ref jdata (string->symbol "agency"))
            (hash-ref jdata (string->symbol "id"))
            ))

(define (json->natural-court jdata)
    (make-natural-court
        (json->start (hash-ref jdata (string->symbol "start")))
                (hash-ref jdata (string->symbol "chief"))
            (json->end (hash-ref jdata (string->symbol "end")))
                (hash-ref jdata (string->symbol "period"))
            (hash-ref jdata (string->symbol "id"))
            ))

(define (json->respondent jdata)
    (make-respondent
        (hash-ref jdata (string->symbol "state"))
            (hash-ref jdata (string->symbol "id"))
            (hash-ref jdata (string->symbol "entity"))
            ))

(define (json->laws jdata)
    (make-laws
        (hash-ref jdata (string->symbol "type"))
            (hash-ref jdata (string->symbol "id"))
            ))

(define (json->decision jdata)
    (make-decision
        (hash-ref jdata (string->symbol "precedent altered?"))
            (json->case (hash-ref jdata (string->symbol "case")))
                (hash-ref jdata (string->symbol "direction"))
            (hash-ref jdata (string->symbol "unconstitutional"))
            (hash-ref jdata (string->symbol "authority 1"))
            (hash-ref jdata (string->symbol "authority 2"))
            (json->admin-action (hash-ref jdata (string->symbol "admin action")))
                (hash-ref jdata (string->symbol "jurisdiction"))
            (hash-ref jdata (string->symbol "term"))
            (json->date (hash-ref jdata (string->symbol "date")))
                (hash-ref jdata (string->symbol "winning party"))
            (hash-ref jdata (string->symbol "type"))
            (hash-ref jdata (string->symbol "dissent agrees"))
            ))

(define (json->start jdata)
    (make-start
        (hash-ref jdata (string->symbol "month"))
            (hash-ref jdata (string->symbol "full"))
            (hash-ref jdata (string->symbol "day"))
            (hash-ref jdata (string->symbol "year"))
            ))

(define (json->arguments jdata)
    (make-arguments
        (json->date-reargued (hash-ref jdata (string->symbol "date reargued")))
                (json->date-argued (hash-ref jdata (string->symbol "date argued")))
                (json->respondent (hash-ref jdata (string->symbol "respondent")))
                (json->petitioner (hash-ref jdata (string->symbol "petitioner")))
                ))

(define (json->majority-writer jdata)
    (make-majority-writer
        (hash-ref jdata (string->symbol "long name"))
            (hash-ref jdata (string->symbol "id"))
            (hash-ref jdata (string->symbol "name"))
            ))

(define (json->id jdata)
    (make-id
        (hash-ref jdata (string->symbol "case"))
            (hash-ref jdata (string->symbol "vote"))
            (hash-ref jdata (string->symbol "docket"))
            (hash-ref jdata (string->symbol "case issues"))
            ))

(define (json->source jdata)
    (make-source
        (hash-ref jdata (string->symbol "state"))
            (hash-ref jdata (string->symbol "id"))
            (hash-ref jdata (string->symbol "name"))
            ))

(define (json->date-reargued jdata)
    (make-date-reargued
        (hash-ref jdata (string->symbol "month"))
            (hash-ref jdata (string->symbol "full"))
            (hash-ref jdata (string->symbol "day"))
            (hash-ref jdata (string->symbol "year"))
            ))

(define (json->majority-assigner jdata)
    (make-majority-assigner
        (hash-ref jdata (string->symbol "long name"))
            (hash-ref jdata (string->symbol "id"))
            (hash-ref jdata (string->symbol "name"))
            ))

(define (json->petitioner jdata)
    (make-petitioner
        (hash-ref jdata (string->symbol "state"))
            (hash-ref jdata (string->symbol "id"))
            (hash-ref jdata (string->symbol "entity"))
            ))

(define (json->lower-court jdata)
    (make-lower-court
        (hash-ref jdata (string->symbol "reasons"))
            (hash-ref jdata (string->symbol "disagreement?"))
            (hash-ref jdata (string->symbol "direction"))
            (hash-ref jdata (string->symbol "disposition"))
            ))

(define (json->end jdata)
    (make-end
        (hash-ref jdata (string->symbol "month"))
            (hash-ref jdata (string->symbol "full"))
            (hash-ref jdata (string->symbol "day"))
            (hash-ref jdata (string->symbol "year"))
            ))

(define (json->citation jdata)
    (make-citation
        (hash-ref jdata (string->symbol "sct"))
            (hash-ref jdata (string->symbol "led"))
            (hash-ref jdata (string->symbol "us"))
            (hash-ref jdata (string->symbol "lexis"))
            ))

(define (json->date jdata)
    (make-date
        (hash-ref jdata (string->symbol "month"))
            (hash-ref jdata (string->symbol "full"))
            (hash-ref jdata (string->symbol "day"))
            (hash-ref jdata (string->symbol "year"))
            ))

(define (json->origin jdata)
    (make-origin
        (hash-ref jdata (string->symbol "state"))
            (hash-ref jdata (string->symbol "id"))
            (hash-ref jdata (string->symbol "name"))
            ))

(define (json->date-argued jdata)
    (make-date-argued
        (hash-ref jdata (string->symbol "month"))
            (hash-ref jdata (string->symbol "full"))
            (hash-ref jdata (string->symbol "day"))
            (hash-ref jdata (string->symbol "year"))
            ))



; Define the services, and their helpers

(define (get-cases [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM supreme_court LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->court-case result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM supreme_court"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->court-case result)
           ))
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-cases")
    (displayln (length (time (get-cases false))))
    (displayln "Test get-cases")
    (displayln (length (time (get-cases true))))
    
    

    )