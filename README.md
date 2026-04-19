# Cálculo de Comisiones con React + Supabase

## Descripción

La aplicación web permite calcular la comisión de ventas de vendedores en base a un rango de fechas, utilizando **React** para el frontend y **Supabase** como backend.

---

## Estructura de la Base de Datos

### Vendedor
<img width="802" height="219" alt="image" src="https://github.com/user-attachments/assets/fed25bdf-bd8f-4693-98d0-ee57be2adaa4" />


### Ventas
<img width="887" height="530" alt="image" src="https://github.com/user-attachments/assets/c0e1b98b-e605-4b94-a888-b96b8e8feaa9" />


### Reglas
<img width="835" height="225" alt="image" src="https://github.com/user-attachments/assets/eec51977-9b1a-441a-8475-5e104972387a" />

---

## Instalación

1. Clona el repositorio o descarga el código:
   ```bash
   git clone https://github.com/tu-usuario/minicore.git
   cd minicore
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea el archivo `.env` en la carpeta raíz del proyecto con las siguientes variables:
   ```
   REACT_APP_SUPABASE_URL=https://tu-proyecto.supabase.co
   REACT_APP_SUPABASE_KEY=tu_anon_key
   ```
   > Puedes obtener estos valores en **Supabase → Project Settings → API**.

---

## Uso

1. Inicia la aplicación:
   ```bash
   npm start
   ```

2. Ingresa un rango de fechas y haz clic en **"Calcular"** para ver la comisión de cada vendedor en ese periodo.

---

## Estructura del Proyecto
<img width="300" height="701" alt="image" src="https://github.com/user-attachments/assets/d43d76c3-d2c1-4c93-bcff-fb82c5375f63" />

---

## Créditos

- [Tutorial de referencia](https://www.youtube.com/watch?v=oqVrl95alBQ)
- [Documentación de React](https://react.dev/learn)
- [Documentación de Supabase](https://supabase.com/docs/guides/database/overview)
