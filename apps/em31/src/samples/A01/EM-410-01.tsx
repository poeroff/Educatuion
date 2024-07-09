import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Image, Input, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

interface IPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const EM41001 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주변에서 볼 수 있는 물건의 각도를 재어 보세요.',
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

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
      <BoxWrap position='relative' useFull alignItems='flex-start'>
        <BoxWrap alignItems='center' boxGap={100} marginTop={10}>
          <Box position='relative'>
            <Image
              src='/example/EM-410-01/EM41001_chair.jpg'
              width='205.03px'
              height='224.82px'
              alt='갈색 의자가 있어요. 등받이와 앉는 부분이 만나 각을 이루고 있고 각도가 표시되어 있어요.'
            />
            <FloatWrapper position={{ top: '30px', right: '8px' }}>
              <Input width='98px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='물건의 각도를 적어주세요.' />
            </FloatWrapper>
          </Box>
          <Box position='relative'>
            <Image
              src='/example/EM-410-01/EM41001_book.jpg'
              width='190.94px'
              height='127.74px'
              alt='책이 펼쳐져 있어요. 책이 펼쳐진 상태에서 가장 아랫부분이 일직선으로 각을 이루고 있고 각도가 표시되어 있어요.'
            />
            <FloatWrapper position={{ top: '1px', right: '47px' }}>
              <Input width='98px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='물건의 각도를 적어주세요.' />
            </FloatWrapper>
          </Box>
          <Box position='relative' zIndex={2}>
            <Image
              src='/example/EM-410-01/EM41001_fan.jpg'
              width='246.52px'
              height='131.36px'
              alt='노란색 부채가 있어요. 부채의 가장 아랫부분이 각을 이루고 있고 각도가 표시되어 있어요.'
              style={{ clipPath: 'polygon(100% 0, 100% 52%, 54% 100%, 0 100%, 0 0)' }}
            />
            <FloatWrapper position={{ top: '1px', right: '6px' }}>
              <Input width='98px' value={value3} onChange={e => setValue3(e.target.value)} ariaLabel='물건의 각도를 적어주세요.' />
            </FloatWrapper>
          </Box>
        </BoxWrap>
        <FloatWrapper position={{ bottom: '20px', right: '0px' }}>
          <Image
            src='/example/EM-410-01/EM41001_speech.jpg'
            width='236px'
            height='104px'
            alt='달곰이가 미끄럼틀 끝에 앉아서 “주변에 있는 다른 물건에서 각을 찾아 각도를 재어 볼까요 ?” 라고 말하고 있습니다.'
          />
          <Image src='/example/EM-410-01/EM41001_sm.jpg' width='317.09px' height='218.79px' alt='미끄럼틀이 있습니다.' />
        </FloatWrapper>
      </BoxWrap>
    </Container>
  );
};

export default EM41001;

const FloatWrapper = styled.div<{ position?: IPosition }>`
  position: absolute;
  ${({ position }) =>
    position &&
    `
      top: ${position.top ? position.top : 'unset'};
      bottom: ${position.bottom ? position.bottom : 'unset'};
      left: ${position.left ? position.left : 'unset'};
      right: ${position.right ? position.right : 'unset'};
    `}
`;
