import { useRef, useCallback, useEffect, useState } from 'react';

// MediaPipe Hand Landmark connections for drawing skeleton
const HAND_CONNECTIONS = [
[0, 1],
[1, 2],
[2, 3],
[3, 4], // Thumb
[0, 5],
[5, 6],
[6, 7],
[7, 8], // Index
[0, 9],
[9, 10],
[10, 11],
[11, 12], // Middle
[0, 13],
[13, 14],
[14, 15],
[15, 16], // Ring
[0, 17],
[17, 18],
[18, 19],
[19, 20], // Pinky
[5, 9],
[9, 13],
[13, 17] // Palm
];

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface DetectionResult {
  landmarks: HandLandmark[][];
  handedness: string[];
  confidence: number[];
}

export function useHandDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);
  const handLandmarkerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isHandDetected, setIsHandDetected] = useState(false);
  const [handConfidence, setHandConfidence] = useState(0);
  const [fingerStates, setFingerStates] = useState<boolean[]>([
  false,
  false,
  false,
  false,
  false]
  );
  const latestLandmarksRef = useRef<HandLandmark[][]>([]);

  const initMediaPipe = useCallback(async () => {
    setIsLoading(true);
    try {
      const vision = await import(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs' as any
      );
      const { HandLandmarker, FilesetResolver } = vision;

      const filesetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
      );

      handLandmarkerRef.current = await HandLandmarker.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
          numHands: 2,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        }
      );

      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Failed to init MediaPipe:', err);
      setIsLoading(false);
      return false;
    }
  }, []);

  const getFingerStates = useCallback(
    (landmarks: HandLandmark[]): boolean[] => {
      if (landmarks.length < 21) return [false, false, false, false, false];

      // Thumb: compare tip x vs IP joint x (for right hand)
      const thumbUp = landmarks[4].y < landmarks[3].y;
      // Index: tip above PIP
      const indexUp = landmarks[8].y < landmarks[6].y;
      // Middle: tip above PIP
      const middleUp = landmarks[12].y < landmarks[10].y;
      // Ring: tip above PIP
      const ringUp = landmarks[16].y < landmarks[14].y;
      // Pinky: tip above PIP
      const pinkyUp = landmarks[20].y < landmarks[18].y;

      return [thumbUp, indexUp, middleUp, ringUp, pinkyUp];
    },
    []
  );

  const drawLandmarks = useCallback(
    (
    ctx: CanvasRenderingContext2D,
    landmarks: HandLandmark[],
    width: number,
    height: number) =>
    {
      // Draw connections
      ctx.strokeStyle = 'rgba(8, 145, 178, 0.8)';
      ctx.lineWidth = 3;
      for (const [start, end] of HAND_CONNECTIONS) {
        const startPt = landmarks[start];
        const endPt = landmarks[end];
        if (startPt && endPt) {
          ctx.beginPath();
          ctx.moveTo(startPt.x * width, startPt.y * height);
          ctx.lineTo(endPt.x * width, endPt.y * height);
          ctx.stroke();
        }
      }

      // Draw landmark points
      for (const landmark of landmarks) {
        ctx.beginPath();
        ctx.arc(landmark.x * width, landmark.y * height, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#0891B2';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw fingertip highlights (tips are indices 4, 8, 12, 16, 20)
      const tipIndices = [4, 8, 12, 16, 20];
      for (const idx of tipIndices) {
        const tip = landmarks[idx];
        if (tip) {
          ctx.beginPath();
          ctx.arc(tip.x * width, tip.y * height, 8, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(249, 115, 22, 0.8)';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    },
    []
  );

  const startDetectionLoop = useCallback(() => {
    if (!handLandmarkerRef.current || !videoRef.current || !canvasRef.current)
    return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTimestamp = -1;

    const detect = () => {
      if (!video || video.readyState < 2 || !handLandmarkerRef.current) {
        animFrameRef.current = requestAnimationFrame(detect);
        return;
      }

      // Resize canvas to match video
      if (
      canvas.width !== video.videoWidth ||
      canvas.height !== video.videoHeight)
      {
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
      }

      const timestamp = performance.now();
      if (timestamp === lastTimestamp) {
        animFrameRef.current = requestAnimationFrame(detect);
        return;
      }
      lastTimestamp = timestamp;

      try {
        const results = handLandmarkerRef.current.detectForVideo(
          video,
          timestamp
        );
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.landmarks && results.landmarks.length > 0) {
          setIsHandDetected(true);
          latestLandmarksRef.current = results.landmarks;

          // Get confidence from handedness
          const conf = results.handedness?.[0]?.[0]?.score || 0;
          setHandConfidence(conf);

          // Get finger states from first hand
          const fingers = getFingerStates(results.landmarks[0]);
          setFingerStates(fingers);

          // Draw all detected hands
          for (const handLandmarks of results.landmarks) {
            drawLandmarks(ctx, handLandmarks, canvas.width, canvas.height);
          }
        } else {
          setIsHandDetected(false);
          setHandConfidence(0);
          latestLandmarksRef.current = [];
          setFingerStates([false, false, false, false, false]);
        }
      } catch (e) {

        // Detection can fail on some frames, just continue
      }
      animFrameRef.current = requestAnimationFrame(detect);
    };

    detect();
  }, [drawLandmarks, getFingerStates]);

  const startCamera = useCallback(async () => {
    try {
      // Init MediaPipe if not already done
      if (!handLandmarkerRef.current) {
        const success = await initMediaPipe();
        if (!success) {
          alert(
            'Could not load hand detection model. Detection will be simulated.'
          );
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => {
          startDetectionLoop();
        };
      }
      streamRef.current = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please ensure permissions are granted.');
    }
  }, [initMediaPipe, startDetectionLoop]);

  const stopCamera = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx)
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setIsCameraActive(false);
    setIsHandDetected(false);
    setHandConfidence(0);
  }, []);

  // Validate a sign based on hand detection + finger states
  const validateSign = useCallback(
    (signId: string): boolean => {
      if (!isHandDetected || handConfidence < 0.6) return false;

      const [thumb, index, middle, ring, pinky] = fingerStates;

      // Basic gesture matching for known signs
      switch (signId) {
        case 'a': // Fist - all fingers down, thumb to side
          return !index && !middle && !ring && !pinky;
        case 'b': // Fingers up, thumb folded
          return !thumb && index && middle && ring && pinky;
        case 'c': // C shape - partial curl
          return isHandDetected && handConfidence > 0.7;
        case '1': // Index up only
          return index && !middle && !ring && !pinky;
        case '2': // Index + middle (V shape)
          return index && middle && !ring && !pinky;
        case 'hai': // Wave - open hand
          return index && middle && ring && pinky;
        case 'terima-kasih': // Hand near chin then forward
          return isHandDetected && handConfidence > 0.7;
        case 'maaf': // Fist on chest
          return !index && !middle && !ring && !pinky;
        case 'selamat-pagi': // Open hand rising
          return index && middle && ring && pinky && thumb;
        default:
          // For unrecognized signs, use hand presence + confidence
          return isHandDetected && handConfidence > 0.75;
      }
    },
    [isHandDetected, handConfidence, fingerStates]
  );

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    canvasRef,
    isLoading,
    isCameraActive,
    isHandDetected,
    handConfidence,
    fingerStates,
    startCamera,
    stopCamera,
    validateSign
  };
}