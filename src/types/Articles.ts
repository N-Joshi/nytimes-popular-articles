interface MediaMetadata {
  url: string;
}

interface Media {
  'media-metadata': MediaMetadata[];
}

export interface Article {
  id: number;
  title: string;
  abstract: string;
  url: string;
  byline: string;
  published_date: string;
  media: Media[];
}
