export class TodoPage {

    open() {
        cy.visit('https://todomvc.com/examples/react/#/')
    }

    addTodo(todoText) {
        cy.get('.new-todo').type(todoText + '{enter}')
    }

    addTodos(...todos) {
        todos.forEach(
            todo => this.addTodo(todo)
        )
    }

    todoItem(number) {
        return cy.get('.todo-list li').eq(number)
    }
 
    todos() { return cy.get('.todo-list li'); }

    filterBy(filter) {
        cy.contains(filter).click()
    }

    todoField() { return cy.get(".new-todo") }

    complete(todo) {
        cy.contains('.todo-list li', todo).within(
            $listItem => { cy.get('.toggle').click() }
        )

    }
}