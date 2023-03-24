import { post,get } from "./api.service";


//funcion para llamar al service api, ese service solo sirve como paso final para llamar a backend, de momento hay get y post
// si necesitas update y removes se puede anadir facil

//pon aqui las funciones que quieras que tengan que llamar al apiservice c:
export function createChar(data) {
    return post("character", data);
}
