import { CarDriverManagerPage } from './app.po';

describe('car-driver-manager App', () => {
  let page: CarDriverManagerPage;

  beforeEach(() => {
    page = new CarDriverManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
