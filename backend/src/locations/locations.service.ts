import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class LocationsService {
    constructor(private readonly supabaseService: SupabaseService) {}
    async findAll() {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('locations')
            .select('*');

        if (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }

        return data;
    }
}
