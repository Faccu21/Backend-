
const fs = require("fs").promises;

class ProductManager{
    static ultId = 0;

    constructor(path){
        
        this.path = path;
        this.products = [];
        if (path) {
          this.leerArchivo()
            .then(data => {
              this.products = data;
            })
            .catch(error => {
              console.error("Error al leer el archivo:", error);
            });
        }
      }

    async addProduct(nuevoObjeto){
        let { title, description, price, img, code, stock} = nuevoObjeto;

        if(!title || !description || !price || !img || !code || !stock) 
        {
           console.log("Completar todos los campos");
           return; 
        }
        if(this.products.some(item => item.code === code)){
            console. log("El codigo debe ser unico");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }
    
        this.products.push(newProduct);

        await this.saveArchivo(this.products);
    }

    getProducts(){

        console.log(this.products);
        
        return this.products;
        
        }
        

    async getProductById(id){

        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);
            if(!buscado){
                console.log("Producto no encontrado");
            } else {  
                console.log("Producto encontrado");
                return buscado;
            }
        } catch (error) {
            console.log("ERROR al leer archivo", error);
            
        }

       
    }

    async leerArchivo () {
        try {
            const respuesta = await fs.readFile(this.path,"utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("error al leer un archivo", error);
        }
    }

    async saveArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2) );

        } catch (error) {
            console.log("ERROR al guardar el archivo", error);
        }
        
    }

    async updateProduct(id, productoActualizado){
        try {
            const arrayProductos = await this.leerArchivo();
            const index = arrayProductos.findIndex(item => item.id === id);

            if(index !== -1){
                arrayProductos.splice(index, 1, productoActualizado);
                await this.saveArchivo(arrayProductos);
            } else {
                console.log("no se encontró el producto");
            }


        } catch (error) {
            console.log("Error al actualizar", error);
        }

    }

    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const newArray = arrayProductos.filter(item => item.id !== id);
            await this.saveArchivo(newArray);
        

        } catch (error) {
            console.log("Error al eliminar el producto", error);
        }
    }

}



const manager = new ProductManager("src/productos.json");

manager.getProducts();

const lebeau = {
    title: "JPG",
    description: "Le Beau",
    price: 100,
    img: "sin imagen",
    code: "ab123",
    stock: 14,

}

manager.addProduct(lebeau);

const lemale= {
    title: "JPG",
    description: "Le Male",
    price: 70,
    img: "sin imagen",
    code: "ab124",
    stock: 10,

}

manager.addProduct(lemale);


const eros= {
    title: "Versace",
    description: "Eros",
    price: 70,
    img: "sin imagen",
    code: "ab126",
    stock: 16,

}

manager.addProduct(eros);

const lightblue= {
    title: "DyG",
    description: "Light Blue",
    price: 170,
    img: "sin imagen",
    code: "ab127",
    stock: 5,

}

manager.addProduct(lightblue);

const yedp= {
    title: "YSL",
    description: "Y",
    price: 70,
    img: "sin imagen",
    code: "ab128",
    stock: 10,

}

manager.addProduct(yedp);

const one= {
    title: "Paco Rabbane",
    description: "One Million",
    price: 70,
    img: "sin imagen",
    code: "ab129",
    stock: 10,

}

manager.addProduct(one);

const polored= {
    title: "Ralph Lauren",
    description: "Polo Red",
    price: 70,
    img: "sin imagen",
    code: "ab130",
    stock: 10,

}

manager.addProduct(polored);

const swy= {
    title: "Armani",
    description: "Stronger With You",
    price: 70,
    img: "sin imagen",
    code: "ab131",
    stock: 10,

}

manager.addProduct(swy);

const chrome= {
    title: "Azzaro",
    description: "Chrome",
    price: 70,
    img: "sin imagen",
    code: "ab132",
    stock: 10,

}

manager.addProduct(chrome);

const invictus= {
    title: "Paco Rabbane",
    description: "Invictus",
    price: 55,
    img: "sin imagen",
    code: "ab133",
    stock: 10,

}

manager.addProduct(invictus);



manager.getProducts();




module.exports = ProductManager;