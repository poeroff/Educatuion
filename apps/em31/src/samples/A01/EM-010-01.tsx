import { useState } from 'react';
import { Box, Label, Typography, Image, EStyleFontSizes, Input, TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM01001 = () => {
  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box>
        드론은 산불을 예방하거나 불을 끄는 데에도 사용되고 있습니다. 어느 소방 본부에 감시 드론이 112 대, 산불{' '}
        <Typography color='var(--color-blue-400)' fontSize='36px' useGap={false}>
          진화*
        </Typography>
        드론이 124대 있다면 드론은 모두 몇 대인가요?
      </Box>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <Box useFull tabIndex={101}>
        <Box vAlign='center' flexDirection='column'>
          <Image src='/example/EM-010/MA31101-1.png' alt='드론이 날고 있는 모습' width='234px' height='176px' />
          <Typography size={EStyleFontSizes['X-MEDIUM']} weight={'var(--font-weight-semiBold)'} color={'var(--color-blue-400)'}>
            *진화:불이 난 것을 끔.
          </Typography>
        </Box>
        <Box hAlign='center' marginTop='20px' flexDirection='column'>
          <Box vAlign='center'>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input marginLeft={8} width='292px' value={value} onChange={e => setValue(e.target.value)} />
          </Box>
          <Box vAlign='center' marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input marginLeft={8} width='245px' value={value2} onChange={e => setValue2(e.target.value)} />
            <Typography>대</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM01001;
