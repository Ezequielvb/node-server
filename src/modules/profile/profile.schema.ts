// src/modules/profile/profile.schema.ts

import { z } from 'zod';

export const updateProfileDetailsSchema = z.object({
    bio: z.string().max(255, 'La biografía no puede exceder 255 caracteres').optional(),
    phone: z.string().regex(/^\+?(\d[\s-]?){8,15}\d$/, 'Número de teléfono inválido').optional(),
    address: z.string().min(5, 'La dirección es muy corta').optional(),
}).strict(); // Usa .strict() para prevenir campos no definidos

export type UpdateProfileDetailsInput = z.infer<typeof updateProfileDetailsSchema>;