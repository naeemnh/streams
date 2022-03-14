const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	NodeMediaServer = require('node-media-server');

const streamRoutes = require('./routes');

mongoose.connect(process.env.NODEDBURL || 'mongodb://localhost:27017/stream', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/streams', streamRoutes);

app.listen(process.env.PORT || 3002, () => {
	console.log('server is running.....');
});

const config = {
	rtmp: {
		port: 1935,
		chunk_size: 60000,
		gop_cache: true,
		ping: 30,
		ping_timeout: 60,
	},
	http: {
		port: 8000,
		allow_origin: '*',
	},
};

const nms = new NodeMediaServer(config);
nms.run();
