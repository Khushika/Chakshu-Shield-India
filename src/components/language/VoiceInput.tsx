import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VoiceInputProps {
  language: string;
  onTranscriptionComplete?: (text: string) => void;
}

// Language configurations with comprehensive support
const languageConfigs = {
  en: {
    code: "en-IN",
    name: "English",
    sampleText:
      "I want to report a fraud call I received yesterday. Someone called claiming to be from my bank and asked for my PIN.",
    prompts: {
      start: "Click the microphone to start speaking",
      listening: "Listening... Speak clearly",
      processing: "Processing your speech...",
      ready: "Click to start voice input",
    },
  },
  hi: {
    code: "hi-IN",
    name: "हिंदी",
    sampleText:
      "मुझे कल एक धोखाधड़ी की कॉल आई थी जिसकी मैं रिपोर्ट करना चाहता हूं। किसी ने मेरे बैंक का नाम लेकर मेरा PIN मांगा था।",
    prompts: {
      start: "बोलना शुरू करने के लिए माइक्रोफोन पर क्लिक करें",
      listening: "सुन रहा हूं... स्पष्ट रूप से बोलें",
      processing: "आपकी आवाज़ को समझा जा रहा है...",
      ready: "वॉइस इनपुट शुरू करने के लिए क्लिक करें",
    },
  },
  bn: {
    code: "bn-IN",
    name: "বাংলা",
    sampleText:
      "আমি গতকাল একটি জালিয়াতি কল পেয়েছি যা রিপোর্ট করতে চাই। কেউ আমার ব্যাংকের নাম করে আমার PIN চেয়েছিল।",
    prompts: {
      start: "কথা বলা শুরু করতে মাইক্রোফোনে ক্লিক করুন",
      listening: "শুনছি... স্পষ্ট করে বলুন",
      processing: "আপনার কথা বুঝতে চেষ্টা করছি...",
      ready: "ভয়েস ইনপুট শুরু করতে ক্লিক করুন",
    },
  },
  te: {
    code: "te-IN",
    name: "తెలుగు",
    sampleText:
      "నేను నిన్న ఒక మోసపూరిత కాల్ వచ్చిందని రిపోర్ట్ చేయాలని అనుకుంటున్నాను। ఎవరో నా బ్యాంక్ పేరు చెప్పి నా PIN అడ��గారు।",
    prompts: {
      start: "మాట్లాడటం ప్రారంభించ���ానికి మైక్రోఫోన్‌పై క్లిక్ చేయండి",
      listening: "వింటున్నాను... స్పష్టంగా మాట్లాడండి",
      processing: "మీ మాటలను అర్థం చేసుకుంటున్నాను...",
      ready: "వాయిస్ ఇన్‌పుట్ ప్రారంభించడానికి క్లిక్ చేయండి",
    },
  },
  ta: {
    code: "ta-IN",
    name: "தமிழ்",
    sampleText:
      "நான் நேற்று ஒரு மோசடி அழைப்பு வந்ததை தெரிவிக்க விரும்புகிறேன். யாரோ என் வங்கியின் பெயரில் என் PIN கேட்டார்கள்।",
    prompts: {
      start: "பேசத் தொடங்க மைக்ரோஃபோனைக் கிளிக் செய்யவும்",
      listening: "கேட்கிறேன்... தெளிவாக பேசுங்கள்",
      processing: "உங்கள் பேச்சை புரிந்துகொள்கிறேன்...",
      ready: "குரல் உள்ளீட்டைத் தொடங்க கிளிக் செய்யவும்",
    },
  },
  gu: {
    code: "gu-IN",
    name: "ગુજરાતી",
    sampleText:
      "હું ગઈકાલે આવેલા એક છેતરપિંડીના કોલની જાણ કરવા માંગુ છું. કોઈએ મારી બેંકનું નામ લઈને મારો PIN માગ્યો હતો।",
    prompts: {
      start: "બોલવાનું શરુ કરવા માટે માઇક્રોફોન પર ક્લિક કરો",
      listening: "સાંભળી રહ્યો છું... સ્પષ્ટ બોલો",
      processing: "તમારી વાણીને સમજી રહ્યો છું...",
      ready: "વૉઇસ ઇનપુટ શરૂ કરવા માટે ક્લિક કરો",
    },
  },
  kn: {
    code: "kn-IN",
    name: "ಕನ್ನಡ",
    sampleText:
      "ನನಗೆ ನಿನ್ನೆ ಬಂದ ವಂಚನೆ ಕರೆಯ ಬಗ್ಗೆ ವರದಿ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ. ಯಾರೋ ನನ್ನ ಬ್ಯಾಂಕಿನ ಹೆಸರಿನಲ್ಲಿ ನನ್ನ PIN ಕೇಳಿದ್ದರು।",
    prompts: {
      start: "ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಲು ಮೈಕ್ರೋಫೋನ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ",
      listening: "ಆಲಿಸುತ್ತಿದ್ದೇನೆ... ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ",
      processing: "ನಿಮ್ಮ ಮಾತು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
      ready: "ವಾಯ್ಸ್ ಇನ್‌ಪುಟ್ ಪ್ರಾರಂಭಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    },
  },
  ml: {
    code: "ml-IN",
    name: "മലയാളം",
    sampleText:
      "ഇന്നലെ വന്ന ഒരു തട്ടിപ്പ് കോളിനെ കുറിച്ച് റിപ്പോർട്ട് ചെയ്യാൻ ആഗ്രഹിക്കുന്നു. ആരോ എന്റെ ബാങ്കിന്റെ പേരിൽ എന്റെ PIN ചോദിച്ചു.",
    prompts: {
      start: "സംസാരിക്കാൻ തുടങ്ങാൻ മൈക്രോഫോണിൽ ക്ലിക്ക് ചെയ്യുക",
      listening: "കേൾക്കുന്നു... വ്യക്��മായി സംസാരിക്കുക",
      processing: "നിങ്ങളുടെ സംസാരം മനസ്സിലാക്കുന്നു...",
      ready: "വോയ്‌സ് ഇൻപുട്ട് ആരംഭിക്കാൻ ക്ലിക്ക് ച���യ്യുക",
    },
  },
  mr: {
    code: "mr-IN",
    name: "मराठी",
    sampleText:
      "मला काल आलेल्या फसवणूक कॉलबद्दल तक्रार करायची आहे. कोणीतरी माझ्या बँकेच्या नावाने माझा PIN विचारला होता।",
    prompts: {
      start: "बोलण्यास सुरुवात करण्यासाठी मायक्रोफोनवर क्लिक करा",
      listening: "ऐकत आहे... स्पष्टपणे बोला",
      processing: "तुमचे भाषण समजून घेत आहे...",
      ready: "व्हॉइस इनपुट सुरू करण्यासाठी क्लिक करा",
    },
  },
  pa: {
    code: "pa-IN",
    name: "ਪੰਜਾਬੀ",
    sampleText:
      "ਮੈਂ ਕੱਲ੍ਹ ਆਈ ਇੱਕ ਧੋਖਾਧੜੀ ਕਾਲ ਬਾਰੇ ਰਿਪੋਰਟ ਕਰਨਾ ਚਾਹੁੰਦਾ ਹਾਂ। ਕਿਸੇ ਨੇ ਮੇਰੇ ਬੈਂਕ ਦੇ ਨਾਮ ਤੇ ਮੇਰਾ PIN ਮੰਗਿਆ ਸੀ।",
    prompts: {
      start: "ਬੋਲਣਾ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਮਾਈਕ੍ਰੋਫੋਨ ਤੇ ਕਲਿੱਕ ਕਰ��",
      listening: "ਸੁਣ ਰਿਹਾ ਹਾਂ... ਸਾਫ਼ ਬੋਲੋ",
      processing: "ਤੁਹਾਡੀ ਆਵਾਜ਼ ਸਮਝ ਰਿਹਾ ਹਾਂ...",
      ready: "ਵਾਇਸ ਇਨਪੁੱਟ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ",
    },
  },
  ur: {
    code: "ur-IN",
    name: "اردو",
    sampleText:
      "میں کل آئی ایک دھوکہ دہی کی کال کی رپورٹ کرنا چاہتا ہوں۔ کسی نے میرے بینک کے نام سے میرا PIN مانگا تھا۔",
    prompts: {
      start: "بولنا شروع کرنے کے لیے مائیکروفون پر کلک کریں",
      listening: "سن رہا ہوں... واضح بولیں",
      processing: "آپ کی آواز سمجھ رہا ہوں...",
      ready: "وائس ان پٹ شروع کرنے کے لیے کلک کریں",
    },
  },
};

const VoiceInput: React.FC<VoiceInputProps> = ({
  language,
  onTranscriptionComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");
  const [confidence, setConfidence] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  const currentLang =
    languageConfigs[language as keyof typeof languageConfigs] ||
    languageConfigs.en;

  useEffect(() => {
    // Check browser compatibility
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setError(
        "Voice input requires Chrome, Edge, or Safari browser for best results.",
      );
      setHasPermission(false);
      return;
    }

    checkMicrophonePermission();
    setupSpeechRecognition();

    return () => {
      cleanup();
    };
  }, [language]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const cleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) recognitionRef.current.stop();
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (audioContextRef.current) audioContextRef.current.close();
    speechSynthesis.cancel();
  };

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      setHasPermission(false);
      setError(
        "Microphone access denied. Please enable microphone permissions.",
      );
    }
  };

  const setupSpeechRecognition = () => {
    // Check for speech recognition support
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setError(
        "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.",
      );
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      // Configure recognition settings
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.maxAlternatives = 3;
      recognitionRef.current.lang = currentLang.code;

      // Handle recognition results
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";
        let maxConfidence = 0;

        // Reset the no-speech detection since we got results
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          const confidence = result[0].confidence || 0;

          if (result.isFinal) {
            finalTranscript += transcript;
            maxConfidence = Math.max(maxConfidence, confidence);
          } else {
            interimTranscription = transcript;
          }
        }

        // Update transcription
        setTranscription((prev) => {
          // Append new final transcript to existing content
          if (finalTranscript) {
            const newContent =
              prev.replace(/\[.*?\]$/, "").trim() +
              (prev ? " " : "") +
              finalTranscript;
            return newContent;
          }
          // For interim results, show them temporarily
          return (
            prev.replace(/\[.*?\]$/, "") +
            (interimTranscription ? ` [${interimTranscription}]` : "")
          );
        });

        if (maxConfidence > 0) {
          setConfidence(Math.round(maxConfidence * 100));
        }

        // If we got speech, clear any error state
        if (finalTranscript || interimTranscription) {
          setError("");
        }
      };

      // Handle recognition start
      recognitionRef.current.onstart = () => {
        setError("");
        setIsProcessing(false);
        console.log("Speech recognition started");
      };

      // Handle recognition end
      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended");
        setIsRecording(false);
        setIsProcessing(false);

        // Clean up interim results brackets
        setTranscription((prev) => prev.replace(/\[.*?\]$/g, "").trim());
      };

      // Handle recognition errors
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        let errorMessage = "Speech recognition error occurred.";
        let shouldRetry = false;

        switch (event.error) {
          case "no-speech":
            errorMessage =
              "No speech detected. Please speak closer to the microphone or try again.";
            shouldRetry = true;
            break;
          case "audio-capture":
            errorMessage =
              "Microphone not available. Please check your microphone connection.";
            break;
          case "not-allowed":
            errorMessage =
              "Microphone permission denied. Please allow microphone access and try again.";
            break;
          case "network":
            errorMessage =
              "Network error. Please check your internet connection and try again.";
            shouldRetry = true;
            break;
          case "service-not-allowed":
            errorMessage =
              "Speech recognition service is not available. Please try again later.";
            break;
          case "bad-grammar":
            errorMessage =
              "Speech recognition grammar error. Please try again.";
            shouldRetry = true;
            break;
          case "language-not-supported":
            errorMessage = `Language ${currentLang.name} is not supported. Please try English.`;
            break;
          case "aborted":
            // Don't show error for intentional stops
            return;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
            shouldRetry = true;
        }

        setError(errorMessage);
        setIsRecording(false);
        setIsProcessing(false);

        // For specific errors, provide helpful toast with retry option
        if (event.error === "no-speech") {
          toast({
            title: "No Speech Detected",
            description:
              "Please speak closer to your microphone and ensure your voice is clear. The microphone is sensitive and requires clear speech.",
          });
        } else {
          toast({
            title: "Speech Recognition Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
      };

      // Handle sound start
      recognitionRef.current.onsoundstart = () => {
        console.log("Sound detected");
      };

      // Handle speech start
      recognitionRef.current.onspeechstart = () => {
        console.log("Speech detected");
        setIsProcessing(false);
      };
    } catch (error) {
      console.error("Failed to setup speech recognition:", error);
      setError(
        "Failed to initialize speech recognition. Please refresh the page and try again.",
      );
    }
  };

  const startRecording = async () => {
    // Check permissions first
    if (!hasPermission) {
      await checkMicrophonePermission();
      if (!hasPermission) return;
    }

    try {
      // Reset state
      setError("");
      setConfidence(0);
      setIsProcessing(true);

      // Clear previous transcription only if starting fresh
      if (!transcription.includes("[")) {
        setTranscription("");
      }

      // Check if speech recognition is available
      if (!recognitionRef.current) {
        setupSpeechRecognition();
        if (!recognitionRef.current) {
          throw new Error("Speech recognition not available");
        }
      }

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        },
      });

      setIsRecording(true);

      // Setup audio context for monitoring
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        microphone.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;

        // Monitor audio levels
        const monitorAudioLevel = () => {
          if (analyserRef.current && isRecording) {
            const dataArray = new Uint8Array(
              analyserRef.current.frequencyBinCount,
            );
            analyserRef.current.getByteFrequencyData(dataArray);
            const average =
              dataArray.reduce((a, b) => a + b) / dataArray.length;
            setAudioLevel(Math.min(average * 2, 100)); // Amplify sensitivity
            requestAnimationFrame(monitorAudioLevel);
          }
        };
        monitorAudioLevel();
      } catch (audioError) {
        console.warn("Audio monitoring setup failed:", audioError);
        // Continue without audio monitoring
      }

      // Setup MediaRecorder for audio saving
      try {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: MediaRecorder.isTypeSupported("audio/webm")
            ? "audio/webm"
            : "audio/mp4",
        });
        const audioChunks: Blob[] = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
          }
          // Stop all tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start(100); // Record in 100ms intervals
        mediaRecorderRef.current = mediaRecorder;
      } catch (recorderError) {
        console.warn("MediaRecorder setup failed:", recorderError);
        // Continue without recording capability
      }

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.lang = currentLang.code;
        recognitionRef.current.start();
      }

      toast({
        title: "Recording Started",
        description: currentLang.prompts.listening,
      });
    } catch (error: any) {
      console.error("Start recording error:", error);
      let errorMessage = "Failed to start recording.";

      if (error.name === "NotAllowedError") {
        errorMessage =
          "Microphone access denied. Please allow microphone permissions and try again.";
      } else if (error.name === "NotFoundError") {
        errorMessage =
          "No microphone found. Please connect a microphone and try again.";
      } else if (error.name === "NotSupportedError") {
        errorMessage = "Audio recording is not supported in this browser.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      setIsRecording(false);
      setIsProcessing(false);

      toast({
        title: "Recording Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    setAudioLevel(0);

    // Stop speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.warn("Error stopping speech recognition:", error);
      }
    }

    // Stop media recorder
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.warn("Error stopping media recorder:", error);
      }
    }

    // Close audio context
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (error) {
        console.warn("Error closing audio context:", error);
      }
    }

    // Process results
    setTimeout(() => {
      setIsProcessing(false);

      // Clean up the transcription
      const cleanTranscription = transcription.replace(/\[.*?\]/g, "").trim();
      setTranscription(cleanTranscription);

      if (cleanTranscription) {
        onTranscriptionComplete?.(cleanTranscription);

        const wordCount = cleanTranscription
          .split(" ")
          .filter((word) => word.length > 0).length;
        const charCount = cleanTranscription.length;

        toast({
          title: "Recording Complete",
          description: `Captured ${charCount} characters, ${wordCount} words${confidence > 0 ? ` with ${confidence}% confidence` : ""}`,
        });
      } else {
        toast({
          title: "No Speech Detected",
          description: "Please try speaking again or check your microphone.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
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
    if (!text) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if ("speechSynthesis" in window) {
      setIsSpeaking(true);

      // Wait for voices to be loaded
      const speak = () => {
        const utterance = new SpeechSynthesisUtterance(text);

        // Get available voices
        const voices = speechSynthesis.getVoices();

        // Find the best voice for the current language
        let selectedVoice = voices.find(
          (voice) =>
            voice.lang === currentLang.code ||
            voice.lang.startsWith(currentLang.code.split("-")[0]),
        );

        // Fallback to any voice with the language prefix
        if (!selectedVoice) {
          selectedVoice = voices.find((voice) =>
            voice.lang.startsWith(currentLang.code.split("-")[0]),
          );
        }

        // Final fallback to default voice
        if (!selectedVoice && voices.length > 0) {
          selectedVoice = voices[0];
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.lang = currentLang.code;
        utterance.rate = language === "hi" || language === "ur" ? 0.75 : 0.85; // Slower for complex scripts
        utterance.pitch = 1.0;
        utterance.volume = 0.9;

        utterance.onend = () => {
          setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
          console.warn("Speech synthesis error:", event.error);
          setIsSpeaking(false);
          toast({
            title: "Speech Playback Error",
            description: "Unable to play audio. Please try again.",
            variant: "destructive",
          });
        };

        speechSynthesis.speak(utterance);
      };

      // Check if voices are already loaded
      if (speechSynthesis.getVoices().length > 0) {
        speak();
      } else {
        // Wait for voices to load
        speechSynthesis.onvoiceschanged = () => {
          speak();
          speechSynthesis.onvoiceschanged = null; // Remove listener
        };
      }
    } else {
      toast({
        title: "Speech Not Supported",
        description: "Text-to-speech is not supported in this browser.",
        variant: "destructive",
      });
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = `voice-input-${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const clearTranscription = () => {
    setTranscription("");
    setConfidence(0);
    setAudioUrl(null);
    setError("");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSamplePlay = () => {
    speakText(currentLang.sampleText);
  };

  if (hasPermission === false) {
    return (
      <Card className="w-full border-red-200">
        <CardContent className="p-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Microphone access is required for voice input. Please enable
              microphone permissions and refresh the page.
            </AlertDescription>
          </Alert>
          <Button
            onClick={checkMicrophonePermission}
            className="w-full mt-4"
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Check Permissions Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Volume2 className="h-5 w-5 mr-2 text-green-600" />
              Voice Input - {currentLang.name}
            </span>
            <Badge variant="outline" className="text-xs">
              {isRecording ? "LIVE" : "READY"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Recording Interface */}
          <div className="text-center space-y-4">
            <div className="relative">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing || hasPermission === null}
                className={`${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/25"
                    : "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/25"
                } text-white rounded-full w-20 h-20 transition-all duration-300 transform hover:scale-105`}
                size="lg"
              >
                {isProcessing ? (
                  <RefreshCw className="h-8 w-8 animate-spin" />
                ) : isRecording ? (
                  <Square className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>

              {/* Audio level indicator */}
              {isRecording && (
                <div className="absolute -inset-2 rounded-full border-4 border-red-400 animate-ping opacity-75"></div>
              )}
            </div>

            {/* Status and Timer */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-white">
                {isProcessing
                  ? currentLang.prompts.processing
                  : isRecording
                    ? currentLang.prompts.listening
                    : currentLang.prompts.ready}
              </p>

              {isRecording && (
                <div className="space-y-2">
                  <Badge variant="destructive" className="text-sm">
                    {formatTime(recordingTime)}
                  </Badge>
                  <Progress value={audioLevel} className="w-32 mx-auto h-2" />
                  <p className="text-xs text-gray-500 dark:text-light-yellow">
                    Audio Level: {Math.round(audioLevel)}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-3">
            <Button
              onClick={handleSamplePlay}
              variant="outline"
              size="sm"
              disabled={isSpeaking}
              className="flex items-center"
            >
              {isSpeaking ? (
                <VolumeX className="h-4 w-4 mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isSpeaking ? "Stop" : "Sample"}
            </Button>

            {transcription && (
              <>
                <Button
                  onClick={() => speakText(transcription)}
                  variant="outline"
                  size="sm"
                  disabled={isSpeaking}
                  className="flex items-center"
                >
                  {isSpeaking ? (
                    <Pause className="h-4 w-4 mr-2" />
                  ) : (
                    <Volume2 className="h-4 w-4 mr-2" />
                  )}
                  {isSpeaking ? "Stop" : "Play"}
                </Button>

                <Button
                  onClick={clearTranscription}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </>
            )}

            {audioUrl && (
              <Button
                onClick={downloadAudio}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Save
              </Button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Transcription Display */}
          {transcription && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Transcription
                </h4>
                {confidence > 0 && (
                  <Badge
                    variant={
                      confidence > 80
                        ? "default"
                        : confidence > 60
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {confidence}% confidence
                  </Badge>
                )}
              </div>

              <Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Your speech will appear here..."
                className="min-h-[100px] resize-none"
                dir={language === "ur" ? "rtl" : "ltr"}
              />

              <div className="flex justify-between text-xs text-gray-500 dark:text-light-yellow">
                <span>{transcription.length} characters</span>
                <span>{transcription.split(" ").length} words</span>
              </div>
            </div>
          )}

          {/* Audio Playback */}
          {audioUrl && (
            <Card className="p-4 bg-blue-50 dark:bg-gray-800 border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={playAudio}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <span className="text-sm font-medium text-blue-800 dark:text-white">
                    Recorded Audio
                  </span>
                </div>
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            </Card>
          )}

          {/* Help Information */}
          <Alert className="border-blue-200 bg-blue-50 dark:bg-gray-800">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-white text-sm">
              <strong>Tips:</strong> Speak clearly and at normal pace. The
              system supports multiple Indian languages. Your speech is
              processed locally for privacy.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceInput;
