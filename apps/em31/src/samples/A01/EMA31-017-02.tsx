import { useState } from 'react';

import { Box, IQuestionProps, Input, SvgIcon, Typography, TextView, BoxWrap, TextViewTitle, ETextViewColor } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '../../assets/icon/m_default_01.svg';

const EMA3101702 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='36px' /> &nbsp;
        <TextViewTitle title='보기' type={ETextViewColor.DEFAULT} />
        &nbsp;와 같이 ‘초’와 관련된 간단한 문장을 만들어 보세요.
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
          <TextView title='보기' height='78px'>
            <Typography align='center' useGap={false} fontSize='var(--font-size-32)'>
              요구르트 한 병을 마시는 데 15초 걸렸습니다.
            </Typography>
          </TextView>
        </Box>
        <Box>
          <Input
            type='text'
            value={answer}
            onChange={e => {
              setAnswer(e.target.value);
            }}
            width='920px'
            ariaLabel="초'와 관련된 간단한 문장을 만들어 적어주세요."
            height='80px'
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA3101702;
