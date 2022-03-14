const express = require('express'),
	router = express.Router({ mergeParams: true }),
	Stream = require('./model');

// list of all streams
router.get('/', (req, res) => {
	Stream.find((err, allStreams) => {
		if (!err) res.json(allStreams);
		else console.log(err);
	});
});

// showing the specified stream
router.get('/:id', (req, res) => {
	Stream.findById(req.params.id).exec(function (err, foundStream) {
		if (err) res.send({ error: 'Stream not found' });
		else res.send({ foundStream });
	});
});

router.post('/', (req, res) => {
	// res.send(req.body);
	var title = req.body.title,
		description = req.body.description,
		userId = req.body.userId;

	var newStream = { title: title, description: description, userId: userId };
	// console.log(newStream);
	// res.send(newStream);
	Stream.create(newStream, (err, newlyCreated) => {
		if (err) console.log(err);
		else res.send(newStream);
	});
	// (err, newlyCreated) => {
	// 	if (!err) res.send(newlyCreated);
	// 	else res.send({ err });
	// };
});

// updating specified stream
router.patch('/:id', (req, res) => {
	Stream.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body.stream },
		(err, doc) => {
			if (!err) res.send(doc);
			else console.log('Error while updating record');
		}
	);
});

// deleting specified stream
router.delete('/:id', (req, res) => {
	Stream.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) res.send(docs);
		else
			console.log(
				'Error while deleting a record : ' + JSON.stringify(err, undefined, 2)
			);
	});
});

module.exports = router;
