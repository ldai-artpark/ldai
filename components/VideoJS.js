import React, { useEffect, useRef } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

const VideoJS = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { videoUrl, options, onReady } = props;

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video");
            videoElement.classList.add('video-js');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });

        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(videoUrl);
        }
    }, [videoUrl, options, onReady, videoRef]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} className="vjs-layout-medium" />
        </div>
    );
}

export default VideoJS;
