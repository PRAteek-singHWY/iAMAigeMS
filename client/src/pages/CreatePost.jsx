// IMPLEMENT ALL THE UI To GENERATE ALL THE DIFFERENT IMAGES
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
const CreatePost = () => {
  //navigate back to homepage after post creation
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  //this is gonna be used while we are waiting for the response from api
  const [generatingImg, setGeneratingImg] = useState(false);

  //general loading state
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    //making a call to our backend from this function
    if (form.prompt) {
      try {
        // settting generatingImg to True
        setGeneratingImg(true);
        //response
        const response = await fetch(
          //fetching


          // https://imaigem-4hbi.onrender.com
          "https://imaigem-4hbi.onrender.com/api/v1/dalle",
          //method
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            //converting javascript object to JSON srtring
            //e.g
            // const data = { name: 'John', age: 25, isStudent: true };
            // const jsonString = JSON.stringify(data);
            // console.log(jsonString);
            // // Output: {"name":"John","age":25,"isStudent":true}
            body: JSON.stringify({ prompt: form.prompt }),
            //fetching finished
          }
        );
        //parsing the data
        const data = await response.json();
        console.log(data);
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        console.log("error in post-1 of createPost");

        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  //handling submit button to actually use backend by calling post route
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        //calling post image route

        //from  here we are getting redirected to home

        const response = await fetch(
          "https://imaigem-4hbi.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        await response.json();
        navigate("/");
      } catch (error) {
        console.log("error in post-2 of createPost");
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please Enter a Prompt and generate your image");
    }
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    //creating UI/UX for the website
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#F59E0B] text-[32px]">Create</h1>
        <p className="mt-2 text-[#687784] text-[16px] max-w-[500px]  ">
          Create imaginative and visually stunning images through OpenAI's
          DALL·E 2 and share them with the community
        </p>
      </div>
      {/* form to generate images */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="Firstname Lastname"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="panda mad scientist mixing sparkling chemicals, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-[#eac481] border border-yellow-500 text-yellow-500 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 w-64 p-3 h-64 flex justify-center items-center">
            {/* ai generated iamge will be shown 
and  also show PREVIEW of image if it hasn't been already generated */}
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className={"w-full"} />
            ) : (
              <img
                src={preview}
                alt="prveiew"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="  absolute inset-0 justify-center z-0 flex items-center bg-[#F59E0B]">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flexgap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-[#09710f] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center
"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="pt-3 pb-3 text-gray-400 ">
            Once created you can ShowCase Your AweSome creation in the Community
          </p>
          <button
            type="submit"
            className=" text-white bg-[#4649ff] font-medium text-sm rounded-md py-2.5 px-5 text-center w-full sm:w-auto"
          >
            {loading ? "Sharing with Community..." : "Share with Community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
