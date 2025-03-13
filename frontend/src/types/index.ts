export interface Song {
  album_id: number,
  artist: string,
  audio_Url: string,
  created_at: Date,
  duration: number,
  image_Url: string,
  song_id: number,
  title: string,
  updated_at: Date
}

export interface Album {
  album_id: number,
  artist: string,
  created_at: Date,
  imageUrl: string,
  releaseYear: number,
  songs: Song[],
  title: string,
  updated_at: Date
}
