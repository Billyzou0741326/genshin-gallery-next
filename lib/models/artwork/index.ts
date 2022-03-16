import type { ArtworkInfoBase } from './base'
import type { ArtworkImageInfo } from './image'
import type { ArtworkModerate } from './moderate'
export type { ArtworkImageInfo } from './image'
export type { ArtworkUri } from './image'

export interface ArtworkInfo extends ArtworkInfoBase {
    images?: ArtworkImageInfo[]
    moderate: ArtworkModerate
    is_404?: boolean
    characters?: string[]
}

/**
 * Data is stored in the `pixiv` db in the `artworks` collection
 *
 * Indexes for 'art_id', 'upload_timestamp' and 'characters' are created for performance
 *
 * Views for `SFW`, `NSFW`, and `R18` image types are created for ease of query
 * 
   {
        "_id" : ObjectId("6222e50100ed3c1df10edef4"),
        "art_id" : NumberLong(94314043),
        "title" : "申鶴さん",
        "tag_str" : "#原神#申鶴#原神10000users入り#着衣巨乳",
        "characters" : [
                "Shenhe"
        ],
        "view_count" : 64882,
        "like_count" : 13903,
        "love_count" : 21467,
        "artist_id" : NumberLong(62635184),
        "upload_timestamp" : NumberLong(1637614046),
        "is_404" : false,
        "sl" : 2,
        "images" : [
                {
                        "urls" : {
                                "thumb_mini" : "https://i.pximg.net/c/128x128/custom-thumb/img/2021/11/23/05/47/26/94314043_p0_custom1200.jpg",
                                "small" : "https://i.pximg.net/c/540x540_70/img-master/img/2021/11/23/05/47/26/94314043_p0_master1200.jpg",
                                "regular" : "https://i.pximg.net/img-master/img/2021/11/23/05/47/26/94314043_p0_master1200.jpg",
                                "original" : "https://i.pximg.net/img-original/img/2021/11/23/05/47/26/94314043_p0.png"
                        },
                        "nsfw" : {
                                "drawings" : 0.9658458828926086,
                                "hentai" : 0.03393281251192093,
                                "neutral" : 0.00015959740267135203,
                                "porn" : 0.00006085155109758489,
                                "sexy" : 9.48483375395881e-7
                        }
                }
        ],
        "moderate" : {
                "type" : "SFW",
                "status" : "PUSH",
                "reason" : ""
        }
    }
 */
