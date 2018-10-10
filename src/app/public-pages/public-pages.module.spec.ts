import { PublicPagesModule } from './public-pages.module';

describe('PublicPagesModule', () => {
  let publicPagesModule: PublicPagesModule;

  beforeEach(() => {
    publicPagesModule = new PublicPagesModule();
  });

  it('should create an instance', () => {
    expect(publicPagesModule).toBeTruthy();
  });
});
