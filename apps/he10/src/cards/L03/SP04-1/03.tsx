import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: 'to부정사(구)가 주어인 경우, 주어 자리에 가주어 it을 쓰고 to부정사(구)를 문장 뒤로 보내는 형태를 뜻한다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo}>
      <Box flexDirection='column' width='840px' height='280px' padding='28px' hAlign={''} background='white' useRound useShadow>
        <Box padding='8px 12px'>
          <Label type={'paint'} size={'xx-small'} background='var(--color-black)' />
          <Typography weight='700'>가주어-진주어 구문이란?</Typography>
        </Box>
        <List
          data={data}
          row={({ value }) => (
            <BoxWrap>
              <Box>
                <Label type={'paint'} size={'xx-small'} background='' />
              </Box>
              <Typography>{value?.text}</Typography>
            </BoxWrap>
          )}
        />
      </Box>
    </Container>
  );
};

export default P03;
