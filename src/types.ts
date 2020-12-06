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
  movie_credits: { cast: Cast[]; crew?: Crew[] }
  name: string
  place_of_birth: string
  popularity?: number
  profile_path: string | null
  tv_credits: { cast: Cast[]; crew?: Crew[] }
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
  genres: Genres[]
  id: number
  order: number
  original_language: string
  name?: string | undefined
  original_name?: string | undefined
  original_title?: string
  overview?: string
  popularity: number
  profile_path: string
  production_companies?: Labels[]
  production_countries?: Genres[]
  poster_path: string | null
  runtime: number
  status: string
  tagline: string
  credits?: {
    cast: Cast[]
    crew: Crew[]
  }
  release_date: string
  title: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export interface ResultList {
  adult: boolean
  backdrop_path?: string | null
  genre_ids?: Array<number>
  id: number
  media_type: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  profile_path?: string | null
  name: string | undefined
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
interface Genres {
  id?: number
  iso_3166_1?: string
  name: string
}

interface Labels {
  name: string
  id: number
  logo_path: string | null
  origin_country: string
}
interface CreditsLabel {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string | null
}

export interface Tv {
  backdrop_path?: string | null
  character?: string
  created_by?: CreditsLabel[]
  credit_id?: string
  credits: {
    cast: Cast[]

    crew: Crew[]
  }
  episode_run_time?: Array<number>
  first_air_date: string
  genres?: Genres[]
  genre_ids?: Array<number>
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
  networks?: Labels[]
  next_episode_to_air?: number | null
  number_of_episodes?: number | null
  number_of_seasons?: number | null
  origin_country: Array<string>
  original_language: string
  original_name: string
  popularity: number
  production_companies?: Labels[]
  production_countries?: Genres[]
  seasons?: Seasons[]
  air_date?: number
  episode_count?: number
  id: number
  name: string
  overview?: string
  poster_path: string | null
  season_number?: number
  title?: string
  spoken_languages?: Languages[]
  status?: string
  tagline?: string
  type?: string
  vote_average: number
  vote_count: number
}

interface Cast {
  adult: false
  id: number
  gender?: 2
  first_air_date: string
  name?: string
  title?: string
  original_title?: string
  poster_path?: string
  release_date: string
  original_name?: string
  popularity: number
  overview?: string
  profile_path?: string
  original_language?: string
  character: string
  credit_id: string
  order: number
  genre_ids?: Array<number>
}
