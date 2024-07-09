import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Label,
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

interface IMath {
  id: number;
  value: number[];
  expression: string;
  sign: string;
}

const EM07401 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '시간의 덧셈하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />
        버스의 도착 예정 시각을 구해 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Typography>8시 5분 10초+2분+20초=</Typography>
        <Input value={''} width='50px' onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
        <InputText>시</InputText>
        <Input value={''} width='50px' onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
        <InputText>분</InputText>
        <Input value={''} width='98px' onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
        <InputText>초</InputText>
      </BoxWrap>
      <BoxWrap height='304px'>
        <Box hAlign='center' flexDirection='column' useRound useFull>
          <Table color={EStyleTableTypes.MATH} sizes={['14%', '14%', '14%', '14%', '14%', '14%', '14%']}>
            <TableMathCaption caption='세로셈' math={['24', '+', '7']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>초</TD>
                <TD>10</TD>
                <TD>분</TD>
                <TD>5</TD>
                <TD>시</TD>
                <TD>8</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>초</TD>
                <TD>20</TD>
                <TD>분</TD>
                <TD>2</TD>
                <TD></TD>
                <TD></TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>초</TD>
                <TD>
                  <Input value={''} width='50px' onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                </TD>
                <TD>분</TD>
                <TD>
                  <Input value={''} width='50px' onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                </TD>
                <TD>시</TD>
                <TD>
                  <Input value={''} width='50px' onChange={() => {}} ariaLabel='일의 자리의 답' maxLength={1} />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM07401;

const InputText = styled(Typography)`
  padding-left: 0px;
`;
