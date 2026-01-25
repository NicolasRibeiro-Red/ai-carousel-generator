'use client';

import { useState, useRef, useCallback } from 'react';

interface UseAudioRecorderReturn {
  isRecording: boolean;
  isTranscribing: boolean;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    setError(null);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Permissao de microfone negada. Ative nas configuracoes do navegador.');
        } else if (err.name === 'NotFoundError') {
          setError('Nenhum microfone encontrado.');
        } else {
          setError('Erro ao iniciar gravacao.');
        }
      }
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || !isRecording) {
        resolve(null);
        return;
      }

      mediaRecorderRef.current.onstop = async () => {
        setIsRecording(false);
        setIsTranscribing(true);

        try {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });

          // Send to transcription API
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');

          const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();

          if (!response.ok) {
            setError(data.error || 'Erro ao transcrever audio');
            resolve(null);
            return;
          }

          resolve(data.text);
        } catch (err) {
          console.error('Transcription error:', err);
          setError('Erro ao transcrever audio. Tente novamente.');
          resolve(null);
        } finally {
          setIsTranscribing(false);

          // Stop all tracks
          mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
          mediaRecorderRef.current = null;
          chunksRef.current = [];
        }
      };

      mediaRecorderRef.current.stop();
    });
  }, [isRecording]);

  return {
    isRecording,
    isTranscribing,
    error,
    startRecording,
    stopRecording,
  };
}
