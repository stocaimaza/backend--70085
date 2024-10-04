import fs from "fs";

class FileSystemJugueteDAO {

    //Métodos auxiliares:
    async leerArchivo() {
        const data = await fs.promises.readFile("./src/data/juguetes.json");
        return JSON.parse(data);
    }

    async escribirArchivo(data) {
        await fs.promises.writeFile("./src/data/juguetes.json", JSON.stringify(data, null, 2));
    }

    //

    async crearJuguete(datosJuguete) {
        try {
            //Leemos el archivo actual
            const juguetes = await this.leerArchivo();

            //Agregamos el nuevo juguetin
            juguetes.push(datosJuguete);

            //Escribimos el archivo actualizado. 
            await this.escribirArchivo(juguetes);

            return datosJuguete;
        } catch (error) {
            throw new Error("Error al crear un juguete en archivo");
        }
    }

    async obtenerJuguetes() {
        try {
            //Leemos el archivo:
            const juguetes = await this.leerArchivo();
            return juguetes;
        } catch (error) {
            throw new Error("Error al obtener juguetes del archivo");
        }
    }

}

export default FileSystemJugueteDAO; 