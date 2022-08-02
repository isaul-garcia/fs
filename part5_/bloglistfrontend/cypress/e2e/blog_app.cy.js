/* eslint-disable no-undef */
describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('login form is shown', function () {
    cy.contains('Log in').click()
    cy.contains('Username')
    cy.contains('Password')
  })

  it('succeeds with correct credentials', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen is logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('Log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong credentials')
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Log in').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function () {
      cy.contains('Add New Blog').click()
      cy.get('#title').type('A new blog submission created from cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://url.com')
      cy.contains('Create').click()
      cy.contains('"A new blog submission created from cypress" by Cypress')
    })
  })

  describe('if logged in can be liked', function () {
    beforeEach(function () {
      cy.contains('Log in').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Add New Blog').click()
      cy.get('#title').type('A new blog submission created from cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://url.com')
      cy.contains('Create').click()
      cy.contains('"A new blog submission created from cypress" by Cypress')
    })

    it('it can be liked', function () {
      cy.contains('View').click()
      cy.get('.blog-details').should('contain', '0')
      cy.get('#like-button').click()
      cy.get('.blog-details').should('contain', '1')
    })

    it('it can be deleted', function () {
      cy.contains('View').click()
      cy.get('#delete-button').click()
      cy.get('html').should('not.contain', '"A new blog submission created from cypress" by Cypress')
    })

    describe.only('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.contains('View').click()

        cy.contains('Add New Blog').click()
        cy.get('#title').type('Blog submission 2')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('https://url.com')
        cy.contains('Create').click()
        cy.contains('View').click()
        cy.contains('Hide').click()
        cy.get('#like-button').click()
        cy.get('#like-button').click()

        cy.contains('Add New Blog').click()
        cy.get('#title').type('Blog submission 3')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('https://url.com')
        cy.contains('Create').click()
        cy.contains('View').click()
        cy.contains('View').click()
        cy.contains('Hide').click()
        cy.contains('Hide').click()
        cy.get('#like-button').click()
        cy.get('#like-button').click()
        cy.get('#like-button').click()
        cy.contains('Hide').click()
        cy.visit('http://localhost:3000')
      })

      it('blogs are ordered by number of likes', function () {
        cy.get('.blog>span.title-author').then((blogs) => {
          expect(blogs[0].textContent).to.equal('"Blog submission 3" by Cypress')
          expect(blogs[1].textContent).to.equal('"Blog submission 2" by Cypress')
          expect(blogs[2].textContent).to.equal('"A new blog submission created from cypress" by Cypress')
        })
      })
    })
  })
})