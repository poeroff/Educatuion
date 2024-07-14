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
  SimpleAudioPlayer,
  Recorder,
  EStyleFontSizes,
} from '@maidt-cntn/ui';

// UI en
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

// API
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';

export type IListData = {
  src?: string;
  alt?: string;
};

type IListenAndAnswer = {
  type: string;
  color: string;
  content: React.ReactNode;
  isRecoding: boolean;
  src?: string;
  alt?: string;
};

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;

  headImage?: string;
  getCorrectData: (index: number) => any;
  getDefaultData: (index: number) => initDataType;
  pageNumber?: number;
  mainKey?: number;
  subKey?: string;
  pageData?: IListData[] | undefined;
};

const EE4L06C02A05a = ({
  headerInfo,
  questionInfo,

  getCorrectData,
  getDefaultData,

  pageNumber, // pageData.ts case number
  mainKey, // pageData.ts mainKey
  subKey, // pageData.ts subKey ex) 'TEXT-01',
  pageData = [], // PageData
}: PageProps) => {
  const [isOpen, setIsOpen] = useState(false); // 답안 보기
  const [data, setData] = useState<Array<IListenAndAnswer>>([
    {
      type: 'A',
      color: '#E2F2FF',
      content: (
        <>
          Good afternoon.
          <br />
          How are you?
        </>
      ),
      isRecoding: false,
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>I’m good.</>,

      isRecoding: false,
    },
  ]);

  // bx pageData.ts
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
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

  // record handler
  const recordonHandler = (index: number) => {
    setData(prevDataList => {
      const updatedDataList = [...prevDataList];
      updatedDataList[index].isRecoding = true;
      return updatedDataList;
    });
  };

  // radio handler
  const onHandler = (index: number) => {
    handleChangeInputData(mainKey as number, `RECORDER-${index}`, index);
  };

  // 체점하기
  const onSubmit = () => {
    if (!isComplete) {
      submitPageData();
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitDisabled={inputData === null}
      submitLabel={'완료하기'}
      submitBtnColor={inputData != null ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={onSubmit}
      useExtend
    >
      <Box>
        <BoxWrap>
          <Box marginRight='170px'></Box>

          <Box hAlign='center' vAlign='center' display='block' marginBottom={80}>
            {/* 상단 3개 항목 */}
            <List<IListData>
              align='horizontal'
              data={pageData.slice(0, 3)}
              row={({ value, index = 0 }) => (
                <Box width={250}>
                  <div style={{ display: 'block', marginTop: '30%' }}>
                    <Typography size={EStyleFontSizes['LARGE']} color='#996500' weight={800}>
                      {index}
                    </Typography>

                    <Box width='174px' height='200px' hAlign='center' border='none'>
                      {value && <img src={value.src} width='130px' height='200px' alt={value.alt} title={value.alt} />}
                    </Box>
                  </div>
                  <Box hAlign='flex-start' gap={6} marginLeft='40px' marginTop={20}>
                    <Recorder recorderIndex={index} onSubmit={() => onHandler(index)} />
                  </Box>
                </Box>
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

export default EE4L06C02A05a;
