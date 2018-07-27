import { FirechatModule } from './firechat.module';

describe('FirechatModule', () => {
  let firechatModule: FirechatModule;

  beforeEach(() => {
    firechatModule = new FirechatModule();
  });

  it('should create an instance', () => {
    expect(firechatModule).toBeTruthy();
  });
});
