import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, EImageType, EStyleFontSizes, IQuestionProps, Image, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM02602 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    iconType: 'search',
    headerPattern: 'icon',
    headerText: '나눗셈식으로 나타내기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='#969590' color='var(--color-white)' />
        바둑돌 15개를 5개씩 묶어 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [BadukButtons, setBadukButtons] = useState<number[]>([]);
  const handleClick = (index: number) => {
    setBadukButtons(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <Box hAlign='center' flexDirection='column' gap='8px'>
        <Box display='flex' flexDirection='column' gap='8px' title='바둑돌이 모두 15개가 있습니다.'>
          {Array(3)
            .fill(null)
            .map((_, colIndex) => (
              <GoStoneWrap isActive={BadukButtons.includes(colIndex)}>
                {Array(5)
                  .fill(null)
                  .map((_, rowIndex) => (
                    <button
                      key={rowIndex}
                      type='button'
                      aria-label={`${colIndex + 1}줄 ${rowIndex + 1}번째 바둑돌 버튼`}
                      onClick={() => handleClick(colIndex)}
                    >
                      <Image type={EImageType.IMG_BG} src={`../../assets/example/EM-026-02/MC31303.png`} alt='' width='40px' height='41px' />
                    </button>
                  ))}
              </GoStoneWrap>
            ))}
        </Box>
        <Typography size={EStyleFontSizes['X-MEDIUM']}>* 바둑돌을 클릭해 보세요.</Typography>
      </Box>
    </Container>
  );
};

const GoStoneWrap = styled.div<{ isActive?: boolean }>`
  padding: 12px 26px;
  border-radius: 16px;

  ${({ isActive }) =>
    isActive &&
    `
    padding : 10px 24px;
    border: 2px solid #1E6EFA;
    background: var(--color-blue-50);
  `}

  > button + button {
    margin-left: 24px;
  }
`;

export default EM02602;
