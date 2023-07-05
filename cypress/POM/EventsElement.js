export class EventsElement {

    constructor(){
    }

    elements={
        textNota: () => cy.xpath("//div[@class='Grid_reminderInput__pQ5qK']//textarea"),
        exitModal:() => cy.get("[data-cy-test='cy-Modal-exit']")
    }

    escribirNota(frase){
        this.elements.textNota().type(frase)
    }

    cerrarModal(){
        this.elements.exitModal().click()
    }

}

module.exports = new EventsElement()