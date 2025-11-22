import React, { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoSource: string;
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSource,
  opacity = 0.7,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const maxDuration = 120; // 2 minutes in seconds

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video attributes
    video.muted = true;
    video.playsInline = true;
    video.loop = false; // We'll handle the loop manually
    
    // Try to play the video
    const playVideo = () => {
      console.log('Attempting to play video...');
      video.play().catch(error => {
        console.log('Autoplay prevented:', error);
        // Add click handler to start video on user interaction
        const handleInteraction = () => {
          console.log('User interaction detected, trying to play video...');
          video.play().catch(e => console.error('Error playing video:', e));
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
        };
        
        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
        
        return () => {
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
        };
      });
    };

    // Handle time update to reset at 2 minutes
    const handleTimeUpdate = () => {
      if (video.currentTime >= maxDuration) {
        video.currentTime = 0;
        video.play().catch(console.error);
      }
    };

    // Set up event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', () => {
      console.log('Video metadata loaded, duration:', video.duration);
      playVideo();
    });
    
    // Also try to play when the page loads
    const handleLoad = () => {
      console.log('Page loaded, attempting to play video...');
      playVideo();
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    // Cleanup
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', playVideo);
      window.removeEventListener('load', handleLoad);
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [videoSource]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          opacity,
          backgroundColor: '#0A1A2F',
          zIndex: -1,
        }}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none',
          zIndex: 0,
        }} 
      />
    </div>
  );
};

export default VideoBackground;
