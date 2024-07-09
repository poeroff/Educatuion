import { useState } from 'react';
import { IQuestionProps, SvgIcon, Box, BoxWrap, Input, Image, EImageType, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '@maidt-cntn/assets/icons/m_default_01.svg';

const EMA01401 = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        빈칸에 알맞은 수에 써넣으세요.
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background='var(--color-white)' useRound>
      <Box hAlign='center'>
        <Image type={EImageType.IMG_BG} src='/example/EMA-014-01/EC32306_math.png' width='304px' height='132px' alt=''>
          <Box height='100px' vAlign='center' hAlign='center'>
            <Typography>&divide;3</Typography>
          </Box>
        </Image>
      </Box>
      <Box hAlign='center'>
        <Image type={EImageType.IMG_BG} src='/example/EMA-014-01/EC32306_box.png' width='474px' height='165px' alt=''>
          <BoxWrap height='82px' justifyContent='space-between'>
            <Box width='175px' vAlign='center' hAlign='center'>
              <Typography>60</Typography>
            </Box>
            <Box vAlign='center' hAlign='center' padding='0 15px'>
              <Input type='number' value={value1} width='148px' onChange={e => setValue1(e.target.value)} ariaLabel='60/3의 답을 입력해주세요.' />
            </Box>
          </BoxWrap>
          <BoxWrap height='82px' justifyContent='space-between'>
            <Box width='175px' vAlign='center' hAlign='center'>
              <Typography>90</Typography>
            </Box>
            <Box vAlign='center' hAlign='center' padding='0 15px'>
              <Input type='number' value={value2} width='148px' onChange={e => setValue2(e.target.value)} ariaLabel='90/3의 답을 입력해주세요.' />
            </Box>
          </BoxWrap>
        </Image>
      </Box>
    </Container>
  );
};

export default EMA01401;
