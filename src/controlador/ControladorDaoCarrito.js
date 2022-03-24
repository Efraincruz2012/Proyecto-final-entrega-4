const Carrito = require('../persistencia/carritoModel.js');

const { factoryInstance } = require('../persistencia/factory');

class ControladorCarrito {

    carritoModel;

    constructor(ruta) {
        this.ruta = ruta;
        const opcion = process.argv[ 2 ] || 'product';
        if (opcion === 'carrito') {
            this.carritoModel = factoryInstance.getModel();
        }
    }

    getModelInstance() {
        if (!this.carritoModel) {
            this.carritoModel = new Carrito(); 
        }

       
        console.log('carrito number: ',this.carritoModel.randomNumber);
        return this.carritoModel;
    }

    async listarAll() {

        return await this.getModelInstance().findAll();

    }

    async getCarritoById(id) {

        return await this.getModelInstance().find(id);
    }

    async create() {

      return await this.getModelInstance().create();

    }

    async addProductToCar(productId, carritoId) {

        return await this.getModelInstance().addProduct({productId, carritoId});

    }

    async removeAllProductsFromCar(carritoId) {

        return await this.getModelInstance().removeAllProducts({carritoId});

    }

}

//Singleton
let carritoControllerInstance;
const getCarritoDAO = () => {
    if(!carritoControllerInstance) {
        carritoControllerInstance = new ControladorCarrito();
    }
    return carritoControllerInstance;
}

module.exports = {
    ControladorCarrito,
    getCarritoDAO
}