// import { useState } from "react"
import { Link } from "react-router-dom"
import { download } from "../assets"
import { downloadImage } from '../utils'



const Card = ({ _id, name, prompt, photo }) => {
  // const [hover, setHover] = useState(false)

  return (

    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card ">
      <img
        className="  w-full h-auto object-cover rounded-xl "
        src={photo}
        alt={prompt}
      />

      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-yellow-500 overflow-y-auto prompt text-sm
    ">{prompt}</p>

        <div className="mt-5 flex 
    justify-between items-center gap-2 ">

          <div className="flex items-center gap-2" >
            <div className="bg-[#F59E0B]  w-7 h-7 rounded-full text-black ">
              <p className="
              justify-center items-center flex
              text-center font-semibold text-1xl mt-0.5">{name[0]}</p>


            </div>
            <p className="text-center text-yellow-500  font-semibold text-xs  ">{name}</p>

          

          </div>

          <button
              type="button"

              onClick={() => downloadImage

                (_id, photo)}
              className="outline-none bg-transparent border-none"
            >
              <img
                className="w-6 h-6 object-contain "
                src={download}
                alt="download-button"
              />

            </button>

        </div>


      </div>

      {/* {hover && 
      <p className=" font-extralight text-sm 
    ">{prompt}</p>
    } */}



    </div>
  )
}

export default Card 