import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TransacaoListComponent } from './transacao/transacao-list/transacao-list.component';
import { TransacaoFormComponent } from './transacao/transacao-form/transacao-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    //RouterOutlet,
    TransacaoListComponent,
    TransacaoFormComponent,
  ],
  template: `
    <div class="container">
      <h1>Controle Financeiro</h1>
      <app-transacao-form
        (transacaoAdicionada)="transacaoList.carregarTransacoes()"
      >
      </app-transacao-form>
      <app-transacao-list #transacaoList></app-transacao-list>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      h1 {
        color: #333;
        text-align: center;
        margin-bottom: 30px;
      }
    `,
  ],
})
export class AppComponent {
  @ViewChild('transacaoList') transacaoList!: TransacaoListComponent;
}
