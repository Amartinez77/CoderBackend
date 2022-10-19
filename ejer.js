class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    console.log(`hola soy ${this.nombre} ${this.apellido}`);
  }
  addMascota(nuevaMascota) {
    this.mascotas.push(nuevaMascota);
    console.log(this.mascotas);
  }
  countMascota() {
    console.log(` cantidad de mascotas: ${this.mascotas.length}`);
  }
  addBook(nom, aut) {
    let obj = {nombre: nom, autor: aut}
    this.libros.push(obj)
    console.log(this.libros)
  }
  getBookNames() {
    const filterarray = this.libros.map(({ nombre }) => ( nombre )
    )
    console.log(filterarray)
  }
}

const usuario1 = new Usuario(
  "ariel",
  "martinez",
  [{ nombre: "Martin Fierro", autor: "José Hernandez" }],
  ["perro", "gato"]
);

console.log(usuario1);
//console.log(usuario1.getFullName());
usuario1.getFullName()
usuario1.addMascota("loro");
usuario1.countMascota();
usuario1.addBook("El señor de los anillos", "J. R. Tolkien");
usuario1.getBookNames()
