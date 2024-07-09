import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  Label,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  TableMathCaption,
  Tag,
  TextView,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM01701 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        잘못 계산한 이유를 쓰고 바르게 계산해보세요.
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} submitLabel='채점하기' onSubmit={() => {}} useRound>
      <BoxWrap justifyContent='center' alignItems='center'>
        <TextView title={''} height='196px'>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='잘못된 세로셈' math={['555', '+', '248']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>5</TD>
                <TD>5</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD>4</TD>
                <TD>2</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>3</TD>
                <TD>0</TD>
                <TD>8</TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
        <Box marginTop='15px'>
          <Image src={'/icon/arrowRightBlue.svg'} alt='오른쪽을 가르키는 화살표 아이콘' size='44px' />
        </Box>
        <TextView title={'바른 계산'} height='196px'>
          <Table color={EStyleTableTypes.MATH_NONE} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['555', '+', '248']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>백의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>5</TD>
                <TD>5</TD>
                <TD>5</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>8</TD>
                <TD>4</TD>
                <TD>2</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='일의 자리 값' />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='십의 자리 값' />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='백의 자리 값' />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </TextView>
      </BoxWrap>
      <Box type='dashed' padding={'24px 48px'} marginTop={24} vAlign='start' hAlign='center' borderRadius={8}>
        <Box margin='9px 0'>
          <Tag label={'이유'} type={ETagLine.YELLOW} width='79px' height='40px' />
        </Box>
        <Typography>
          일의 자리 계산이 9+8= <Input value={''} onChange={() => {}} width='130px' ariaLabel='9+8의 값' /> 이므로 십의 자리 계산에&nbsp;
          <Input value={''} onChange={() => {}} width='130px' ariaLabel='10의 자리의 계산에 더해야할 값' /> 을 더해야 합니다.
        </Typography>
      </Box>
    </Container>
  );
};

export default EM01701;
