import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white">
 <div className='flex items-baseline justify-center
 p-6
 ' >
    <h2 className='text-white text-center border-2 border-blue-500
    px-3 py-2 rounded-full  hover:border-blue-400
    '>See whats new!</h2>
 </div>


    <div className="mx-auto h-screen max-w-screen-xl px-4 py-12 lg:flex ">
      <div className="mx-auto max-w-3xl text-center">
        <h1
          className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
        >
         Write -  Understand - Create
  
          <span className="sm:block"> Solve - Repeat </span>
        </h1>
  
        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
        Your Thinking Is Powerful Enough To Solve Every Problem!
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
      
  
          <a
            className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            href="#"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Hero