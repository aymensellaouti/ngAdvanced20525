import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable } from 'rxjs';
import { CONSTANTES } from 'src/config/const.config';

export interface ConnectedUser {
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Todo : Créer le flux de l'utilisateur connecté ConnectedUser | null
  // connectedUser$

  // Flux isLoggedIn$ Boolean informant si on est authentifié ou non
  // Flux isLoggedOut$ Boolean informant si on est non authentifié ou non
  constructor(private http: HttpClient) {}

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    // Garder la trace du user connecté au chargement
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return localStorage.getItem(CONSTANTES.tokenKey) ?? '';
  }

  clearToken(): void {
    localStorage.removeItem(CONSTANTES.tokenKey);
  }

  saveToken(tokenValue: string): void {
    localStorage.setItem(CONSTANTES.tokenKey, tokenValue);
  }

  logout() {
    this.clearToken();
  }
}
