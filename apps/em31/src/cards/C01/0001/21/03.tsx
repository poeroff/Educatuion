import {
  IQuestionProps,
  SvgIcon,
  Box,
  Table,
  EStyleTableTypes,
  TableMathCaption,
  THead,
  TR,
  TH,
  TBody,
  TD,
  BoxWrap,
  TFoot,
  EStyleFontSizes,
  Typography,
  List,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import arrow from '@/assets/icon/arrow_right.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P03 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        받아올림이 있는 (두 자리 수)-(한 자리 수)
      </>
    ),
  };

  const data = [
    {
      text: '일의 자리 수끼리 뺄 수 없으면 십의 자리에서 10을 받아내림하여 계산합니다.',
    },
  ];
  return (
    <Container background={'var(--color-white)'} headerInfo={null} questionInfo={questionInfo} useRound>
      <Box useFull>
        <List
          gap={20}
          data={data}
          row={({ value }) => (
            <Box display='flex' alignItems='flex-start'>
              <Box marginTop={-5}>
                <Typography>{value?.text}</Typography>
              </Box>
            </Box>
          )}
        />
        <Box background={'lightGray'} borderRadius='12px' marginTop='48px' padding='28px'>
          <Box position='relative'>
            <BoxWrap>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['56', '-', '17']} />
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
                      <TD></TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD>1</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box marginTop='80px'>
                <SvgIcon src={arrow} alt='오른쪽을 가르키는 화살표 아이콘' size='40px' />
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['56', '-', '17']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>10</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD isMathCheck>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD>1</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>9</TD>
                      <TD>3</TD>
                      <TD></TD>
                    </TR>
                  </TFoot>
                </Table>
              </Box>
              <Box marginTop='80px'>
                <SvgIcon src={arrow} alt='오른쪽을 가르키는 화살표 아이콘' size='40px' />
              </Box>
              <Box hAlign='center' flexDirection='column' useRound useFull>
                <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                  <TableMathCaption caption='세로셈' math={['56', '-', '17']} />
                  <THead hidden>
                    <TR>
                      <TH scope='col'>일의 자리</TH>
                      <TH scope='col'>십의 자리</TH>
                      <TH scope='col'>연산 기호</TH>
                    </TR>
                  </THead>
                  <TBody>
                    <TR isMathSolution>
                      <TD>10</TD>
                      <TD>4</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>6</TD>
                      <TD isMathCheck>5</TD>
                      <TD></TD>
                    </TR>
                    <TR>
                      <TD>7</TD>
                      <TD>1</TD>
                      <TD>-</TD>
                    </TR>
                  </TBody>
                  <TFoot>
                    <TR>
                      <TD>9</TD>
                      <TD>3</TD>
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

export default P03;
