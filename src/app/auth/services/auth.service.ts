import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
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
  #connectedUser$: BehaviorSubject<ConnectedUser | null> =
    new BehaviorSubject<ConnectedUser | null>(null);
  connectedUser$ = this.#connectedUser$.asObservable();
  // Flux isLoggedIn$ Boolean informant si on est authentifié ou non
  isLoggedIn$: Observable<boolean> = this.connectedUser$.pipe(
    map((user) => !!user)
  );
  // Flux isLoggedOut$ Boolean informant si on est non authentifié ou non
  isLoggedOut$: Observable<boolean> = this.connectedUser$.pipe(
    map((user) => !user)
  );

  constructor(private http: HttpClient) {
    // A la construction de la classe
    // Je vérifie le localStorage
    const user = this.getConnectedUser();
    if (user) {
      this.#connectedUser$.next(user);
    }
    // si user  => j'ajoute le user dans le flux des users
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    // Garder la trace du user connecté au chargement
    // A la connexion on doit sauvgarder le user fel localstorage
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        this.saveData(response, credentials);
        const user = {
          id: response.userId,
          email: credentials.email,
        };
        this.#connectedUser$.next(user);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return localStorage.getItem(CONSTANTES.tokenKey) ?? '';
  }

  clearToken(): void {
    localStorage.removeItem(CONSTANTES.tokenKey);
    localStorage.removeItem(CONSTANTES.connectedUser);
  }

  saveToken(tokenValue: string): void {
    localStorage.setItem(CONSTANTES.tokenKey, tokenValue);
  }
  saveUser(email: string, id: number) {
    localStorage.setItem(
      CONSTANTES.connectedUser,
      JSON.stringify({ id, email })
    );
  }
  getConnectedUser(): ConnectedUser | null {
    const user = localStorage.getItem(CONSTANTES.connectedUser);
    return user ? JSON.parse(user) : null;
  }

  saveData(response: LoginResponseDto, credentials: CredentialsDto): void {
    this.saveToken(response.id);
    this.saveUser(credentials.email, response.userId);
  }

  logout() {
    this.clearToken();
    // Je gére les flux je mets null dans le flux des connectedUser
    this.#connectedUser$.next(null);
  }
}
