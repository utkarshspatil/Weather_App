const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const PORT = process.env.PORT || 3000;

const app = express();
const name = 'Utkarsh Patil';

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather Home Page',
		name
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'Weather About Page',
		name
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Weather Help Page',
		name
	});
});

app.get('/weather', (req, res) => {
	const errorHandler = error => {
		res.send({ error });
	};
	if (!req.query.location) return errorHandler({ message: 'No location provided' });
	// geocode(
	// 	req.query.location,
	// 	(error, { lat, lng} = {}) => {
	// 		if (error) return errorHandler(error);
			weather(req.query.location,(error, { location, summary, temperature} = {}) => {
				if (error) return errorHandler(error);
				res.send({
					location,
					summary,
					temperature,
				});
			});
		
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		error: 'Help page not found.',
		name: 'Tim Acker'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		error: 'Page not found.',
		name: 'Tim Acker'
	});
});



app.listen(process.env.PORT || 3000, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });