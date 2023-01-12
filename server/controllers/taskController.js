const { Task } = require('../models/index');

const ApiError = require('../errors/ApiError');
const helperService = require('../services/helperService');

class TaskController{
    async create(req, res, next) {
        try {
            const itContains = helperService.itContains(req.body, ['list_id', 'name', 'status']);
            if (!itContains.result)
                return next(ApiError.badRequest(`Параметр ${itContains.field} не найден`));

            const { list_id, name, status } = req.body;

            const task = await Task.create({ list_id, name, status });
            res.status(200).json(task);
        } catch(e) {
            console.log(e);
            return next(new Error());
        }
    }

    async get(req, res, next) {
        try {
            const id = req.query?.id;
            let task = (id) ? await Task.findOne({ where: { id } }) : await Task.findAll();

            if (!task)
                return next(ApiError.badRequest(`Обьeкт не найден`));
            res.status(200).json(task);
        } catch(e) {
            return next(new Error());
        }
    }

    async updateStatus(req, res, next) {
        try {
            const id = req.body?.id;
            if (!id)
                return next(ApiError.badRequest('Не найдено поле id'))

            const candidate = await Task.findOne({ where: { id } });
            if(candidate){
                if (!candidate.status) {
                    Task.update({ status: true }, {
                        where: {
                            id
                        }
                    });
                    res.status(200).json({ message: 'Статус успешно изменен' });
                }
                else if(candidate.status){
                    Task.update({ status: false }, {
                        where: {
                            id
                        }
                    });
                    res.status(200).json({ message: 'Статус успешно изменен' });
                }
            }
            else
                return next(ApiError.badRequest(`Обьeкт не найден`));
        } catch (e) {
            return next(new Error());
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.body?.id;
            if (!id)
                return next(ApiError.badRequest('Не найдено поле id'))

            const candidate = await Task.findOne({ where: { id } });
            if (candidate) {
                await Task.destroy({ where: {id} });
                res.status(200).json({ message: 'Успешно удален' });
            }
            else
                return next(ApiError.badRequest(`Обьeкт не найден`));
        } catch(e) {
            return next(new Error());
        }
    }
}

module.exports = new TaskController();