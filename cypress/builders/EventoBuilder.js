export class EventoBuilder{
    constructor(){

    }

    diaDeLaMarmota(){
        this.dia = "2"
        this.mes = "february"
        this.nota = "Dia De La Marmota"
        return this
    }

    diaDeLaPrimavera(){
        this.dia = "21"
        this.mes = "september"
        this.nota = "DiaDeLaBandera"
        return this
    }

    build(){
        return this
    }
}

module.exports = new EventoBuilder()