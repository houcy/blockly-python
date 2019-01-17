#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "video_games.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out completionists)
    (struct-out metadata)
    (struct-out main-story)
    (struct-out release)
    (struct-out video-game)
    (struct-out metrics)
    (struct-out features)
    (struct-out length)
    (struct-out main-+-extras)
    (struct-out all-playstyles)
    get-games
    main)

; Define the structs
(define-struct completionists
    (average median polled leisure rushed))

(define-struct metadata
    (publishers genres licensed? sequel?))

(define-struct main-story
    (average median polled leisure rushed))

(define-struct release
    (rating console re-release? year))

(define-struct video-game
    (features title metrics length release metadata))

(define-struct metrics
    (used-price sales review-score))

(define-struct features
    (online? multiplatform? max-players handheld?))

(define-struct length
    (main-+-extras all-playstyles main-story completionists))

(define-struct main-+-extras
    (average median polled leisure rushed))

(define-struct all-playstyles
    (average median polled leisure rushed))



; Define the JSON->Struct mappers
(define (json->completionists jdata)
    (make-completionists
        (hash-ref jdata (string->symbol "Average"))
            (hash-ref jdata (string->symbol "Median"))
            (hash-ref jdata (string->symbol "Polled"))
            (hash-ref jdata (string->symbol "Leisure"))
            (hash-ref jdata (string->symbol "Rushed"))
            ))

(define (json->metadata jdata)
    (make-metadata
        (hash-ref jdata (string->symbol "Publishers"))
                    (hash-ref jdata (string->symbol "Genres"))
                    (hash-ref jdata (string->symbol "Licensed?"))
            (hash-ref jdata (string->symbol "Sequel?"))
            ))

(define (json->main-story jdata)
    (make-main-story
        (hash-ref jdata (string->symbol "Average"))
            (hash-ref jdata (string->symbol "Median"))
            (hash-ref jdata (string->symbol "Polled"))
            (hash-ref jdata (string->symbol "Leisure"))
            (hash-ref jdata (string->symbol "Rushed"))
            ))

(define (json->release jdata)
    (make-release
        (hash-ref jdata (string->symbol "Rating"))
            (hash-ref jdata (string->symbol "Console"))
            (hash-ref jdata (string->symbol "Re-release?"))
            (hash-ref jdata (string->symbol "Year"))
            ))

(define (json->video-game jdata)
    (make-video-game
        (json->features (hash-ref jdata (string->symbol "Features")))
                (hash-ref jdata (string->symbol "Title"))
            (json->metrics (hash-ref jdata (string->symbol "Metrics")))
                (json->length (hash-ref jdata (string->symbol "Length")))
                (json->release (hash-ref jdata (string->symbol "Release")))
                (json->metadata (hash-ref jdata (string->symbol "Metadata")))
                ))

(define (json->metrics jdata)
    (make-metrics
        (hash-ref jdata (string->symbol "Used Price"))
            (hash-ref jdata (string->symbol "Sales"))
            (hash-ref jdata (string->symbol "Review Score"))
            ))

(define (json->features jdata)
    (make-features
        (hash-ref jdata (string->symbol "Online?"))
            (hash-ref jdata (string->symbol "Multiplatform?"))
            (hash-ref jdata (string->symbol "Max Players"))
            (hash-ref jdata (string->symbol "Handheld?"))
            ))

(define (json->length jdata)
    (make-length
        (json->main-+-extras (hash-ref jdata (string->symbol "Main + Extras")))
                (json->all-playstyles (hash-ref jdata (string->symbol "All PlayStyles")))
                (json->main-story (hash-ref jdata (string->symbol "Main Story")))
                (json->completionists (hash-ref jdata (string->symbol "Completionists")))
                ))

(define (json->main-+-extras jdata)
    (make-main-+-extras
        (hash-ref jdata (string->symbol "Average"))
            (hash-ref jdata (string->symbol "Median"))
            (hash-ref jdata (string->symbol "Polled"))
            (hash-ref jdata (string->symbol "Leisure"))
            (hash-ref jdata (string->symbol "Rushed"))
            ))

(define (json->all-playstyles jdata)
    (make-all-playstyles
        (hash-ref jdata (string->symbol "Average"))
            (hash-ref jdata (string->symbol "Median"))
            (hash-ref jdata (string->symbol "Polled"))
            (hash-ref jdata (string->symbol "Leisure"))
            (hash-ref jdata (string->symbol "Rushed"))
            ))



; Define the services, and their helpers

(define (get-games [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM video_games LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->video-games result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM video_games"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->video-games result)
           ))
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-games")
    (displayln (length (time (get-games false))))
    (displayln "Test get-games")
    (displayln (length (time (get-games true))))
    
    

    )