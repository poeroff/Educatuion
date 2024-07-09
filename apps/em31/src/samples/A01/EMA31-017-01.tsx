import { useState } from 'react';

import { Box, IQuestionProps, Input, SvgIcon, Typography, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '../../assets/icon/m_default_01.svg';

const EMA3101702 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='36px' />
        &nbsp;길이의 단위를 골라 간단한 문장을 만들어 보세요.
      </Box>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='start'
    >
      <BoxWrap flexDirection='column' gap={24}>
        <Box hAlign='center'>
          <Box hAlign='center' width='684px' height='74px' gap={40} border='2px solid var( --color-yellow-300)' useRound={true}>
            <Typography align='center' fontSize='var(--font-size-32)'>
              mm
            </Typography>
            <Typography align='center' fontSize='var(--font-size-32)'>
              cm
            </Typography>
            <Typography align='center' fontSize='var(--font-size-32)'>
              mm
            </Typography>
            <Typography align='center' fontSize='var(--font-size-32)'>
              m
            </Typography>
            <Typography align='center' fontSize='var(--font-size-32)'>
              km
            </Typography>
          </Box>
        </Box>

        <Box>
          <Input
            type='text'
            value={answer}
            onChange={e => {
              setAnswer(e.target.value);
            }}
            width='920px'
            ariaLabel="'길이의 단위'를 골라 간단한 문장을 만들어 적어주세요."
            height='80px'
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA3101702;
