import { Box, ChipButton, EChipButtonType, IQuestionProps, Input, List, Rating, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '../../assets/icon/m_default_01.svg';
import { useState } from 'react';

const EM00202 = () => {
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
      text: '교사의 지문 등이 들어갑니다.',
    },
    {
      text: '수업시간에 발표를 많이 할 거예요.',
    },
    {
      text: '친구들의 이야기를 잘 들어 줄 거예요.',
    },
    {
      text: '',
      content: <Input placeholder='내용을 넣어 주세요.' width='625px' onChange={() => {}} ariaLabel='이 단원에서 공부할 내용을 입력해주세요.' />,
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
          {({ value, index }) => (
            <Box display='flex' justifyContent='space-between' key={index}>
              <Box display='flex' vAlign='center'>
                <Box marginRight='8px' vAlign='center'>
                  <ChipButton type='button' status={EChipButtonType.CHECK} size='32px' onClick={() => {}} />
                </Box>
                {value?.text && <Typography>{value?.text}</Typography>}
                {value?.content}
              </Box>
              <Box vAlign='center'>
                <Rating />
              </Box>
            </Box>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default EM00202;
