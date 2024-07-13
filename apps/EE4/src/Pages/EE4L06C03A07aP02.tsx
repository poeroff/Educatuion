import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  TMainHeaderInfoTypes,
  Drawing,
  Image,
  Recorder,
  EStyleButtonTypes,
  IQuestionProps,
  PinchZoom,
  Box,
  SimpleAudioPlayer,
  TextView,
  IAudioData,
  Textarea,
  Tag,
  Typography,
  ETagPaint,
  ETagLine,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import picture from '../cards/L06/C03/A07a/assets/images/EE4-L06-C03-A07a-P01.png';
import GradeCheck from '@/components/gradeCheck';

export interface IImageProps {
  src: string;
  alt: string;
  title: string;
  width?: string;
  height?: string;
  imgNum?: number;
}

export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string;
}

export interface IData {
  text: string;
}

export interface IEEL03C04A06P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  pageInfo: IPageInfo;
  data: IData[];
  bubbleText?: string;
  number?: string;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | null;
    }[][];
  }[];

  // textareaWidth?: string;
  // textareaHeight?: string;
}

const EE4L06C03A07aP02 = ({
  headerInfo,
  questionInfo,
  data,
  imageInfo,
  pageInfo,

  // textareaWidth,
  // textareaHeight,
  getCorrectData,
  getDefaultData,
}: IEEL03C04A06P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const completeQnA = () => {
    if (!isComplete) return gradeSubmitPageData();
    setShowIs(!showIs);
  };

  const [showIs, setShowIs] = useState(false);
  const isComplete: boolean = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);
  const correctAnswer = getCorrectData(pageInfo.pageNum)[0].inputDatas[0][0].value;

  const currentAnswer = getValueInputData(pageInfo.mainKey, pageInfo.subKey);

  const validationCheck = () => {
    return currentAnswer === null || (typeof currentAnswer === 'string' && currentAnswer.trim().length === 0);
  };
  const handleRecoderSubmit = () => {
    changeInputData(pageInfo.mainKey, 'RECORDER-01', true);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isComplete ? (showIs ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!validationCheck() ? (showIs ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={validationCheck()}
      onSubmit={completeQnA}
      useExtend
    >
      <Box useFull>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px' }}>
          <Box width={'708px'} flexDirection={'column'} justifyContent={'right'} alignItems={'right'} margin={'auto'} marginBottom={40} float='right'>
            <img src={imageInfo.src} alt={imageInfo.alt} title={imageInfo.title} width={imageInfo.width} height={'400px'} />
          </Box>

          <div>
            <TextView title='보기' height='226px'>
              <Box width={'608px'} height={'226px'} display={'flex'} flexDirection={'row'} flexWrap={'wrap'} fontSize={'32px'} fontWeight={500}>
                {data.map((value, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      marginLeft: '5%',
                    }}
                  >
                    {value?.text}
                  </div>
                ))}
              </Box>
            </TextView>
            <Box marginBottom={40} marginTop={20} display='flex'>
              <Typography color='#996500' weight={800}>
                2 <GradeCheck mainKey={2}></GradeCheck>
              </Typography>

              <Textarea
                placeholder='내용을 넣어 주세요.'
                value={currentAnswer as string}
                onChange={e => handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, e.target.value)}
                width='550px'
                height={'75px'}
                disabled={isComplete}
              />
            </Box>
            <Box vAlign='center' hAlign='center'>
              <Recorder
                recorderIndex={1}
                onSubmit={() => {
                  handleRecoderSubmit();
                }}
              />
            </Box>
          </div>
        </div>

        {showIs && (
          <Box marginTop='25px' background='gray' padding='28px' useRound>
            <Box margin='25px 0'>
              <Tag fontSize='22px' height='auto' label='답안' type={ETagLine.GREEN} width='auto' />
              <Box margin='25px 0 50px'>
                <Typography>{correctAnswer}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default EE4L06C03A07aP02;
