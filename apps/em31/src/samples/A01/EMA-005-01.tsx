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
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EMA00501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [inputs, setInputs] = useState<string[]>(['', '']);

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
      <Box hAlign='center' flexDirection='column'>
        <Image src={'/example/EMA-005-01/Frame 1000005033.png'} alt='빼기 화살표' width='448px' height='66px' />
        <Table color={EStyleTableTypes.DEFAULT} sizes={['150px', '150px', '150px']}>
          <TableMathCaption caption='덧셈 테이블' math={[]} hidden />
          <TBody>
            {[
              [515, 357],
              [438, 169],
            ].map((value, index) => (
              <TR>
                <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                  {value[0]}
                </TH>
                <TH scope='row' color={EStyleTableTypes.DEFAULT}>
                  {value[1]}
                </TH>
                <TD hAlign='center' vAlign='middle' color={EStyleTableTypes.DEFAULT}>
                  <Input
                    width='133px'
                    textAlign='center'
                    value={inputs[index]}
                    onChange={e => {
                      setInputs(prev => prev.map((value, idx) => (index === idx ? e.target.value : value)));
                    }}
                    ariaLabel={value[0] + '애' + value[1] + '을 뺀 값'}
                  />
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>
    </Container>
  );
};

export default EMA00501;
