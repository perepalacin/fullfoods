import React from 'react'

interface MaxWidthWrapperProps{
    children: React.ReactNode;
}

const MaxWidthWrapper:React.FC<MaxWidthWrapperProps> = ({
    children,
}) => {
  return (
        <div className='w-full p-2 md:p-4 '>
        {/* <div className='w-full px-2 sm:px-4 2xl:px-44'> */}
            {children}
        </div>
  )
}

export default MaxWidthWrapper