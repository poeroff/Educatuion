import { Box, EStyleTableTypes, IQuestionProps, SvgIcon, Table, TableMathCaption, TBody, TD, TFoot, TH, THead, TR, Typography } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box display='flex' alignItems='center'>
        <SvgIcon src={headerIcon} size='48px' />
        &nbsp;받아내림이 있는 (두 자리 수)-(한 자리 수)
      </Box>
    ),
  };

  const color = {
    pink: 'var(--color-pink-500)',
    blue: 'var(--color-blue-500)',
  };

  return (
    <Container bodyId='targetContainer' headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} vAlign='nomal' useRound>
      <Typography>일의 자리 수끼리 뺄 수 없으면 십의 자리에서 10을 받아내림하여 계산합니다.</Typography>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Box type='line' display='flex' width='392px' alignItems='center' justifyContent='center' padding='24px 48px' useRound>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['34', '-', '8']} />
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
                <TD>4</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD></TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>6</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
        <Box margin={'0px 12px'}>
          <Typography>➡</Typography>
        </Box>
        <Box type='line' display='flex' width='392px' alignItems='center' justifyContent='center' padding='24px 48px' useRound>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['34', '-', '8']} />
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
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD fontColor={color.pink}>4</TD>
                <TD isMathCheck>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD fontColor={color.pink}>8</TD>
                <TD></TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD fontColor={color.pink}>6</TD>
                <TD></TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
        <Box margin={'0px 12px'}>
          <Typography>➡</Typography>
        </Box>
        <Box type='line' display='flex' width='392px' alignItems='center' justifyContent='center' padding='24px 48px' useRound>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['34', '-', '8']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD fontColor={color.pink}>10</TD>
                <TD fontColor={color.blue}>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD fontColor={color.pink}>4</TD>
                <TD fontColor={color.blue} isMathCheck>
                  3
                </TD>
                <TD></TD>
              </TR>
              <TR>
                <TD fontColor={color.pink}>8</TD>
                <TD></TD>
                <TD>-</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD fontColor={color.pink}>6</TD>
                <TD fontColor={color.blue}>2</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
