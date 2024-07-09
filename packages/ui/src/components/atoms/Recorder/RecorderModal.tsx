import { EvaluationProps, RecordersStateProps, RecordingStateType } from '@maidt-cntn/ui';
import { useEffect, useRef, useState } from 'react';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import { mergeWavBlobs } from './merger';
import axios from 'axios';
import Draggable from 'react-draggable';
import { CloseButton, Modal, RecorderModalContainer } from './RecorderModal.style';
import { InactiveStep } from './InactiveStep';
import { ActiveStep } from './ActiveStep';
import { PauseStep } from './PauseStep';
import { ResultStep } from './ResultStep';

interface RecorderModalProps {
  recorderIndex: number;
  reference: string;
  onCloseModal: () => void;
  onClickSubmit: () => void;
  onClickRefresh?: () => void;
  recordingState: RecordingStateType;
  setRecordingState: React.Dispatch<React.SetStateAction<RecordingStateType>>;
  convertedText: string;
  setConvertedText: React.Dispatch<React.SetStateAction<string>>;
  audioBlobs: React.MutableRefObject<Blob[]>;
  cancelSubmit: () => void;
  recordingTime: number;
  updateRecordingTime: (time: number) => void;
  clearRecordingTime: () => void;
  totalAudioVolumes: number[];
  updateTotalAudioVolumes: (value: number) => void;
  isSubmit: boolean;
  saveEvaluation: (evaluation: EvaluationProps) => void;
  readOnly?: boolean;
}

