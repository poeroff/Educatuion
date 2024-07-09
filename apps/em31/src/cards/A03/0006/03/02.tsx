import styled from '@emotion/styled';
import { Box, IQuestionProps, Input, SvgIcon, Typography, InputStatus, EStyleButtonTypes, BottomSheet, Tag, ETagLine } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A03_0006_03 } from './store';
import usePageData from '@/hooks/usePageData';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

import hippo from '@/assets/icon/hippo.svg';
import zebra from '@/assets/icon/zebra.svg';
import deer from '@/assets/icon/deer.svg';
import elephant from '@/assets/icon/elephant.svg';
import koala from '@/assets/icon/koala.svg';
import giraffe from '@/assets/icon/giraffe.svg';
import cheetah from '@/assets/icon/cheetah.svg';
import lion from '@/assets/icon/lion.svg';
import rabbit from '@/assets/icon/rabbit.svg';
import panda from '@/assets/icon/panda.svg';
import sloth from '@/assets/icon/sloth.svg';
import tiger from '@/assets/icon/tiger.svg';

interface IAnimalCardProps {
  animalSvg: string;
  animalName: string;
  expression: string;
}

const P02 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0006_03);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        나눗셈의 몫을 구해 보세요.
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', '', '', '', '', '', '', '', ''],
          isCorrect: false,
        },
      ],
    },
  ];

  const animalCardTData: IAnimalCardProps[] = [
    {
      animalSvg: hippo,
      animalName: '하마',
      expression: '30÷5=',
    },
    {
      animalSvg: zebra,
      animalName: '얼룩말',
      expression: '14÷2=',
    },
    {
      animalSvg: deer,
      animalName: '사슴',
      expression: '28÷4=',
    },
    {
      animalSvg: elephant,
      animalName: '코끼리',
      expression: '27÷9=',
    },
    {
      animalSvg: koala,
      animalName: '코알라',
      expression: '12÷2=',
    },
    {
      animalSvg: giraffe,
      animalName: '기린',
      expression: '21÷3=',
    },
    {
      animalSvg: cheetah,
      animalName: '표범',
      expression: '9÷3=',
    },
    {
      animalSvg: lion,
      animalName: '사자',
      expression: '36÷6=',
    },
    {
      animalSvg: rabbit,
      animalName: '토끼',
      expression: '63÷9=',
    },
    {
      animalSvg: panda,
      animalName: '팬더',
      expression: '12÷4=',
    },
    {
      animalSvg: sloth,
      animalName: '나무늘보',
      expression: '24÷8=',
    },
    {
      animalSvg: tiger,
      animalName: '호랑이',
      expression: '48÷8=',
    },
  ];

  const handleInputChange = (str: string, index: number) => {
    const updatedAnswers = cardData.p02.answer1?.map((ans, idx) => (idx === index ? str : ans));
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: updatedAnswers } }));
    changeData('P02', 1, 1, cardData.p02.answer1);
  };

  const setInputStatus = (index: number) => {
    return cardData.p02.answer1?.[index] === '' || !isNotEmptyString(cardData.p02.answer1?.[index])
      ? InputStatus.DEFAULT
      : cardData.p02.isSubmitted && !isAnswer(cardData.p02.answer1?.[index], cardData.p02.solution1?.[index])
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const setSubmitBtnColor = () => {
    if (cardData.p02.answer1 && cardData.p02.answer1.every(val => val !== '')) {
      if (isShow && cardData.p02.isSubmitted) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    } else {
      return EStyleButtonTypes.SECONDARY;
    }
  };

  const setSubmitDisabled = () => {
    if (cardData.p02.answer1 && cardData.p02.answer1.every(val => val !== '')) return false;
    else return true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p02.answer1.join() === cardData.p02.solution1.join();
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer1,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p02.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
      useExtend
      useRound
    >
      <Box
        useFull
        display='grid'
        gridTemplateColumns='repeat(4, 1fr)'
        gap='24px'
        padding={'0'}
        alt='각각 다른 동물들이 그려져 있는 승객카드 12 장이 있습니다.'
      >
        {animalCardTData.map((value, index) => {
          return (
            <AnimalCard key={index} aria-label={`${value.animalName} (${value.expression.replace(/=/g, '')})`}>
              <SvgIcon src={value.animalSvg} width='55px' height='50px' />
              <Typography>{value.expression}</Typography>
              <Input
                name={'value' + index}
                width='52px'
                value={cardData.p02.answer1?.[index]}
                onChange={e => handleInputChange(e.target.value, index)}
                maxLength={1}
                status={setInputStatus(index)}
                ariaLabel={value.expression.replace(/=/g, '') + '의 값'}
              />
            </AnimalCard>
          );
        })}
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            <Box display='flex' flexDirection='column' marginTop={10}>
              <Typography>6, 7, 7, 3</Typography>
              <Typography>6, 7, 3, 6</Typography>
              <Typography>7, 3, 3, 6</Typography>
            </Box>
          </Box>
          <Box marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label={'해석'} />
            </Box>
            <Box display='flex' flexDirection='column' marginTop={10}>
              <Typography>30÷5＝6, 14÷2＝7, 28÷4＝7, 27÷9＝3</Typography>
              <Typography>12÷2＝6, 21÷3＝7, 9÷3＝3, 36÷6＝6</Typography>
              <Typography>63÷9＝7, 12÷4＝3, 24÷8＝3, 48÷8＝6</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const AnimalCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 232px;
  height: 123px;
  padding: 16px 8px;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-white);
  border-radius: 16px;
  box-shadow: 0px 2px 16px 0px #65738f1f;
`;

export default P02;
