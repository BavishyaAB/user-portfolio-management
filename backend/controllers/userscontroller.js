import { Counter, User } from "../models/users.js";

export const createUser = (req,res) => {
    const {first_name,last_name,company_name,city,state,email,password,web} = req.body;
    const zip = Number(req.body.zip);
    const age = Number(req.body.age);
    const newUser = new User({
        first_name,
        last_name,
        company_name,
        city,
        state,
        zip,
        email,
        password,
        web,
        age});
    Counter.findByIdAndUpdate({_id:'userid'},{$inc: {seq:1}},{new:true})
        .then((counter)=> {
            console.log(counter);
            newUser._id = counter.seq;
            newUser.save()
                .then(() => res.status(200).json({success:true,msg:"User registered successfully"}))
                .catch((err) => res.status(400).json(`Error:${err}`));
        })
        .catch((err) => console.log(`Error:${err}, failure in getting sequence`));
}
export const getAllUser = (req,res) => {
    User.find()
        .then((users) => res.status(200).json({users}))
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

export const getUser = (req,res) => {
    const {id:userid} = req.params;
    User.findById(userid)
        .then((user) => res.status(200).json({user}))
        .catch((err) => res.status(400).json(`Error:${err}`));
}

export const updateUser = (req,res) => {
    const {id:userid} = req.params;
    User.findById(userid)
        .then((user) => {
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.company_name = req.body.company_name;
            user.city = req.body.city;
            user.state = req.body.state;
            user.zip = req.body.zip;
            user.email = req.body.email;
            user.password = req.body.password;
            user.web = req.body.web;
            user.age = req.body.age;

            user.save()
                .then(() => res.status(200).json({success:true,msg:"User details Updated successfully"}))
                .catch((err) => res.status(400).json(`Error: ${err}`));
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

export const deleteUser = (req,res) => {
    const {id:userid} = req.params;
    User.findByIdAndDelete(userid)
        .then(() => res.status(200).json({success:true,msg:"User deletion successful"}))
        .catch((err) => res.status(400).json(`Error: ${err}`));
}