

export interface UserData {
    rut: string;
    nombre: string;
    fecha_nac: string;
    correo: string;
    nombre_usu: string;
    password: string;
}

export const validarRut = (rut: string): boolean => { 
    return /^\d{7,8}-[\dKk]$/.test(rut); 
};

export const validarCorreo = (email: string): boolean => { 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
};

export const validarPassword = (pass: string): boolean => { 
    return pass.length >= 6; 
};

export const validarEdad = (fecha: string): boolean => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    if (isNaN(nacimiento.getTime())) return false;
    
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const ajuste = (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) ? 1 : 0;
    
    return (edad - ajuste) >= 18;
};

const USER_STORAGE_KEY = 'users';

export const getUsers = (): UserData[] => {
    const usersJson = localStorage.getItem(USER_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
};

export const saveUser = (newUser: UserData): void => {
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    window.dispatchEvent(new Event('asfalto_users_updated')); 
};

// Función para obtener el usuario activo
export const getActiveUser = (): UserData | null => {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;
    
    try {
        const partialUser = JSON.parse(userJson);
        const users = getUsers();
        // Buscar el usuario completo en la base de datos (localStorage)
        return users.find(u => u.nombre_usu === partialUser.nombre_usu) || null;
    } catch {
        return null;
    }
}