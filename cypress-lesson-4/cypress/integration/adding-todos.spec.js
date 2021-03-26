/// <reference types="cypress"/>

import { TodoPage } from "../page-objects/todo-page";

describe('When adding new todo items in the TODOMVC app', () => {

    const todoPage = new TodoPage()

    beforeEach(() => {
        todoPage.open()
    })

    it('Should tell the user what to do', () => {
        todoPage.todoField().should('have.attr', 'placeholder', 'What needs to be done?')
                          .and('be.enabled')
    })

    it('Should not show the delete buttons by default', () => {
        todoPage.addTodo('Feed the cat')
        todoPage.todos().should('have.length',1)

        todoPage.filterBy('Completed')
        todoPage.todos().should('not.exist')

    })

    it('New todo items should appear in the todo list', () => {
 
        todoPage.addTodo('Walk the dog')

        todoPage.todos().should('have.length',1)
        todoPage.todoItem(0).should('have.text', 'Walk the dog')
    })


    it('Multiple new todo items should appear in order of appearance', () => {

        todoPage.addTodos('Feed the cat','Walk the dog')

        todoPage.todos().should('have.length', 2)
        todoPage.todos().eq(0).should('have.text', 'Feed the cat')
        todoPage.todos().eq(1).should('have.text', 'Walk the dog')

    })

    it('Should show completed todos as completed', () => {
        todoPage.addTodo('Feed the cat')
        todoPage.addTodo('Walk the dog')

        todoPage.complete('Walk the dog')
        todoPage.filterBy('Completed')

        todoPage.todos().should('have.length',1)
        todoPage.todoItem(0).should('have.text', 'Walk the dog')

        todoPage.filterBy('Active')

        todoPage.todos().should('have.length',1)
        todoPage.todoItem(0).should('have.text', 'Feed the cat')


    })
});