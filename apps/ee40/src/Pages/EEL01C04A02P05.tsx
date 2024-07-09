import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  IAudioPlayerProps,
  Recorder,
  EStyleButtonTypes,
  Image,
  BottomSheet,
  ETagLine,
  Typography,
  Tag,
  IAudioData,
} from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';

import React from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';
import { correctDataType, initDataType } from '@maidt-cntn/api';
import { TSolutionData } from '@/types/contentInfo';

interface Props {
  layout: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    srtFile?: string;
    audioInfo?: IAudioPlayerProps;
  };
  pageData: {
    pageNumber: number;
    mainKey: number;
    getDefaultData: (pageNumber: number) => initDataType;
    getCorrectData: (pageNumber: number) => correctDataType[];
    solutionData: TSolutionData;
  };
  contentInfo: {
    questionInfo: string[];
    answerInfo: Image[];
  };
}

type INITIAL = {
  isComplete: boolean;
  isCorrect: boolean | undefined;
  isValue: correctDataType[];
};

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

const ACTIVE_BOX_STYLE = '2px solid black';
const INACTIVE_BOX_STYLE = '1px dotted var(--color-grey-500)';

const EEL01C04A02P05 = ({ layout, pageData, contentInfo }: Props) => {
  const CONST = { ...layout };
  const { getCorrectData, getDefaultData, solutionData, mainKey, pageNumber } = pageData;
  const [currentImage, setCurrentImage] = useState<Image>();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const [subKey, setSubkey] = useState('');
  const [selectIndex, setSelectIndex] = useState<number>();
  const [dropImage, setDropImage] = useState<Image[]>([]);
  const dragDestinationRef = useRef<(React.RefObject<HTMLDivElement> | null)[]>([]);

  const [isAudioComplete, setIsAudioComplete] = useState(false);
  const [showIs, setShowIs] = useState(false);

  const audioKey = mainKey + 1;

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData, currentPageInputStates } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber) as correctDataType[],
  });

  const [INITIAL, setINITIAL] = useState<INITIAL>({
    isComplete: false,
    isCorrect: undefined,
    isValue: [],
  });

  const [images] = useState<Image[]>(contentInfo.answerInfo);

  function setBoxStyle(currentBox: HTMLDivElement, style: string) {
    if (currentBox) {
      currentBox.style.border = style;
    }
  }

  const chkIndex = (idx: number | null) => {
    return typeof idx === 'number';
  };

  const activeBox = (idx: number) => {
    if (!currentImage) return;

    chkIndex(idx) ? setCurrentIndex(idx) : null;

    dragDestinationRef.current.forEach((ref, index) => {
      const currentBox = ref?.current;

      if (currentBox) {
        if (index === idx) {
          setBoxStyle(currentBox, ACTIVE_BOX_STYLE);
        } else {
          setBoxStyle(currentBox, INACTIVE_BOX_STYLE);
        }
      }
    });
  };

  const inActiveBox = (idx: number | null) => {
    if (!chkIndex(idx)) {
      setCurrentIndex(null);
    }

    const currentBox = dragDestinationRef.current[idx as number]?.current;
    currentBox ? setBoxStyle(currentBox, INACTIVE_BOX_STYLE) : null;
  };

  const getCorrectAnswer = useCallback(
    (pageNumber: number, mainKey: number, subKey: string) => {
      const data = getCorrectData(pageNumber).find(item => item.mainKey === mainKey);
      if (data) {
        return data?.inputDatas?.flat().find(item => item.subKey === subKey)?.value;
      }
      return null;
    },
    [getCorrectData],
  );

  const handleDragStart = (image: Image, idx: number) => {
    setCurrentImage(image);
    setSelectIndex(idx + 1);
  };

  const handleDragEnd = () => {
    if (!currentImage || !chkIndex(currentIndex as number | null)) return;

    changeInputData(mainKey, subKey, selectIndex);
    const newArray = [...dropImage];
    newArray[currentIndex as number] = currentImage;

    setDropImage(newArray);
    inActiveBox(currentIndex as number);

    setCurrentImage(undefined);
  };

  const fnClickConfirmSync = () => {
    if (!INITIAL.isComplete) return gradeSubmitPageData();
    setShowIs(!showIs);
  };

  const chkAuidoComplete = useCallback(() => {
    const data = currentPageInputStates.filter(item => item.mainKey === audioKey);
    const isCompleted = data.every(item => item.inputData.every(item => item.value));
    return isCompleted;
  }, [currentPageInputStates, audioKey]);

  const handleAuidoSubmit = (index: number, data: IAudioData) => {
    changeInputData(audioKey, `RECORDER-${index}`, data);
    setIsAudioComplete(chkAuidoComplete());
  };

  useEffect(() => {
    setIsAudioComplete(chkAuidoComplete());
  }, [chkAuidoComplete, currentPageInputStates]);

  useEffect(() => {
    setINITIAL({
      isComplete: images
        .map((_, index) => {
          const i = String(index + 1);
          return isSubmittedInput(mainKey, i);
        })
        .every(Boolean),
      isCorrect: images
        .map((_, index) => {
          const i = String(index + 1);
          return getCorrectAnswer(pageNumber, mainKey, i) === getValueInputData(mainKey, i);
        })
        .every(Boolean),
      isValue: getValueInputData(mainKey, subKey) as correctDataType[],
    });
  }, [audioKey, currentIndex, getCorrectAnswer, getValueInputData, images, isSubmittedInput, mainKey, pageNumber, subKey]);

  useEffect(() => {
    setSubkey(String((currentIndex as number) + 1));
  }, [currentIndex]);

  useEffect(() => {
    if (INITIAL.isComplete) {
      const newDropImage: Image[] = [];

      images.forEach((_, index) => {
        const i = String(index + 1);
        newDropImage.push(images[(getValueInputData(mainKey, i) as number) - 1]);
      });

      setDropImage(newDropImage);
    }
  }, [INITIAL.isComplete, getValueInputData, images, mainKey]);

  useEffect(() => {
    images.forEach((_, idx) => {
      dragDestinationRef.current[idx] = React.createRef<HTMLDivElement>();
    });
  }, [images]);

  return (
    <Container
      bodyId='targetContainer'
      vAlign='top'
      headerInfo={CONST.headerInfo}
      submitLabel={INITIAL.isComplete ? (showIs ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={INITIAL.isComplete ? true : dropImage.length === images.length && isAudioComplete ? false : true}
      submitBtnColor={
        INITIAL.isComplete
          ? EStyleButtonTypes.YELLOW
          : dropImage.length !== images.length || !isAudioComplete
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.YELLOW
      }
      audioInfo={CONST.audioInfo}
      onSubmit={() => fnClickConfirmSync()}
      questionInfo={{
        text: (
          <span>
            {CONST.questionInfo.text}
            <GradeCheck mainKey={mainKey} />
          </span>
        ),
      }}
    >
      <BoxWrap useFull width={'100%'}>
        <GridBox className='grid-box' onDragEnd={() => handleDragEnd()}>
          <ImageBox className='image-box'>
            {images.map((img, idx) => {
              return (
                <DragBox className='drag-box' key={idx}>
                  <ImageWrap>
                    <Box width={'100%'} height={'100%'} marginTop={'-10px'}>
                      <div draggable onDragStart={() => handleDragStart(img, idx)} hidden={dropImage.includes(img)}>
                        <Image size={'220px'} src={img.src} alt={img.alt} />
                      </div>
                    </Box>
                  </ImageWrap>
                </DragBox>
              );
            })}
          </ImageBox>
          <AudioBox>
            {images.map((_, idx) => {
              const audioIndex = idx + 1;
              return (
                <AudioWrap key={idx}>
                  <AudioText>{contentInfo.questionInfo[idx]}</AudioText>
                  <DropBox
                    ref={dragDestinationRef.current[idx]}
                    onDragOver={e => {
                      e.preventDefault();
                      activeBox(idx);
                    }}
                    onDragLeave={() => inActiveBox(null)}
                  >
                    {dropImage[idx]?.src ? <Image size={'220px'} src={dropImage[idx].src} alt={dropImage[idx].alt} /> : <>이곳에 드래그 해주세요</>}
                  </DropBox>
                  <AudioItem>
                    <Box padding={'10px'} hAlign='center' vAlign='center'>
                      <Recorder
                        recorderIndex={audioIndex}
                        initialData={getValueInputData(audioKey, `RECORDER-${audioIndex}`)}
                        readOnly={INITIAL.isComplete}
                        onSubmit={data => handleAuidoSubmit(audioIndex, data)}
                      />
                    </Box>
                  </AudioItem>
                </AudioWrap>
              );
            })}
          </AudioBox>
        </GridBox>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showIs}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            <Box marginTop='12px' whiteSpace='pre-line'>
              <Typography>{solutionData.answer}</Typography>
            </Box>
            {solutionData.script && (
              <>
                <Box marginTop='30px'>
                  <Tag type={ETagLine.GREEN} label={'대본'} />
                </Box>
                <Box marginTop='12px' whiteSpace='pre-line'>
                  <Typography>{solutionData.script}</Typography>
                </Box>
              </>
            )}
            {solutionData.interpretation && (
              <>
                <Box marginTop='30px'>
                  <Tag type={ETagLine.GREEN} label={'해석'} />
                </Box>
                <Box marginTop='12px' whiteSpace='pre-line'>
                  <Typography>{solutionData.interpretation}</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const DragBox = styled.div``;
const ImageWrap = styled.div`
  // position: relative;
  // margin: 0 auto;
  // display: flex;
  align-items: center;
  justify-content: center;
  // padding: 24px, 16px, 24px, 16px;
  width: 220px;
  height: 220px;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  width: 100%;
  height: 100%;
`;

const AudioBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  width: 500px;
`;

const AudioWrap = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 10px;
`;
const AudioItem = styled.div``;

const AudioText = styled.div`
  width: 220px;
  height: 44px;
  padding: 4px 12px 4px 12px;
  gap: 8px;
  background: #2f38c7;
  border-radius: 8px;
  opacity: 1px;
  font-family: S-Core Dream;
  font-size: 24px;
  font-weight: 500;
  line-height: 40px;
  text-align: center;
  margin-bottom: 10px;
  color: white;
`;

const DropBox = styled.div`
  font-family: 'SUIT';
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-grey-700);
  border: 1px dotted var(--color-grey-500);
  border-radius: 8px;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 220px;
`;

const ImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  width: 460px;
  align-items: center;
  gap: 10px;
`;

export default EEL01C04A02P05;
