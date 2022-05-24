import type { NextPage } from 'next'
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/es/highlight.min.js';
const Tailwind = () => {
  const sections = [
    'svgs',
    'components',
    'animation'
  ]

  const Content = () => {
    return (
      <div className='w-full h-max p-4'>
        <p>hero icons </p>
     </div>
    )
  }

  return (
    
    <div className="w-full space-y-4 h-screen flex flex-col p-4">

    <div className='w-full h-max pb-4 border-b-2 border-gray-300'>
      <p className='font-bold text-5xl'>Tailwind css</p>
      <p>docs: <a href='https://tailwindcss.com/docs/installation' className=''>https://tailwindcss.com/docs/installation</a></p>
    </div>

    <div className='flex w-full h-screen '>
    <div className=' flex flex-col space-y-4 w-max h-full p-4 border-r-2 border-gray-300'>
      {sections.map(section => (
        <div key={section} className='w-full cursor-pointer h-max rounded-md text-center bg-blue-500 p-2'>
          {section}
        </div>
      ))}
    </div>
    <Content />
    </div>


    </div>

  )
}

export default Tailwind;