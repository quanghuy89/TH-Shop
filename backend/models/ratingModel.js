import mongoose from "mongoose";

//Create table into DB for Rating
const ratingSchema = new mongoose.Schema(
    {
      value: { type: String, required: true, unique: true },
      label: { type: String, required: true, unique: true },
    },
    {
      timestamps: true, //for date
    }
  );

                                // Rating is name of table 
  const Rating = mongoose.model('Rating', ratingSchema);
  export default Rating;