
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Play, Pause } from 'lucide-react';

interface VoiceInputProps {
  language: string;
  onTranscriptionComplete?: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ language, onTranscriptionComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      // Simulate recording and transcription
      setTimeout(() => {
        stopRecording();
        const mockTranscription = language === 'hi' 
          ? 'मुझे एक धोखाधड़ी कॉल आई थी।'
          : 'I received a fraud call.';
        setTranscription(mockTranscription);
        onTranscriptionComplete?.(mockTranscription);
      }, 3000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-4">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              className={`${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white rounded-full p-4`}
              size="lg"
            >
              {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            
            {transcription && (
              <Button
                onClick={() => speakText(transcription)}
                variant="outline"
                className="rounded-full p-4"
              >
                <Volume2 className="h-6 w-6" />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Badge variant={isRecording ? 'destructive' : 'secondary'}>
              {isRecording ? 'Recording...' : 'Ready to record'}
            </Badge>
            {language !== 'en' && (
              <Badge variant="outline" className="ml-2">
                {language === 'hi' ? 'हिंदी में बोलें' : `Speak in ${language}`}
              </Badge>
            )}
          </div>

          {transcription && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Transcription:</h4>
              <p className="text-gray-700" dir={language === 'ur' ? 'rtl' : 'ltr'}>
                {transcription}
              </p>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p>Click the microphone to start voice input</p>
            <p>Audio playback available for illiterate users</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInput;
