import {
  Image,
  Box,
  TMainHeaderInfoTypes,
  List,
  Label,
  Radio,
  EStyleButtonTypes,
  Typography,
  IQuestionProps,
  PinchZoom,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import styled from 'styled-components';

interface Data {
  text: string;
}

interface ImageInfo {
  src: string;
  width: string;
  height: string;
  alt: string;
  title: string;
}

interface PageInfo {
  mainKey: number;
  subKey: string;
  pageNumber: number;
}

interface solutionInfo {
  label: String;
  value: any;
}

interface EEL01C03A10P02 {
  headerInfo: TMainHeaderInfoTypes;
  questionText: string;
  data: Data[];
  imgInfo: ImageInfo;
  pageData: PageInfo;
  solutionInfo: solutionInfo[];
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => any;
}

const EEL01C03A10P02 = ({ pageData, headerInfo, solutionInfo, getDefaultData, getCorrectData, questionText, imgInfo, data }: EEL01C03A10P02) => {
  const { mainKey, subKey } = pageData;
  const { src, width, height, alt, title } = imgInfo;

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageData.pageNumber),
    collectDatas: getCorrectData(pageData.pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: number) => {
    changeInputData(mainKey, subKey, value);
    setSelectedIndex(value);
  };

  const [isShow, setShow] = useState(false);
  const gradeData = useRecoilValue(currentPageGradeData);
  const isCorrect = gradeData.find(data => data.mainKey === mainKey)?.isCorrect;
  const isComplete = isSubmittedInput(mainKey, subKey);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const questionInfoIs: IQuestionProps = {
    size: 'large',
    text: questionText,
    mark: isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
    markSize: 'middle',
  };

  const handleSubmit = () => {
    if (!isComplete) {
      return gradeSubmitPageData();
    }
    setShow(!isShow);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfoIs}
      submitLabel={isComplete ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={selectedIndex !== null ? false : true}
      submitBtnColor={selectedIndex !== null ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.TERTIARY}
    >
      <Box useFull display='flex' padding={'50px'} alignItems='center' flexDirection='column'>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' marginBottom={'30px'}>
          <PinchZoom>
            <Image src={src} width={width} height={height} alt={alt} title={title} />
          </PinchZoom>
          <Box hAlign={'center'} width='500px' useFull>
            <List
              gap={24}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  isError={isComplete ? !isCorrect : false}
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === (getValueInputData(mainKey, subKey) as Number)}
                  onClick={() => handleChangeInputData(mainKey, subKey, index)}
                  disabled={isComplete}
                >
                  <Box padding={'6px 0'} whiteSpace='nowrap'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </Box>
                </Radio>
              )}
            />
          </Box>
        </Box>
        {isShow && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
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

export default EEL01C03A10P02;

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
