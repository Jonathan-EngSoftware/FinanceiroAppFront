import { Component, EventEmitter, Output } from '@angular/core';
import { TransacaoServico, Transacao } from '../transacao.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transacao-form',
  standalone: true,
  template: `
    <form (ngSubmit)="onSubmit()">
      <input
        [(ngModel)]="transacao.descricao"
        name="descricao"
        placeholder="Descrição"
        required
      />
      <input
        [(ngModel)]="transacao.valor"
        name="valor"
        type="number"
        placeholder="Valor"
        required
      />
      <select [(ngModel)]="transacao.tipo" name="tipo" required>
        <option value="Receita">Receita</option>
        <option value="Despesa">Despesa</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  `,
  imports: [FormsModule],
})
export class TransacaoFormComponent {
  transacao: Transacao = { descricao: '', valor: 0, tipo: 'Receita' };
  @Output() transacaoAdicionada = new EventEmitter<void>();

  constructor(private transacaoServico: TransacaoServico) {}

  onSubmit(): void {
    this.transacaoServico.criarTransacao(this.transacao).subscribe(() => {
      this.transacao = { descricao: '', valor: 0, tipo: 'Receita' };
      this.transacaoAdicionada.emit();
    });
  }
}
