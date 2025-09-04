import { useState } from 'react'
import './App.css'
import axios from 'axios'

function Model() {

  const [prompt,setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)



  const Prompt = async () => {

    if (!prompt.trim()) return
    setLoading(true)
    setOutput("")

    try {
      const response = await axios.post('http://localhost:3000/simplify', {
        text: prompt
      })

      const data = await response.data

      if (data.simplified) {
        setOutput(data.simplified)
      } else {
        setOutput("somethings Went wrong")
      }
    } catch (error) {
      console.error("Error:", error);
      setOutput("❌ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  }
  

  return (
  
    <div className=" bg-gray-700">

      <div className=" w-full p-10 justify-center text-balance  overflow-y-auto mb-28 text-white ">
        <p>{output}</p>
      </div>
      <div className='fixed  bottom-4 left-0 w-full flex justify-center px-4 '>
        <div className=" w-full h-25 max-w-5xl bg-gray-800 rounded-full shadow-lg px-4 py-2 flex items-center">
          <textarea
            className="flex-1 h-14 bg-gray-800 text-white p-2 rounded-full"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask your legal query"
          />
          <button
            onClick={Prompt}
            disabled={loading}
            className="bg-gray-500 ml-3 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            {loading ? "Simplifying..." : "Simplify"}
          </button>
        </div>
      </div>
    
      
    </div>

   
      
      

  )
}

export default Model
