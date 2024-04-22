import { TestBed } from '@angular/core/testing';

import { YInterceptor } from './y.interceptor';

describe('YInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      YInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: YInterceptor = TestBed.inject(YInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
