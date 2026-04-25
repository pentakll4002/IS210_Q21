import api from './api';

export interface NguoiDung {
  maNguoiDung: string;
  tenND: string;
  email: string;
  soDienThoai: string | null;
  diaChi: string | null;
  vaiTro: string;
}

export interface AuthResponse {
  nguoiDung: NguoiDung;
  token: string;
}

export const authService = {
  login: async (email: string, matKhau: string) => {
    const response = await api.post<AuthResponse>('/nguoidung/dang-nhap', { email, matKhau });
    const { nguoiDung, token } = response.data;
    localStorage.setItem('sneaksurf_token', token);
    localStorage.setItem('sneaksurf_user', JSON.stringify(nguoiDung));
    return { nguoiDung, token };
  },

  register: async (tenND: string, email: string, matKhau: string) => {
    const response = await api.post<AuthResponse>('/nguoidung/dang-ky', { tenND, email, matKhau });
    const { nguoiDung, token } = response.data;
    localStorage.setItem('sneaksurf_token', token);
    localStorage.setItem('sneaksurf_user', JSON.stringify(nguoiDung));
    return { nguoiDung, token };
  },

  getCurrentUser: async () => {
    const response = await api.get<NguoiDung>('/nguoidung/toi');
    return response.data;
  },

  updateProfile: async (data: { tenND?: string; soDienThoai?: string; diaChi?: string }) => {
    const response = await api.put<NguoiDung>('/nguoidung/cap-nhat', data);
    localStorage.setItem('sneaksurf_user', JSON.stringify(response.data));
    return response.data;
  },

  changePassword: async (matKhauCu: string, matKhauMoi: string) => {
    const response = await api.post('/nguoidung/doi-mat-khau', { matKhauCu, matKhauMoi });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('sneaksurf_token');
    localStorage.removeItem('sneaksurf_user');
  },
};
