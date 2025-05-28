import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransacaoServico } from './transacao.service';

describe('TransacaoServico', () => {
  let service: TransacaoServico;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransacaoServico],
    });
    service = TestBed.inject(TransacaoServico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
