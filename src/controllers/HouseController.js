import { json } from 'express';
import House from '../models/House';
import User from   '../models/User';

class HouseController{

    async index(req, res){
        const {status} = req.query;
        const houses = await House.find({status: status});

        return res.json({houses});
    }

    async store(req, res){

        const {filename} = req.file;
        const { description, price, location, status } = req.body;
        const {user_id} = req.headers;

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description: description,
            price: price,
            location: location,
            status, status,
        });
        
        return res.json({house})
    }

    async update(req, res){

        const {filename} = req.file;
        const { description, price, location, status } = req.body;
        const {user_id} = req.headers;
        const {house_id} = req.params;

        const user = await User.findById(user_id);
        const house = await House.findById(house_id);

        if(String(user._id)!== String(house.user)){
            return res.status(401).json({error:'Não autorizado'});
        }

        const houses = await House.updateOne({
            _id: house_id
        },{
            user: user_id,
            thumbnail: filename,
            description: description,
            price: price,
            location: location,
            status, status,
        });

        //return res.json({houses});
        return res.send();
    }

    async destroy(req, res){

        const {house_id} = req.params;
        const {user_id} = req.headers;
        
        const user = await User.findById(user_id);
        const house = await House.findById(house_id);
    
        if(String(user._id)!== String(house.user)){
            return res.status(401).json({error:'Não autorizado'});
        }

        await House.findByIdAndDelete({_id: house_id});

        return res.json({message:'Excluido'});
    }
}

export default new HouseController();