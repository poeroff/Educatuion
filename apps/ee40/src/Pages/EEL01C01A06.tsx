/*
    1. URL: http://localhost:4270/#/ee40/L01-C01-A06
    2. 페이지: EE4-L01-C01-A06-P01

    3. PropsTypes
        - headerInfo: TMainHeaderInfoTypes;
        - questionInfo: IQuestionProps;
        - audioInfo: IAudioPlayerProps;
        - files: any;
        - pageNumber: number;
        - mainKey: number;
        - subKey: string;
        - list: { src: string; alt: string }[];
        - correctData: number;
*/

// UI 공통
import {
  Image,
  BoxWrap,
  Box,
  PinchZoom,
  Radio,
  Label,
  EStyleButtonTypes,
  Tag,
  Typography,
  BottomSheet,
  ETagLine,
  TMainHeaderInfoTypes,
  IQuestionProps,
  IAudioPlayerProps,
  List,
} from '@maidt-cntn/ui';

// UI en
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

// API
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';
import { correctDataType } from '@/types/pageData';

export type IListData = {
  src?: string;
  alt?: string;
};

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  headImage?: {
    src: string;
    alt: string;
    title: string;
  };
  getCorrectData: (index: number) => any;
  getDefaultData: (index: number) => initDataType;
  pageNumber?: number;
  mainKey?: number;
  subKey?: string;
  pageData?: IListData[] | undefined;
};

const Component = ({
  headerInfo,
  questionInfo,
  audioInfo,
  getCorrectData,
  getDefaultData,
  headImage,
  pageNumber, // pageData.ts case number
  mainKey, // pageData.ts mainKey
  subKey, // pageData.ts subKey ex) 'TEXT-01',
  pageData = [], // PageData
}: PageProps) => {
  const [isOpen, setIsOpen] = useState(false); // 답안 보기

  // bx pageData.ts
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber as number),
    collectDatas: getCorrectData(pageNumber as number),
  });

  // bx pageData.ts handle event
  const handleChangeInputData = (mainKey: number, subKey: string, value: number) => {
    changeInputData(mainKey, subKey, value);
  };

  const gradeData = useRecoilValue(currentPageGradeData); // 체점후 [{ mainKey, isCorrect }] 데이터
  const inputData = getValueInputData(mainKey as number, subKey as string) || null; // radio data
  const isComplete: boolean = isSubmittedInput(mainKey as number, subKey as string); // 체점하기 submit 여부
  const isCorrect = gradeData.find(data => data.mainKey === mainKey)?.isCorrect; // 체점 후 정답인지 아닌지 체크
  const correctData = getCorrectData(pageNumber as number)[0].inputDatas[0][0].value; // 정답

  // radio handler
  const onHandler = (index: number) => {
    handleChangeInputData(mainKey as number, subKey as string, index);
  };

  // 체점하기
  const onSubmit = () => {
    if (!isComplete) {
      gradeSubmitPageData();
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={{
        ...questionInfo,
        mark: isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
        markSize: 'middle',
      }}
      submitDisabled={inputData === null}
      submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={inputData != null ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      audioInfo={audioInfo}
      onSubmit={onSubmit}
      useExtend
    >
      <Box useFull>
        <BoxWrap>
          <Box marginRight='30px'>
            <PinchZoom>
              <Box display='flex' justifyContent='center' width='306px' height='394px'>
                {headImage && <Image src={headImage.src} width='auto' height='100%' alt={headImage.alt} title={headImage.title} />}
              </Box>
            </PinchZoom>
          </Box>
          <Box hAlign='center' vAlign='center'>
            <List<IListData>
              align='horizontal'
              data={pageData}
              row={({ value, index = 1 }) => (
                <Radio
                  type='square'
                  name='result1'
                  isError={isComplete ? !isCorrect : false}
                  disabled={isComplete}
                  value={index === inputData}
                  onClick={() => onHandler(index)}
                >
                  <Label value={index} />
                  <Box width='174px' height='200px' hAlign='center' border='none'>
                    {value && <Image src={value?.src as string} width='130px' height='130px' alt={value.alt} title={value.alt} />}
                  </Box>
                </Radio>
              )}
            />
          </Box>
        </BoxWrap>
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Tag fontSize='22px' height='auto' label='답안' type={ETagLine.GREEN} width='auto' />
            <Box margin='25px 0 20px'>
              <Typography>{correctData}</Typography>
            </Box>
          </Box>
        </BottomSheet>
      </Box>
    </Container>
  );
};

export default Component;
