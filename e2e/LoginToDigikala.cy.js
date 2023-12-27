describe('Login to Digikala.com.', function()  {
    beforeEach(() => {
        cy.visit('https://www.digikala.com/users/login/?backUrl=/profile/personal-info/');
      });
    function enterEmail(email){
        cy.get('input[name="username"]').type(email);
        cy.get('[data-cro-id="login-register"]').click();
    }
    function enterPassword(password){
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
    }

    it('Should be displayed error when entering an empty email', function() {
          enterEmail('');
          cy.get('form').find('label').find('p').should('have.text', 'لطفا این قسمت را خالی نگذارید')
    })

    it('Should be displayed error when entering an incorrect email', function() {
          enterEmail('aaaaaaaaaaaa');
          cy.get('form').find('label').find('p').should('have.text', 'شماره موبایل یا ایمیل نادرست است.')
    })

    it('Should be displayed error when entering an invalid email', function() {
              enterEmail('aa@aa.aa');
              enterPassword(password1);
              cy.get('#snackbar-container').find('div').find('div').should('have.text', 'اطلاعات کاربری نادرست است')
     })

    it('Successful login', function() {
      enterEmail(Cypress.env('email'));
      enterPassword(Cypress.env('password'));

    })

})