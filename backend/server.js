const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/itmentor', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const courseSchema = new mongoose.Schema({
    title: String,
    description: String
});

const Course = mongoose.model('Course', courseSchema);

app.post('/api/courses', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newCourse = new Course({ title, description });
        await newCourse.save();
        res.status(201).json({ id: newCourse._id, title: newCourse.title, description: newCourse.description });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
