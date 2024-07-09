import { useEffect, useState } from 'react';
import {
  Box,
  Dropdown,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  Typography,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
  IAudioPlayerProps,
  Question,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L04C02A03b } from './store';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C02A03b);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Listen to the dialogue and fill in the blanks using the words in the box.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C02/A03/HE1-L04-C02-A03-01.mp3',
    captionSrc: '/L04/C02/A03/HE1-L04-C02-A03-01.srt',
  };

  const currentPage = 'P01';

  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);

  const getDropdownComponent = (index: number) => {
    return (
      <Dropdown
        type={index === 0 ? 'down' : 'up'}
        width='211px'
        dropdownList={cardData.p01.dropArr}
        isOpen={openDropdown[index]}
        selectedValue={cardData.p01.answer[index]}
        isError={cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[index] ?? '', cardData.p01.solution[index])}
        disabled={cardData.p01.isSubmitted}
        onClick={value => handleDropdownClick(index, value)}
        ariaLabel={`${index + 1}번 답란`}
      />
    );
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }

    const isCorrect = Array.isArray(cardData.p01.answer) && cardData.p01.answer.every((item, idx = 0) => item === cardData.p01.solution[idx]);

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    if (value === undefined) return;
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.p01.answer.map((item, idx) => (idx === index ? value : item));
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData(currentPage, 1, 1, updatedAnswers);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={Array.isArray(cardData.p01.answer) && cardData.p01.answer.some(item => !isNotEmptyString(item ?? ''))}
      submitBtnColor={
        Array.isArray(cardData.p01.answer) && cardData.p01.answer.some(item => !isNotEmptyString(item ?? ''))
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      vAlign='flex-start'
    >
      <BackgroundWrap>
        <Box hAlign='center' paddingTop='15px'>
          <Typography useGap={false} color='#ea7130' weight={'var(--font-weight-extraBold)'}>
            World Bee Day
          </Typography>
        </Box>
        <Content>
          <Box hAlign='flex-start'>
            <BoldText>Date :</BoldText> <Typography>(1)</Typography>
            {getDropdownComponent(0)}
            <Typography>20th</Typography>
          </Box>
          <Box marginTop='10px'>
            <BoldText>Purpose</BoldText> : to inform people about the key roles of bees
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Question type='dot' size='small'>
              maintainging our (2)
            </Question>
            {getDropdownComponent(1)}
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Question type='dot' size='small'>
              contributing to a third of our (3)
            </Question>
            {getDropdownComponent(2)}
            <Typography> production</Typography>
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
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {cardData.p01.solution.map((item, idx) => `(${idx + 1}) ${item}\n`)}
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
