//utility functions 

//  are functions we gonna reuse

import FileSaver from "file-saver"
import { surpriseMePrompts } from "../constants"//filesaver

export function getRandomPrompt(prompt) {
    const randomIndex =
        Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]
    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt)
    }
    return randomPrompt
}
// Start
// |
// |--- Receive `prompt` as a parameter
// |    
// |--- Generate a random index `randomIndex`
// |    |
// |    |--- Calculate `randomIndex` using Math.random() and length of `surpriseMePrompts`
// |    |    |
// |    |    |--- Math.random()
// |    |    |
// |    |    |--- Multiply by the length of `surpriseMePrompts`
// |    |    |
// |    |    |--- Math.floor()
// |    |
// |    |--- Get `randomPrompt` from `surpriseMePrompts` using `randomIndex`
// |    
// |--- Check if `randomPrompt` is equal to `prompt`
// |    |
// |    |--- Yes
// |    |    |
// |    |    |--- Recursively call getRandomPrompt(prompt)
// |    |    |
// |    |    |--- Go back to generating a new random index and prompt and keep doing this until they differ
// |    |
// |    |--- No
// |    |    |
// |    |    |--- Return `randomPrompt` as the final result
// |
// End




//using filesaver
export async function downloadImage(_id,photo){
FileSaver.saveAs(photo,`download-${_id}.jpg`)
}
