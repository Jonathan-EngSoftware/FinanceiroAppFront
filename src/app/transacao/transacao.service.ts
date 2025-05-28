import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface FinanceiroServicoDTO {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  tipo: string;
}

export interface Transacao {
  descricao: string;
  valor: number;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransacaoServico {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTransacoes(): Observable<FinanceiroServicoDTO[]> {
    return this.http.get<FinanceiroServicoDTO[]>(`${this.apiUrl}/transacoes`);
  }

  criarTransacao(transacao: Transacao): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transacoes`, transacao);
  }
}
