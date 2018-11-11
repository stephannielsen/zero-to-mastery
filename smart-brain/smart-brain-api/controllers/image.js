const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a170787715ba4e57aacef321120c2a9e'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json(err));
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json(err));
}

module.exports = {
    handleImage,
    handleApiCall
}