import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class EpisodesService {
    constructor(private readonly supabaseService: SupabaseService) {}
    async findAll() {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('episodes')
            .select('*');

        if (error) {
            throw new Error(`Error fetching episodes: ${error.message}`);
        }

        return data;
    }
}
