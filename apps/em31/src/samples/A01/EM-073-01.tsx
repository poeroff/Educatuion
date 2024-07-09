import { useState } from 'react';

import {
  Box,
  BoxWrap,
  Drawing,
  EStyleTableTypes,
  IQuestionProps,
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

import star from '../../assets/icon/header_star.svg';

const EM07301 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'write',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '계산을 하고 계산이 맞는지 확인해 보세요.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap useFull justifyContent='space-between'>
        <Box width='212px' padding='0 24px'>
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
                <TD></TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='몫, 십의 자리' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='몫, 일의 자리' maxLength={1} />
                </TD>
              </TR>
              <TR isDivideExp divideExpGap={50}>
                <TD>4</TD>
                <TD>5</TD>
                <TD>7</TD>
              </TR>
              <TR>
                <TD scope='row' hiddenLabel={'십의 자리 풀이'}></TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='나누어지는 수 십의 자리와 나누는 수 일의 자리를 나눈 값' maxLength={1} />
                </TD>
                <TD></TD>
              </TR>
            </TBody>
            <TFoot>
              <TR isDivideExpLine divideExpGap={50}>
                <TD></TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='나머지, 십의 자리' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='나머지, 일의 자리' maxLength={1} />
                </TD>
              </TR>
              <TR divideExpGap={50}>
                <TD></TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='나머지, 십의 자리' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='나머지, 일의 자리' maxLength={1} />
                </TD>
              </TR>
              <TR isDivideExpLine divideExpGap={50}>
                <TD></TD>
                <TD></TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='나머지, 일의 자리' maxLength={1} />
                </TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
        <Box position='relative'>
          <Box position='absolute' top='-6px'>
            <Label
              value='확인'
              svgWidth={79}
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              fontSize={22}
            />
          </Box>
          <Drawing width='684px' />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM07301;
