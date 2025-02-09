import mongoose from "mongoose";
//passing object inside my Post schema which we usually do while creating Schema


// Here are a few commonly used schema options in MongoDB/Mongoose: REQUIRED FIELDS
// required: Specifies that the field must have a value and is mandatory.
// default: Sets a default value for the field if no value is provided.
// unique: Ensures that the field value is unique across documents in the collection.
// min and max: Specifies the minimum and maximum allowed values for numeric fields.
// enum: Defines an enumeration of allowed values for the field.
// trim: Removes leading and trailing whitespace from string values.
// validate: Provides custom validation logic for the field.
// index: Creates an index on the field for improved query performance.
// These options allow you to control the behavior and constraints of your MongoDB schemas, ensuring data integrity and enforcing specific rules for the fields in your documents.

const PostSchema = new mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
})
//model creation
const Post = mongoose.model("Post", PostSchema)

export default Post
// now this schema can be used while generating new Posts