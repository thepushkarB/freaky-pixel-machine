// todo: add a skeleton loader
// // todo: API receives data for 3 imgs, render all 3 

import { useState } from 'react'
import './App.css'
import waifu from './assets/waifu.jpg'
// import OpenAI from 'openai';
import { Client } from '@gradio/client';

function App() {
  const [img, setImg] = useState("/");
  const [img2, setImg2] = useState("/");
  const [img3, setImg3] = useState("/");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);


  async function genImg() {
    setLoading(true);
    try {
      console.log(`user prompt: ${prompt}`);
  
      const client = await Client.connect("Jonny001/Text-to-Image");
      const result = await client.predict("/generate_images", {
        text: prompt,
        selected_model: "Model 1 (Turbo Realism)",
      });

      if(result.data && result.data[0] && result.data[0].url) {
        setImg(result.data[0].url);
        setImg2(result.data[1].url);
        setImg3(result.data[2].url);
        setLoading(false);

        console.log(`img i: ${result.data[0].url}`);
        console.log(`img ii: ${result.data[1].url}`);
        console.log(`img iii: ${result.data[2].url}`);
      }
      else {
        console.error('No image URL returned');
      }
    }
    catch(error) {
      console.error("cuud gaye guru:", error);
    }

    // setImg(result.data[0].url);
    // console.log(result.data[0].url);
    setLoading(false);
  }



  return (
    <div className="font-mono flex flex-col justify-center items-center">
      <h1 className="font-bold">
        <span className="text-pink-600">Freaky</span> Pixel Machine 🏴‍☠️
      </h1>

      {/* img */}
      {/* <img src={img=="/" ? waifu : img} alt="ai generated waifu" className="rounded-3xl m-3 w-[480px] h-[480px]" /> */}
      <div className="flex w-[480] h-[480px] justify-center items-center mx-16 my-10">
        <img src={img=="/" ? waifu : img} alt="ai generated waifu" className={`rounded-3xl m-3 w-[480px] h-[480px] shadow-[0px_0px_20px_rgba(8,_112,_184,_0.7)] shadow-pink-500`} />
        <img src={img2} alt="ai generated waifu" className={`rounded-3xl m-3 w-[480px] h-[480px] shadow-[0px_0px_20px_rgba(8,_112,_184,_0.7)] shadow-pink-500 ${img2!=="/" ? img : 'hidden'}`} />
        <img src={img3} alt="ai generated waifu" className={`rounded-3xl m-3 w-[480px] h-[480px] 
          shadow-[0px_0px_20px_rgba(8,_112,_184,_0.7)] shadow-pink-500 ${img2!=="/" ? img : 'hidden'}`} />
      </div>

      {/* loading bar - conditional rendering*/}
        <div className={`mt-3 h-2 rounded-full bg-pink-600 ${loading ? 'w-2/3 transition-all duration-[40000ms]' : 'w-0'}`}></div>
        <div className={`mb-3 ${loading ? 'block' : 'hidden'}`}>Loading...</div>

      <div className="w-[480px] h-auto bg-gray-700 rounded-full flex justify-between items-center">
        <input type="text" placeholder="go freaky🌚" className="outline-none w-full bg-gray-700 text-slate-100 ml-10 mr-3 my-6" onChange={(e) => setPrompt(e.target.value)}/>
        <button type="submit" className="rounded-full w-auto h-14 mr-2 hover:bg-pink-600 transition ease-in-out duration-300" onClick={genImg}>Generate</button>
      </div>
    </div>
  )
}

export default App
