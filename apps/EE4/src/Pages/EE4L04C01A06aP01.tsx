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
  Input,
  Textarea,
} from '@maidt-cntn/ui';

// UI en
import { Container } from '@maidt-cntn/ui/en';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from 'react';

// API
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';
import GradeCheck from '@/components/gradeCheck';

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

type PropsInfo = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo: IAudioPlayerProps;
};

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  headImage?: string;
  getCorrectData: (index: number) => any;
  getDefaultData: (index: number) => initDataType;
  pageNumber?: number;
  mainKey?: number;
  subKey?: string;
  pageData?: IListData[] | undefined;
};

const EE4L04C01A06aP02 = ({
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
  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const gradeData = useRecoilValue(currentPageGradeData); // 체점후 [{ mainKey, isCorrect }] 데이터
  const inputData = getValueInputData(mainKey as number, subKey as string) || null; // radio data
  const isComplete: boolean = isSubmittedInput(mainKey as number, subKey as string); // 체점하기 submit 여부
  const isCorrect = gradeData.find(data => data.mainKey === mainKey)?.isCorrect; // 체점 후 정답인지 아닌지 체크
  const correctData = getCorrectData(pageNumber as number)[0].inputDatas[0].value; // 정답

  console.log(getCorrectData(pageNumber as number)[0].inputDatas[0]);

  // radio handler
  // const onHandler = (index: number) => {
  //   handleChangeInputData(mainKey as number, subKey as string, index);
  // };

  // 체점하기
  const onSubmit = () => {
    if (!isComplete) {
      gradeSubmitPageData();
      return;
    }
    setIsOpen(!isOpen);
  };

  function onChangeInputs(arg0: number, arg1: string, arg2: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Container
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
      <Box>
        <BoxWrap>
          <Box></Box>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '15%' }}>
            {pageData.slice(0, 5).map((value, index) => (
              <div
                key={index + 1}
                style={{
                  width: '100px',
                  height: '100px',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                // onClick={() => onHandler(index + 2)}
              >
                <Box width='174px' height='180px' hAlign='center' border='none' margin='none'>
                  <div style={{ marginBottom: '50%' }}>
                    <Typography size={EStyleFontSizes['LARGE']} color='#996500' weight={500}>
                      {index + 1} <GradeCheck mainKey={0} />
                    </Typography>
                  </div>
                  {value && <img src={value.src} width='130px' height='130px' alt={value.alt} title={value.alt} />}
                </Box>
              </div>
            ))}
          </div>
        </BoxWrap>
        <BoxWrap>
          <Box width='2.25%'></Box>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '15%' }}>
            {pageData.slice(0, 5).map((value, index) => (
              <div
                key={index + 1}
                style={{
                  width: '100px',
                  height: '100px',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                // onClick={() => onHandler(index + 1)}
              >
                <Box width='174px' height='180px' hAlign='center' border='none' margin='none'>
                  <Input
                    width='104px'
                    value={getValueInputData(1, `TEXT-${index + 1}`) as string}
                    onChange={e => {
                      handleChangeInputData(1, `TEXT-${index + 1}`, e.target.value);
                    }}
                    disabled={isSubmittedInput(1, `TEXT-${index + 1}`)}
                  />
                </Box>
              </div>
            ))}
          </div>
        </BoxWrap>

        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Tag fontSize='22px' height='auto' label='답안' type={ETagLine.GREEN} width='auto' />
            <Box margin='25px 0 20px'>
              {getCorrectData(pageNumber as number)[0].inputDatas[0].map(
                (correct: {
                  value:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                }) => (
                  <Typography>{correct.value}</Typography>
                ),
              )}
            </Box>
          </Box>
        </BottomSheet>
      </Box>
    </Container>
  );
};

export default EE4L04C01A06aP02;
