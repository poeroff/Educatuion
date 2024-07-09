import { IQuestionProps, Label, List, Radio, TMainHeaderInfoTypes, Image, Box, BoxWrap } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM05603 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '똑같이 나누어진 도형 찾기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='#969590' />
        똑같이 둘로 나누어진 도형을 모두 찾아보세요.
      </>
    ),
  };

  const dataArr = [
    {
      src: '/example/EM-056-03/MC31603_1.png',
      alt: '원이 대각선 방향으로 서로 다른 2조각으로 나뉜 그림입니다.',
      width: '140px',
      height: '114px',
      boxWidth: '164px',
      boxHeight: '142px',
    },
    {
      src: '/example/EM-056-03/MC31603_2.png',
      alt: '정사각형이 대각선 방향으로 서로 같은 2조각으로 나뉜 그림입니다.',
      width: '143px',
      height: '114px',
      boxWidth: '167px',
      boxHeight: '142px',
    },
    {
      src: '/example/EM-056-03/MC31603_3.png',
      alt: '정삼각형이 서로 다른 2조각으로 나뉜 그림입니다.',
      width: '138px',
      height: '114px',
      boxWidth: '162px',
      boxHeight: '142px',
    },
    {
      src: '/example/EM-056-03/MC31603_4.png',
      alt: '정사각형이 세로 방향으로 서로 같은 3조각으로 나뉜 그림입니다.',
      width: '144px',
      height: '114px',
      boxWidth: '168px',
      boxHeight: '142px',
    },
    {
      src: '/example/EM-056-03/MC31603_5.png',
      alt: '정사각형이 가로 방향으로 서로 다른 2조각으로 나뉜 그림입니다.',
      width: '140px',
      height: '113px',
      boxWidth: '164px',
      boxHeight: '137px',
    },
    {
      src: '/example/EM-056-03/MC31603_6.png',
      alt: '정삼각형이 세로 방향으로 서로 같은 2조각으로 나뉜 그림입니다.',
      width: '132px',
      height: '98px',
      boxWidth: '156px',
      boxHeight: '137px',
    },
    {
      src: '/example/EM-056-03/MC31603_7.png',
      alt: '원이 서로 같은 세 조각으로 나뉜 그림입니다.',
      width: '139px',
      height: '111px',
      boxWidth: '163px',
      boxHeight: '137px',
    },
    {
      src: '/example/EM-056-03/MC31603_8.png',
      alt: '정삼각형이 세로 방향으로 서로 다른 3조각으로 나뉜 그림입니다.',
      width: '137px',
      height: '100px',
      boxWidth: '161px',
      boxHeight: '137px',
    },
  ];

  const [radio, setRadio] = useState<number | null>(null);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={() => {}}
      submitLabel='채점하기'
      useRound
      vAlign='flex-start'
    >
      <Box useRound border='4px solid var(--color-grey-100)' padding='24px 20px'>
        <BoxWrap flexWrap='wrap' justifyContent='center'>
          {dataArr.map((item, index) => (
            <Radio name='radio-group' key={`radio-group-${index}`} gap={0} value={index === radio} onClick={() => setRadio(index)}>
              <Box
                border={radio === index ? '2px solid var(--color-blue-300)' : '2px solid transparent'}
                backgroundColor={radio === index ? 'var(--color-blue-50)' : 'transparent'}
                useShadow={radio === index ? true : false}
                display='flex'
                justifyContent='center'
                useRound
                padding='12px 12px 16px 12px'
                marginRight='24px'
                marginBottom={index < 4 ? '24px' : 0}
              >
                <Image {...item} width='140px' height='114px' />
              </Box>
            </Radio>
          ))}
        </BoxWrap>
      </Box>
    </Container>
  );
};

export default EM05603;
