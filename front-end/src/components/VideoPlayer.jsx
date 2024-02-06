import React, { useState } from 'react';

const VideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <video controls autoPlay={isPlaying}>
                <source src="/livestream" type="video/mp4" />
            </video>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default VideoPlayer;
