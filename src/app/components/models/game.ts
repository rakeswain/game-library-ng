import { Genre } from "./genre";
import { Publishers } from "./publishers";
import { ParentPlatform } from "./parentPlatform";
import { Rating } from "./rating";
import { Screenshots } from "./screenshots";
import { Trailer } from "./trailer";

export interface Game {
    id : string;
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    genres: Array<Genre>;
    parent_platforms: Array<ParentPlatform>;
    publishers: Array<Publishers>;
    ratings: Array<Rating>;
    screenshots: Array<Screenshots>;
    trailers: Array<Trailer>;
  }