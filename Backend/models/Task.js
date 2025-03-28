const  mongoose =require('mongoose');

const taskSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  category: { type: String, default: 'General' },
}, { timestamps: true });

module.exports= mongoose.model('Task', taskSchema);
