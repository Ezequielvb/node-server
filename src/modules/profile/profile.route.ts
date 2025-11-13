// src/modules/profile/profile.route.ts

import { Router } from 'express';
import { auth } from '../../middleware/auth.js'; 
import { validate } from '../../middleware/validate.js'; 
import { updateProfileDetailsSchema } from './profile.schema.js';
import { getMyProfileCtrl, updateMyProfileCtrl } from './profile.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 * name: Profile
 * description: Operaciones relacionadas con el perfil del usuario autenticado
 */

/**
 * @swagger
 * /api/profile/me:
 * get:
 * summary: Obtiene los detalles del perfil del usuario autenticado.
 * tags: [Profile]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Detalles del perfil.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * bio: { type: string, nullable: true }
 * phone: { type: string, nullable: true }
 * address: { type: string, nullable: true }
 * user: 
 * type: object
 * properties:
 * id: { type: integer }
 * email: { type: string }
 * name: { type: string }
 * 401:
 * description: No autorizado
 * 404:
 * description: Perfil no encontrado
 * patch:
 * summary: Actualiza los detalles del perfil del usuario autenticado.
 * tags: [Profile]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UpdateProfileDetailsInput'
 * responses:
 * 200:
 * description: Perfil actualizado.
 * 201:
 * description: Perfil creado y actualizado.
 * 401:
 * description: No autorizado
 * 400:
 * description: Datos de entrada inválidos
 */
router.get('/me', auth, getMyProfileCtrl);
router.patch('/me', auth, validate(updateProfileDetailsSchema), updateMyProfileCtrl);

export default router;