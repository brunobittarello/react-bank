const express = require('express');  
const bodyParser = require('body-parser');  
const db = require('./models');
var cors = require('cors');

const app = express();

app.use(bodyParser.json());  
app.use(express.static(__dirname + '/static'));

app.use(cors())

//################# user ####################
//Retrive One
app.get('/api/user/:id', (req, res) => {  
  const id = parseInt(req.params.id)
  return db.User.findByPk(id)
    .then((user) => res.send(user))
    .catch((err) => {
      console.log('There was an error querying user', JSON.stringify(err))
      return res.send(err)
    });
});

//################# contacts ####################
//Retrive List
app.get('/api/contacts', (req, res) => {  
  return db.Contact.findAll()
    .then((contacts) => res.send(contacts))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

//Retrive One
app.get('/api/contacts/:id', (req, res) => {  
  const id = parseInt(req.params.id)
  return db.Contact.findByPk(id)
    .then((contacts) => res.send(contacts))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

//Create
app.post('/api/contacts', (req, res) => {  
  const { user, name, bank, agency, account, email } = req.body;
  console.log( user + "-" + name + "-" + bank + "-" + agency + "-" + account + "-" + email );
  //res.send("<p>"+ name + bank + agency + account + email + "</p>")

  //console.log(db.Contact.create({ name, bank, agency, account, email }));
  
  return db.Contact.create({ user, name, bank, agency, account, email })
    .then((contact) => res.send(contact))
    .catch((err) => {
      console.log('***There was an error creating a contact', JSON.stringify(contact))
      return res.status(400).send(err)
    })
    
});

//Delete
app.delete('/api/contacts/:id', (req, res) => {  
  const id = parseInt(req.params.id)
  return db.Contact.findByPk(id)
    .then((contact) => contact.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('***Error deleting contact', JSON.stringify(err))
      res.status(400).send(err)
    })
});

//Update
app.put('/api/contacts/:id', (req, res) => {  
  const id = parseInt(req.params.id)
  return db.Contact.findByPk(id)
  .then((contact) => {
    const { user, name, bank, agency, account, email } = req.body
    return contact.update({ user, name, bank, agency, account, email })
      .then(() => res.send(contact))
      .catch((err) => {
        console.log('***Error updating contact', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
});

//################# credit card ####################
//create
app.post('/api/creditCards', (req, res) => {
  const { user, firstName, lastName, cardNumber, expMonth, expYear, securityCode } = req.body;
  var data = { user, firstName, lastName, cardNumber, expMonth, expYear, securityCode };
  return db.CreditCard.create(data)
    .then((creditCard) => res.send(creditCard))
    .catch((err) => {
      console.log('***There was an error creating a credit card', JSON.stringify(contact))
      return res.status(400).send(err)
    })
    
});

//Retrive List
app.get('/api/creditCards', (req, res) => {  
  return db.CreditCard.findAll()
    .then((creditCards) => res.send(creditCards))
    .catch((err) => {
      console.log('There was an error querying credit cards', JSON.stringify(err))
      return res.send(err)
    });
});

//Retrive One
app.get('/api/creditCards/:id', (req, res) => {  
  const id = parseInt(req.params.id)
  return db.CreditCard.findByPk(id)
    .then((card) => res.send(card))
    .catch((err) => {
      console.log('There was an error querying credit card', JSON.stringify(err))
      return res.send(err)
    });
});

//Update
app.put('/api/creditCards/:id', (req, res) => {  
  const id = parseInt(req.params.id)
  return db.CreditCard.findByPk(id)
  .then((creditCard) => {
    const { firstName, lastName, cardNumber, expMonth, expYear, securityCode } = req.body;
    var data = { firstName, lastName, cardNumber, expMonth, expYear, securityCode };
    return creditCard.update(data)
      .then(() => res.send(creditCard))
      .catch((err) => {
        console.log('***Error updating credit credit card', JSON.stringify(err))
        res.status(400).send(err)
      })
  })
});

//delete
app.delete('/api/creditCards/:id', (req, res) => {  
  const id = parseInt(req.params.id)
  return db.CreditCard.findByPk(id)
    .then((creditCard) => creditCard.destroy({ force: true }))
    .then(() => res.send({ id }))
    .catch((err) => {
      console.log('***Error deleting credit credit card', JSON.stringify(err))
      res.status(400).send(err)
    })
});

//################# transfer ####################
//create
app.post('/api/transference', (req, res) => {
  const { userId, contact, amount, password } = req.body;
  var data = { userId, contact, amount, password };  
  console.log(data);

    return verifyPassword(res, data)
});

function verifyPassword(res, data)
{
  if (data.amount <= 1000)
    return verifySameTransference(res, data);

  db.User.findByPk(data.userId)
  .then(function(user)
      { 
        if (user.password != data.password)
          return res.status(400).send(JSON.stringify({error: 'Wrong password!'}));

        return verifySameTransference(res, data)
      }
    );  
}

function verifySameTransference(res, data)
{
  db.Transference.findAll({
    where: {
      userId: data.userId
    }
  }).then(function(transferences)
    { 
      var now = new Date();

      for (var i = 0; i < transferences.length; i++)
        if (transferences[i].amount == data.amount && transferences[i].contact == data.contact && Math.round((now - new Date(transferences[i].createdAt)) / 60000) < 2)
          return res.status(400).send(JSON.stringify({error: 'Transfering the same amount to the same contact in less than 2 minutes!'}));

      return executeTransference(res, data)
    }
  );  
}

function executeTransference(res, data)
{
  return db.Transference.create(data)
  .then((transference) => res.send(transference))
  .catch((err) => {
    return res.status(400).send(err)
  })
}

//Retrive
app.get('/api/transference/selectByUser/:userId', (req, res) => { 
  const userId = parseInt(req.params.userId)

  db.Contact.hasMany(db.Transference, {foreignKey: 'id'})
  db.Transference.belongsTo(db.Contact, {foreignKey: 'contact'})

  return db.Transference.findAll({
    where: {
      userId: userId
    },
    include: [db.Contact]
  })
    .then((transference) => res.send(transference))
    .catch((err) => {
      console.log('There was an error querying transference', JSON.stringify(err))
      return res.send(err)
    });
});

//################# transfer ####################




app.listen(3500, () => {  
  console.log('Server is up on port 3500');
});

//node_modules/.bin/sequelize model:create --name User         --attributes name:string,login:string,password:string,email:string,balance:float --force
//node_modules/.bin/sequelize model:create --name Contact      --attributes user:integer,name:string,bank:integer,agency:integer,account:integer,email:string --force
//node_modules/.bin/sequelize model:create --name CreditCard   --attributes userId:integer,firstName:string,lastName:string,cardNumber:string,expMonth:integer,expYear:integer,securityCode:integer --force
//node_modules/.bin/sequelize model:create --name Transference --attributes userId:integer,contact:integer,amount:float,date:date --force