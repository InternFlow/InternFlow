const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const courseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  classes: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      startDateTime: { type: Date, required: true },
      duration: { type: String, required: true },
      material: [
        {
          _id: { type: Schema.Types.ObjectId, auto: true },
          name: { type: String, required: true },
          url: { type: String, required: true }
        }
      ]
    }
  ],
  enrollmentStartDate: { type: Date, required: true },
  enrollmentEndDate: { type: Date, required: true },
  courseStartDate: { type: Date, required: true },
  courseEndDate: { type: Date, required: true },
  tags: [{ type: String }],
  image: { type: String},
  trainer: { type: Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
