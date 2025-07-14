const { where } = require("sequelize");
const { Logger } = require("../config");

class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the CRUD repo : create");
            throw error;
        }
    }

    async destroy(id){
        try {
            const response = await this.model.destroy({
                where : {
                    id : id
                }
            })
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the CRUD repo : destroy");
            throw error;
        }
    }

    async get(id){
        try {
            const response = await this.model.findByPk(id);
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the CRUD repo : get");
            throw error;
        }
    }

    async getAll(){
        try {
            const response = await this.model.findAll(id);
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the CRUD repo : getAll");
            throw error;
        }
    }

    async update(id, data){ // data -> {col : value}
        try {
            const response = await this.model.update(data, {
                where : {
                    id : id
                }
            });
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the CRUD repo : update");
            throw error;
        }
    }
}

module.exports = CrudRepository;