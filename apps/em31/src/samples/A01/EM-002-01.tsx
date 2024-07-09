import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Box, ChipButton, EChipButtonType, IQuestionProps, List, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

import headerIcon from '../../assets/icon/m_default_01.svg';

const EM00201 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPreview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />이 단원에서 공부할 내용을 살펴보세요.
      </>
    ),
  };

  const data = [
    {
      text: '세 자리 수의 덧셈과 뺄셈을 할 수 있어요.',
    },
    {
      text: '실생활에서 세 자리 수의 덧셈, 뺄셈, 어림셈을 할 수 있어요.',
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box useFull>
        <List gap={24} data={data}>
          {({ value, index = 1 }) => (
            <Box key={index} vAlign='center'>
              <Box marginRight={10} vAlign='center'>
                <ChipButton type='button' status={EChipButtonType.CHECK} size='32px' onClick={() => {}} />
              </Box>
              <Typography>{value?.text}</Typography>
            </Box>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default EM00201;
