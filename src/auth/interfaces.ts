import { Token } from '@prisma/client';

export interface Tokens {
    accessToken: string;
    refreshToken: Token;
}

export interface JwtPayload {
    id: string;
    email: string;
    roles: string[];
    organizationId: string;
    group: number;
    specialization: string;
    name: string;
    surname: string;
}
