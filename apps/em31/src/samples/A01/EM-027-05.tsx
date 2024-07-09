import {
  Box,
  Typography,
  TMainHeaderInfoTypes,
  Scroll,
  TD,
  EStyleTableTypes,
  TBody,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  SvgIcon,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import redArrow from '../../assets/example/EM-027-05/redArrow.svg';
import blueArrow from '../../assets/example/EM-027-05/blueArrow.svg';
import styled from '@emotion/styled';

const EM02705 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '14÷4 계산하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start'>
      <Scroll>
        <Box hAlign='center' flexDirection='column'>
          <Box position='relative' hAlign='center' useRound background='var(--color-white)' padding='12px 28px'>
            <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
              <TableMathCaption caption='세로셈' math={['14', '÷', '4']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>나누는 수, 일의 자리</TH>
                  <TH scope='col'>나누어지는 수, 십의 자리</TH>
                  <TH scope='col'>나누어지는 수, 일의 자리</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD></TD>
                  <TD></TD>
                  <TD>3</TD>
                </TR>
                <TR isDivideExp divideExpGap={50}>
                  <TD>4</TD>
                  <TD>1</TD>
                  <TD>4</TD>
                </TR>
                <TR>
                  <TD scope='row' hiddenLabel={'십의 자리 풀이'}></TD>
                  <TD>1</TD>
                  <TD>2</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD>2</TD>
                </TR>
              </TFoot>
            </Table>
            <Box>
              <Box position='absolute' top='20px'>
                <SvgIcon src={blueArrow} width='77px' height='16px' />
                <Box padding='0 3px' display='inline'>
                  <Typography useGap={false} color='var(--color-blue-800)' fontSize='var(--font-size-20)'>
                    몫
                  </Typography>
                </Box>
                <Box display='inline'>
                  <RevertArrow src={blueArrow} width='77px' height='16px' />
                </Box>
              </Box>
              <Box position='absolute' bottom='20px'>
                <SvgIcon src={redArrow} width='58px' height='16px' />
                <Box padding='0 3px' display='inline'>
                  <Typography useGap={false} color='var(--color-pink-800)' fontSize='var(--font-size-20)'>
                    나머지
                  </Typography>
                </Box>
                <Box display='inline'>
                  <RevertArrow src={redArrow} width='58px' height='16px' />
                </Box>
              </Box>
            </Box>
            <Table marginLeft={68} color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
              <TableMathCaption caption='세로셈' math={['14', '÷', '2']} />
              <THead hidden>
                <TR>
                  <TH scope='col'>나누는 수, 일의 자리</TH>
                  <TH scope='col'>나누어지는 수, 십의 자리</TH>
                  <TH scope='col'>나누어지는 수, 일의 자리</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD></TD>
                  <TD></TD>
                  <TD>7</TD>
                </TR>
                <TR isDivideExp divideExpGap={50}>
                  <TD>2</TD>
                  <TD>1</TD>
                  <TD>4</TD>
                </TR>
                <TR>
                  <TD scope='row' hiddenLabel={'십의 자리 풀이'}></TD>
                  <TD>1</TD>
                  <TD>4</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD>0</TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
          <Box vAlign='center' marginTop='24px'>
            <Typography fontSize='36px' lineHeight='54px' weight='var(--font-weight-semiBold)' align='center'>
              14를 4로 나누면{' '}
              <Typography fontSize='36px' weight='var(--font-weight-semiBold)' color='var(--color-pink-800)' useGap={false}>
                몫
              </Typography>
              은 3이고 2가 남습니다.
              <br />
              이때 2를 14÷4의{' '}
              <Typography fontSize='36px' weight='var(--font-weight-semiBold)' color='var(--color-pink-800)' useGap={false}>
                나머지
              </Typography>
              라고 하며,
              <br />
              나머지는 나누는 수보다 항상 작습니다.
              <br />
              나머지가 있는 경우 14÷4=3···2와 같이 나타낼 수 있습니다. 14÷2=7과 같이 나머지가 0일 때,
              <br />{' '}
              <Typography fontSize='36px' weight='var(--font-weight-semiBold)' color='var(--color-pink-800)' useGap={false}>
                나누어떨어진다
              </Typography>
              고 합니다.
            </Typography>
          </Box>
        </Box>
      </Scroll>
    </Container>
  );
};

const RevertArrow = styled(SvgIcon)`
  transform: scaleX(-1);
`;

export default EM02705;
