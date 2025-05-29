import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransacaoService } from '../transacao.service';

@Component({
  selector: 'app-transacao-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Lista de Transações</h2>
    <div *ngIf="loading">Carregando...</div>
    <div *ngIf="error" class="error">{{ error }}</div>

    <table *ngIf="transacoes.length > 0">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let transacao of transacoes">
          <td>{{ transacao.descricao }}</td>
          <td>{{ transacao.valor | currency : 'BRL' }}</td>
          <td>{{ transacao.tipo }}</td>
          <td>{{ transacao.data | date : 'dd/MM/yyyy' }}</td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="transacoes.length === 0 && !loading">
      Nenhuma transação cadastrada
    </div>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      th,
      td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      .error {
        color: red;
      }
    `,
  ],
})
export class TransacaoListComponent implements OnInit {
  transacoes: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private transacaoService: TransacaoService) {}

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.loading = true;
    this.error = null;

    this.transacaoService.getTransacoes().subscribe({
      next: (data) => {
        this.transacoes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar transações';
        console.error('Erro detalhado:', err);
        this.loading = false;
      },
    });
  }
}
