// src/modules/profile/profile.controller.ts
import type { Request, Response } from 'express';
import { 
    findProfileByUserId, 
    updateProfileDetails,
    createProfile,
} from './profile.service.js';
import type { 
    UpdateProfileDetailsInput,
    ProfileWithUser // ✅ Importar como TYPE (si solo se usa como tipo)
} from './profile.service.js';

// NOTA: Asumo que tienes una interfaz para req.user extendiendo la de Express
// declare global { namespace Express { interface Request { user?: { sub: string, email: string } } } }

/**
 * Función auxiliar para formatear la respuesta del perfil.
 */
const formatProfileResponse = (profile: ProfileWithUser) => ({
    bio: profile.bio,
    phone: profile.phone,
    address: profile.address,
    user: {
        id: profile.user.id,
        email: profile.user.email,
        name: profile.user.name,
    }
});


/**
 * Obtiene el perfil del usuario autenticado (GET /api/profile/me)
 */
export async function getMyProfileCtrl(req: Request, res: Response): Promise<Response> {
    try {
        if (!req.user || !req.user.sub) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        
        const userId = Number(req.user.sub);
        
        const profile = await findProfileByUserId(userId);
        
        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado.' });
        }
        
        return res.json(formatProfileResponse(profile));
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Actualiza el perfil del usuario autenticado (PATCH /api/profile/me)
 */
export async function updateMyProfileCtrl(req: Request<{}, {}, UpdateProfileDetailsInput>, res: Response): Promise<Response> {
    try {
        if (!req.user || !req.user.sub) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        
        const userId = Number(req.user.sub);
        const data = req.body;
        
        try {
            // Intenta actualizar el perfil
            const updatedProfile = await updateProfileDetails(userId, data);
            
            return res.json(formatProfileResponse(updatedProfile));
            
        } catch (error: any) {
            // Manejo de error si el perfil no existe (P2025)
            if (error.code === 'P2025') {
                // Si el perfil no existe, lo creamos.
                const newProfile = await createProfile(userId, data);
                return res.status(201).json(formatProfileResponse(newProfile));
            }
            
            // Otros errores
            return res.status(500).json({ message: error.message });
        }
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}