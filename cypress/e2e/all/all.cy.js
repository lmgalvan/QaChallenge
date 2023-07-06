import CalendarPage   from "../../POM/CalendarPage"
import EventsElement  from "../../POM/EventsElement"
import EventBuilder  from "../../builders/EventBuilder"



describe('Challenge Calendar App', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  it('Open Page', () => {
    cy.visit(Cypress.env("baseUrl"))
  })

  it('Go To February', () => {
    cy.visit(Cypress.env("baseUrl"))
     const monthToGo = "February"
     CalendarPage.goToMonth(monthToGo) 
  })

  it('Create Groundhog Day', () => {
    cy.visit(Cypress.env("baseUrl"))
    const event = EventBuilder.groundhogDay().build() 

    //En caso de quere crear el dia de antes.
    //CalendarPage.clickOnDate(event.month,event.day)
    //EventsElement.writeNote(event.note)


      CalendarPage.eventExist(event)

      //Si no existe la creamos
      cy.get("@exist").then( (value) => {
        if (!value) {
        console.log("Crea Nota");
        CalendarPage.clickOnDate(event.month,event.day)
        EventsElement.writeNote(event.note)
      } else {
        console.log("No Crear Nota");
      }
  })
      
  })

  it('Delete Groundhog Day',{tags:'last'},()=> {
    cy.visit(Cypress.env("baseUrl"))
    const event = EventBuilder.groundhogDay().build()

      //Se crea dia
      CalendarPage.clickOnDate(event.month,event.day)
      EventsElement.writeNote(event.note)
    
    //Retorna value si existe o no el dia
    CalendarPage.eventExist(event)

    //Borra el dia si existe
    cy.get("@exist").then( (value) => {
      if (value) {
      CalendarPage.clickOnDate(event.month,event.day)
      EventsElement.deleteNote()
      EventsElement.closeModal()
    } else {
      cy.log("No existe Nota")
    }
})
  
  })
  
})