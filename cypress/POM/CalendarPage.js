export class CalendarPage {
    constructor(){
    }
    
    months = {
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
        daySpace:(day) => cy.xpath("//div[@class='Grid_spaceInMonth__JTF6k   ']//p[text()="+ day +"]")
    }

    clickNextMonth(){
        this.elements.nextButton().click()
    }

    clickPrevMonth(){
        this.elements.prevButton().click()
    }

    clickDay(day){
      this.elements.daySpace(day).click({force:true})
    }

    clickOnDate(month,day){
      this.goToMonth(month)
      this.clickDay(day)
    }

    obtainMonth(){
      this.elements.actualMonth().then(text =>{
      const txt = text.text()
      cy.wrap(txt).as('txt')})
    }

    goToMonth(month){
        this.obtainMonth()
        cy.get('@txt').then(text => {
            const actualMonth = this.months[text.toLowerCase()]
            const targetMonth = this.months[month.toLowerCase()]
            let remainingMonths = targetMonth - actualMonth
            
            if(remainingMonths < 0){
              remainingMonths += 12;
            }  
         for (let index = 0; index < remainingMonths; index++) {
              this.clickNextMonth()
            }
          })
    }

     parseText(text){
      const originalString = text
      const transformedString = originalString.replace(/\s/g, "").toLowerCase();
      const finalString = transformedString.replace(/[^a-zA-Z]/g, "");
      return finalString
    }



    eventExist(event){
      cy.xpath("//div[@class='Grid_spaceInMonth__JTF6k   ']//p[text()="+event.day+"]/following-sibling::div[1]").then(($context) => {
    if ($context.find('.Grid_reminder__OelsH').length > 0) {
      console.log("el elemento exist");
      this.noteExist(event.note)
    } else {
      console.log("el elemento no exist");
      const exist = false
      cy.wrap(exist).as("exist")
    }
  });
    }

     noteExist(note){
      let existNote = false;
      cy.xpath("//div[@class='Grid_reminder__OelsH']").each(($el, index, $list) => {
        const noteEntered = this.parseText($el.text());
        const noteToEnter = this.parseText(note);

        if (noteEntered === noteToEnter) {
          console.log('Si exist la nota');
          existNote = true;
          return false; // Salir del bucle cuando se encuentra la nota
        }
      }).then(() => {
        if (existNote) {
          cy.wrap(true).as("exist");
        } else {
          cy.wrap(false).as("exist");
        }
      });
    }
    
}

module.exports = new CalendarPage()