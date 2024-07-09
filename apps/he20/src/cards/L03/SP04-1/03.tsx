import { Container } from '@maidt-cntn/ui/en';
import { BoxWrap, Box, List, Label, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
    headerPattern: 'text',
  };
  const data = [
    {
      text: '관계대명사와 관계부사의 계속적 용법은 <콤마(,)+관계사>의 형태로, 선행사에 대한 부가적인 정보를 나타내는 것을 말한다.',
    },
    {
      text: '콤마 앞의 명사 또는 앞절 전체를 선행사로 할 수 있다.',
    },
    {
      text: '관계대명사 that은 계속적 용법으로 쓸 수 없다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo}>
      <Box flexDirection='column' width='840px' height='' padding='28px' hAlign={''} background='white' useRound useShadow>
        <Box padding='8px 12px'>
          <Label type={'paint'} size={'xx-small'} background='var(--color-black)' />
          <Typography weight='700'>관계사의 계속적 용법이란?</Typography>
        </Box>
        <List
          data={data}
          row={({ value }) => (
            <BoxWrap>
              <Box>
                <Label type={'paint'} size={'xxx-small'} background={'black'} />
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
