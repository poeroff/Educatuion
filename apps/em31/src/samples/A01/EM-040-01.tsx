import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Label, Box, Typography, IQuestionProps, TMainHeaderInfoTypes, BoxWrap, Image, Input } from '@maidt-cntn/ui';

const EM04001 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPreview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        색연필과 끈의 길이를 써 보세요.
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <Box width='705px' type='dashed' useRound padding='24px'>
        <BoxWrap boxGap={40} alignItems='flex-end'>
          <Box>
            <Image src={'/example/EM-040-01/EC31501.png'} width='496px' alt='한 칸에 1센치미터인 10센치미터 자에 색연필 길이는 9칸이다.' />
          </Box>
          <Box>
            <Input width='52px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel={'센치미터의 길이를 써보세요.'} />
            <Typography>cm</Typography>
          </Box>
        </BoxWrap>
      </Box>
      <Box width='779px' type='dashed' useRound marginTop='24px' padding='24px'>
        <BoxWrap boxGap={40} alignItems='flex-end'>
          <Box>
            <Image
              src={'/example/EM-040-01/EC31540_1.png'}
              width='425px'
              alt='한 칸에 10센치미터인 170센치미터 자에 끈의 길이는 16칸이다.(100센치미터는 1미터이다.) '
            />
          </Box>
          <Box>
            <Input width='52px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel={'미터의 길이를 써보세요.'} />
            <Typography>m</Typography>
            <Input width='98px' value={value3} onChange={e => setValue3(e.target.value)} ariaLabel={'센치미터의 길이를 써보세요.'} />
            <Typography>cm</Typography>
          </Box>
        </BoxWrap>
      </Box>
    </Container>
  );
};

export default EM04001;
