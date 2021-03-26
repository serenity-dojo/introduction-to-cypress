/// <reference types="cypress"/>

import { addTodo, addTodos } from '../actions/add'
import { complete } from '../actions/complete'
import { NewTodoForm } from '../page-components/new-todo-form';
import { TodoListComponent } from '../page-components/todo-list-component';

describe('When adding new todo items in the TODOMVC app', () => {

    const todoList = new TodoListComponent()
    const newTodoForm = new NewTodoForm();

    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react/#/')
    })

    it('Should tell the user what to do', () => {
        cy.get(".new-todo")
          .should('have.attr', 'placeholder', 'What needs to be done?')
          .and('be.enabled')
    })

    it('Should not show the delete buttons by default', () => {
        cy.get('.new-todo').type('Feed the cat{enter}')

        cy.get('.todo-list li').should('have.length',1)

        cy.get(".destroy").then(
             $element => expect($element).to.not.be.visible
        )
        cy.get('.todo-list li').then(
            $el => {
                expect($el).to.be.visible
                           .to.have.text('Feed the cat')
            }
        )

        cy.contains('Completed').click()
        cy.get('.todo-list li').should('have.length',0)

    })

    it.skip('New todo items should appear in the todo list', () => {

        cy.get('.new-todo').type('Walk the dog{enter}')

        cy.get('.todo-list li').should('have.length', 1)
        cy.get('.todo-list li').eq(0).should('have.text', 'Walk the dog')
    })

    it.skip('should add a new item to the list', () => {

        cy.visit('https://todomvc.com/examples/angularjs/#/')

        cy.get('.new-todo').type('Feed the cats{enter}')

        cy.get('.todo-list li').should('have.length', 1)

        cy.get('.filters').find('[href$="completed"]').click()

        cy.get('.todo-list li').should('have.length', 0)
    })

    it.skip('Multiple new todo items should appear in order of appearance', () => {

        addTodos('Walk the dog', 'Feed the cat')

        todoList.todos().should('have.length', 2)
        todoList.todoElementNumber(0).should('have.text', 'Walk the dog')

    })

    it.skip('Should show completed todos as completed', () => {
        cy.get('.new-todo').type('Walk the dog{enter}')
        cy.get('.new-todo').type('Feed the cat{enter}')

        cy.contains('.todo-list li', 'Walk the dog').within(
            $listItem => { cy.get('.toggle').click() }
        )

    })

    describe('Chai assertions', () => {
        it('equals', () => {
            var name = "Sarah"
            expect(name).to.equal('Sarah')
        })
        it('greaterThan', ()=> {
            var age = 21
            expect(age).to.be.greaterThan(10)
            expect(age).to.be.at.least(18)
        })
        
        it('deep equals', () => {
            var client = {name: 'Sarah', age:'40'}
            expect(client).to.deep.equal({name:'Sarah', age:'40'})
        })

        it('contain', () => {
            var pets = ['dog','cat','goldfish']
            var noPets = []

            expect(pets).not.empty
            expect(pets).to.contain('dog').but.not.contain('pony')
                
        })
    })

});