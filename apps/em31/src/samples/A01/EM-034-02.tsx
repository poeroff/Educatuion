import styled from '@emotion/styled';

import { Box, IQuestionProps, Image, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '../../assets/icon/m_default_01.svg';
import { useState } from 'react';
import { css } from '@emotion/react';

interface IAnimalCardProps {
  animalType: string;
  alt: string;
  expression: string;
}

const EM03402 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        기차 앞에 적힌 수가 몫인 승객을 태워 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);

  const animalCardTData: IAnimalCardProps[] = [
    {
      animalType: 'hippo',
      alt: '하마',
      expression: '30÷5',
    },
    {
      animalType: 'zebra',
      alt: '얼룩말',
      expression: '14÷2',
    },
    {
      animalType: 'deer',
      alt: '사슴',
      expression: '28÷4',
    },
    {
      animalType: 'elephant',
      alt: '코끼리',
      expression: '27÷9',
    },
    {
      animalType: 'koala',
      alt: '코알라',
      expression: '12÷2',
    },
    {
      animalType: 'giraffe',
      alt: '기린',
      expression: '21÷3',
    },
    {
      animalType: 'cheetah',
      alt: '치타',
      expression: '9÷3',
    },
    {
      animalType: 'lion',
      alt: '사자',
      expression: '36÷6',
    },
    {
      animalType: 'rabbit',
      alt: '토끼',
      expression: '63÷9',
    },
    {
      animalType: 'panda',
      alt: '판다',
      expression: '12÷4',
    },
    {
      animalType: 'sloth',
      alt: '나무늘보',
      expression: '24÷8',
    },
    {
      animalType: 'tiger',
      alt: '호랑이',
      expression: '48÷8',
    },
  ];

  const [clickSeedlingsButtons, setClickSeedlingsButtons] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setClickSeedlingsButtons(index);
  };

  const [train, setTrain] = useState<number[]>([0, 1, 2, 3]); // 임시로 값을 넣어놓음
  const [trainButtonClick, setTrainButtonClick] = useState<number | null>(null);
  const hendleTrainButtonClick = (index: number) => {
    setTrainButtonClick(index);
  };

  return (
    <Container
      vAlign='flex-start'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useExtend
      useRound
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useScroll={false}
    >
      <Box display='flex' justifyContent='center'>
        <Box display='grid' gridTemplateColumns='repeat(4, 1fr)' gap={'12px 24px'} padding='0'>
          {animalCardTData.map((value, index) => {
            return (
              <AnimalCard key={index} type='button' onClick={() => handleClick(index)} state={clickSeedlingsButtons === index ? 'active' : undefined}>
                <Image src={`/icon/${value.animalType}.svg`} alt={value.alt} width='60px' height='55px' />
                <Typography>{value.expression}</Typography>
              </AnimalCard>
            );
          })}
        </Box>
        <Box position='absolute' bottom='10px' left='-40px' right='-40px'>
          <Box zIndex={1} position='relative' display='flex' alignItems='center' justifyContent='center'>
            <Box marginBottom='20px' position='relative'>
              <Image src='/example/EM-034-02/red_train.png' alt='빨간색 기차' width='643px' height='140px' />
              {/* 
              <Image src='/example/EM-034-02/yellow_train.png' alt='노란색 기차' width='643px' height='140px'/>
              <Image src='/example/EM-034-02/blue_train.png' alt='파란색 기차' width='643px' height='140px'/>
              */}

              <Box position='absolute' left='95px' top='44px' display='flex'>
                <HiddenText>기차의 몫은</HiddenText>3 {/* 기차에 들어가는 번호 입니다 */}
              </Box>
            </Box>

            <Box position='absolute' left='396px' top='42px' display='flex' gap={59}>
              {train.map((value, index = 1) => (
                <TrainButton key={`train-item-${index}`} isClick={index - 1 === trainButtonClick} onClick={() => hendleTrainButtonClick(index - 1)}>
                  {value !== 0 && (
                    <Image
                      src={`/icon/${animalCardTData[value + 1].animalType}.svg`}
                      alt={animalCardTData[value + 1].alt}
                      width='60px'
                      height='55px'
                    />
                  )}
                </TrainButton>
              ))}
            </Box>
          </Box>
          <Box position='absolute' bottom='0px' left='0px' right='0px' zIndex={-1}>
            <Image src={'/example/EM-034-02/rail.png'} alt='' width='100%' height='61px' />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

// 동물 셈 버튼에 올라갔을 시 투명색으로 변하게 => disabled
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
  width: 66px;
  height: 72px;
  border-radius: 16px;
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

export default EM03402;
