//importing modules
const jwt = require("jsonwebtoken");
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const WebSocket = require("ws");

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;

// Assigning users to the variable Category
const broadcast = (clients, method, message) => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            console.log('[SERVER] broadcast(',method,'): ', JSON.stringify(message));
            const data = {
                id: message.id,
                userName: message.userName,
                email: message.email,
                password: message.password,
                role: message.role,
                updatedAt: message.updatedAt,
                createdAt: message.createdAt,
                method: method
            }
            client.send(JSON.stringify(data), (err) => {
                if(err){
                    console.log(`[SERVER] error:${err}`);
                }
            });
        }
    })
}

//getAll categories
const getAll = async (req, res) => {
    try {
        //find a category by their email
        const categories = await Category.findAll();
        //if category email is found, compare password
        if (categories) {
            res.status(200).send({categories});
        } else {
            return res.status(404).send("No category found");
        }
    } catch (error) {
        console.log('Categories - getAll() Failure: ', error);
    }
}

//signing a category up
//hashing users password before its saved to the database
const createCategory = async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        const data = {
            name,
            imageUrl
        };

        //saving the category
        const category = await Category.create(data);


        //if category details is captured
        
        //generate token with the category's id and the secretKey in the env file
        // set cookie with the token generated
        if (category) {
            return res.status(200).send(category);
        } else {
            return res.status(400).send("Invalid request body");
        }
    } catch (error) {
        console.log('signup - [Error]: ', error);
        return res.status(500).send("server side exception - retry later")
    }
}

const getCategory = async (req, res) => {
    var queryType = req.query.query;
    console.log('getUser - query: ', req.query.query);
    if (!queryType) {
        console.log("Requested item wasn't found!, ?query=xxxx is required!");
        return res.status(409).send("?query=xxxx is required! NB: xxxx is all / email");
    }
    try {
        if (queryType == 'all') {
            const users = await Category.findAll({
                attributes: { exclude: ['password'] },
                where: {
                    role: {[Op.not]: 'admin'}
                }
            });
            if (users) {
                return res.status(200).json(users);
            } else {
                return res.status(400).send("Invalid request body");
            }
        } else {
            const category = await Category.findOne({
                where: {
                    email: queryType//{[Op.like]: queryType+'%'}
                },
                attributes: { exclude: ['password'] }
            });
            if (category) {
                return res.status(200).json(category);
            } else {
                return res.status(400).send("Invalid request body");
            }
        }
    } catch (error) {
        console.log('getUser - queryType:', queryType, ' - [Error]: ', error);
    }
}

const updateCategory = async (req, res) => {
    var updateItem = req.params.name;
    console.log('Categories - updateCategory: ', updateItem);
    const { name, imageUrl } = req.body;
    try {
        const category = await Category.findOne({
            where: {
                name: updateItem
            }
        });
        if (!category) {
            return res.status(404).send("Requested category: '" + updateItem + "' not found");
        }
        const checkCategoryNameExist = await Category.findOne({
            where: {
                name: name
            }
        });
        if (checkCategoryNameExist && updateItem != category.name) {
            return res.status(403).send("Can't create '"+name+"' category : name already exist.");
        }
        await Category.update(
            {
                name: name,
                imageUrl: imageUrl,
            },
            {
                where: { name: updateItem }
            }
        );
        const findCategory = await Category.findOne({
            where: {
                name: name,
                imageUrl: imageUrl,
            },
        });
        //broadcast(req.app.locals.clients, 'update', findUser);
        if(!findCategory)
        {
            return res.status(401).send("can't check that the category was updated but everything seems to be OK");
        }
        return res.status(200).send(findCategory);

    } catch (error) {
        console.log('Categories - (updateCategory) Failure :', updateItem, ' - [Error]: ', error)
    }
}

const deleteCategory = async (req, res) => {
    const name = req.params.name;
    try {
        const category = await Category.findOne({
            where: { name: name }
        });
        if (!category) {
            return res.status(404).send("Requested category: '" + name + "' not found");
        } else {
            await category.destroy();
            //Do not broadcast for the moment
            //broadcast(req.app.locals.clients, 'delete', category);
            return res.status(200).send("OK");
        }
    } catch (error) {
        console.log('Categories - (deleteCategory) Failure trying to delete \'',name,'\' category: ', error)
    }
}

module.exports = {
    getAll,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};