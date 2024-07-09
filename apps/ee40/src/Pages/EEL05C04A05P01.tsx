import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  Image,
  EStyleButtonTypes,
  IQuestionProps,
  PinchZoom,
  Box,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { initDataType, correctDataType } from '@maidt-cntn/api';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import styled from 'styled-components';

interface ImageInfo {
  imgNum: number;
  imgSrc: string;
  width: string;
  height: string;
  alt: string;
  title: string;
}

interface InputInfo {
  text: string;
  type: string;
  width?: string;
  subkey?: string;
  answer?: string;
}

export interface IPageInfo {
  headerText: string;
  questionText: string;
  mainKeyNum: number;
  pageNumber: number;
}

export interface IData {
  text: string;
}

export interface IEEL05C04A05P01 {
  imgInfo: ImageInfo;
  inputInfo: InputInfo[];
  answerInfo: Object;
  pageInfo: IPageInfo;
  audioInfo: IAudioPlayerProps;
  data: IData[];
  bubbleText?: string;
  number?: string;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
}

const EEL05C04A05P01 = ({
  data,
  imgInfo,
  inputInfo,
  answerInfo,
  pageInfo,
  audioInfo,
  getCorrectData,
  getDefaultData,
}: IEEL05C04A05P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNumber),
    collectDatas: getCorrectData(pageInfo.pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
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
      audioInfo={audioInfo}
      useExtend
    >
      <Box useFull>
        <Box
          width={'640px'}
          height={120}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          margin={'auto'}
          marginBottom={40}
        >
          <TextView title='보기' height='106px'>
            <Box
              width={'608px'}
              height={'36px'}
              display={'flex'}
              flexDirection={'row'}
              gap={40}
              justifyContent={'space-evenly'}
              alignItems={'center'}
              fontSize={'32px'}
              fontWeight={500}
            >
              {data.map((value, index) => (
                <div key={index}>{value?.text}</div>
              ))}
            </Box>
          </TextView>
        </Box>
        <BoxWrap useFull height={234}>
          <Box useFull borderRadius={8} display={'flex'} width={imgInfo.width} height={imgInfo.height}>
            <Typography style={{ fontSize: '36px', fontWeight: '800', lineHeight: '58px', color: '#996500' }}>{imgInfo.imgNum}</Typography>
            <Box width='100%'>
              <PinchZoom pinchType='image'>
                <Image src={imgInfo.imgSrc} alt={imgInfo.alt} title={imgInfo.title} width='100%' height={imgInfo.height}/>
              </PinchZoom>
            </Box>
          </Box>
          <Box  width={`calc(100% - ${imgInfo.width})`}  hAlign='center' justifyContent='center'>
            <WordInputs>
              {inputInfo.map((item, index) => {
                const inputIs = item.type === 'input';
                const subkeyMatch = subKeys.indexOf(item.subkey!);
                return inputIs ? (
                  <WordInput
                    key={index}
                    style={{ width: item.width }}
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
        </BoxWrap>
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

export default EEL05C04A05P01;

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
