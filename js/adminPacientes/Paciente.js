export class Paciente{
    constructor(nombre, dni, fechaNac, telefono, obraSocial){
        this.nombre= nombre;
        this.dni= dni;
        this.fechaNac= fechaNac; //YYYY-MM-DD
        this.telefono= telefono;
        this.obraSocial= obraSocial;
    }
}