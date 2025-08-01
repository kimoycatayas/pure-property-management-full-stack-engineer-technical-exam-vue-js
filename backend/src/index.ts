import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

type Agent = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
};

let agents: Agent[] = [];
let idCounter = 1;

app.get('/agents', (req, res) => {
  res.json(agents);
});

app.get('/agents/:id', (req, res) => {
  const agent = agents.find(a => a.id === parseInt(req.params.id));
  agent ? res.json(agent) : res.status(404).send('Agent not found');
});

app.post('/agents', (req, res) => {
  const { id, firstName, lastName, email, mobileNumber } = req.body;
  const timestamp = new Date().toISOString();

  if (id) {
    const index = agents.findIndex(a => a.id === id);
    if (index !== -1) {
      agents[index] = { ...agents[index], firstName, lastName, email, mobileNumber, updatedAt: timestamp };
      return res.json(agents[index]);
    }
  }

  const newAgent: Agent = {
    id: idCounter++,
    firstName,
    lastName,
    email,
    mobileNumber,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  agents.push(newAgent);
  res.status(201).json(newAgent);
});

app.delete('/agents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = agents.findIndex(a => a.id === id);
  if (index !== -1) {
    agents.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Agent not found');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
