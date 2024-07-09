import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Box, Image, TMainHeaderInfoTypes, IQuestionProps, BoxWrap, Textarea, Tag, ETagLine, Radio } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME10601 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Words',
  };

  const questionInfo: IQuestionProps = {
    text: '중학생이 된 첫날 학교에 가져가고 싶은 물건을 고르고, 그 이유를 써 봅시다.',
  };

  const data = [
    {
      image: 'band',
      alt: '반창고',
      name: 'Band-Aid',
    },
    {
      image: 'candies',
      alt: '사탕 세 개',
      name: 'candies',
    },
    {
      image: 'ball',
      alt: '주황색 공',
      name: 'stress ball',
    },
    {
      image: 'mirror',
      alt: '손거울',
      name: 'mirror',
    },
    {
      image: 'notes',
      alt: '접착식 메모지',
      name: 'sticky notes',
    },
    {
      image: 'eraser',
      alt: '지우개',
      name: 'eraser',
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='완료하기'
    >
      <BoxWrap>
        <Box display='flex' flexWrap='wrap' gap='8px 10px' width='616px'>
          {data.map((value, index) => (
            <ContentWrap isActive={index === selectedIndex}>
              <Box hAlign='center' marginBottom={8}>
                <Image src={`/example/${value.image}.jpg`} alt={`${value.alt}`} />
              </Box>
              <Box hAlign='center'>
                <Radio type='circle' name='radio-group' label={value.name} onClick={() => setSelectedIndex(index)} />
              </Box>
            </ContentWrap>
          ))}
        </Box>
        <Box width='280px'>
          <Box marginBottom='8px'>
            <Tag type={ETagLine.GREEN} label='이유' />
          </Box>
          <Textarea height='calc(100% - 48px)' placeholder='내용을 넣어 주세요.' ariaLabel='답 입력란' />
        </Box>
      </BoxWrap>
    </Container>
  );
};

const ContentWrap = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 1;

  padding: 12px;
  border-radius: 8px;

  ${({ isActive }) =>
    isActive &&
    css`
      padding: 10px;
      box-shadow: 0px 4px 4px 0px #00000040;
      border: 2px solid var(--color-blue-300);
      background-color: var(--color-blue-50);
    `}
`;

export default ME10601;
