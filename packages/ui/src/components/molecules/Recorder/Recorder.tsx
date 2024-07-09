import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import { MyAnswerButton, RecorderContainer, SpeakingButton } from './Recorder.style';
import { SvgIcon, EvaluationModal, mergeWavBlobs, RecorderModal } from '@maidt-cntn/ui';
import microphoneIconSrc from '@maidt-cntn/assets/icons/recorder/microphone.svg';

import { WordLevelBatch } from '@/components/atoms/PronEvaluation/StressChart';
import React from 'react';
import { handleDownload, handleUploadByPath, makeFilePath } from '@maidt-cntn/util/FileUtil';
import { SetterOrUpdater } from 'recoil';
import { userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit } from '@maidt-cntn/util/CommonUtil';

export type RecordingStateType = 'inactive' | 'active' | 'paused' | 'converted';

export interface RecordersStateProps {
  activeStates: [];
  currentActiveRecorder: number | null;
  isActiveModal: boolean;
  recordedAudios: [];
}

export interface EvaluationProps {
  [x: string]: {
    recorderIndex: number;
    reference: string;
    intonation?: number[];
    holisticScore?: number;
    intonationScore?: number;
    pitchScore?: number;
    wordLevelBatchs?: WordLevelBatch[];
    isFail: boolean;
  };
}

export interface IUploadRecordData {
  uploadPath: string;
  recordingTime: number;
  totalAudioVolumn: number[];
  convertedText: string;
}

interface RecorderProps {
  recorderIndex: number;
  reference?: string;
  onSubmit?: (audioData: IAudioData) => void;
  onRefresh?: () => void;
  onClick?: () => void;
  initialData?: IAudioData | null;
  readOnly?: boolean;
}

export interface IAudioData {
  blob?: Blob[];
  convertedText?: string;
  recordingTime?: number;
  totalAudioVolumes?: number[];
}

type TSetFunctionProp = {
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
  };
};

export interface IRecordRefSubmitFunctionProps {
  setFunction?: SetterOrUpdater<TSetFunctionProp>;
  page: string;
  mainKey: number;
  subKey: number;
  changeData: (page: string, mainKey: number, subKey: number, value: any) => void;
  userId: number;
  cardPath: string;
  subjectCode: 'HE10' | 'HE20' | 'EM31' | 'ME10';
}

export interface IRecorderRef {
  onSubmitRecorderProcess: (props: IRecordRefSubmitFunctionProps) => Promise<void>;
  closeModal: () => void;
}

export const makeAudioData = async ({
  originCardData,
  userSubmissionList,
  subjectCode,
}: {
  originCardData:
    | {
        [x: string]: IAudioData | null;
      }
    | undefined;
  userSubmissionList: userSubmissionType<IUploadRecordData>[];
  subjectCode: 'HE10' | 'HE20' | 'ME10';
}) => {
  const newCardData: typeof originCardData = originCardData ? { ...originCardData } : {};

  for (let index = 0; index < userSubmissionList[0].inputData.length; index++) {
    const data = userSubmissionList[0].inputData[index];

    if (!data.value) continue;
    if (data.type !== 'AUDIO') continue;

    let result: string | Blob = 'TIMEOUT';

    if (data.value.uploadPath) {
      result = await fulfillWithTimeLimit(1000, 1, handleDownload(subjectCode, data.value.uploadPath));

      if (result !== 'TIMEOUT') {
        newCardData[data.subKey] = {
          blob: [result as Blob],
          convertedText: data.value.convertedText,
          recordingTime: data.value.recordingTime,
          totalAudioVolumes: data.value.totalAudioVolumn,
        };
      }
    }
  }

  return newCardData;
};

