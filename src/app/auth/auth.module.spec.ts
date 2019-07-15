import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  let authenticationModule: AuthModule;

  beforeEach(() => {
    authenticationModule = new AuthModule();
  });

  it('should create an instance', () => {
    expect(authenticationModule).toBeTruthy();
  });
});
