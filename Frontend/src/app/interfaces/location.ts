export interface resultUbi {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}

export interface Location {
    info: {
            count: number;
            pages: number;
            next: string | null;
            prev: string | null;
        };
        results: resultUbi[];
}
