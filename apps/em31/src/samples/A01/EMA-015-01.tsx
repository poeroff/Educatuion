import {
  Box,
  BoxWrap,
  EImageType,
  EStyleTableTypes,
  IQuestionProps,
  Image,
  Input,
  Label,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import arrow from '../../assets/example/EMA-015-01/arrow.svg';

const EMA01501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'learnedSummary',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        내림이 없는 (몇십몇)÷(몇)
      </>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} vAlign='flex-start' useRound>
      <Box vAlign='center'>
        <Label background='var(--color-yellow-700)' type='paint' size='xx-small' svgWidth={10} svgHeight={10} />
        <Typography fontSize='var(--font-size-32)' lineHeight='48px'>
          36÷3의 계산
        </Typography>
        <Box display='inline' padding='12px'>
          <Typography useGap={false} fontSize='var(--font-size-16)' lineHeight='24px' color='var(--color-green-800)'>
            36을 십의 자리부터 차례로 3으로 나누어 가면서 계산합니다.
          </Typography>
        </Box>
      </Box>
      <BoxWrap justifyContent='center' marginTop='24px' paddingBottom='58px'>
        <Box width='324px' position='relative'>
          <Box textAlign='center' width={212}>
            <Table color={EStyleTableTypes.MATH_DIVIDE} width={70} useMathBorder={true}>
              <TableMathCaption caption='세로셈' math={['36', '÷', '3']} />
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
                  <TD bgColor='var(--color-red-100)'>
                    <Input type={'button'} value={'1'} onClick={() => {}} ariaLabel='몫, 십의 자리' maxLength={1} />
                  </TD>
                  <TD></TD>
                </TR>
                <TR isDivideExp divideExpGap={50}>
                  <TD bgColor='var(--color-red-100)'>3</TD>
                  <TD bgColor='var(--color-red-100)'>3</TD>
                  <TD bgColor='var(--color-red-100)'>6</TD>
                </TR>
                <TR>
                  <TD></TD>
                  <TD bgColor='var(--color-red-100)'>3</TD>
                  <TD></TD>
                </TR>
              </TBody>
              <TFoot>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD bgColor='var(--color-red-100)'>6</TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
          <Box position='absolute' hAlign='center' top='120px' right='24px'>
            <SvgIcon src={arrow} width='39px' height='20px' />
            <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='48px'>
              3×10
            </Typography>
          </Box>
          <Box position='absolute' hAlign='center' right='10px' top='176px'>
            <SvgIcon src={arrow} width='39px' height='20px' />
            <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='48px'>
              36-30
            </Typography>
          </Box>
        </Box>
        <Image type={EImageType.IMG_BG} src='../../assets/example/EMA-015-01/line.jpg' width='13px' height='345px' />
        <Box position='relative'>
          <Box textAlign='center' width={212}>
            <Table color={EStyleTableTypes.MATH_DIVIDE} width={70} useMathBorder={true}>
              <TableMathCaption caption='세로셈' math={['36', '÷', '3']} />
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
                  <TD>1</TD>
                  <TD bgColor='var(--color-blue-100)'>
                    <Input type={'button'} value={'2'} onClick={() => {}} ariaLabel='몫, 일의 자리' maxLength={1} />
                  </TD>
                </TR>
                <TR isDivideExp divideExpGap={50}>
                  <TD bgColor='var(--color-blue-100)'>3</TD>
                  <TD>3</TD>
                  <TD>6</TD>
                </TR>
                <TR>
                  <TD></TD>
                  <TD>3</TD>
                  <TD></TD>
                </TR>
                <TR isDivideExpLine divideExpGap={50}>
                  <TH scope='row'></TH>
                  <TD></TD>
                  <TD bgColor='var(--color-blue-100)'>6</TD>
                </TR>
                <TR>
                  <TH scope='row'></TH>
                  <TD></TD>
                  <TD bgColor='var(--color-blue-100)'>6</TD>
                </TR>
              </TBody>
              <TFoot>
                <TR isDivideExpLine divideExpGap={50}>
                  <TD></TD>
                  <TD></TD>
                  <TD bgColor='var(--color-blue-100)'>0</TD>
                </TR>
              </TFoot>
            </Table>
          </Box>
          <Box position='absolute' hAlign='center' top='240px' right='-70px'>
            <SvgIcon src={arrow} width='39px' height='20px' />
            <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='48px'>
              3×2
            </Typography>
          </Box>
          <Box position='absolute' hAlign='center' right='-64px' top='295px'>
            <SvgIcon src={arrow} width='39px' height='20px' />
            <Typography useGap={false} fontSize='var(--font-size-32)' lineHeight='48px'>
              6-6
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA01501;
