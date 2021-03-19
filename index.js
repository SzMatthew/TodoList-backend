const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(cors());

//Import Routes
const projectsRoute = require('./routes/projects');
const todosRoute = require('./routes/todos');

app.use('/projects', projectsRoute);
app.use('/todos', todosRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the TODOIST Clone Backend');
});

//DB Connect
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port: ${PORT}`)
		})
	})
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);