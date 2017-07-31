import { Angular4StarterPage } from './app.po';

describe('angular4-starter App', () => {
  let page: Angular4StarterPage;

  beforeEach(() => {
    page = new Angular4StarterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
