import { Container } from '@maidt-cntn/ui/math';
import { Box, EStyleTableTypes, IQuestionProps, Input, Label, TBody, TD, TH, TMainHeaderInfoTypes, TR, Table } from '@maidt-cntn/ui';
import { useState } from 'react';

const EM02401 = () => {
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const thColArr = ['1', '3', '5', '7'];
  const thRowArr = ['4'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        만화를 보며 이 단원에서 배우는 내용을 살펴보세요.
      </>
    ),
  };

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='start'
    >
      <Box marginTop='10px' display='flex' justifyContent='center'>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['120px', '120px', '120px', '120px', '120px']} caption=''>
          <TBody>
            <TR>
              <TH scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                ×
              </TH>
              {thColArr.map((value, index) => (
                <TH key={index} scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  {value}
                </TH>
              ))}
            </TR>
            {thRowArr.map((item, index) => (
              <TR key={index}>
                <TH scope='row' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  {item}
                </TH>
                {thColArr.map((_, index) => (
                  <TD key={index} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    <Input
                      width='104px'
                      value={answers[index]}
                      onChange={event => handleInputChange(index, event.target.value)}
                      ariaLabel={item + '×' + thColArr[index] + '의 값'}
                    />
                  </TD>
                ))}
              </TR>
            ))}
          </TBody>
        </Table>
      </Box>
    </Container>
  );
};

export default EM02401;
