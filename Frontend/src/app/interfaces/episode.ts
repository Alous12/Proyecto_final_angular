export interface resultsEpi {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

export interface Episode {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: resultsEpi[];
}
