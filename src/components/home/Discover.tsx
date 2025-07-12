import React from 'react'
import CommonWrapper from '@/common/CommonWrapper';
import ClientHeading from '../reusable/ClientHeading';

const Discover = () => {
  return (
    <div>
        <CommonWrapper>
            <ClientHeading headingText="Discover with" spanText="vacanza" />
             <p className="text-lg md:text-xl lg:text-2xl text-dark-3 font-regular text-center max-w-4xl mx-auto mb-10">
          Watch our introductory video to learn more about how HomeExchange works and the amazing experiences awaiting you.
        </p>

        <div className="mt-9">
            <video src="">
                
            </video>
        </div>

        </CommonWrapper>
    </div>
  )
}

export default Discover