export class EventsElement {

    constructor(){
    }

    elements={
        textNoteElement: () => cy.xpath("//div[@class='Grid_reminderInput__pQ5qK']//textarea"),
        exitModal:() => cy.get("[data-cy-test='cy-Modal-exit']"),
        deleteNoteButton:() => cy.xpath("(//div[@class='Grid_reminderContent__pLoKD']//span[@class='Grid_customIcon__JyTa0 Grid_icon-cancel__HmIzw'])[1]")
    }

    closeModal(){
        this.elements.exitModal().click()
    }

    deleteNote(){
      this.elements.deleteNoteButton().click()
    }

    writeNote(note){
        let firstFreeIndex = -1;
        this.elements.textNoteElement().each(($el, index, $list) => {
          const textNote = $el.text();
          if (textNote === '') {
            firstFreeIndex = index;
            return false; // Salir del bucle cuando se encuentra el primer índice libre
          }
        });
        
        if (firstFreeIndex == -1) {
          this.elements.textNoteElement().eq(firstFreeIndex).type(note);
          this.closeModal()
        } else {
          cy.log("No hay índices libres disponibles para escribir una nueva nota.");
        }
      }


}

module.exports = new EventsElement()