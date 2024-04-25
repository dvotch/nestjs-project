import { Categories } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class getCategoriesResponse implements Categories {
    @Exclude()
    id: string;

    name: string;

    constructor(categories: Categories[]) {
        Object.assign(this, categories);
    }
}
