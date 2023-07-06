export class EventsElement {

    constructor(){
    }

    elements={
        textNota: () => cy.xpath("//div[@class='Grid_reminderInput__pQ5qK']//textarea"),
        exitModal:() => cy.get("[data-cy-test='cy-Modal-exit']")
    }

    closeModal(){
        this.elements.exitModal().click()
    }

    writeNote(note){
        let firstFreeIndex = -1;
        cy.xpath("(//div[@class='Grid_reminderInput__pQ5qK']//textarea)").each(($el, index, $list) => {
          const textNote = $el.text();
          if (textNote === '') {
            firstFreeIndex = index;
            return false; // Salir del bucle cuando se encuentra el primer índice libre
          }
        });
        
        if (firstFreeIndex == -1) {
          cy.xpath("(//div[@class='Grid_reminderInput__pQ5qK']//textarea)").eq(firstFreeIndex).type(note);
          this.closeModal()
        } else {
          cy.log("No hay índices libres disponibles para escribir una nueva nota.");
        }
      }


}

module.exports = new EventsElement()