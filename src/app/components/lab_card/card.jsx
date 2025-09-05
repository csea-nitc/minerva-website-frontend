import React from 'react'

const card = ({title , id ,faculty ,staff , location}) => {

  const backend_url = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className='pb-2 px-4 mb-4 sm:mb-10'>
        <p className='text-accent font-jakarta text-2xl sm:text-4xl md:text-5xl font-bold flex items-center gap-2'>
          <a 
            href={`/laboratories/${id}`} 
            className='text-accent font-jakarta text-2xl h-fit sm:text-4xl md:text-5xl font-bold hover:underline flex items-center gap-2'
          >
            {title}
            <img 
              src="https://www.svgrepo.com/show/450458/link.svg" 
              alt="link icon" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
          </a>
        </p>
        <p className='text-accent font-jakarta sm:text-2xl md:text-2xl my-2'>Faculty in charge : <span className='text-black font-normal'>{faculty}</span></p>
        <p className='text-accent font-jakarta sm:text-2xl md:text-2xl my-2'>Staff in Charge : <span className='text-black font-normal'>{staff}</span></p>
        <p className='text-accent font-jakarta sm:text-2xl md:text-2xl my-2'>Location : <span className='text-black font-normal'>{location}</span></p>
        <div className='h-1 mt-4 mb-4' style={{ backgroundColor: '#800080' }}></div>
    </div>
  )
}

export default card