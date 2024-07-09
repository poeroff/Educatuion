import { useState } from 'react';
import styled from '@emotion/styled';

import { Box, IQuestionProps, Input, SvgIcon, Typography, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '../../assets/icon/m_default_01.svg';

interface IAnimalCardProps {
  animalType: string;
  expression: string;
}

const EM03403 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        나눗셈의 몫을 구해 보세요.
      </>
    ),
  };

  const animalCardTData: IAnimalCardProps[] = [
    {
      animalType: 'hippo',
      expression: '30÷5=',
    },
    {
      animalType: 'zebra',
      expression: '14÷2=',
    },
    {
      animalType: 'deer',
      expression: '28÷4=',
    },
    {
      animalType: 'elephant',
      expression: '27÷9=',
    },
    {
      animalType: 'koala',
      expression: '12÷2=',
    },
    {
      animalType: 'giraffe',
      expression: '21÷3=',
    },
    {
      animalType: 'cheetah',
      expression: '9÷3=',
    },
    {
      animalType: 'lion',
      expression: '36÷6=',
    },
    {
      animalType: 'rabbit',
      expression: '63÷9=',
    },
    {
      animalType: 'panda',
      expression: '12÷4=',
    },
    {
      animalType: 'sloth',
      expression: '24÷8=',
    },
    {
      animalType: 'tiger',
      expression: '48÷8=',
    },
  ];

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      useExtend
      useRound
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box useFull display='grid' gridTemplateColumns='repeat(4, 1fr)' gap='24px' padding={'0'}>
        {animalCardTData.map((value, index) => {
          return (
            <AnimalCard key={index}>
              <Image src={`/icon/${value.animalType}.svg`} alt={''} width='55px' height='50px' />
              <Typography>{value.expression}</Typography>
              <Input width='52px' value={answer} onChange={e => setAnswer(e.target.value)} maxLength={2} />
            </AnimalCard>
          );
        })}
      </Box>
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

export default EM03403;
