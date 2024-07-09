import styled from '@emotion/styled';
import { Box, IQuestionProps, Image, ESvgType, SvgIcon, Typography, EStyleButtonTypes, BottomSheet, Tag, ETagLine } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { css } from '@emotion/react';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A03_0006_03 } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

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

const P03 = () => {
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
        기차 앞에 적힌 수가 3 인 승객을 태워 보세요 .
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [-1, -1, -1, -1],
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

  const [clickedAnimalIndex, setClickedAnimalIndex] = useState<number>(-1);

  const handleClickAnimal = (index: number) => {
    setClickedAnimalIndex(index);
    setClickedTrainIndex(-1);
  };

  const [clickedTrainIndex, setClickedTrainIndex] = useState<number>(-1);

  const handleClickTrainButton = (index: number) => {
    setClickedTrainIndex(index);

    const newTrain = [...cardData.p03.answer1];
    newTrain[index] = clickedAnimalIndex;

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: newTrain } }));
    changeData('P03', 1, 1, cardData.p03.answer1);

    setClickedAnimalIndex(-1);
  };

  const setSubmitBtnColor = () => {
    if (cardData.p03.answer1 && cardData.p03.answer1.every(val => val !== -1)) {
      if (isShow && cardData.p03.isSubmitted) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    } else {
      return EStyleButtonTypes.SECONDARY;
    }
  };

  const setSubmitDisabled = () => {
    if (cardData.p03.answer1 && cardData.p03.answer1.every(val => val !== -1)) return false;
    else return true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    setClickedAnimalIndex(-1);
    setClickedTrainIndex(-1);
    const isCorrect = cardData.p03.solution1.every(answer => cardData.p03.answer1.includes(answer));

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p03.answer1,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P03', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const setTrainAriaLabel = () => {
    if (cardData.p03.answer1.every(val => val === -1)) return '빨간색 기차';

    let labelText = '빨간색 기차에 ';
    for (let i = 0; i < 4; i++) {
      if (cardData.p03.answer1[i] !== -1) {
        labelText += animalCardTData[cardData.p03.answer1[i]].animalName + ' ';
      }
    }
    labelText.substring(0, labelText.length - 1);
    labelText += '동물이 있습니다.';
    return labelText;
  };

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={cardData.p03.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
      useExtend
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box display='grid' gridTemplateColumns='repeat(4, 1fr)' gap={'12px 24px'} padding='0'>
          {animalCardTData.map((value, index) => {
            return (
              <AnimalCard
                key={index}
                type='button'
                onClick={() => handleClickAnimal(index)}
                state={cardData.p03.answer1.includes(index) ? 'disabled' : clickedAnimalIndex === index ? 'active' : undefined}
                disabled={cardData.p03.isSubmitted || cardData.p03.answer1.includes(index)}
                aria-label={
                  `${value.animalName} (${value.expression.replace(/=/g, '')})` +
                  (clickedAnimalIndex === index ? ', 선택됨' : cardData.p03.answer1.includes(index) ? ', 선택 불가능' : ', 선택 가능')
                }
                title='엔터키를 입력하고 원하는 빨간색 기차 칸을 선택해주세요.'
              >
                <SvgIcon type={ESvgType.IMG} src={value.animalSvg} width='60px' height='55px' />
                <Typography>{value.expression}</Typography>
              </AnimalCard>
            );
          })}
        </Box>

        <Box position='absolute' bottom='37px' left='-40px' right='-40px'>
          <Box zIndex={1} position='relative' display='flex' alignItems='center' justifyContent='center'>
            <Box marginBottom='20px' position='relative'>
              <Image src='/A03/0006/03/A-EM31-030006-0303.png' alt={setTrainAriaLabel()} width='623px' height='120px' />
              <Box position='absolute' left='92px' top='38px' display='flex'>
                <HiddenText>기차의 몫은</HiddenText>3
              </Box>
            </Box>

            <Box position='absolute' left='401px' top='37px' display='flex' gap={61}>
              {cardData.p03.answer1.map((value, index = 1) => (
                <TrainButton
                  key={`train-item-${index}`}
                  isClick={index === clickedTrainIndex}
                  onClick={() => handleClickTrainButton(index)}
                  aria-label={`빨간색 기차의 ${index + 1}번째 칸` + (value !== -1 ? `, ${animalCardTData[value].animalName} 동물이 있어요` : '')}
                  disabled={cardData.p03.isSubmitted}
                >
                  {value !== -1 && <SvgIcon type={ESvgType.IMG} src={animalCardTData[value].animalSvg} width='55px' height='55px' />}
                </TrainButton>
              ))}
            </Box>
          </Box>
          <Box position='absolute' bottom='0px' left='0px' right='0px' zIndex={-1}>
            <Image src={'/example/EM-034-02/rail.png'} alt='' width='100%' height='61px' />
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' marginTop={180} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            <Box marginTop={10}>
              <Image
                src='/A03/0006/03/A-EM31-030006-0303.png'
                height='100px'
                width='486px'
                alt='빨간 기차에 코끼리, 표범, 판다, 나무늘보가 있습니다.'
              />
              <Box zIndex={1} left={165} top={590} position='absolute' display='flex' gap={49}>
                <SvgIcon type={ESvgType.IMG} src={elephant} width='45px' height='45px' />
                <SvgIcon type={ESvgType.IMG} src={cheetah} width='45px' height='45px' />
                <SvgIcon type={ESvgType.IMG} src={panda} width='45px' height='45px' />
                <SvgIcon type={ESvgType.IMG} src={sloth} width='45px' height='45px' />
              </Box>
            </Box>
          </Box>
          <Box marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop={10}>
              <Typography>코끼리(27÷9=3), 표범(9÷3=3), 판다(12÷4=3), 나무늘보(24÷8=3)입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const AnimalCard = styled.button<{ state?: 'active' | 'disabled' }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 212px;
  height: 88px;
  padding: 16px 12px;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-white);
  border-radius: 16px;
  box-shadow: 0px 2px 16px 0px #65738f1f;

  ${({ state }) =>
    state === 'active' &&
    `
      padding: 23px 25px;
      border: 2px solid #1E6EFA;
      background: var(--color-blue-50);
    `}

  ${({ state }) =>
    state === 'disabled' &&
    `
      opacity : 20%;
    `}
`;

const HiddenText = styled.span`
  visibility: hidden;
  display: inline-block;
  width: 0;
  height: 0;
`;

const TrainButton = styled.button<{ isClick: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 11px;
  background-color: var(--color-white);

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isClick }) =>
    isClick &&
    css`
      border: 2px solid #1e6efa;
      background: var(--color-blue-50);
    `}
`;

export default P03;
