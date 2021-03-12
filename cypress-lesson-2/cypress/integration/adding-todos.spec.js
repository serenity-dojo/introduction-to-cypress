/// <reference types="cypress" />

describe('keeping track stuff to do', () => {

    describe('adding a todo item to the todo list', () => {

        it('should add a new item to the list', () => {

            cy.visit('https://todomvc.com/examples/angularjs/#/')

            cy.get('.new-todo').type('Feed the cats{enter}')

        })    
        
    })

    describe('filtering the todo list', () => {

        it('should filter to show only completed items', () => {
            cy.visit('https://todomvc.com/examples/angularjs/#/')

            cy.get('.new-todo').type('Feed the cat{enter}').type('Walk the dog{enter}')

            cy.get(".todo-list label").should('have.length',2)

            cy.contains('li', 'Walk the dog').find('.toggle').click()

            cy.contains('a','Completed').click()

            cy.get(".todo-list label").should('have.length',1)
              .eq(0).should('have.text','Walk the dog')            
        })

    })
})
















