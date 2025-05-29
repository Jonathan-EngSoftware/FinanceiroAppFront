import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransacaoService } from '../transacao.service';

@Component({
  selector: 'app-transacao-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <form (ngSubmit)="onSubmit()" #transacaoForm="ngForm">
      <div class="form-group">
        <label for="descricao">Descrição:</label>
        <input
          [(ngModel)]="transacao.descricao"
          name="descricao"
          id="descricao"
          placeholder="Ex: Conta de luz"
          required
          minlength="3"
          maxlength="100"
          #descricao="ngModel"
        />
        <div
          *ngIf="descricao.invalid && (descricao.dirty || descricao.touched)"
          class="validation-error"
        >
          <div *ngIf="descricao.errors?.['required']">
            Descrição é obrigatória
          </div>
          <div *ngIf="descricao.errors?.['minlength']">Mínimo 3 caracteres</div>
        </div>
      </div>

      <div class="form-group">
        <label for="valor">Valor (R$):</label>
        <input
          [(ngModel)]="transacao.valor"
          name="valor"
          id="valor"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0,00"
          required
          #valor="ngModel"
        />
        <div
          *ngIf="valor.invalid && (valor.dirty || valor.touched)"
          class="validation-error"
        >
          <div *ngIf="valor.errors?.['required']">Valor é obrigatório</div>
          <div *ngIf="valor.errors?.['min']">Valor mínimo: R$ 0,01</div>
        </div>
      </div>

      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <select
          [(ngModel)]="transacao.tipo"
          name="tipo"
          id="tipo"
          required
          #tipo="ngModel"
        >
          <option value="" disabled selected>Selecione...</option>
          <option value="Receita">Receita</option>
          <option value="Despesa">Despesa</option>
        </select>
        <div
          *ngIf="tipo.invalid && (tipo.dirty || tipo.touched)"
          class="validation-error"
        >
          <div *ngIf="tipo.errors?.['required']">Tipo é obrigatório</div>
        </div>
      </div>

      <button type="submit" [disabled]="transacaoForm.invalid || submitting">
        {{ submitting ? 'Enviando...' : 'Adicionar' }}
      </button>

      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>
    </form>
  `,
  styles: [
    `
      .form-group {
        margin-bottom: 1.5rem;
      }
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      input,
      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }
      button {
        background-color: #4caf50;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
      button:hover:not(:disabled) {
        background-color: #45a049;
      }
      .validation-error,
      .error-message {
        color: #d32f2f;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
      .error-message {
        background-color: #fde0e0;
        padding: 0.5rem;
        border-radius: 4px;
        margin-top: 1rem;
      }
    `,
  ],
})
export class TransacaoFormComponent {
  transacao = { descricao: '', valor: null as number | null, tipo: '' };
  @Output() transacaoAdicionada = new EventEmitter<void>();
  submitting = false;
  error: string | null = null;

  constructor(private transacaoService: TransacaoService) {}

  onSubmit(): void {
    if (this.submitting) return;

    // Validação adicional
    if (!this.transacao.descricao?.trim()) {
      this.error = 'Descrição é obrigatória';
      return;
    }

    if (!this.transacao.valor || this.transacao.valor <= 0) {
      this.error = 'Valor deve ser maior que zero';
      return;
    }

    if (!this.transacao.tipo) {
      this.error = 'Selecione o tipo';
      return;
    }

    this.submitting = true;
    this.error = null;

    const transacaoParaEnviar = {
      descricao: this.transacao.descricao.trim(),
      valor: this.transacao.valor,
      tipo: this.transacao.tipo,
    };

    this.transacaoService.criarTransacao(transacaoParaEnviar).subscribe({
      next: () => {
        this.transacao = { descricao: '', valor: null, tipo: '' };
        this.transacaoAdicionada.emit();
        this.submitting = false;
      },
      error: (err) => {
        this.error =
          err.error?.detail ||
          err.error?.title ||
          'Erro ao adicionar transação. Tente novamente.';
        console.error('Erro completo:', err);
        this.submitting = false;
      },
    });
  }
}