export const Recorder = forwardRef<IRecorderRef, RecorderProps>(
  ({ recorderIndex, reference = '', initialData, readOnly, onSubmit, onRefresh, onClick }, ref) => {
    const [recorders, setRecorders] = useState<RecordersStateProps>({
      activeStates: [],
      currentActiveRecorder: null,
      isActiveModal: false,
      recordedAudios: [],
    });

    const [evaluations, setEvaluations] = useState<EvaluationProps>({});

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [recordingState, setRecordingState] = useState<RecordingStateType>('inactive');
    const [convertedText, setConvertedText] = useState<string>('');
    const [recordingTime, setRecordingTime] = useState<number>(0);
    const [totalAudioVolumes, setTotalAudioVolumes] = useState<number[]>([]);
    const [isEvalModalOpen, setIsEvalModalOpen] = useState<boolean>(false);

    const audioBlobs = useRef<Blob[]>([]);

    const onSubmitRecorderProcess = async ({
      changeData,
      mainKey,
      page,
      setFunction,
      subKey,
      userId,
      cardPath,
      subjectCode,
    }: IRecordRefSubmitFunctionProps) => {
      setFunction?.((prev: any) => {
        const newCardData = JSON.parse(JSON.stringify(prev));
        newCardData[page].audioData[subKey] = { blob: audioBlobs.current, convertedText, recordingTime, totalAudioVolumes };

        return newCardData;
      });

      const fileUpload = async (index: number, blob: Blob[]) => {
        const path = makeFilePath({ cardPath, fileType: 'audio', index: index, page: page.toUpperCase(), userId });

        const mergedBlob = await mergeWavBlobs(blob);
        const uploadFile = new File([mergedBlob], 'audio.wav', { type: 'audio/wav' });

        const result = await handleUploadByPath(uploadFile, subjectCode, path);
        if (result) {
          return path;
        }

        return false;
      };

      let uploadPath = '';
      if (audioBlobs.current) {
        const uploadResult = await fileUpload(subKey, audioBlobs.current);

        if (uploadResult) {
          uploadPath = uploadResult;
        }
      }

      changeData(page.toUpperCase(), mainKey, subKey, {
        uploadPath,
        recordingTime: recordingTime,
        totalAudioVolumn: totalAudioVolumes,
        convertedText: convertedText,
      });
    };

    const closeModal = () => {
      setIsModalOpen(false);
      if (recordingState === 'active' || recordingState === 'paused') {
        setConvertedText('');
        setRecordingState('inactive');
        audioBlobs.current = [];
        clearRecordingTime();
      }
    };

    useImperativeHandle(ref, () => ({ onSubmitRecorderProcess, closeModal }));

    const handleClickSpeaking = () => {
      setIsModalOpen(true);
      setRecorders(prev => ({ ...prev, currentActiveRecorder: recorderIndex }));
      setRecordingTime(0);
      onClick?.();
    };

    const handleClickMyAnswer = () => {
      setIsModalOpen(true);
      setRecordingState('converted');
      onClick?.();
    };

    const handleCloseRecorderModal = () => {
      setIsModalOpen(false);
    };

    const handleClickSubmit = () => {
      setIsSubmit(true);
      setIsModalOpen(false);
      onSubmit?.({ blob: audioBlobs.current, convertedText, recordingTime, totalAudioVolumes });
    };

    const cancelSubmit = () => {
      setIsSubmit(false);
    };

    const updateRecordingTime = (time: number) => {
      setRecordingTime(prev => prev + time);
    };

    const clearRecordingTime = () => {
      setRecordingTime(0);
    };

    const updateTotalAudioVolume = (value: number) => {
      setTotalAudioVolumes(prev => [...prev, value]);
    };

    const saveEvaluation = (evaluation: EvaluationProps) => {
      setEvaluations(prev => ({ ...prev, ...evaluation }));
    };

    useEffect(() => {
      const initAudioState = () => {
        console.log('initAudioState', initialData);
        if (!initialData?.blob || !initialData.convertedText || !initialData.totalAudioVolumes || !initialData.recordingTime) return;

        audioBlobs.current = initialData.blob;

        setConvertedText(initialData.convertedText);
        setTotalAudioVolumes(initialData.totalAudioVolumes);
        setRecordingTime(initialData.recordingTime);

        setIsSubmit(true);
      };

      initAudioState();
    }, [initialData]);

    useEffect(() => {
      console.log('convertedTe123xt', convertedText);
    }, [convertedText]);

    return (
      <RecorderContainer>
        {!isSubmit ? (
          <>
            <SpeakingButton onClick={handleClickSpeaking}>
              <SvgIcon src={microphoneIconSrc} width='20px' height='20px' />
              말하기
            </SpeakingButton>
            {/* <SpeakingButton onClick={() => setIsEvalModalOpen(true)}>
            <SvgIcon src={microphoneIconSrc} width='20px' height='20px' />
            평가하기
          </SpeakingButton> */}
          </>
        ) : (
          <MyAnswerButton onClick={handleClickMyAnswer}>내 대답 보기</MyAnswerButton>
        )}
        {isModalOpen && (
          <RecorderModal
            readOnly={readOnly}
            recorderIndex={recorderIndex}
            reference={reference}
            onCloseModal={handleCloseRecorderModal}
            onClickSubmit={handleClickSubmit}
            onClickRefresh={onRefresh}
            recordingState={recordingState}
            setRecordingState={setRecordingState}
            convertedText={convertedText}
            setConvertedText={setConvertedText}
            audioBlobs={audioBlobs}
            cancelSubmit={cancelSubmit}
            recordingTime={recordingTime}
            updateRecordingTime={(time: number) => updateRecordingTime(time)}
            clearRecordingTime={clearRecordingTime}
            totalAudioVolumes={totalAudioVolumes}
            updateTotalAudioVolumes={(value: number) => updateTotalAudioVolume(value)}
            isSubmit={isSubmit}
            saveEvaluation={saveEvaluation}
          />
        )}
        {isEvalModalOpen && (
          <EvaluationModal
            onClickClose={() => {
              setIsEvalModalOpen(false);
            }}
            evaluations={evaluations}
          />
        )}
      </RecorderContainer>
    );
  },
);

export default React.memo(Recorder);
