import { Box, BoxWrap, Drawing, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import { useState } from 'react';

const EMA01001 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [value, setvalue] = useState<string>();

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathDescriptive',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        정환이가 수학 문제를 하루에 21개씩 4일 동안 풀었습니다. 승호는 정환이가 푼 수학 문제를 똑같이 나누어 3일 동안 풀려고 합니다. 승호는 수학
        문제를 하루에 몇 개씩 풀어야 하는지 풀이 과정을 쓰고 답을 구해 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box useFull>
        <BoxWrap height={66}>
          <Box marginRight='8px' marginTop={12} width={36} height={36}>
            <Typography
              useGap={false}
              fontSize='var(--font-size-28)'
              color='var(--color-yellow-800)'
              weight='var(--font-weight-semiBold)'
              align='center'
            >
              &nbsp;1
            </Typography>
          </Box>
          <Box marginTop={12}>
            <Typography useGap={false} fontSize='var(--font-size-28)' weight='var( --font-weight-medium)'>
              정환이가 푼 수학 문제는 몇 개인가요?
            </Typography>
          </Box>
        </BoxWrap>

        <Box marginTop={-16} paddingBottom={20}>
          <BoxWrap>
            <Box marginRight='10px' paddingTop={40} display='inline-flex' fontSize='var(--font-size-28)'>
              <Label
                value='&nbsp;풀이&nbsp;'
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
              />
            </Box>
            <Box height='324px' flex={1}>
              <Drawing />
            </Box>
          </BoxWrap>
          <Box display='flex' justifyContent='right' alignItems='center' paddingTop='24px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              marginLeft={8}
              width='130px'
              onChange={e => {
                setvalue(e.target.value);
              }}
              value={value}
              ariaLabel='정환이가 푼 문제 수를 적어주세요.'
            />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EMA01001;
