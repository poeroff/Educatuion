import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Question,
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  IAudioPlayerProps,
  Tag,
  ETagLine,
  IQuestionProps,
  BottomSheet,
  EStyleButtonTypes,
  InputStatus,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C02A03a } from './store';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A03a);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Listen to the dialogue and fill in the blanks.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/HE1-L04-C02-A03-01.mp3',
    captionSrc: '/L04/C02/A03/HE1-L04-C02-A03-01.srt',
  };

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const getInputComponent = (index: number, width?: number) => {
    return (
      <Input
        textAlign='left'
        inputSize='x-small'
        ariaLabel={`${index}번 입력란`}
        value={cardData.p01.data[index].userAnswer}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput(e, index)}
        placeholder='내용을 넣어 주세요.'
        width={width ? `${width}px` : '280px'}
        maxLength={100}
        readOnly={cardData.p01.isSubmitted}
        status={
          !cardData.p01.isSubmitted && !isNotEmptyString(cardData.p01.data[index].userAnswer)
            ? InputStatus.DEFAULT
            : cardData.p01.isSubmitted && !cardData.p01.data[index].isCorrect
            ? InputStatus.ERROR
            : InputStatus.ENABLE
        }
      />
    );
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: cardData.p01.data.map((value, idx) => ({
        subKey: idx + 1,
        type: 'TEXT',
        value: '',
        isAnswer: true,
        isCorrect: false,
      })),
      isCorrect: false,
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p01.data.every(item => isAnswer(item.userAnswer, item.solution));
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          isSubmitted: true,
          isCorrect: isCorrect,
          data: prev.p01.data.map(item => ({ ...item, isCorrect: isAnswer(item.userAnswer, item.solution) })),
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: cardData.p01.data.map((item, idx) => ({
            subKey: idx + 1,
            type: 'TEXT',
            value: item.userAnswer,
            isAnswer: true,
            isCorrect: isAnswer(item.userAnswer, item.solution),
          })),
          isCorrect: isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setCardData(prev => ({
      ...prev,
      p01: { ...prev.p01, data: prev.p01.data.map((data, idx) => (index === idx ? { ...data, userAnswer: value } : data)) },
    }));
    changeData('P01', 1, index + 1, value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={onGrade}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.data.every(item => isNotEmptyString(item.userAnswer))}
      audioInfo={audioInfo}
      submitBtnColor={
        !cardData.p01.data.every(item => isNotEmptyString(item.userAnswer))
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BackgroundWrap>
        <Box hAlign='center' paddingTop='15px'>
          <Typography useGap={false} color='#ea7130' weight={'var(--font-weight-extraBold)'}>
            World Bee Day
          </Typography>
        </Box>
        <Content>
          <Box>
            <BoldText>Date :</BoldText> <Typography>(1)</Typography>
            {getInputComponent(0, 230)}
            &nbsp;
            {getInputComponent(1, 230)}
          </Box>
          <Box marginTop='10px'>
            <BoldText>Purpose</BoldText> : to inform people about the key roles of bees
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Question type='dot' size='small'>
              maintainging our (2)
            </Question>
            {getInputComponent(2)}
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Question type='dot' size='small'>
              contributing to a third of our (3)
            </Question>
            {getInputComponent(3, 230)}
            &nbsp;
            {getInputComponent(4, 230)}
          </Box>
          <br />
          <Box>
            <Typography style={{ fontStyle: 'italic', color: '#ea7a30' }}>Let’s remember their importance and protect them!</Typography>
          </Box>
        </Content>
      </BackgroundWrap>
      <BackgroundImage>
        <Image
          src={'/L04/C02/A03/HE1-L04-C02-A03-01.jpg'}
          alt='Save the Bees 라는 제목이 붙어 있고, 벌집에 벌이 몇 마리 있는 장식 그림'
          width='100%'
          height='400px'
        />
      </BackgroundImage>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              {cardData.p01.data.map((item, idx) => `(${idx + 1}) ${item.solution}\n`)}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const BackgroundWrap = styled.div`
  min-height: 400px;
  width: 100%;
`;

const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 400px;
  top: 10px;
  left: 40px;
  z-index: -1;
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
