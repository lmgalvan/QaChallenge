import CalendarPage   from "../../POM/CalendarPage"
import EventsElement  from "../../POM/EventsElement"
import EventoBuilder  from "../../builders/EventoBuilder"



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
     CalendarPage.recorrerAlMes(monthToGo) 
  })

  it('Create Groundhog Day', () => {
    cy.visit(Cypress.env("baseUrl"))
    const evento = EventoBuilder.diaDeLaMarmota().build() 

      //Creamos la nota
      CalendarPage.clickEnFecha(evento.mes,evento.dia)
      EventsElement.escribirNota(evento.nota)
      EventsElement.cerrarModal()

      //Verificamos si existe
      CalendarPage.existeEvento(evento)

      //Si no existe la creamos
      cy.get("@existe").then( (valor) => {
        if (!valor) {
        console.log("Crea Nota");
        CalendarPage.clickEnFecha(evento.mes,evento.dia)
        EventsElement.escribirNota(evento.nota)
        EventsElement.cerrarModal()
      } else {
        console.log("No Crear Nota");
      }
  })
  })

  it('Delete Groundhog Day',{tags:'ultimo'},()=> {
    cy.visit(Cypress.env("baseUrl"))
    const evento = EventoBuilder.diaDeLaMarmota().build()

      //Se crea dia
      CalendarPage.clickEnFecha(evento.mes,evento.dia)
      EventsElement.escribirNota(evento.nota)
      EventsElement.cerrarModal()
    
    //Retorna valor si existe o no el dia
    CalendarPage.existeEvento(evento)

    //Borra el dia si existe
    cy.get("@existe").then( (valor) => {
      if (valor) {
      console.log("Borrar nota");
      CalendarPage.clickEnFecha(evento.mes,evento.dia)
      cy.xpath("(//div[@class='Grid_reminderContent__pLoKD']//span[@class='Grid_customIcon__JyTa0 Grid_icon-cancel__HmIzw'])[1]").click()
      EventsElement.cerrarModal()
    } else {
      cy.log("No existe Nota")
    }
})
    
  })
})