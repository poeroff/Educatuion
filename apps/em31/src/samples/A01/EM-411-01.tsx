import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Image, Input, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, Unit } from '@maidt-cntn/ui/math';
import { useState } from 'react';
import headerIcon from '../../assets/icon/header_star.svg';

interface IPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const EM41101 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='center'>
        <Box marginRight='12px' vAlign='center'>
          <SvgIcon src={headerIcon} size='36px' />
        </Box>
        각도기를 사용하여 각도를 재어 보세요.
      </Box>
    ),
  };

  const [value1, setValue1] = useState<string>(' ');
  const [value2, setValue2] = useState<string>(' ');
  const [value3, setValue3] = useState<string>(' ');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
    >
      <BoxWrap alignItems='center' boxGap={107} marginTop={10} marginInline={27}>
        <Box position='relative'>
          <Image src='/example/EM-411-01/A-EM41-020003-1001_1.jpg' alt='각의 크기가 직각보다 작은 도형이 있습니다.' width='174px' height='142.54px' />
          <InputWrapper position={{ bottom: '17px' }}>
            <Input width='98px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='각도를 적어주세요.' />
            <Unit unit={'degree'} height={50} />
          </InputWrapper>
        </Box>
        <Box position='relative'>
          <Image
            src='/example/EM-411-01/A-EM41-020003-1001_2.jpg'
            alt='각의 크기가 직각보다 큰 도형이 있습니다.'
            width='308.57px'
            height='112.31px'
          />
          <InputWrapper position={{ bottom: '32px', right: '142px' }}>
            <Input width='98px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='각도를 적어주세요.' />
            <Unit unit={'degree'} height={50} />
          </InputWrapper>
        </Box>
        <Box position='relative'>
          <Image
            src='/example/EM-411-01/A-EM41-020003-1001_3.jpg'
            alt='각의 크기가 직각보다 큰 도형이 있습니다.'
            width='169.43px'
            height='156.31px'
          />
          <InputWrapper position={{ bottom: '23px', left: '48px' }}>
            <Input width='98px' value={value3} onChange={e => setValue3(e.target.value)} ariaLabel='각도를 적어주세요.' />
            <Unit unit={'degree'} height={50} />
          </InputWrapper>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM41101;

const InputWrapper = styled.div<{ position?: IPosition }>`
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
