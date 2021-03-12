/// <reference types="cypress" />

describe('adding a todo item to the todo list', () => {

    it('should add a new item to the list', () => {

        cy.visit('https://todomvc.com/examples/angularjs/#/')

        cy.get('.new-todo').type('Feed the cats{enter}')

        cy.contains('.todo-list li','Feed the cats').should('be.visible')
    })    
})