const aqp = require('api-query-params')
const Customer = require("../models/Customer");
const Service = require("../models/Service");

module.exports = {
    createListServices: async (data) => {
        if (Array.isArray(data)) {
            const services = await Service.create(data);
            return services
        }
    },
    addCustomerToService: async (data) => {
        const customer = await Customer.find({ _id: data.customerId })
        const service = await Service.find({ _id: data.serviceId })
        console.log('>>> service.customerInfo: ', service[0].customerInfo);
        await service[0].customerInfo.push(data.customerId)
        service[0].save()

        return service
    },
    getAllServicesService: (query) => {
        const queryString = aqp(query);
        const services = Service.find({}).populate(queryString.population)
        return services
    }
}