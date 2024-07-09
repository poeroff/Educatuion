import { useState } from 'react';
import {
  Box,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Image,
  Input,
  Label,
  TBody,
  TD,
  TH,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableMathCaption,
  BoxWrap,
  SvgIcon,
  ESvgType,
  EImageType,
  Typography,
  Symbol,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import icArrowLine from '@/assets/icon/icArrowLine.svg';

import styled from '@emotion/styled';

const EMA00502_2 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <BoxWrap flexDirection='column'>
        <Box vAlign='center'>
          <Label type='icon' size='small' value={4} />
          &nbsp;나눗셈을 하여 &nbsp;
          <Symbol type='blank' blankType='square' size={48} />
          안에는 몫을 &nbsp;
          <Symbol type='blank' blankType='circle' size={48} borderColor='var(--color-pink-1000)' borderWidth={3} />
          안에는 나머지를
        </Box>
        <Box>써넣으세요.</Box>
      </BoxWrap>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(['', '']);

  const data = [
    [515, 357],
    [438, 169],
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitBtnColor={EStyleButtonTypes.YELLOW}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <Box margin='24px auto' width='527px' flexDirection='column'>
        <MathWrap>
          <SvgIcon src={icArrowLine} alt='나눗셈 화살표' width='259px' height='50px'></SvgIcon>
          <MathEx>&divide;</MathEx>
        </MathWrap>
        <BoxWrap>
          <Box marginTop='12px' useRound border='2px solid var(--color-pink-1000)' overflow='hidden'>
            <Table color={EStyleTableTypes.RED} sizes={['150px', '150px', '150px']}>
              <TableMathCaption caption='덧셈 테이블' math={[]} hidden />
              <TBody>
                {data.map((value, index) => (
                  <TR>
                    <TH scope='row' color={EStyleTableTypes.RED}>
                      {value[0]}
                    </TH>
                    <TH scope='row' color={EStyleTableTypes.RED}>
                      {value[1]}
                    </TH>
                    <TD hAlign='center' vAlign='middle' color={EStyleTableTypes.RED}>
                      <Input
                        type='number'
                        width='95px'
                        textAlign='center'
                        value={inputs[index]}
                        onChange={e => {
                          setInputs(prev => prev.map((value, idx) => (index === idx ? e.target.value : value)));
                        }}
                        ariaLabel={value[0] + '에 ' + value[1] + '을 나눈값의 몫을 입력하세요.'}
                      />
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </Box>
          <Box>
            {data.map((value, index) => (
              <BoxWrap key={index} marginTop='10px' alignItems='center' height='75px'>
                <Dot />
                <Dot />
                <Dot />
                <CircleInput aria-label={value[0] + '에 ' + value[1] + '을 나눈값의 나머지를 입력하세요.'} />
              </BoxWrap>
            ))}
          </Box>
        </BoxWrap>
      </Box>
    </Container>
  );
};

const MathWrap = styled.div`
  position: relative;
  width: 387px;
`;

const MathEx = styled.span`
  border: 2px solid var(--color-pink-1000);
  border-radius: 50px;
  background: var(--color-white);
  width: 49px;
  height: 49px;
  position: absolute;
  left: 105px;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  background: #231815;
  border-radius: 50px;

  & + * {
    margin-left: 8px;
  }
`;

const CircleInput = styled.input`
  margin-left: 15px;
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 70px;
  border: 2px solid var(--color-pink-1000);
  font-size: var(--font-size-28);
  text-aline: center;
  padding: 5px 11px;

  text-overflow: ellipsis;
`;

export default EMA00502_2;
