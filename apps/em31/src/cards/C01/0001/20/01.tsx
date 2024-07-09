import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Label,
  List,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        받아올림이 있는 (두 자리 수)+(한 자리 수)
      </>
    ),
  };

  const data = [
    {
      text: '일의 자리 수끼리의 합이 10이거나 10보다 크면 10을 십의 자리로 받아올림하여 계산합니다.',
    },
    {
      text: '십의 자리 수끼리의 합이 10이거나 10보다 크면 10을 백의 자리로 받아올림하여 계산합니다.',
    },
  ];

  return (
    <Container bodyId='targetContainer' vAlign='flex-start' headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Box useFull>
        <List
          gap={20}
          data={data}
          row={({ value, index }) => (
            <Box display='flex' alignItems='flex-start'>
              <Label value={index} type='icon' />
              <Box marginTop={-5}>
                <Typography>{value?.text}</Typography>
              </Box>
            </Box>
          )}
        />

        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box position='relative'>
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['31', '-', '8']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>5</TD>
                      <TD>6</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD></TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>2</TD>
                      <TD>7</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['73', '-', '26']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD></TD>
                      <TD>1</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>9</TD>
                      <TD>4</TD>
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>3</TD>
                      <TD>8</TD>
                      <TD></TD>
                      <TD>+</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>2</TD>
                      <TD>3</TD>
                      <TD>1</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
