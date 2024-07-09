import { Container } from '@maidt-cntn/ui/en';
import {
  Box,
  TMainHeaderInfoTypes,
  Image,
  IQuestionProps,
  EStyleButtonTypes,
  IAudioPlayerProps,
  Drawing,
  Label,
  Radio,
  BottomSheet,
} from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useEffect, useState } from 'react';
import { currentPageGradeData } from '@/stores';
import { useRecoilValue } from 'recoil';
import { initDataType, correctDataType } from '@maidt-cntn/api';

interface ImageInfo {
  imgSrc: string;
  width: string;
  height: string;
  alt: string;
}

interface PageInfo {
  headerText: string;
  questionText: string;
  mainKey: number;
  subkey: string;
  pageNum: number;
  srtSrc: string;
  audioSrc: string;
  data: string[];
}

interface solutionInfo {
  label: String;
  value: any;
}

interface EE40L01C01A10P01 {
  imgInfo: ImageInfo;
  pageInfo: PageInfo;
  solutionInfo: solutionInfo[];
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
}

const EEL01C03A10P01 = ({ pageInfo, imgInfo, solutionInfo, getDefaultData, getCorrectData }: EE40L01C01A10P01) => {
  const mainKey = pageInfo.mainKey;
  const gradeData = useRecoilValue(currentPageGradeData);
  const isCorrect = gradeData.find(data => data.mainKey === mainKey)?.isCorrect;

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, Number(value));
    setSelectedIndex(Number(value));
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isComplete = isSubmittedInput(mainKey, pageInfo.subkey);
  const [showIs, setShowIs] = useState(false);

  const audioInfo: IAudioPlayerProps = {
    audioSrc: pageInfo.audioSrc,
    captionSrc: pageInfo.srtSrc,
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: pageInfo.headerText,
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: pageInfo.questionText,
    mark: isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
    markSize: 'middle',
  };

  const backgroundImage = {
    src: '/writing.png',
    alt: '판서 기능',
  };

  const onSubmitData = () => {
    if (!isComplete) {
      return gradeSubmitPageData();
    }
    setShowIs(!showIs);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      submitLabel={isComplete ? (showIs ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={selectedIndex !== null ? false : true}
      submitBtnColor={selectedIndex !== null ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.TERTIARY}
      onSubmit={onSubmitData}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
    >
      <Box useFull display='flex' alignItems='center' padding={'50px'} flexDirection='column'>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' marginBottom={'30px'}>
          <Box width='304px' height='356px'>
            <Image src={imgInfo.imgSrc} alt={imgInfo.alt} width={imgInfo.width} height={imgInfo.height} />
            <RadioWrap>
              {pageInfo.data.map((item, idx) => {
                const checkIs = idx + 1 === (getValueInputData(mainKey, pageInfo.subkey) as Number) ? true : undefined;
                return (
                  <Radio
                    key={idx}
                    type='square'
                    align='horizontal'
                    isError={isComplete ? !isCorrect : false}
                    label={String(idx + 1)}
                    value={checkIs}
                    onClick={() => {
                      handleChangeInputData(mainKey, pageInfo.subkey, String(idx + 1));
                    }}
                    disabled={isComplete}
                  >
                    <Label value={idx + 1} size='middle' />
                    <Box vAlign='center'>{item}</Box>
                  </Radio>
                );
              })}
            </RadioWrap>
          </Box>
          <Drawing width='500px' height='107px' image={backgroundImage} />
        </Box>
        {showIs && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showIs}>
            <SolutionBox>
              {solutionInfo.map((item, idx) => {
                return (
                  <div key={idx}>
                    <span>{item.label}</span>
                    <p>{item.value}</p>
                  </div>
                );
              })}
            </SolutionBox>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

export default EEL01C03A10P01;

const RadioWrap = styled.div`
  width: 100%;
  display: flex;
  div {
    width: 140px;
    height: 58px;
    display: flex;
    align-items: center;
    div {
      justify-content: center;
    }
  }
`;

const SolutionBox = styled.div`
  width: 952px;
  height: auto;
  background: rgba(239, 240, 242, 0.3);
  border: 1px solid #e0e2e6;
  border-radius: 12px;
  padding: 28px;

  div {
    margin-bottom: 22px;
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      border-radius: 30px;
      background: #e5f4ea;
      border: 2px solid #1eaa58;
      color: #007637;
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
      width: 79px;
      font-weight: bold;
      font-size: 22px;
    }
    p {
      color: var(--color-grey-900);
      font-size: 28px;
      font-weight: bold;
      padding-left: 10px;
    }
  }
`;
