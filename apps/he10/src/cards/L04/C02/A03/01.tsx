import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  IAudioPlayerProps,
  EStyleButtonTypes,
  BottomSheet,
  Question,
  IQuestionProps,
  ETagLine,
  Tag,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { studentAtom } from '@/stores/student';
import { L04C02A03, getUserSubmissionStore01 } from './store';
import { getUserSubmission } from '@maidt-cntn/api';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
}

const PAGE = 'P01';
const backgroundImg = `${import.meta.env.VITE_CDN_PATH}/L04/C02/A03/HE1-L04-C02-A03-01.jpg`;

const P01 = ({ headerInfo, audioInfo }: IProps) => {
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A03);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission = getUserSubmissionStore01(['', '', '']);

  const handleShowAnswer = () => {
    setShowAnswer(!isShowAnswer);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setCardData(prev => ({
      ...prev,
      p01: { ...prev.p01, data: prev.p01.data.map((data, idx) => (index === idx ? { ...data, userAnswer: value } : data)) },
    }));
    changeData(PAGE, 1, index + 1, value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            data: prev.p01.data.map((data, index) => ({
              ...data,
              userAnswer: userSubmissionList[0].inputData[index].value || data.userAnswer,
              isCorrect: userSubmissionList[0].inputData[index].isCorrect || data.isCorrect,
            })),
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = async () => {
    const isCorrect1 = isAnswer(cardData.p01.data[0].userAnswer, cardData.p01.data[0].solution);
    const isCorrect2 = isAnswer(cardData.p01.data[1].userAnswer, cardData.p01.data[1].solution);
    const isCorrect3 = isAnswer(cardData.p01.data[2].userAnswer, cardData.p01.data[2].solution);
    const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        isSubmitted: true,
        isCorrect: isCorrect,
        data: prev.p01.data.map((data, index = 0) => ({ ...data, isCorrect: index === 0 ? isCorrect1 : index === 1 ? isCorrect2 : isCorrect3 })),
      },
    }));
    const userSubmission = getUserSubmissionStore01(
      cardData.p01.data.map(data => data.userAnswer),
      [isCorrect1, isCorrect2, isCorrect3],
    );
    submitDataWithResult(PAGE, userSubmission, isCorrect);
  };

  const getInputComponent = (index: number) => {
    return (
      <Input
        textAlign='left'
        inputSize='x-small'
        ariaLabel={`${index}번 입력란`}
        value={cardData.p01.data[index].userAnswer}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput(e, index)}
        placeholder='내용을 넣어 주세요.'
        width='280px'
        maxLength={100}
        readOnly={cardData.p01.isSubmitted}
        status={
          !cardData.p01.isSubmitted && cardData.p01.data[index].userAnswer === ''
            ? InputStatus.DEFAULT
            : cardData.p01.isSubmitted && !cardData.p01.data[index].isCorrect
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
      />
    );
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the poster using information from the dialogue.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  useEffect(() => {
    return () => {
      saveData(PAGE);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    if (!cardData.p01.data?.every(value => isNotEmptyString(value.userAnswer))) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p01]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isButtonDisabled}
      audioInfo={audioInfo}
    >
      <BackgroundWrap src={backgroundImg}>
        <Box hAlign='center' paddingTop='15px'>
          <Typography useGap={false} color='#ea7a30' weight={800}>
            World Bee Day
          </Typography>
        </Box>
        <Content>
          <Box>
            <BoldText>Date :</BoldText> <Typography>(1)</Typography>
            {getInputComponent(0)}
            <Typography>20th</Typography>
          </Box>
          <Box marginTop='10px'>
            <BoldText>Purpose</BoldText> : to inform people about the key roles of bees
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Question type='dot' size='small'>
              maintainging our (2)
            </Question>
            {getInputComponent(1)}
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Question type='dot' size='small'>
              contributing to a third of our (3)
            </Question>
            {getInputComponent(2)}
            <Typography> production</Typography>
          </Box>
          <br />
          <Box>
            <Typography style={{ fontStyle: 'italic' }} color='#ea7a30'>
              {' '}
              Let’s remember their importance and protect them!
            </Typography>
          </Box>
        </Content>
      </BackgroundWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='50%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Typography>
              <Tag type={ETagLine.GREEN} label='답안' />
            </Typography>
          </Box>
          <Box>
            <Typography usePre={true} useGap={false}>
              {cardData.p01.data?.map((data, index) => `${index + 1}. ${data.solution} \n`)}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BackgroundWrap = styled.div<{ src?: string }>`
  min-height: 400px;
  width: 100%;
  background: center / cover no-repeat url(${({ src }) => `${src}`});
  background-size: 100%;
  background-color: #d0edf5;
`;

const Content = styled.div`
  padding: 14px 0 0 20px;
`;

const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 40px;
`;

export default P01;
