export interface ActorDetails {
  adult: boolean
  also_known_as: Array<string>
  biography: string
  birthday: string
  deathday: string | null
  gender: number
  homepage: string | null
  id: number
  imdb_id?: string
  known_for_department?: string
  movie_credits: { cast: MovieCredits[]; crew?: Crew[] }
  name: string
  place_of_birth: string
  popularity?: number
  profile_path: string | null
  tv_credits: { cast: Tv[]; crew?: Crew[] }
}

export interface Crew {
  credit_id: string
  department: string
  job: string
  origin_country: Array<string>
  original_name: string
}

interface Languages {
  english_name: string
  iso_639_1: string
  name: string
}

export interface MovieCredits {
  adult: boolean
  backdrop_path: string | null
  character: string
  credit_id: string
  genre_ids: Array<number>
  id: number
  order: number
  original_language: string
  name?: string | undefined
  original_name?: string | undefined
  original_title?: string
  overview?: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export interface ResultList {
  adult: boolean
  backdrop_path: string | null
  genre_ids: Array<number>
  id: number
  media_type: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  profile_path?: string | null
  name?: string | undefined
  original_name?: string | undefined
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface Seasons {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
}

export interface Tv {
  backdrop_path: string | null
  character: string
  created_by?: string[]
  credit_id: string
  credits?: {
    cast: MovieCredits[]
    crew: Crew[]
  }
  episode_run_time?: Array<number>
  first_air_date: string
  genres?: string[]
  genre_ids: Array<number>
  homepage?: string
  in_production?: boolean
  languages?: Array<string>
  last_air_date?: string
  last_episode_to_air?: {
    air_date: string
    episode_number: number
    id: number
    name: string
    overview: string
  }
  networks?: string[]
  next_episode_to_air?: number | null
  number_of_episodes?: number | null
  number_of_seasons?: number | null
  origin_country: Array<string>
  original_language: string
  original_name: string
  popularity: number
  production_companies?: string[]
  production_countries?: string[]
  seasons?: Seasons[]
  air_date?: number
  episode_count?: number
  id: number
  name: string
  overview?: string
  poster_path: string | null
  release_date: string
  season_number?: number
  title?: string
  spoken_languages?: Languages[]
  status?: string
  tagline?: string
  type?: string
  vote_average: number
  vote_count: number
}
