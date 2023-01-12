const { List, Task } = require('../models/index');

const ApiError = require('../errors/ApiError');
const helperService = require('../services/helperService');

class ListController {
    async create(req, res, next) {
        try {
            const itContains = helperService.itContains(req.body, ['name']);
            if (!itContains.result)
                return next(ApiError.badRequest(`Параметр ${itContains.field} не найден`));

            const { name } = req.body;

            const list = await List.create({ name });
            res.status(200).json(list);
        } catch(e) {
            return next(new Error());
        }
    }

    async getListTasks(req, res, next) {
        try {
            const id = req.query?.id;
            let task = await Task.findAll({ where: { list_id: id } });

            if (!task)
                return next(ApiError.badRequest(`Обьeкт не найден`));
            res.status(200).json(task);
        } catch(e) {
            return next(new Error());
        }
    }

    async get(req, res, next) {
        try {
            const id = req.query?.id;
            let list = (id) ? await List.findOne({ where: { id } }) : await List.findAll();

            if (!list)
                return next(ApiError.badRequest(`Обьeкт не найден`));
            res.status(200).json(list);
        } catch(e) {
            return next(new Error());
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.body?.id;
            if (!id)
                return next(ApiError.badRequest('Не найдено поле id'))

            const candidate = await List.findOne({ where: { id } });
            if (candidate) {
                await List.destroy({ where: {id} });
                res.status(200).json({ message: 'Успешно удален' });
            }
            else
                return next(ApiError.badRequest(`Обьeкт не найден`));
        } catch(e) {
            return next(new Error());
        }
    }
}

module.exports = new ListController();