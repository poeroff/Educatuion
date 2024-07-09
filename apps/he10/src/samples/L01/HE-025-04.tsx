import { useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  BoxWrap,
  Input,
  Dialog,
  Typography,
  List,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  EStyleTableTypes,
  Scroll,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { TextBoard } from '@maidt-cntn/ui/en';

const HE02504 = () => {
  const [value, setValue] = useState<string>('');
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Read the description of the graph and complete the table.',
  };

  const wordArr = ['48%', '59%', 'material', 'metal', 'plastic', 'waste paper'];

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
            <TextBoard color={'var(--color-orange-100)'} width='330px'>
              <Box>
                <Typography weight='var(--font-weight-bold)'>Analysis</Typography>
              </Box>
              <Box>
                <Scroll height='250px' tabIndex={0}>
                  <Typography>
                    Metal had the highest recycling rate at 75 percent. Glass held the second position with a 59 percent rate. Plastic followed
                    closely behind with a recycling rate Metal had the highest recycling rate at 75 percent. Glass held the second position with a 59
                    percent rate. Plastic followed closely behind with a recycling rate
                  </Typography>
                </Scroll>
              </Box>
            </TextBoard>
          </Box>
          <Box useFull>
            <Box hAlign='center' marginBottom='12px'>
              <Typography fontSize='32px' lineHeight='40px' weight='var(--font-weight-bold)'>
                Analysis
              </Typography>
            </Box>
            <Table color={EStyleTableTypes.GRAY} sizes={['64px', '206px', 'auto']}>
              <THead>
                <TR>
                  <TH scope='col' color={EStyleTableTypes.GRAY} />
                  <TH scope='col' color={EStyleTableTypes.GRAY}>
                    Recycling Rate
                  </TH>
                  <TH scope='col' color={EStyleTableTypes.GRAY}>
                    Material Types
                  </TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD color={EStyleTableTypes.GRAY}>1st</TD>
                  <TD color={EStyleTableTypes.GRAY}>75%</TD>
                  <TD color={EStyleTableTypes.GRAY}>
                    <Box vAlign='center'>
                      <Typography>2)</Typography>
                      <Input width='229px' value={value} onChange={e => setValue(e.target.value)} ariaLabel='답 입력란' />
                    </Box>
                  </TD>
                </TR>
              </TBody>
            </Table>
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

export default HE02504;
