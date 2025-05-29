import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  tipo: string;
  data?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private apiUrl = `${environment.apiUrl}/financeiro`;

  constructor(private http: HttpClient) { }

  getTransacoes(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.apiUrl);
  }

  criarTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(this.apiUrl, transacao);
  }
}