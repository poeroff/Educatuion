import { useState } from 'react';

import { IQuestionProps, TMainHeaderInfoTypes, BoxWrap, Textarea, Box, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import drawFrame from '../../assets/icon/draw_frame.svg';

const ME10501 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'About Animals: Step2',
  };

  const questionInfo: IQuestionProps = {
    text: '조사한 동물의 흥미로운 사실을 정리해 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={() => {
        setIsOpen(!isOpen);
      }}
      submitLabel='완료하기'
    >
      <BoxWrap marginTop='14px'>
        <BoxWrap width='calc(50% - 22px)' flexDirection='column' justifyContent='center' marginRight='0'>
          <Box marginTop='0' marginRight='0'>
            <Textarea
              width='414px'
              height='94px'
              placeholder='e.g. big easters'
              ariaLabel='조사한 동물의 흥미로운 사실 예시를 적어주세요. for example. big easters'
            />
          </Box>

          <Box marginTop='16px' marginRight='0'>
            <Textarea
              width='414px'
              height='94px'
              placeholder='e.g. Baby pandas are pink.'
              ariaLabel='조사한 동물의 흥미로운 사실 예시를 적어주세요. for example. Baby pandas are pink.'
            />
          </Box>

          <Box marginTop='16px' marginRight='0'>
            <Textarea
              width='414px'
              height='94px'
              placeholder='e.g. Pandas can swim.'
              ariaLabel='조사한 동물의 흥미로운 사실 예시를 적어주세요. for example. Pandas can swim.'
            />
          </Box>
        </BoxWrap>

        <BoxWrap width='50%' position='relative'>
          <Box>
            <SvgIcon src={drawFrame} width='482px' height='378px' />
          </Box>

          <Box position='absolute' top='85px' left='45px' useRound width='402px' height='250px' border='1px solid var(--color-blue-200)' />
        </BoxWrap>
      </BoxWrap>
    </Container>
  );
};

export default ME10501;
