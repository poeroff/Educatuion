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
  Drawing,
} from '@maidt-cntn/ui';

// UI en
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

// API
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';
import { RadioBox } from '@/assets/styles';

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
  textObj: string;
};

const EE4L05C03A07bP02 = ({
  textObj,
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
      headerInfo={headerInfo}
      questionInfo={{
        ...questionInfo,
        mark: isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
        markSize: 'middle',
      }}
      submitDisabled={inputData === null}
      submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={inputData != null ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={onSubmit}
      useExtend
    >
      <Box>
        <BoxWrap>
          <Box>
            <div style={{ display: 'flex' }}>
              <List<IListData>
                align='horizontal'
                data={pageData.slice(0, 3)}
                row={({ value, index = 0 }) => (
                  <div>
                    <div>
                      <RadioBox key={index} type='square' align='horizontal' name='radio-box1'>
                        <Label value={String(index)} size='middle' />
                      </RadioBox>
                    </div>
                    <Radio
                      type='square'
                      name='result1'
                      isError={isComplete ? !isCorrect : false}
                      disabled={isComplete}
                      value={index === inputData}
                      onClick={() => onHandler(index)}
                    >
                      <div>
                        <Box width='px' height='200px' hAlign='center' border='none' marginRight={50}>
                          {value && <img src={value.src} width='204px' height='200px' alt={value.alt} title={value.alt} />}
                        </Box>
                      </div>
                    </Radio>
                  </div>
                )}
              />
              <div style={{ marginTop: '5%' }}>
                <Box
                  background='#fff0cc'
                  padding={'4px 12px 4px 12px'}
                  height={'48px'}
                  borderRadius={'8px'}
                  fontSize={'28px'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontWeight={500}
                  color={'black'}
                  textAlign={'center'}
                >
                  {textObj}
                </Box>

                <Drawing width={'400px'} height={'150px'} />
              </div>
            </div>
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

export default EE4L05C03A07bP02;
