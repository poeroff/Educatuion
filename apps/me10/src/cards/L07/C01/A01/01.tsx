import { TMainHeaderInfoTypes, BoxWrap, Box, Label, Typography, List } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color?: string;
}

const dataTop: IListenAndAnswer[] = [
  {
    type: 'A',
    content: <>Do you know about Machu Picchu?</>,
    color: 'var(--color-blue-100)',
  },
  {
    type: 'B',
    content: <>I don't know much about it.</>,
    color: 'var(--color-yellow-100)',
  },
];

const dataBottom: IListenAndAnswer[] = [
  {
    type: 'A',
    content: <>Can you tell me more about it?</>,
    color: 'var(--color-blue-100)',
  },
  {
    type: 'B',
    content: <>Sure. It means "old mountain."</>,
    color: 'var(--color-yellow-100)',
  },
];

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'In this unit, I will learn...',
  };
  return (
    <Container headerInfo={headerInfo}>
      <Typography weight='var(--font-weight-bold)' useGap={false}>
        Communicate
      </Typography>
      <Box display='flex' gap='50px' marginTop='24px' width='779px' margin='24px auto 0'>
        <BoxWrap flexDirection='column'>
          <Box display='flex' flexDirection='column'>
            <BoxWrap marginBottom={10}>
              <Typography useGap={false}>알고 있는지 묻기</Typography>
            </BoxWrap>
            <List data={dataTop}>
              {({ value, index = 1 }: { value?: IListenAndAnswer; index?: number }) => (
                <BoxWrap>
                  <Box marginRight='8px'>
                    <Label value={value?.type || ''} type={'paint'} background={value?.color || ''} />
                  </Box>
                  <Box flex={1} marginRight={10}>
                    <Typography>{value?.content}</Typography>
                  </Box>
                </BoxWrap>
              )}
            </List>
          </Box>
          <Box display='flex' flexDirection='column' marginTop='24px'>
            <BoxWrap marginBottom={10}>
              <Typography useGap={false}>궁금증 표현하기</Typography>
            </BoxWrap>
            <List data={dataBottom}>
              {({ value, index = 1 }: { value?: IListenAndAnswer; index?: number }) => (
                <BoxWrap>
                  <Box marginRight='8px'>
                    <Label value={value?.type || ''} type={'paint'} background={value?.color || ''} />
                  </Box>
                  <Box flex={1} marginRight={10}>
                    <Typography>{value?.content}</Typography>
                  </Box>
                </BoxWrap>
              )}
            </List>
          </Box>
        </BoxWrap>
      </Box>
    </Container>
  );
};

export default P01;
