const Service = require("../models/Service");
const { createListServices, addCustomerToService, getAllServicesService } = require("../services/serviceService");

module.exports = {
    getAllServices: async (req, res) => {
        
        const services = await getAllServicesService(req.query)
        res.status(200).json({
            EC: 0,
            data: services
        })
    },
    postCreateService: async (req, res) => {
        try {
            if (req.body.type === 'ADD_SERVICE') {
                const services = await createListServices(req.body.data)
                res.status(200).json({
                    EC: 0,
                    data: services
                })
            }
            if (req.body.type === 'ADD_USER') {
                const services = await addCustomerToService(req.body.data)
                res.status(200).json({
                    EC: 0,
                    data: services
                })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({
                EC: -1,
                data: null
            })
        }


    }
}