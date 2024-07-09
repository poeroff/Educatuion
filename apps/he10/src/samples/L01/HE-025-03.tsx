import { useState } from 'react';
import { Box, TMainHeaderInfoTypes, TextView, BoxWrap, Input, Dialog, Typography, List, Image, Scroll, Label } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { TextBoard } from '@maidt-cntn/ui/en';

interface IContentList {
  imgSrc: string;
  imgAlt: string;
  children: React.ReactNode;
}

const HE02503 = () => {
  const [value, setValue] = useState<string>('');
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionInfo = {
    text: 'Read the description of the science experiment and complete the project board.',
  };

  const wordArr = ['break up', 'dish soap', 'flat', 'milk', 'non-fat', 'spread'];

  const data: IContentList[] = [
    {
      imgSrc: 'HE1-L03-C09-A02-P04-01',
      imgAlt: '접시에 우유가 부어지고 있는 모습',
      children: (
        <>
          <Typography>Pour the 3)</Typography>
          <Input width='195px' value={value} onChange={e => setValue(e.target.value)} ariaLabel='답 입력란' />
          <Typography>into the dish.</Typography>
        </>
      ),
    },
    {
      imgSrc: 'HE1-L03-C09-A02-P04-02',
      imgAlt: '접시에 담긴 우유에 식용 색소를 몇 방울 떨어트리는 모습',
      children: <Typography>Add some drops of food coloring into the milk</Typography>,
    },
    {
      imgSrc: 'HE1-L03-C09-A02-P04-03',
      imgAlt: '우유와 식용색소가 담긴 접시 가운데 설거지 세제를 한 방울 떨어트린 모습',
      children: <Typography>Put a drop of dish soap in the center</Typography>,
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box useFull>
        <BoxWrap>
          <Box hAlign='center'>
            <TextBoard color={'var(--color-blue-200)'} width='330px'>
              <Box>
                <Typography weight='var(--font-weight-bold)'>Procedure & Caution</Typography>
              </Box>
              <Box>
                <Scroll height='185px' tabIndex={0}>
                  <Typography>
                    Here's how to do it. First, pour the milk into the dish. Be careful. Only if you use milk that contains fat will the experiment
                    properly.
                  </Typography>
                </Scroll>
              </Box>
            </TextBoard>
          </Box>
          <Box useFull>
            <Scroll height='266px' tabIndex={0}>
              <Box hAlign='center'>
                <Typography fontSize='32px' lineHeight='40px' weight='var(--font-weight-bold)'>
                  Magic Rainbow Milk
                </Typography>
              </Box>
              <Box textAlign='center'>
                <Typography color='var(--color-green-700)' weight='var(--font-weight-bold)'>
                  Procedure
                </Typography>
              </Box>
              <Box marginTop='12px'>
                <List gap={12} data={data}>
                  {({ value, index }) => (
                    <Box display='flex'>
                      <Label value={index} />
                      <Box marginLeft={'8px'}>
                        <Image src={`/example/${value!.imgSrc}.png`} alt={value!.imgAlt} />
                      </Box>
                      <Box>{value!.children}</Box>
                    </Box>
                  )}
                </List>
              </Box>
            </Scroll>
          </Box>
        </BoxWrap>
        <Box marginTop='24px'>
          <TextView title='보기'>
            <List align='horizontal' data={wordArr} row={({ value }) => <Typography>{value}</Typography>} />
          </TextView>
        </Box>
      </Box>

      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE02503;
