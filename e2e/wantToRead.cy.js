function setup() {
    cy.intercept(
    {
        method: 'POST',
        url: '/shelf/*',
    }
    ).as('addToShelf');
}
describe('Add Book to My Books.', function()  {

    function searchFromTop(text){
        var xpath = '//*[@id="bodycontainer"]/div/div[2]/div/header/div[2]/div/div[2]/form/input[1]';
        cy.xpath(xpath).type(text);
        cy.get(xpath).click();
    }

    function searchFromLeft(text){
        var xpath = '//*[@id="bodycontainer"]/div/div[4]/main/div[1]/section[1]/div/div/footer/div[1]/div/form/input[1]';
        cy.xpath(xpath).type(text);
        cy.xpath(xpath).click();
    }

    it('Search Book From Top', function() {
        cy.visit(Cypress.env('baseUrl'));
        searchFromTop('yellowf');
        cy.url().should('contain', 'search?q=yellowf');
        cy.get('.tableList').should('exist');
        cy.get('.tableList').find('tbody').find('tr:nth-child(1)').find('td:nth-child(2)').find('a').find('span').should('have.text', 'Yellowface');
        //assert load time
    })

    it('Search Book From Left', function() {
        cy.visit(Cypress.env('baseUrl'));
        searchFromLeft('yellowf');
        cy.url().should('contain', 'search?q=yellowf');
        cy.get('.tableList').should('exist');
        cy.get('.tableList').find('tbody').find('tr:nth-child(1)').find('td:nth-child(2)').find('a').find('span').should('have.text', 'Yellowface');
        //assert load time
    })

    it('Click Want to Read button', function() {
        cy.visit(Cypress.env('baseUrl'));
        searchFromTop('Yellowfa');
        cy.get('#\31 _book_62047984').find('div.wtrUp.wtrLeft').find('form ').find('button').click();
        cy.wait('@addToShelf').then(({ response }) => {
                expect(response.statusCode).to.eq(200);
        });
        cy.get('#\31 _book_62047984').find('div.wtrDown.wtrLeft.wtrShelfSortable.wtrStatusToRead').should('exist');
    })

    it('Is the Yellowface book added to My Books?', function() {
        cy.visit(Cypress.env('baseUrl'));
        cy.xpath('//*[@id="bodycontainer"]/div/div[2]/div/header/div[2]/div/nav/ul/li[2]/a').click();
        cy.get('#books').should('exist');
        cy.get('#review_6083904435').should('exist');
        cy.get('#review_6083904435').find('td.field.title').should('have.text', 'Yellowface');
    })
/*it('Login to goodreads.com', function() {
    cy.visit(Cypress.env('baseUrl'));
    cy.get("#signIn").find('div').find('div').find('a').click();
    cy.get('a').contains('Sign in with email').click();
    cy.wait(10000);
    cy.get('#ap_email').type(Cypress.env('email'));
    cy.get('#ap_password').type(Cypress.env('password'));
    cy.get('input[name="rememberMe"]').click();
    cy.get('#signInSubmit').click();
    cy.url().should('eq', Cypress.env('baseUrl'))
  })*/


})
