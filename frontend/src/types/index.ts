export interface Song {
  album_id: number,
  artist: string,
  audio_Url: string,
  album_title: string,
  created_at: string,
  duration: number,
  image_Url: string,
  song_id: number,
  title: string,
  updated_at: string
}

export interface Album {
  album_id: number,
  artist: string,
  created_at: string,
  imageUrl: string,
  releaseYear: number,
  song: Song[],
  title: string,
  updated_at: string
}

export interface Playlist {
  name: string,
  description: string,
  playlist_id: number,
  image_url: string,
  songs: Song[],
  clerk_id: number,
  created_at: string,
  updated_at: string
}

export interface NewPlaylist {
  name: string,
  description: string,
  image_url: string
}

export interface User {
  clerkId: string,
  created_ad: string,
  image_Url: string,
  updated_at: string,
  user_fullname: string
}

export interface Stats {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
}

export interface NewSong {
  title: string,
  artist: string,
  album: string,
  duration: string
}

export interface NewAlbum {
  title: string,
  artist: string,
  releaseYear: string
}