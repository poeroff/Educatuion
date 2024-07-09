import {
  Box,
  Typography,
  SvgIcon,
  TMainHeaderInfoTypes,
  ArrowBox,
  EStyleTableTypes,
  Input,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  TFoot,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import arrow from '@/assets/example/ArrowFatRight.svg';

const EM02704 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '한 바구니에 담아야 하는 열대 과일 수 구하기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <Box hAlign='center' flexDirection='column'>
        <Typography fontSize='36px' weight='var(--font-weight-semiBold)'>
          나눗셈식을 세로로 나타내는 방법
        </Typography>
        <Box marginTop='32px'>
          <ArrowBox
            type='both'
            width={270}
            height={68}
            x={78}
            y={120}
            arrowColor='var(--color-green-800)'
            leftArrow={{ useTail: true, tailType: 'none' }}
            rightArrow={{ useTail: true }}
            centerContent={
              <Typography fontSize='20px' color='var(--color-green-800)'>
                나누어지는 수
              </Typography>
            }
            direction='down'
          >
            <ArrowBox
              type='both'
              width={165}
              height={33}
              x={133}
              y={120}
              arrowColor='var(--color-pink-800)'
              leftArrow={{ useTail: true, tailType: 'none' }}
              rightArrow={{ useTail: true }}
              centerContent={
                <Typography fontSize='20px' color='var(--color-pink-800)'>
                  나누는 수
                </Typography>
              }
              direction='down'
            >
              <ArrowBox
                type='both'
                width={148}
                height={16}
                x={190}
                y={25}
                arrowColor='var(--color-blue-800)'
                leftArrow={{ useTail: true }}
                rightArrow={{ useTail: true, tailType: 'none' }}
                centerContent={
                  <Typography fontSize='20px' color='var(--color-blue-800)'>
                    몫
                  </Typography>
                }
                direction='up'
              >
                <Box vAlign='end' useRound background='var(--color-white)' padding='40px 50px 12px'>
                  <Typography fontSize='36px' weight='var(--font-weight-semiBold)'>
                    <Typography color='var(--color-green-800)' fontSize='36px' weight='var(--font-weight-semiBold)' useGap={false}>
                      36
                    </Typography>
                    ÷
                    <Typography color='var(--color-pink-800)' fontSize='36px' weight='var(--font-weight-semiBold)' useGap={false}>
                      3
                    </Typography>
                    =
                    <Typography color='var(--color-blue-800)' fontSize='36px' weight='var(--font-weight-semiBold)' useGap={false}>
                      12
                    </Typography>
                  </Typography>
                  <Box hAlign='center' vAlign='center' width='52px' height='48px'>
                    <SvgIcon src={arrow} size='32px' />
                  </Box>
                  <Box>
                    <Table color={EStyleTableTypes.MATH_DIVIDE} useMathBorder={false}>
                      <TableMathCaption caption='세로셈' math={['57', '÷', '4']} />
                      <THead hidden>
                        <TR>
                          <TH scope='col'>나누는 수, 일의 자리</TH>
                          <TH scope='col'>나누어지는 수, 십의 자리</TH>
                          <TH scope='col'>나누어지는 수, 일의 자리</TH>
                        </TR>
                      </THead>
                      <TBody>
                        <TR>
                          <TD width='30px' height='30px'></TD>
                          <TD fontColor='var(--color-blue-800)' width='25px' height='40px'>
                            1
                          </TD>
                          <TD fontColor='var(--color-blue-800)' width='20px' height='40px'>
                            2
                          </TD>
                        </TR>
                        <TR isDivideExp divideExpGap={22} height={35}>
                          <TD fontColor='var(--color-pink-800)' width='30px' height='40px'>
                            3
                          </TD>
                          <TD fontColor='var(--color-green-800)' width='25px' height='40px'>
                            3
                          </TD>
                          <TD fontColor='var(--color-green-800)' width='20px' height='40px'>
                            6
                          </TD>
                        </TR>
                      </TBody>
                    </Table>
                  </Box>
                </Box>
              </ArrowBox>
            </ArrowBox>
          </ArrowBox>
        </Box>
      </Box>
    </Container>
  );
};

export default EM02704;
