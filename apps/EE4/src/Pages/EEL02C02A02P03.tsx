import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, VideoPlayer, IQuestionProps, EStyleButtonTypes } from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { initDataType, correctDataType } from '@maidt-cntn/api';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';

interface IVideoPlayerProps {
  videoSrc: string;
  srtFile: string;
  width?: number;
  height?: number;
}

interface InputInfo {
  text: string;
  type: string;
  subkey?: string;
  answer?: string;
}

interface PageInfo {
  headerText: string;
  questionText: string;
  mainKeyNum: number;
  pageNumber: number;
}

interface IEEL02C02A02P03 {
  videoInfo: IVideoPlayerProps;
  inputInfo: InputInfo[];
  answerInfo: Object;
  pageInfo: PageInfo;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
}

const EEL02C02A02P03 = ({ videoInfo, inputInfo, answerInfo, pageInfo, getDefaultData, getCorrectData }: IEEL02C02A02P03) => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNumber),
    collectDatas: getCorrectData(pageInfo.pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const separateKeysValues = (data: any) => {
    const subKeys: string[] = [];
    const values: string[] = [];

    data.forEach((item: any) => {
      subKeys.push(item.subKey);
      values.push(item.value);
    });

    return [subKeys, values];
  };

  const mainKey = pageInfo.mainKeyNum;
  const gradeData = useRecoilValue(currentPageGradeData);
  const isCorrect = gradeData.find(data => data.mainKey === mainKey)?.isCorrect;
  const [subKeys, answerIs] = separateKeysValues(answerInfo);
  const isComplete = subKeys.every(key => isSubmittedInput(mainKey, key));

  const [showIs, setShowIs] = useState(false);
  const [checkInputs, setCheckInputs] = useState<boolean[]>(Array(subKeys.length).fill(false));
  const [checkIs, setCheckIs] = useState(false);

  /* Container Info */
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

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>, subKey: string, idx: number) => {
    const val = e.target.value;

    e.target.classList.toggle('blue', val.length > 0);

    handleChangeInputData(mainKey, subKey, val);

    if (val.length > 0) {
      setCheckInputs(prevStates => {
        const updatedStates = [...prevStates];
        updatedStates[idx] = true;
        return updatedStates;
      });
    } else {
      setCheckIs(false);
    }
  };

  useEffect(() => {
    if (checkInputs.every(state => state)) setCheckIs(true);
  }, [checkInputs, isComplete]);

  const onSubmitData = () => {
    if (!isComplete) {
      return gradeSubmitPageData();
    }
    setShowIs(!showIs);
  };

  return (
    <Container
      headerInfo={headerInfo}
      submitDisabled={!checkIs}
      submitBtnColor={checkIs ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.TERTIARY}
      submitLabel={isComplete ? (showIs ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmitData}
      questionInfo={questionInfo}
    >
      <Box useFull display='flex' flexDirection='column' alignItems='center'alignContent='center'>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' marginBottom={'30px'}>
          <Box vAlign={'center'} hAlign={'center'} width={videoInfo.width || 480} height={videoInfo.height || 360}>
            <VideoPlayer
              srtFile={videoInfo.srtFile}
              videoSrc={videoInfo.videoSrc}
              // initControlBar={false}
            />
          </Box>
          <Box>
            <WordInputs>
              {inputInfo.map((item, index) => {
                const inputIs = item.type === 'input';
                const subkeyMatch = subKeys.indexOf(item.subkey!);
                return inputIs ? (
                  <WordInput
                    key={index}
                    className={isComplete ? (isCorrect ? 'blue' : 'red') : ''}
                    onChange={e => onChangeInputs(e, item.subkey!, subkeyMatch)}
                    value={getValueInputData(mainKey, item.subkey!) as string}
                    disabled={isSubmittedInput(mainKey, item.subkey!)}
                  />
                ) : (
                  <div key={index}>{item.text}</div>
                );
              })}
            </WordInputs>
          </Box>
        </Box>
        {showIs && (
          <SolutionBox>
            <div>
              <span>답안</span>
              <p>{answerIs.join(', ')}</p>
            </div>
          </SolutionBox>
        )}
      </Box>
    </Container>
  );
};

export default EEL02C02A02P03;

export const WordInputs = styled.div`
  display: flex;
  width: 100%;
  width: 512px;
  justify-content: center;
  & > * {
    margin-right: 5px;
    font-weight: 600;
    width: 60px;
    height: 60px;
    background: #eff0f2;
    border-radius: 10px;
    font-size: 36px;
    color: #232426;
    align-items: center;
    justify-content: center;
    display: flex;
  }
`;

export const WordInput = styled.input`
  text-align: center;

  &:focus,
  &.blue {
    color: #1e6efa !important;
    background: #f4f8ff !important;
  }

  &.red {
    border: 2px solid #eb1807 !important;
    color: #eb1807 !important;
    background: #fff4f3 !important;
  }
`;

export const SolutionBox = styled.div`
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
      color: #232426;
      font-size: 28px;
      font-weight: bold;
      padding-left: 10px;
    }
  }
`;
