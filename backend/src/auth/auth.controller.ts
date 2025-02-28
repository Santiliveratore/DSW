import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

// Define una interfaz para extender el tipo Request de Express
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Obtén el token del header 'Authorization'
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Verifica el token
    jwt.verify(token, SECRET_KEY as string, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado.' });
        }

        req.user = user;
        next();
    });
};

// Middleware para verificar si el usuario es administrador
export const verificarAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
      }
    
      next(); // Si el rol es correcto, pasa al siguiente middleware o controlador
    };
