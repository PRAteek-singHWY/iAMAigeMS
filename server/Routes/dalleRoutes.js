
// THIS IS BEING USED TO GENERATE THE DATA FROM THE API.

import express from "express";
import * as dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"

// making sure enviornment variables are getting populated
//basically to use processs.env object  to access env secret keys  we do dotenv.config
dotenv.config()

const router = express.Router()
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANISATION_KEY,
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

//route to make api call to openAI api
router.route("/").post(async (req, res) => {
    try {

    //this is coming from frontend part -> the prompt part 
    //getting request from front-end
        const { prompt } = req.body

        //the aiResponse
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format:"b64_json"
        })

        //getting image out of it(the aiResponse)
        const image = aiResponse.data.data[0].b64_json
        //and after getting it sending it back to frontend
        //sending the response back to frontend
        res.status(200).json({photo:image})
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message)
    }

})

export default router

// route is finalized 
// we going back to our fornt end and  call our backend and see if it's going to bring anything back

