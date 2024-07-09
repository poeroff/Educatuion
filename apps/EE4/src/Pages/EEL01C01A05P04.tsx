import { useCallback, useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  Typography,
  VideoPlayer,
  Label,
  IQuestionProps,
  EStyleFontSizes,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  ETagLine,
  BottomSheet,
  Tag,
  Image,
} from '@maidt-cntn/ui';
import { RadioBox, RadioBrdN } from '@/assets/styles';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';
import { correctDataType, initDataType } from '@maidt-cntn/api';
import type { TContentInfo, TQuestionType, TAnswerType, TAnswerInfo, TQuestionInfo, TSolutionData } from '@/types/contentInfo';

type INITIAL = {
  isComplete: boolean;
  isCorrect: boolean | undefined;
  isValue: number;
};

type TPageData = {
  pageNumber: number;
  mainKey: number;
  subKey: string;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
  getSolutionData: (pageNumber: number) => TSolutionData[];
};

interface Props {
  layout: {
    headerInfo: TMainHeaderInfoTypes;
    hQuestionInfo: IQuestionProps;
    srtFile?: string;
    audioInfo?: IAudioPlayerProps;
  };
  pageData: TPageData;
  contentInfo: TContentInfo<TQuestionType, TAnswerType>;
}

const EEL01C01A05P04 = ({ layout, pageData, contentInfo }: Props) => {
  const CONST = { ...layout };
  const { pageNumber, mainKey, subKey, getDefaultData, getCorrectData, getSolutionData } = pageData;
  const { questionInfo, answerInfo } = contentInfo;

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const [INITIAL, setINITIAL] = useState<INITIAL>({
    isComplete: false,
    isCorrect: undefined,
    isValue: 0,
  });

  const [selectedIdx, setSelectedIdx] = useState<number | ''>(Number(getValueInputData(mainKey, subKey)));
  const [showIs, setShowIs] = useState(false);
  const [solutionData] = useState<TSolutionData>(getSolutionData(pageNumber)[0]);

  const handleRadioSync = useCallback(
    (mainKey: number, subKey: string, value: string) => {
      const numValue = Number(value);
      changeInputData(mainKey, subKey, numValue);
      setSelectedIdx(numValue);
    },
    [changeInputData],
  );

  const getCorrectAnswer = useCallback(
    (pageNumber: number, mainKey: number, subKey: string) => {
      const data = getCorrectData(pageNumber).find(item => item.mainKey === mainKey);
      if (data) {
        return data?.inputDatas?.flat().find(item => item.subKey === subKey)?.value;
      }
      return null;
    },
    [getCorrectData],
  );

  // 좌측 문제 영역
  const questionArea = () => {
    let qInfo;

    if (questionInfo.questionType === 'img') {
      qInfo = questionInfo as TQuestionInfo<'img'>;
      return <Image src={qInfo.questionImgSrc} alt={qInfo.questionImgAlt} width='100%' height='100%'></Image>;
    } else {
      qInfo = questionInfo as TQuestionInfo<'video'>;
      return <VideoPlayer srtFile={qInfo.qusetionVideoSrt || ''} videoSrc={qInfo.questionVideoSrc} />;
    }
  };

  // 우측 답안 영역

  // 이미지 형식 선택지
  const answerImg = (aInfo: TAnswerInfo<'img'>) => {
    return aInfo.answerImg.map((item, idx) => {
      const index = idx + 1;
      return (
        <RadioBox
          key={idx}
          type='square'
          align='horizontal'
          name='radio-box1'
          isCorrect={INITIAL.isComplete ? INITIAL.isCorrect : null}
          defaultValue={index === INITIAL.isValue}
          value={index === INITIAL.isValue}
          isLine={true}
          label={String(index)}
          disabled={INITIAL.isComplete}
          onClick={e => handleRadioSync(mainKey, subKey, (e.target as HTMLInputElement).value)}
        >
          <Label value={String(index)} size='middle' />
          <Image alt={item.answerImgSrc} src={item.answerImgSrc} width='200px' height='200px' style={{ objectFit: 'contain' }} />
        </RadioBox>
      );
    });
  };

  // 텍스트 형식 선택지
  const answerText = (aInfo: TAnswerInfo<'text'>) => {
    return (
      <Box>
        {aInfo.answerText.map((item: { title: string; value: number | string }, idx: number) => {
          const index = idx + 1;
          return (
            <RadioBrdN
              key={idx}
              align='vertical'
              gap={30}
              type='box'
              name='radio-box1'
              isCorrect={INITIAL.isComplete ? INITIAL.isCorrect : null}
              defaultValue={index === INITIAL.isValue}
              value={index === INITIAL.isValue}
              label={String(index)}
              disabled={INITIAL.isComplete}
              onClick={e => handleRadioSync(mainKey, subKey, (e.target as HTMLInputElement).value)}
            >
              <Label value={String(index)} size='middle'></Label>
              <Typography size={EStyleFontSizes.MEDIUM}>{item.title}</Typography>
            </RadioBrdN>
          );
        })}
      </Box>
    );
  };

  const answerArea = () => {
    if (answerInfo.answerType === 'img') {
      return answerImg(answerInfo as TAnswerInfo<'img'>);
    } else {
      return answerText(answerInfo as TAnswerInfo<'text'>);
    }
  };

  const fnClickConfirmSync = () => {
    if (!INITIAL.isComplete) return gradeSubmitPageData();
    setShowIs(!showIs);
  };

  useEffect(() => {
    setINITIAL({
      isComplete: isSubmittedInput(mainKey, subKey),
      isCorrect: getCorrectAnswer(pageNumber, mainKey, subKey) === getValueInputData(mainKey, subKey),
      isValue: Number(getValueInputData(mainKey, subKey)),
    });
  }, [getCorrectAnswer, getValueInputData, isSubmittedInput, mainKey, pageNumber, selectedIdx, subKey]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      vAlign='top'
      useExtend={true}
      submitLabel={INITIAL.isComplete ? (showIs ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={selectedIdx === null}
      submitBtnColor={!INITIAL.isValue ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW}
      onSubmit={() => fnClickConfirmSync()}
      audioInfo={layout.audioInfo}
      questionInfo={{
        text: (
          <span>
            {CONST.hQuestionInfo.text}
            <GradeCheck mainKey={mainKey} />
          </span>
        ),
      }}
    >
      <BoxWrap useFull {...{ marginTop: '10px' }}>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' height={'100%'} marginBottom={'30px'} width={'100%'}>
          <Box hAlign={'center'} useFull height={'fit-content'} flex={1}>
            {/* 좌측 문제 영역 */}
            {questionArea()}
          </Box>
          <Box hAlign={'center'} vAlign={'center'} justifyContent='flex-start' flex={1}>
            {/* 우측 선택지 영역 */}
            {answerArea()}
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showIs}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            <Box marginTop='12px' whiteSpace='pre-line'>
              <Typography>{solutionData.answer}</Typography>
            </Box>
            {solutionData.script && (
              <>
                <Box marginTop='30px'>
                  <Tag type={ETagLine.GREEN} label={'대본'} />
                </Box>
                <Box marginTop='12px' whiteSpace='pre-line'>
                  <Typography>{solutionData.script}</Typography>
                </Box>
              </>
            )}
            {solutionData.interpretation && (
              <>
                <Box marginTop='30px'>
                  <Tag type={ETagLine.GREEN} label={'해석'} />
                </Box>
                <Box marginTop='12px' whiteSpace='pre-line'>
                  <Typography>{solutionData.interpretation}</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EEL01C01A05P04;
