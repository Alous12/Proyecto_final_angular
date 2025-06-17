import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class CharactersService {
    constructor(private readonly supabaseService: SupabaseService) {}
    async findAll() {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('characters')
            .select('*');

        if (error) {
            throw new Error(`Error fetching characters: ${error.message}`);
        }

        return data;
    }
}
