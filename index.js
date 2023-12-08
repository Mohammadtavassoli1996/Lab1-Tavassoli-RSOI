const express = require('express');
const bodyParser = require('body-parser');




const app = express();
app.use(bodyParser.json());


let persons = [
  { id: 1, name: 'John Doe', address: '123 Main St', work: 'Engineer', age: 30 },
  { id: 2, name: 'Jane Doe', address: '456 Oak St', work: 'Teacher', age: 25 },
];




// Root path
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});




// GET a specific person by ID
app.get('/api/v1/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = persons.find(p => p.id === parseInt(id));

  if (!person) {
    return res.status(404).json({ error: 'Not Found' });
  }

  res.json(person);
});




// GET all persons
app.get('/api/v1/persons', (req, res) => {
  res.json(persons);
});




// POST to add a new person
app.post('/api/v1/persons', (req, res) => {
  const { name, address, work, age } = req.body;
  const newPerson = { id: persons.length + 1, name, address, work, age };
  persons.push(newPerson);
  res.status(201).location(`/api/v1/persons/${newPerson.id}`).send();
});





// PATCH to update a specific person by ID
app.patch('/api/v1/persons/:id', (req, res) => {
    const { id } = req.params;
    const { name, address, work, age } = req.body;
    const index = persons.findIndex(p => p.id === parseInt(id));
  
    if (index === -1) {
      return res.status(404).json({ error: 'Person not found' });
    }
  
    persons[index] = { ...persons[index], name, address, work, age };
    res.json(persons[index]);
  });




  
  // DELETE a specific person by ID
  app.delete('/api/v1/persons/:id', (req, res) => {
    const { id } = req.params;
    const index = persons.findIndex(p => p.id === parseInt(id));
  
    if (index === -1) {
      return res.status(404).json({ error: 'Person not found' });
    }
  
    const deletedPerson = persons.splice(index, 1)[0];
    res.status(204).send();
    // res.json(deletedPerson);
  });
  





  
const port = process.env.PORT || 3000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
