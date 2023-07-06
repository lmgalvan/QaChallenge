export class EventBuilder{
    constructor(){

    }

    groundhogDay(){
        this.day = "2"
        this.month = "february"
        this.note = "Dia De La Marmota"
        return this
    }

    springDay(){
        this.day = "21"
        this.month = "september"
        this.note = "DiaDeLaBandera"
        return this
    }

    build(){
        return this
    }
}

module.exports = new EventBuilder()