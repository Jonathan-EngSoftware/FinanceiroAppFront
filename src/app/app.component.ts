import { Component } from '@angular/core';
import { TransacaoListComponent } from './transacao/transacao-list/transacao-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransacaoListComponent],
  template: ` <app-transacao-list></app-transacao-list> `,
})
export class AppComponent {
  title = 'FinanceiroApp';
}
