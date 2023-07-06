export class EventsElement {

    constructor(){
    }

    elements={
        textNota: () => cy.xpath("//div[@class='Grid_reminderInput__pQ5qK']//textarea"),
        exitModal:() => cy.get("[data-cy-test='cy-Modal-exit']")
    }

    // escribirNota(frase){
    //     this.elements.textNota().type(frase)
    // }

    cerrarModal(){
        this.elements.exitModal().click()
    }

    escribirNotaNew(nota){
        let primerIndiceLibre = -1;
        cy.xpath("(//div[@class='Grid_reminderInput__pQ5qK']//textarea)").each(($el, index, $list) => {
          const textoNota = $el.text();
            cy.log(textoNota)
          if (textoNota === '') {
            primerIndiceLibre = index;
            return false; // Salir del bucle cuando se encuentra el primer índice libre
          }
        });
        
        if (primerIndiceLibre == -1) {
          cy.xpath("(//div[@class='Grid_reminderInput__pQ5qK']//textarea)").eq(primerIndiceLibre).type(nota);
          this.cerrarModal()
        } else {
          cy.log("No hay índices libres disponibles para escribir una nueva nota.");
        }
      }


}

module.exports = new EventsElement()