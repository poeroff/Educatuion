import { useState } from 'react';

import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Image,
  Label,
  TBody,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IData {
  diceImg: string;
  text: string;
  altDice?: string;
  animals: string[];
  altAnimals?: string;
}

const ME12702 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meFunActivity',
    headerText: 'B',
  };

  const questionInfo: IQuestionProps = {
    text: '주사위를 두 번 던져서 나오는 숫자에 맞게 짝의 미래 직업과 반려 동물을 말해 봅시다.',
  };

  const data: IData[] = [
    {
      diceImg: '/example/ME-127-02/ME1-L04-C09-A07-01.png',
      text: 'doctor',
      animals: ['/example/ME-127-02/ME1-L04-C09-A07-07.png'],
      altDice: '주사위 숫자 1',
      altAnimals: '강아지 한 마리',
    },
    {
      diceImg: '/example/ME-127-02/ME1-L04-C09-A07-02.png',
      text: 'astronaut',
      animals: ['/example/ME-127-02/ME1-L04-C09-A07-08.png'],
      altDice: '주사위 숫자 2',
      altAnimals: '고양이 한 마리',
    },
    {
      diceImg: '/example/ME-127-02/ME1-L04-C09-A07-03.png',
      text: 'teacher',
      animals: [
        '/example/ME-127-02/ME1-L04-C09-A07-07.png',
        '/example/ME-127-02/ME1-L04-C09-A07-07.png',
        '/example/ME-127-02/ME1-L04-C09-A07-07.png',
      ],
      altDice: '주사위 숫자 3',
      altAnimals: '강아지 세 마리',
    },
    {
      diceImg: '/example/ME-127-02/ME1-L04-C09-A07-04.png',
      text: 'tennis player',
      animals: ['/example/ME-127-02/ME1-L04-C09-A07-08.png'],
      altDice: '주사위 숫자 4',
      altAnimals: '고양이 한 마리',
    },
    {
      diceImg: '/example/ME-127-02/ME1-L04-C09-A07-05.png',
      text: 'artist',
      animals: ['/example/ME-127-02/ME1-L04-C09-A07-08.png', '/example/ME-127-02/ME1-L04-C09-A07-08.png'],
      altDice: '주사위 숫자 5',
      altAnimals: '고양이 두 마리',
    },
    {
      diceImg: '/example/ME-127-02/ME1-L04-C09-A07-06.png',
      text: 'writer',
      animals: ['/example/ME-127-02/ME1-L04-C09-A07-07.png'],
      altDice: '주사위 숫자 6',
      altAnimals: '강아지 한 마리',
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='start'
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap marginLeft='193px' height='24px' alignItems='center'>
        <Box position='relative' zIndex={2}>
          <Typography fontSize='16px' lineHeight='24px'>
            1st roll
          </Typography>
          <IconWrapper>
            <Image src='/example/ME-127-02/arrow.png' />
          </IconWrapper>
        </Box>
        <Box position='relative' zIndex={2} marginLeft='50px'>
          <Typography fontSize='16px' lineHeight='24px'>
            2nd roll
          </Typography>
          <IconWrapper>
            <Image src='/example/ME-127-02/arrow.png' />
          </IconWrapper>
        </Box>
      </BoxWrap>
      <BoxWrap position='relative'>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['150px', '150px', '150px']}>
          <THead>
            <TH scope='col'></TH>
            <TH scope='col'>
              <Typography fontSize='22px' lineHeight='32px' fontWeight='700'>
                Job
              </Typography>
            </TH>
            <TH scope='col'>
              <Typography fontSize='22px' lineHeight='32px' fontWeight='700'>
                Pet
              </Typography>
            </TH>
          </THead>
          <TBody>
            {data.map((item, index) => {
              return (
                <TR key={index}>
                  <TD type='main'>
                    <BoxWrap alignItems='center' justifyContent='center'>
                      <Image src={item.diceImg} alt={item.altDice} />
                    </BoxWrap>
                  </TD>
                  <TD>
                    <Typography fontSize='22px' lineHeight='32px'>
                      {item.text}
                    </Typography>
                  </TD>
                  <TD>
                    <BoxWrap boxGap={0} justifyContent='center'>
                      {item.animals.map((value, valueIndex) => {
                        return <Image key={valueIndex} src={value} alt={item.altAnimals} />;
                      })}
                    </BoxWrap>
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
        <Box width={446} display='flex' flexDirection='column'>
          <Box>
            <Label
              size='number'
              type='line'
              marginRight={11}
              marginLeft={11}
              background='var(--color-blue-100)'
              cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
            >
              <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
                A
              </Typography>
            </Label>
            <Typography fontSize='28px'>Tell me about my future.</Typography>
          </Box>
          <BoxWrap marginTop={8}>
            <Label
              size='number'
              type='line'
              marginRight={11}
              marginLeft={11}
              background='var(--color-yellow-100)'
              cssStyle={{ border: 0, marginTop: '5px', minWidth: '38px', height: '38px' }}
            >
              <Typography useGap={false} weight='var(--font-weight-bold)' fontSize='var(--font-size-24)' align='center' lineHeight='42px'>
                B
              </Typography>
            </Label>
            <Box>
              <Typography fontSize='28px'>One. You'll be a doctor.</Typography>
              <Typography fontSize='28px'>Five. You'll have two cats.</Typography>
              <Typography fontSize='28px'>Your future will be wonderful.</Typography>
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default ME12702;

const IconWrapper = styled.div`
  position: absolute;
  right: -25px;
  bottom: -26px;
`;

const TH = styled.th`
  display: table-cell;
  vertical-align: middle;
  height: 48px;
  background: var(--color-green-100);
`;

const TD = styled.td<{ type?: string }>`
  position: relative;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 48px;
  background: ${({ type }) => (type == 'main' ? 'var(--color-green-100); padding-inline: 29px;' : 'var(--color-white)')};
`;
