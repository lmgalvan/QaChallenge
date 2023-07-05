export class CalendarPage {
    constructor(){
    }
    
    meses = {
        january:   1,
        february:  2,
        march:     3,
        april:     4,
        may:       5,
        june:      6,
        july:      7,
        august:    8,
        september: 9,
        october:   10,
        november:  11,
        december:  12
      }

    elements = {
        nextButton: () => cy.get("div").contains("Next"),
        prevButton: () => cy.get("div").contains("Prev"),
        actualMonth: () => cy.xpath("//div[@class='Grid_header__yAoy_']//div[2]"),
        diaSpace:(day) => cy.xpath("//div[@class='Grid_spaceInMonth__JTF6k   ']//p[text()="+ day +"]")
    }

    clickNextMonth(){
        this.elements.nextButton().click()
    }

    clickPrevMonth(){
        this.elements.prevButton().click()
    }

    clickDay(day){
      this.elements.diaSpace(day).click()
    }

    clickEnFecha(month,day){
      this.recorrerAlMes(month)
      this.clickDay(day)
    }

    obtainMonth(){
      this.elements.actualMonth().then(text =>{
      const txt = text.text()
      cy.wrap(txt).as('txt')})
    }

    recorrerAlMes(mes){
        this.obtainMonth()
        cy.get('@txt').then(text => {
            const mesActual = this.meses[text.toLowerCase()]
            const mesObjetivo = this.meses[mes.toLowerCase()]
            let mesesFaltantes = mesObjetivo - mesActual
            
            if(mesesFaltantes < 0){
              mesesFaltantes += 12;
            }  
         for (let index = 0; index < mesesFaltantes; index++) {
              this.clickNextMonth()
            }
          })
    }

     parseTexto(texto){
      const originalString = texto
      const transformedString = originalString.replace(/\s/g, "").toLowerCase();
      const finalString = transformedString.replace(/[^a-zA-Z]/g, "");
      return finalString
    }

      existeNota(nota){
      cy.xpath("//div[@class='Grid_reminder__OelsH']").each($el => {
      const notaIngresada = this.parseTexto($el.text())
      const notaAIngresar = this.parseTexto(nota) 
      if (notaIngresada == notaAIngresar ) {
        console.log('Si existe la nota');
        const existe = true
        cy.wrap(existe).as("existe")
      } else{
        console.log('No existe la nota');
        const existe = false
        cy.wrap(existe).as("existe")
      } 
    })
    }

    existeEvento(evento){
      cy.xpath("//div[@class='Grid_spaceInMonth__JTF6k   ']//p[text()="+evento.dia+"]/following-sibling::div[1]").then(($contexto) => {
    if ($contexto.find('.Grid_reminder__OelsH').length > 0) {
      console.log("el elemento existe");
      this.existeNota(evento.nota)
    } else {
      console.log("el elemento no existe");
      const existe = false
      cy.wrap(existe).as("existe")
    }
  });
    }

}

module.exports = new CalendarPage()