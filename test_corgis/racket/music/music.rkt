#lang racket

; Load the internal libraries
(require htdp/error)
(require json)
(require racket/port)
(require racket/format)
(require net/url)
(require db)

(define database-name "music.db")
(define database (sqlite3-connect #:database database-name))
(define hardware-limit 1000)
(define test-mode false)

; Provide the external structs
(provide
    (struct-out music)
    (struct-out artist)
    (struct-out song)
    (struct-out release)
    get-songs
    main)

; Define the structs
(define-struct music
    (release artist song))

(define-struct artist
    (terms-freq terms name familiarity longitude hotttnesss location latitude similar id))

(define-struct song
    (mode-confidence artist-mbtags-count key-confidence tatums-start year duration hotttnesss end-of-fade-in beats-start time-signature-confidence title bars-confidence id bars-start artist-mbtags start-of-fade-out tempo key beats-confidence tatums-confidence mode time-signature loudness))

(define-struct release
    (name id))



; Define the JSON->Struct mappers
(define (json->music jdata)
    (make-music
        (json->release (hash-ref jdata (string->symbol "release")))
                (json->artist (hash-ref jdata (string->symbol "artist")))
                (json->song (hash-ref jdata (string->symbol "song")))
                ))

(define (json->artist jdata)
    (make-artist
        (hash-ref jdata (string->symbol "terms_freq"))
            (hash-ref jdata (string->symbol "terms"))
            (hash-ref jdata (string->symbol "name"))
            (hash-ref jdata (string->symbol "familiarity"))
            (hash-ref jdata (string->symbol "longitude"))
            (hash-ref jdata (string->symbol "hotttnesss"))
            (hash-ref jdata (string->symbol "location"))
            (hash-ref jdata (string->symbol "latitude"))
            (hash-ref jdata (string->symbol "similar"))
            (hash-ref jdata (string->symbol "id"))
            ))

(define (json->song jdata)
    (make-song
        (hash-ref jdata (string->symbol "mode_confidence"))
            (hash-ref jdata (string->symbol "artist_mbtags_count"))
            (hash-ref jdata (string->symbol "key_confidence"))
            (hash-ref jdata (string->symbol "tatums_start"))
            (hash-ref jdata (string->symbol "year"))
            (hash-ref jdata (string->symbol "duration"))
            (hash-ref jdata (string->symbol "hotttnesss"))
            (hash-ref jdata (string->symbol "end_of_fade_in"))
            (hash-ref jdata (string->symbol "beats_start"))
            (hash-ref jdata (string->symbol "time_signature_confidence"))
            (hash-ref jdata (string->symbol "title"))
            (hash-ref jdata (string->symbol "bars_confidence"))
            (hash-ref jdata (string->symbol "id"))
            (hash-ref jdata (string->symbol "bars_start"))
            (hash-ref jdata (string->symbol "artist_mbtags"))
            (hash-ref jdata (string->symbol "start_of_fade_out"))
            (hash-ref jdata (string->symbol "tempo"))
            (hash-ref jdata (string->symbol "key"))
            (hash-ref jdata (string->symbol "beats_confidence"))
            (hash-ref jdata (string->symbol "tatums_confidence"))
            (hash-ref jdata (string->symbol "mode"))
            (hash-ref jdata (string->symbol "time_signature"))
            (hash-ref jdata (string->symbol "loudness"))
            ))

(define (json->release jdata)
    (make-release
        (hash-ref jdata (string->symbol "name"))
            (hash-ref jdata (string->symbol "id"))
            ))



; Define the services, and their helpers

(define (get-songs [test #t]) 

    (if (or test-mode test)
        (let* [(result (query-list database 
                                  (format "SELECT data FROM music LIMIT ~a" hardware-limit)
                                ))
               (result (map string->jsexpr result))]
           (map json->music result)
           )(let* [(result (query-list database 
                                   "SELECT data FROM music"
                                ))
               (result (map string->jsexpr result))
               ]
           (map json->music result)
           ))
)


(define (main)
    (displayln "Running tests")
    
    (displayln "Production get-songs")
    (displayln (length (time (get-songs false))))
    (displayln "Test get-songs")
    (displayln (length (time (get-songs true))))
    
    

    )