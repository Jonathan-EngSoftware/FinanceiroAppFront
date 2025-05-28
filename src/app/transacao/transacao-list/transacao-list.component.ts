import { Component, OnInit } from '@angular/core';
import { TransacaoServico, FinanceiroServicoDTO } from '../transacao.service';
import { TransacaoFormComponent } from '../transacao-form/transacao-form.component';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-transacao-list',
  standalone: true,
  template: `
    <h2>Lista de Transações - FinanceiroApp</h2>
    <ul>
      <li *ngFor="let transacao of transacoes">
        {{ transacao.descricao }} - {{ transacao.valor | currency : 'BRL' }} ({{
          transacao.tipo
        }}) - {{ transacao.data }}
      </li>
    </ul>
    <app-transacao-form
      (transacaoAdicionada)="atualizarLista()"
    ></app-transacao-form>
  `,
  imports: [CommonModule, TransacaoFormComponent], // Adicionado CommonModule
})
export class TransacaoListComponent implements OnInit {
  transacoes: FinanceiroServicoDTO[] = [];

  constructor(private transacaoServico: TransacaoServico) {}

  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista(): void {
    this.transacaoServico.getTransacoes().subscribe((data) => {
      this.transacoes = data;
    });
  }
}
