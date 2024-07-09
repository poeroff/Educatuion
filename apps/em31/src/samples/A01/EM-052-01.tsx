import { useState } from 'react';

import { Image, Box, Label, Typography, Input, IQuestionProps, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM05201 = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='17' type='icon' />
        공책 34권을 3명에게 똑같이 나누어 주려고 합니다. ㉠, ㉡에 알맞은 수를 구해 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='center'
      useRound
    >
      <Box vAlign='center' flexDirection='column'>
        <Image
          src='../../assets/example/EM-052-01/DJC410008.png'
          alt='10권씩 3묶음과 낱개로 4권이 있는 책 그림입니다.'
          width='377px'
          height='102px'
        />
        <Box width='519px' marginTop={24} padding='24px' type='dashed' useRound>
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
            한 명에게&nbsp;
            <Box display='inline-block' border='1px solid var(--color-grey-600)' textAlign='center' width='98px' padding='6px 12px' borderRadius={8}>
              <Label value='ㄱ' />
            </Box>
            권씩 나누어 줄 수 있고,&nbsp;
            <Box display='inline-block' border='1px solid var(--color-grey-600)' textAlign='center' width='98px' padding='6px 12px' borderRadius={8}>
              <Label value='ㄴ' />
            </Box>
            권이 남았습니다.
          </Typography>
        </Box>
        <Box vAlign='center' marginTop='24px'>
          <Box>
            <Label value='ㄱ' />
            <Input width='98px' ariaLabel='ㄱ 답의 입력란' marginLeft={8} value={value1} onChange={e => setValue1(e.target.value)} />
          </Box>
          <Typography>,</Typography>
          <Box>
            <Label value='ㄴ' />
            <Input width='98px' ariaLabel='ㄴ 답의 입력란' marginLeft={8} value={value2} onChange={e => setValue2(e.target.value)} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM05201;
