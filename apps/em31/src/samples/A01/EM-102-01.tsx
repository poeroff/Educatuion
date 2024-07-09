import { useState } from 'react';
import { Box, IQuestionProps, Label, Image, Radio, Typography, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM10201 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='4' type='icon' />
        길이를 재어 보세요.
      </>
    ),
  };

  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='flex-start'
    >
      <Box>
        <Box hAlign='center'>
          <Box vAlign='center' marginRight='76px'>
            <Image src='/example/EM-102-01/MC31531.png' width='154px' height='94px' alt='콩이 있습니다.' />
            <Input placeholder='' name={`value`} value={value} onChange={e => setValue(e.target.value)} width='52px' ariaLabel={`답 입력란`} />
            <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
              mm
            </Typography>
          </Box>
          <Box vAlign='center' flexDirection='column'>
            <Image src='/example/EM-102-01/MC31532.png' width='339px' height='171px' alt='자석이 있습니다.' />
            <Box position='relative' left='0' top='-30px'>
              <Input placeholder='' name={`value2`} value={value2} onChange={e => setValue2(e.target.value)} width='98px' ariaLabel={`답 입력란`} />
              <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
                mm
              </Typography>
            </Box>
          </Box>
          <Box position='relative' top='-65px' marginLeft='17px' type='paint' backgroundColor='#D9D9D9' width='94px' height='94px' vAlign='center'>
            자 교구
          </Box>
        </Box>
        <Box hAlign='center' flexDirection='column' marginTop='12px'>
          <Image src='/example/EM-102-01/MC31533-1.png' width='738px' height='146px' alt='볼펜이 있습니다.' />
          <Box position='relative' left='-30px' top='-30px'>
            <Input placeholder='' name={`value3`} value={value3} onChange={e => setValue3(e.target.value)} width='98px' ariaLabel={`답 입력란`} />
            <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
              cm
            </Typography>
            <Input placeholder='' name={`value4`} value={value4} onChange={e => setValue4(e.target.value)} width='52px' ariaLabel={`답 입력란`} />
            <Typography fontSize='var(--font-size-28)' weight='var(--font-weight-medium)'>
              mm
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM10201;
