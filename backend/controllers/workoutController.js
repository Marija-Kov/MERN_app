const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
const { ApiError } = require('../error/error');

const getAllItems = async (req, res) => {
 if(!req.user){
  ApiError.notAuthorized("Not authorized")
 }
 const page = req.query.p || 0;
 const itemsPerPage = 3;
 const search = req.query.search || null;
 const user_id = req.user._id; 
 const allUserWorkoutsMuscleGroups = (await Workout.find({ user_id })).map(workout => workout.muscle_group);
 const allUserWorkoutsByQuery = await Workout.find(
     search
       ? { user_id, title: new RegExp(`^${search.toLowerCase()}`) }
       : { user_id }
   );
 const workoutsChunk = await Workout.find(
     search ? { user_id, title: new RegExp(`^${search.toLowerCase()}`)} : { user_id }
   ) 
     .sort({ createdAt: -1 })
     .skip(page * itemsPerPage)
     .limit(itemsPerPage);
     res
     .status(200)
     .json({
       total: allUserWorkoutsByQuery.length,
       allUserWorkoutsMuscleGroups: allUserWorkoutsMuscleGroups,
       workoutsChunk: workoutsChunk,
       limit: itemsPerPage,
       pageSpread: pageSpreadHelper(allUserWorkoutsByQuery.length, itemsPerPage),
       noWorkoutsByQuery: allUserWorkoutsByQuery.length ? false : `No workouts found by query '${search}'`,
     });
};

const addItem = async (req, res) => {
 if(!req.user){
  ApiError.notAuthorized("Not authorized")
 }
 const {title, muscle_group, reps, load} = req.body;
 if(!title || !muscle_group || !String(reps) || !String(load)){
  ApiError.badInput("Please fill out the empty fields")
 }
 const user_id = req.user._id;
 const allWorkoutsByUser = await Workout.find({ user_id });
 const limit =
   process.env.NODE_ENV !== "test"
     ? Number(process.env.MAX_WORKOUTS_PER_USER)
     : Number(process.env.TEST_MAX_WORKOUTS_PER_USER);
 if(allWorkoutsByUser.length === limit){
  const id = allWorkoutsByUser[0]._id;
  await Workout.findOneAndDelete({ _id: id });
 }
 const workout = await Workout.create({title: title.trim().toLowerCase(), muscle_group, reps, load, user_id});
 res.status(200).json(workout);
};

const updateItem = async (req, res) => {
 const { id } = req.params;
 if(!mongoose.Types.ObjectId.isValid(id)){
  ApiError.notFound("Invalid workout id")
 }
 const workout = await Workout.findOneAndUpdate({_id: id}, req.body, {new: true, runValidators: true}); 
 res.status(200).json(workout);
};

const deleteItem = async (req, res) => {
 const { id } = req.params;
 if(!mongoose.Types.ObjectId.isValid(id)){
  ApiError.notFound("Invalid workout id")
 }
 const workout = await Workout.findOneAndDelete({_id: id});
 if(!workout){
  ApiError.notFound(`Workout id (${id}) does not exist`)
 }
 const workouts = await Workout.find({user_id: workout.user_id});
 res.status(200).json({workout: workout, remaining: workouts.length});
};

const deleteAllUserItems = async (req, res) => {
 if(!req.user){
  ApiError.notAuthorized("Not authorized")
 }
 const user_id = req.user._id;
 const workouts = await Workout.deleteMany({ user_id }); 
 res.status(200).json(workouts);
};

const pageSpreadHelper = (t, l) => {
 const pagesNum = Math.ceil(t / l);
 let spread = [];
 for(let i = 1; i <= pagesNum; ++i){
   spread.push(i);
 }
 return spread
};

module.exports = {
       getAllItems,
       addItem,
       deleteItem,
       updateItem,
       deleteAllUserItems
      }


////------ Handling missing input server-side -----////

    // let emptyFields = [];
    // if(!title){
    //   emptyFields.push('title')
    // };
    // if(!reps){
    //   emptyFields.push('reps')
    // };
    // if(!load){
    //   emptyFields.push('load')
    // };
    // if(emptyFields.length > 0){
    //   res.status(400).json({error: 'Please fill in all the fields.', emptyFields})
    // };