export const RecorderModal = ({
  recorderIndex,
  reference,
  onCloseModal,
  onClickSubmit,
  onClickRefresh,
  recordingState,
  setRecordingState,
  convertedText,
  setConvertedText,
  audioBlobs,
  cancelSubmit,
  recordingTime,
  updateRecordingTime,
  clearRecordingTime,
  totalAudioVolumes,
  updateTotalAudioVolumes,
  isSubmit,
  saveEvaluation,
  readOnly,
}: RecorderModalProps) => {
  const [audioContext, setAudioContext] = useState<AudioContext>(new AudioContext());

  const [recordingVolumeAvgs, setRecordingVolumeAvgs] = useState<number[]>([]);
  const [recordingVolumes, setRecordingVolumes] = useState<number[]>([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
  const [recordLabel, setRecordLabel] = useState<string | undefined>();

  const analyserIntervalId = useRef<number | null>(null);
  const recordingTimerIntervalId = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const recorder = useRef<RecordRTC | null>();
  const stream = useRef<MediaStream | null>();

  const checkExistRecordingDevice = async () => {
    const connectedDevice = await navigator.mediaDevices.enumerateDevices();
    const isExistRecordingDevice = connectedDevice.some(device => device.kind === 'audioinput');
    return isExistRecordingDevice;
  };

  const getAudioStream = async () => {
    const isExistRecordingDevice = await checkExistRecordingDevice();
    if (isExistRecordingDevice) {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        audioStream.getAudioTracks()[0].applyConstraints({ sampleRate: 16000 });
        return { audioStream };
      } catch {
        return { audioStream: null };
      }
    } else {
      return { audioStream: null };
    }
  };

  const createStreamSrc = (stream: MediaStream) => {
    const streamSrc = audioContext?.createMediaStreamSource(stream);
    return streamSrc;
  };

  const createAudioRecorder = (stream: MediaStream) => {
    const mediaRecorder = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      desiredSampRate: 16000,
      bufferSize: 16384,
      numberOfAudioChannels: 1,
      recorderType: StereoAudioRecorder,
    });
    return mediaRecorder;
  };

  const createAudioAnalyser = (streamSrc: MediaStreamAudioSourceNode) => {
    const audioAnalyser = audioContext.createAnalyser();
    audioAnalyser.fftSize = 256;
    streamSrc.connect(audioAnalyser);

    return audioAnalyser;
  };

  const analyzeAudioVolume = (analyser: AnalyserNode) => {
    const bufferLength = analyser.frequencyBinCount;
    const curVolumeValues = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(curVolumeValues);

    const curVolumeSum = curVolumeValues.reduce((acc, val) => {
      return acc + val;
    }, 0);

    const slicedCurVolumeValues = curVolumeValues.slice(0, 24).map(val => val / 7);
    const curVolumeAvg = Math.ceil(curVolumeSum / curVolumeValues.length);
    const curMinVolumeValue = Math.min(...slicedCurVolumeValues);

    return { volumes: slicedCurVolumeValues, volumeAvg: curVolumeAvg, minVolumeValue: curMinVolumeValue };
  };

  const startAnalyzingRecordingAudio = (audioStream: MediaStream) => {
    const streamSrc = createStreamSrc(audioStream);
    const audioAnalyser = createAudioAnalyser(streamSrc);

    const intervalId = window.setInterval(() => {
      const { volumes, volumeAvg, minVolumeValue } = analyzeAudioVolume(audioAnalyser);
      setRecordingVolumes([4, 4, 4, ...volumes]);
      updateTotalAudioVolumes(minVolumeValue);
      setRecordingVolumeAvgs(prev => [...prev, volumeAvg]);
    }, 100);

    analyserIntervalId.current = intervalId;
  };

  const stopAnayzingAudioVolumes = () => {
    if (analyserIntervalId.current) {
      window.clearInterval(analyserIntervalId.current);
    }
  };

  const getProgressWavesValues = () => {
    const progressWavesValues = [];
    const chunkSize = Math.ceil(totalAudioVolumes.length / 27);

    for (let index = 0; index < totalAudioVolumes.length; index += chunkSize) {
      let tmpArray = [];
      tmpArray = totalAudioVolumes.slice(index, index + chunkSize);
      const minValue = Math.min(...tmpArray);
      progressWavesValues.push(minValue);
    }

    if (progressWavesValues.length < 27) {
      let curIdx = 0;
      while (progressWavesValues.length < 27) {
        progressWavesValues.push(recordingVolumeAvgs[curIdx]);
        curIdx = (curIdx + 1) % recordingVolumeAvgs.length;
      }
    }

    return progressWavesValues;
  };

  const handleClickRecording = async () => {
    setAudioContext(new AudioContext({ sampleRate: 16000 }));
    const { audioStream } = await getAudioStream();
    if (recordingState === 'inactive' && audioStream) {
      setRecordingState('active');

      const audioRecorder = createAudioRecorder(audioStream);

      stream.current = audioStream;
      recorder.current = audioRecorder;

      audioContext.resume();
      recorder.current.startRecording();
      startRecordingTimer();

      startAnalyzingRecordingAudio(audioStream);
    }
  };

  const getTimeStamp = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes < 10 ? '0' : ''}${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startRecordingTimer = () => {
    const intervalId = window.setInterval(() => {
      updateRecordingTime(100);
    }, 100);
    recordingTimerIntervalId.current = intervalId;
  };

  const stopRecordingTimer = () => {
    if (recordingTimerIntervalId.current) {
      window.clearInterval(recordingTimerIntervalId.current);
    }
  };

  const handleClickPauseRecording = () => {
    setRecordingState('paused');
    audioContext.suspend();
    recorder.current?.stopRecording(() => {
      const blob = recorder.current!.getBlob();
      audioBlobs.current?.push(blob);
      recorder.current?.destroy();
      recorder.current = null;
    });
    stopAnayzingAudioVolumes();
    stopRecordingTimer();
  };

  const handleClickResumeRecording = () => {
    setRecordingState('active');
    audioContext.resume();
    if (stream.current) recorder.current = createAudioRecorder(stream.current);
    recorder.current?.startRecording();
    startRecordingTimer();
    startAnalyzingRecordingAudio(stream.current!);
  };

  const handleClickStopRecording = () => {
    setRecordingState('converted');
    audioContext.suspend();
    recorder.current?.stopRecording(() => {
      const blob = recorder.current!.getBlob();
      audioBlobs.current?.push(blob);
      requestSTT();
    });
    stopAnayzingAudioVolumes();
    stopRecordingTimer();
  };

  const handleClickRefresh = () => {
    setRecordingState('inactive');
    setRecordLabel(undefined);
    audioContext.close();
    setAudioContext(new AudioContext());
    recorder.current?.stopRecording();
    stopAnayzingAudioVolumes();
    stopRecordingTimer();
    clearRecordingTime();
    audioBlobs.current = [];
    setConvertedText('');
    cancelSubmit();
    onClickRefresh?.();
  };

  const handleClickClose = () => {
    onCloseModal();
    stopAnayzingAudioVolumes();
    stopRecordingTimer();
    if (!isSubmit && recordingState !== 'converted') {
      setRecordingState('inactive');
      setRecordLabel(undefined);
      audioBlobs.current = [];
      setConvertedText('');
      clearRecordingTime();
    }
  };

  const requestSTT = async () => {
    const reader = new FileReader();
    const mergedBlob = await mergeWavBlobs(audioBlobs.current);
    reader.readAsDataURL(mergedBlob);

    reader.onload = async event => {
      const base64String = event.target?.result as string;
      const audioData = base64String?.split(',')[1];

      axios
        .post(
          'http://10.0.141.101:5002/stt',
          JSON.stringify({
            argument: {
              language_code: 'english',
              user: 'bluega',
              accesskey: 'tutoruslabs-stt-release-to-bluega',
              reference,
              audio: audioData,
            },
          }),
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'x-api-key': '$2b$12$nAYU9PGtDho5RIlcu9ezB.HwI.hxoNRXGIJj9n0jffvXCBDPLS5d2',
            },
          },
        )
        .then(res => {
          setConvertedText(res.data.stt_recog);
          const { stt_proneval } = res.data;
          if (stt_proneval === 'FAIL') {
            saveEvaluation({
              [`recorder${recorderIndex}`]: {
                recorderIndex,
                reference,
                isFail: true,
              },
            });
            handleClickRefresh();
            setRecordLabel('다시 한번 말해볼까요?');
          } else {
            const {
              sentenceLevel: { intonation, proficiencyScore },
              wordLevel,
            } = res.data.stt_proneval;

            saveEvaluation({
              [`recorder${recorderIndex}`]: {
                recorderIndex,
                reference,
                holisticScore: proficiencyScore[1].score,
                intonationScore: proficiencyScore[2].score,
                pitchScore: proficiencyScore[5].score,
                intonation: intonation.data,
                wordLevelBatchs: wordLevel,
                isFail: false,
              },
            });
          }
        })
        .catch(error => {
          handleClickRefresh();
          setRecordLabel('다시 한번 말해볼까요?');
          console.log(error);
        });
    };
  };

  useEffect(() => {
    return () => {
      if (!recordingTimerIntervalId.current) return;
      window.clearInterval(recordingTimerIntervalId.current);
    };
  }, []);

  return (
    <Draggable nodeRef={modalRef}>
      <RecorderModalContainer ref={modalRef} isConvertedState={recordingState === 'converted'}>
        <Modal isActiveOrPaused={recordingState === 'paused' || recordingState === 'active'}>
          {recordingState === 'inactive' && <InactiveStep label={recordLabel} onClickRecording={handleClickRecording} />}
          {recordingState === 'active' && (
            <ActiveStep
              onClickPauseRecording={handleClickPauseRecording}
              onClickStopRecording={handleClickStopRecording}
              audioVolumes={recordingVolumes}
              timeStamp={getTimeStamp(recordingTime)}
            />
          )}
          {recordingState === 'paused' && (
            <PauseStep
              onClickResumeRecording={handleClickResumeRecording}
              onClickStopRecording={handleClickStopRecording}
              progressWavesValues={getProgressWavesValues()}
              audioBlobs={audioBlobs}
              recordingTime={recordingTime}
            />
          )}
          {recordingState === 'converted' && (
            <ResultStep
              readOnly={readOnly}
              progressWavesValues={getProgressWavesValues()}
              audioBlobs={audioBlobs}
              recordingTime={recordingTime}
              convertedText={convertedText}
              onClickRefresh={handleClickRefresh}
              onClickSubmit={onClickSubmit}
            />
          )}
          <CloseButton onClick={handleClickClose}>닫기</CloseButton>
        </Modal>
      </RecorderModalContainer>
    </Draggable>
  );
};

export default RecorderModal;
