const express =require ('express');
const { getTasks, createTask, updateTask, deleteTask }=require( '../controllers/taskController.js');
const { protect } =require( '../Middleware/auth.js');
const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports=router;
