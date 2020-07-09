const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Favorites = require('../models/favorites');
const Dish = require('../models/dishes');
const authenticate = require('../authenticate');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(authenticate.verifyUser)
    .get(function (req, res, next) {
        Favorites.find({ 'user': req.user._id })
            .populate('user')
            .populate('dishes')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (error) => next(error))
            .catch((err) => next(err));
    })
    .post(function (req, res, next) {
        Favorites.find({})
            .populate('user')
            .populate('dishes')
            .then((favorites) => {
                var user;
                if (favorites)
                    user = favorites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
                if (!user)
                    user = new Favorites({ user: req.user.id });
                for (let i of req.body) {
                    if (user.dishes.find((d_id) => {
                        if (d_id._id) {
                            return d_id._id.toString() === i._id.toString();
                        }
                    }))
                        continue;
                    user.dishes.push(i._id);
                }
                user.save()
                    .then((userFavs) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(userFavs);
                        console.log("Favorites Updated");
                    }, (err) => next(err))
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    })
    .delete(function (req, res, next) {
        Favorites.deleteOne({ user: req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

favoriteRouter.route('/:dishId')
    .all(authenticate.verifyUser)
    .delete((req, res, next) => {
        Favorites.deleteOne({ _id: req.params.dishId })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

module.exports = favoriteRouter;