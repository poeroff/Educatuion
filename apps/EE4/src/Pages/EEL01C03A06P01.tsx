import { Box, TMainHeaderInfoTypes, Image, PinchZoom, IQuestionProps, EStyleButtonTypes, IAudioPlayerProps, BottomSheet } from '@maidt-cntn/ui';
import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { initDataType } from '@maidt-cntn/api';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';

interface ImageInfo {
  imgSrc: string;
  width: string;
  height: string;
  alt: string;
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
interface EEL01C03A06P01 {
  imgInfo: ImageInfo;
  inputInfo: InputInfo[];
  answerInfo: Object;
  audioInfo?: IAudioPlayerProps;
  pageInfo: PageInfo;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | null;
    }[][];
  }[];
}

const EEL01C03A06P01 = ({ imgInfo, inputInfo, answerInfo, audioInfo, pageInfo, getDefaultData, getCorrectData }: EEL01C03A06P01) => {
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      submitDisabled={!checkIs}
      submitBtnColor={checkIs ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.TERTIARY}
      submitLabel={isComplete ? (showIs ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmitData}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
    >
      <Box useFull display='flex' flexDirection='column' alignItems='center' padding={'30px'} alignContent='center'>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' marginBottom={'30px'}>
          <PinchZoom>
            <Image src={imgInfo.imgSrc} alt={imgInfo.alt} width={imgInfo.width} height={imgInfo.height} />
          </PinchZoom>
          <Box>
            <WordInputs>
              {inputInfo.map((item, index) => {
                const inputIs = item.type === 'input';
                const subkeyMatch = subKeys.indexOf(item.subkey!);
                return inputIs ? (
                  <WordInput
                    key={index}
                    className={isComplete ? (isCorrect === undefined ? '' : isCorrect ? 'blue' : 'red') : ''}
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
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showIs}>
            <SolutionBox>
              <div>
                <span>답안</span>
                <p>{answerIs.join(', ')}</p>
              </div>
            </SolutionBox>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

export default EEL01C03A06P01;

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
    color: var(--color-grey-900);
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
      color: var(--color-grey-900);
      font-size: 28px;
      font-weight: bold;
      padding-left: 10px;
    }
  }
`;
