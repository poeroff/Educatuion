import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EImageType,
  EStyleButtonTypes,
  ETagLine,
  IAudioPlayerProps,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { checkAnswers, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L02C03A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
const vitePath = import.meta.env.VITE_CDN_PATH;
const backgroundImg = `${vitePath}/L02/C03/A02/HE1-L02-C03-A02-03.jpg`;

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C03A02a);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the lecture notes using information from the talk.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C03/A02/HE1-L02-C03-A02-02.mp3',
    captionSrc: '/L02/C03/A02/HE1-L02-C03-A02-02.srt',
  };

  const calcSubmitBtnColor = () => {
    if (cardData.p03.isSubmitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      const isAllFilled = cardData.p03.answer.every(ans => isNotEmptyString(ans));
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  };

  const inputChangeHandler = (value: string, index: number) => {
    const newInputs = cardData.p03.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: newInputs,
      },
    }));
    changeData('P03', 1, index + 1, newInputs);
  };

  const checkInputStatus = (index: number) => {
    return cardData.p03.isSubmitted && !cardData.p03.isCorrectInput[index]
      ? InputStatus.ERROR
      : isNotEmptyString(cardData.p03.answer[index])
      ? InputStatus.ENABLE
      : InputStatus.DEFAULT;
  };

  const renderInput = (index: number) => {
    return (
      <Input
        minWidth='220px'
        textAlign='start'
        inputSize='x-small'
        placeholder='내용을 넣어주세요.'
        value={cardData.p03.answer[index]}
        onChange={event => inputChangeHandler(event.target.value, index)}
        status={checkInputStatus(index)}
        maxLength={100}
        ariaLabel={`${index + 1}번 답을 입력하세요`}
        readOnly={cardData.p03.isSubmitted}
      />
    );
  };

  const defaultInputData: inputDatasType[] = cardData.p03.answer.map(idx => ({
    subKey: idx + 1,
    type: 'TEXT',
    value: '',
    isAnswer: true,
  }));

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: defaultInputData,
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData.map((item: { value: string }) => item.value) || cardData.p03.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isCorrectInput: isSubmitted ? userSubmissionList[0].inputData.map((item: { isCorrect: boolean }) => item.isCorrect) : false,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShowAnswer(!isShowAnswer);
      return;
    }
    const results = checkAnswers(cardData.p03.answer, cardData.p03.solution);
    const isCorrect = results.every(item => item);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect, isCorrectInput: results } }));

    const inputData: inputDatasType[] = cardData.p03.answer.map((value, idx) => ({
      subKey: idx + 1,
      type: 'TEXT',
      value: value || '',
      isCorrect: results[idx],
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: inputData,
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P03', userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={calcSubmitBtnColor()}
      submitDisabled={cardData.p03.answer.some(answer => !isNotEmptyString(answer))}
      onSubmit={handleSubmit}
    >
      <BackgroundWrap type={EImageType.IMG_BG} alt='배경화면'>
        <BoxWrap>
          <Box width='200px'></Box>
          <Box paddingTop='15px' useFull>
            <Typography weight={800}>Lecture Notes</Typography>
          </Box>
        </BoxWrap>
        <BoxWrap>
          <Box width='200px'>
            <Typography weight={800}>Topic</Typography>
          </Box>
          <Box useFull>
            <Typography>Every (1) {renderInput(0)} has its own unique traditions and customs.</Typography>
          </Box>
        </BoxWrap>
        <BoxWrap>
          <Box width='200px'>
            <Typography weight={800}>Examples</Typography>
          </Box>
          <Box useFull>
            <Typography usePre>
              • Opening (2) {renderInput(1)} right away{`\n`} acceptable in most Western countries, but (3) {renderInput(2)} in China{`\n`}• Touching
              a person’s (4) {renderInput(3)} {`\n`}
              (5) {renderInput(4)} in Thailand and Laos, but okay in other countries
            </Typography>
          </Box>
        </BoxWrap>
      </BackgroundWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='20px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              {cardData.p03.solution.map((value, index) => {
                return `(${index + 1}) ${value} \n`;
              })}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BackgroundWrap = styled(Image)`
  min-height: 450px;
  width: 100%;
  padding: 0px 10px 0px 10px;
  background: top right / cover no-repeat url(${backgroundImg});
`;

export default P03;
