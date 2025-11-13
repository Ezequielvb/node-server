// src/modules/profile/profile.service.ts

import { prisma } from '../../config/db.js';
import type { Prisma } from '@prisma/client'; 

// Define el tipo de datos para la actualización del perfil
export type UpdateProfileDetailsInput = Pick<
    Prisma.ProfileUpdateInput, 
    'bio' | 'phone' | 'address'
>;

// 1. Incluye la información del usuario en el resultado del perfil
// Usamos 'satisfies Prisma.ProfileSelect' o 'Prisma.ProfileArgs['select']'
const profileSelect = {
    bio: true,
    phone: true,
    address: true,
    user: { 
        select: { 
            id: true, 
            email: true, 
            name: true 
        } 
    }
} satisfies Prisma.ProfileSelect; // Asegúrate de que tu versión de Prisma soporte 'satisfies' y este tipo

// 2. Tipo de retorno para las funciones que devuelven un perfil con datos de usuario
export type ProfileWithUser = Prisma.ProfileGetPayload<{
    select: typeof profileSelect;
}>;


/**
 * Encuentra el perfil de un usuario por su ID.
 */
export async function findProfileByUserId(userId: number): Promise<ProfileWithUser | null> {
    return prisma.profile.findUnique({ 
        where: { userId },
        select: profileSelect // 3. Uso de la constante 'profileSelect'
    });
}

/**
 * Crea un nuevo perfil. 
 */
export async function createProfile(userId: number, data: UpdateProfileDetailsInput): Promise<ProfileWithUser> {
    return prisma.profile.create({
        data: {
            userId,
            ...data,
        },
        select: profileSelect
    });
}

/**
 * Actualiza el perfil de un usuario por su ID de usuario.
 */
export async function updateProfileDetails(userId: number, data: UpdateProfileDetailsInput): Promise<ProfileWithUser> {
    return prisma.profile.update({
        where: { userId },
        data,
        select: profileSelect
    });
}