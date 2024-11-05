# DSW
# Instructivo para Ejecutar la Aplicación de Supermercado

## Pasos Previos

1. **Importar la Base de Datos**  
   Descargue e importe la base de datos disponible en el siguiente [link](https://drive.google.com/drive/folders/161ff6KvdjDVE-t3Fj0cpkYZlMsR5CaGj?usp=sharing).

2. **Configurar la Conexión a la Base de Datos**  
   Modifique el archivo de configuración de la base de datos en:  
   `DSW/backend/src/shared/db`  
   Asegúrese de que los datos de conexión (host, usuario, contraseña, etc.) coincidan con los de su entorno local.

## Instalación de Dependencias

Ejecute el siguiente comando en cada directorio para instalar las dependencias necesarias:

- **Backend**:  
  Navegue al directorio `DSW/backend` y ejecute: pnpm install

- **Frontend**:  
  Navegue al directorio `DSW/frontend/SuperUTN` y ejecute: pnpm install

## Correr los servidores
- **Backend**:  
  Navegue al directorio `DSW/backend` y ejecute: pnpm start:dev

- **Frontend**:  
  Navegue al directorio `DSW/frontend/SuperUTN` y ejecute: ng serve

