import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../Assets/LoadingAnimation.json';
import './loading.css'

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className='loadingContainer'>
            <Lottie 
                options={defaultOptions}
                height={100}
                width={100}
            />
        </div>
    )
}

export default Loading