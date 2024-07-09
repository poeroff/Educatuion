import {
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Box,
  EStyleTableTypes,
  Input,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR,
  Table,
  OverlayTooltip,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import bear from '../../assets/example/EM-032-01/bear.svg';

const EM00402 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '351 + 246 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />
        351 + 246을 계산하는 방법을 알아보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={() => {}}
      submitLabel='채점하기'
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding='20px 44px' useRound>
          <Table color={EStyleTableTypes.MATH} bgColors={['blue', 'red', 'green']} sizes={['25%', '25%', '25%', '25%']}>
            <TableMathCaption caption='세로셈' math={['351', '+', '246']} />
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
                <TD>1</TD>
                <TD>5</TD>
                <TD>3</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>6</TD>
                <TD>4</TD>
                <TD>2</TD>
                <TD>+</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='일의 자리의 값' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='십의 자리의 값' maxLength={1} />
                </TD>
                <TD>
                  <Input value={''} onChange={() => {}} ariaLabel='백의 자리의 값' maxLength={1} />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </Box>
      <BearBalloon>
        <OverlayTooltip type='cloud' place='top'>
          각 자리 수를
          <br />
          맞추어 쓰고
          <br />
          같은 자리끼리 더해요.
        </OverlayTooltip>
      </BearBalloon>
    </Container>
  );
};

export default EM00402;

const BearBalloon = styled.span`
  position: absolute;
  right: 190px;
  top: 50px;

  display: inline-block;
  background: url(${bear}) bottom right no-repeat;
  height: 239px;
  width: 134px;
`;
