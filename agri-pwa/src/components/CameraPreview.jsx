import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCamera as faCameraIcon } from '@fortawesome/free-solid-svg-icons';
import '../styles/CameraPreview.css';

const CameraPreview = ({ onClose, onCapture }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' pour la caméra avant, 'environment' pour l'arrière

  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });

        if (isMounted && videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (err) {
        console.error("Erreur d'accès à la caméra:", err);
        setError("Impossible d'accéder à la caméra. Veuillez vérifier les autorisations.");
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      // Convertir en blob puis en URL
      canvas.toBlob((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        onCapture(imageUrl);
      }, 'image/jpeg', 0.9);
    }
  };

  if (error) {
    return (
      <div className="camera-error">
        <p>{error}</p>
        <button onClick={onClose} className="close-button">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    );
  }

  return (
    <div className="camera-preview">
      <button onClick={onClose} className="close-button">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-view"
      />
      
      <div className="camera-controls">
        <button onClick={toggleCamera} className="camera-button switch-camera">
          <FontAwesomeIcon icon={faCameraIcon} rotation={90} />
        </button>
        <button onClick={captureImage} className="camera-button capture-button">
          <div className="capture-circle" />
        </button>
      </div>
    </div>
  );
};

export default CameraPreview;
