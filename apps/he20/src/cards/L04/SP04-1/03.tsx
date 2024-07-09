import { Box, Label, List, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = ({ _page = 'P03' }: { _page?: string }) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 주요 내용 이해하기',
  };

  const data = [
    {
      text: '동격의 접속사 that 은 앞에 나온 명사를 부연 설명하는 동격절을 이끈다.',
    },
    {
      text: '동격의 that 뒤에는 완전한 절이 온다는 점에서 관계대명사와 차이가 있다.',
    },
  ];

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start'>
      <Box vAlign='start' flexDirection='column' padding='10px 0' marginTop='24px'>
        <Box vAlign='center' marginBottom='60px'>
          <Box padding='26px 10px'>
            <Label background='var(--color-blue-500)' type='paint' size='xx-small' />
          </Box>
          <Typography fontSize='32px' lineHeight='48px' weight='var(--font-weight-bold)'>
            동격의 that
          </Typography>
        </Box>
        <List
          gap={30}
          data={data}
          row={({ value }) => (
            <Box vAlign='flex-start'>
              <Box padding='4px 12px' marginRight='8px'>
                <Label background='var(--color-black)' type='paint' size='xxx-small' />
              </Box>
              <Typography>{value?.text}</Typography>
            </Box>
          )}
        />
      </Box>
    </Container>
  );
};

export default P03;
