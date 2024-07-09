import { useState } from 'react';
import { Box, BoxWrap, EDefaultInequalitySignType, ESvgType, IQuestionProps, Label, SvgIcon } from '@maidt-cntn/ui';
import { Container, IInequalitySignBoxProps, InequalitySignBox } from '@maidt-cntn/ui/math';

import empty_circle from '@/assets/icon/math_empty_circle.svg';

const EM01601 = () => {
  const [questionData, setQuestionData] = useState<Array<IInequalitySignBoxProps>>([
    { toolTipId: 'tooltip-1', leftQuestionText: '367+232', rightQuestionText: '590', value: undefined },
    { toolTipId: 'tooltip-2', leftQuestionText: '1810', rightQuestionText: '946+871', value: undefined },
    { toolTipId: 'tooltip-3', leftQuestionText: '678-345', rightQuestionText: '333', value: undefined },
    { toolTipId: 'tooltip-4', leftQuestionText: '166', rightQuestionText: '470-305', value: undefined },
  ]);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈 칸' src={empty_circle} size='48px' />
          &nbsp;{'안에 >, =, < 를 알맞게 써 넣으세요.'}
        </Box>
      </>
    ),
  };

  const handleOnChange = (type: EDefaultInequalitySignType, toolTipId: string) => {
    const newQuestionData = questionData.map(item => {
      return item.toolTipId === toolTipId ? { ...item, value: type } : item;
    });
    setQuestionData(newQuestionData);
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <Box display='flex' justifyContent='center' flexWrap='wrap' gap='48px 24px'>
        {questionData.map(data => {
          return (
            <Box width='calc(50% - 12px)' hAlign='center' key={data.toolTipId}>
              <InequalitySignBox {...data} size='large' onChange={handleOnChange} />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default EM01601;
