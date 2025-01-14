export interface User {
    roleId: number; // Contoh: 1 = Admin, 2 = User
    token: string;
}

// Simulasi mendapatkan pengguna saat ini (JWT dan roleId disimpan di localStorage)
export const getCurrentUser = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Cek apakah roleId pengguna termasuk dalam daftar yang diizinkan
export const hasRole = (allowedRoles: number[]): boolean => {
    const user = getCurrentUser();
    return user ? allowedRoles.includes(user.roleId) : false;
};
