import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

// Define una interfaz extendida para incluir la información del usuario
interface AuthenticatedRequest extends Request {
    user?: { id: number; email: string; rol: string }; // Tipado más estricto
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1]; // Formato: "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
        }

        // Verifica el token y decodifica la información
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido o expirado.' });
            }

            // Asegurar que el token decodificado tiene la estructura esperada
            if (!decoded || typeof decoded !== 'object' || !('id' in decoded) || !('email' in decoded) || !('rol' in decoded)) {
                return res.status(403).json({ message: 'Token malformado.' });
            }

            req.user = decoded as { id: number; email: string; rol: string };
            next();
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error interno en la autenticación.' });
    }
};

// Middleware para verificar si el usuario es administrador
export const verificarAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Acceso denegado. Usuario no autenticado.' });
    }

    if (req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }

    next();
};
