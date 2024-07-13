import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  IAudioPlayerProps,
  Image,
  Tag,
  ETagLine,
  List,
  Typography,
  EStyleButtonTypes,
  BottomSheet,
} from '@maidt-cntn/ui';

import { correctDataType, initDataType } from '@maidt-cntn/api';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { currentPageGradeData } from '@/stores';

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

interface Props {
  INITIAL: {
    isValChk: boolean;
    isComplete: boolean;
  };
}

interface IEEL01C01A04P04 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  imageList: Image[];
  mainKey: number;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
  getSolutionData: (pageNumber: number) => {
    script: { text: string }[];
    interpretation: { text: string }[];
  }[];
}

const EE4L04C03A07bP03 = ({
  headerInfo,
  questionInfo,
  audioInfo,
  imageList,
  mainKey,
  getDefaultData,
  getCorrectData,
  getSolutionData,
}: IEEL01C01A04P04) => {
  /**
   * 선택 된 이미지
   * 포커스 된 정답 영역 인덱스
   * 선택 된 이미지의 인덱스
   */
  const [currentImage, setCurrenImage] = useState<Image>();
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  // const [selectIndex, setSelectIndex] = useState<number>();

  const [isOpen, setIsOpen] = useState(false);
  const [dropImage, setDropImage] = useState<Image[]>([]);
  const dragDestinationRef = useRef<(React.RefObject<HTMLDivElement> | null)[]>([]);

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const INITIAL: Props['INITIAL'] = {
    isValChk: Boolean(getValueInputData(mainKey, 'IMAGE-1') && getValueInputData(mainKey, 'IMAGE-2')),
    isComplete: isSubmittedInput(mainKey, 'IMAGE-1') && isSubmittedInput(mainKey, 'IMAGE-2'),
  };

  const gradeData = useRecoilValue(currentPageGradeData);
  const isCorrect = gradeData.find(data => data.mainKey === mainKey)?.isCorrect; // 답 정답 여부

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
          currentBox.style.border = '2px solid black';
        } else {
          currentBox.style.border = '1px dotted var(--color-grey-500)'; // 초기화 스타일
        }
      }
    });
  };

  const inActiveBox = (idx: number | null) => {
    if (!chkIndex(idx)) {
      setCurrentIndex(null);
    }

    const currentBox = dragDestinationRef.current[idx as number]?.current;
    currentBox ? (currentBox.style.border = '1px dotted var(--color-grey-500)') : null;
  };

  const handleDragStart = (image: Image, _idx: number) => {
    setCurrenImage(image);
    // setSelectIndex(idx);
  };

  const handleDragEnd = () => {
    if (!currentImage || !chkIndex(currentIndex as number | null)) return;

    const newArray = [...dropImage];
    newArray[currentIndex as number] = currentImage;
    setDropImage(newArray);
    inActiveBox(currentIndex as number);

    setCurrenImage(undefined);

    handleChangeInputData(mainKey, `IMAGE-${(currentIndex as number) + 1}`, currentImage.src); // 이미지 src 저장
  };

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const handleSubmit = () => {
    if (!INITIAL.isComplete) {
      gradeSubmitPageData();
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    imageList.forEach((_, idx) => {
      dragDestinationRef.current[idx] = React.createRef<HTMLDivElement>();
    });
  }, [imageList]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={{
        ...questionInfo,
        mark: INITIAL.isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
        markSize: 'middle',
      }}
      audioInfo={audioInfo}
      submitLabel={INITIAL.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={INITIAL.isValChk ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={INITIAL.isValChk ? false : true}
      onSubmit={handleSubmit}
      bodyId='targetContainer'
    >
      <Box useFull>
        <BoxWrap useFull justifyContent={'center'} padding={'0px 40px'}>
          <GridBox
            onDragEnd={() => handleDragEnd()}
            style={{
              marginLeft: '50%',
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '20px',
              alignItems: 'start',
            }}
          >
            <AudioBox style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '500px' }}>
              {Array.from({ length: 2 }).map((_, idx) => {
                const answerSrc = getValueInputData(mainKey, 'IMAGE-' + (idx + 1)) as string;
                const matchedImage = imageList.find(img => img.src === answerSrc);
                return (
                  <AudioWrap key={idx}>
                    <AudioItem>
                      <AudioNumber>{idx + 1}</AudioNumber>
                      <Box display={'inline-block'} padding={'10px'}>
                        <Text>{idx === 0 ? "Don't enter, please." : "Don't run, please."}</Text>
                      </Box>
                    </AudioItem>
                    <DropBox
                      ref={dragDestinationRef.current[idx]}
                      onDragOver={e => {
                        e.preventDefault();
                        activeBox(idx);
                      }}
                      onDragLeave={() => inActiveBox(null)}
                      style={{ width: '100%', height: '120px', border: '1px solid #ccc', borderRadius: '5px' }}
                    >
                      {dropImage[idx]?.src ? (
                        <Image src={dropImage[idx].src} alt={dropImage[idx].alt} width='fit-content' height='100%' />
                      ) : INITIAL.isValChk ? (
                        <Image src={answerSrc} alt={matchedImage?.alt} width='fit-content' height='100%' />
                      ) : (
                        <>이곳에 드래그해 주세요.</>
                      )}
                    </DropBox>
                  </AudioWrap>
                );
              })}
            </AudioBox>
            <ImageBox>
              {imageList.map((img, idx) => {
                return (
                  <ImageWrap key={idx} style={{ marginTop: '50%', marginRight: '80%', width: '100%' }}>
                    <Box useShadow={true} useRound={true} background='white' width={`250px`} height={'188px'}>
                      <Box hAlign='center' vAlign='center' margin='auto'>
                        <div draggable onDragStart={() => handleDragStart(img, idx)}>
                          <Image key={img.alt} src={img.src} alt={img.alt} width='fit-content' height='104px' />
                        </div>
                      </Box>
                      <Text>
                        <p>{img.value}</p>
                      </Text>
                    </Box>
                  </ImageWrap>
                );
              })}
            </ImageBox>
          </GridBox>
        </BoxWrap>
        {isOpen && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
            <Box background='lightGray' borderRadius='12px' marginTop='45px'>
              <Box>
                <Box>
                  <Tag type={ETagLine.GREEN} label={'답안'} />
                </Box>
              </Box>
            </Box>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

const ImageWrap = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px, 16px, 24px, 16px;
`;

const Text = styled.div`
  height: 20px;
  text-align: center;
  font-family: Lexend;
  font-size: 24px;
  font-weight: 500;
  line-height: 20px;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
`;

const AudioBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 952px;
`;

const AudioWrap = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0px 12px 12px 12px;
`;
const AudioItem = styled.div``;

const AudioNumber = styled.div`
  float: left;
  color: #996500;
  font-family: SUIT;
  font-size: 36px;
  font-weight: 800;
  line-height: 58px;
  text-align: left;
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
  width: 200px;
  height: 132px;
`;

const ImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 952px;
`;

export default EE4L04C03A07bP03;
