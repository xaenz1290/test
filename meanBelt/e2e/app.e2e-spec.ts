import { MeanBeltPage } from './app.po';

describe('mean-belt App', () => {
  let page: MeanBeltPage;

  beforeEach(() => {
    page = new MeanBeltPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
