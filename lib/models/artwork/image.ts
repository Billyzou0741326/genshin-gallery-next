export interface ArtworkUri {
    thumb_mini: string
    small:      string
    regular:    string
    original:   string
}

export interface NSFWEvaluation {
    drawings: number
    hentai:   number
    neutral:  number
    porn:     number
    sexy:     number
}

export interface ArtworkImageInfo {
    urls?: ArtworkUri
    nsfw?: NSFWEvaluation
}
