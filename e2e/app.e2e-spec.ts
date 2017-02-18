import { NgAirtableAppPage } from './app.po';

describe('ng-airtable-app App', function() {
  let page: NgAirtableAppPage;

  beforeEach(() => {
    page = new NgAirtableAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
