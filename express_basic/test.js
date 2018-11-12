const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const users = [
    {id: 1, name: 'yanghy', email: 'gulatnaru1@naver.com', age: 33},
    {id: 2, name: 'yang', email: 'gulatnaru2@naver.com', age: 33},
]


function validateCheck(user){
    const schema = {
        name: Joi.string().min(1).required(),
        email: Joi.string().email().required().min(5).max(25),
        age: Joi.number().min(3)
    }
    return Joi.validate(user, schema);
}

function getUser(users, id){
    return users.find(user => user.id === id);
}

app.get('/app/users', (req, res) => {
    res.send(users);
});

app.get('/app/users/:id', (req, res) => {
   const user = getUser(users, parseInt(req.params.id));
   if(!user) res.status(404).send(`user's id(${req.params.id}) is not found`);
   res.send(user);
})

app.post('/app/users', (req, res) => {
    const {error} = validateCheck(req.body); //validateUser(req.body).error
    console.log(error);
    if(error) res.status(400).send(error.message);

    
    // const name = req.body.name;
    // const email = req.body.email;
    // const age = req.body.age;

    const {name, email, age} = req.body;

    const user = {
        id: users.length +1,
        name: name,
        email, //email: email
        age: age || null
    }

    users.push(user);
    res.send(users);
})

app.delete('/app/users/:id', (req, res) => {
    const user = getUser(users, parseInt(req.params.id));
    if(!user) res.status(404).send(`user's id(${req.params.id}) is not found`);

    users.splice(users.indexOf(user), 1);
    res.send(users);
})

//put: 데이터를 지우고 input하는 방식. patch: 업데이트..
app.put('/app/users/:id', (req, res) => {
    const user = getUser(users, parseInt(req.params.id));
    if(!user) res.status(404).send(`user's id(${req.params.id}) is not found`);

    const {error} = validateCheck(req.body);
    if(error) res.status(400).send(error.message);

    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;

    res.send(users);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}`));
