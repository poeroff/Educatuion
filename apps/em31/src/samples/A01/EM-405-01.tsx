import styled from '@emotion/styled';
import { Box, ETagLine, IQuestionProps, Label, TMainHeaderInfoTypes, Tag, Image, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useRef, useState } from 'react';

const EM40501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '막대로 만든 각의 크기 비교하기',
    iconType: 'search',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Box vAlign='center'>
          <Label value={'ㄱ'} color='var(--color-white)' background='#969590' marginRight={12} />
          <Tag type={ETagLine.GREEN} label='준비물' />을 이용하여 각을 만들어 보세요.
        </Box>
      </>
    ),
  };

  const [isActive, setIsActive] = useState(false);
  const [angle, setAngle] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsActive(prevActive => !prevActive);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isActive) {
      setAngle(prevAngle => prevAngle + event.movementY * 0.5); // Y축 변화에 따라 각도 조정
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      setAngle(prevAngle => prevAngle - 5);
    } else if (event.key === 'ArrowDown') {
      setAngle(prevAngle => prevAngle + 5);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel='완료하기'
      onSubmit={() => {}}
      useRound
    >
      <Box display='flex' justifyContent='center' onClick={handleClick} cursor='pointer'>
        <Box display='flex' alignItems='end' height='220px' position='relative'>
          <Box position='relative' rotate='0deg'>
            <Image src='../../assets/example/EM-405-01/A-EM41-020002-0401_2.png' width='354px' height='48px' />
            <Box position='absolute' bottom='41px' left='-14px' rotate='-30deg'>
              <Bar className='bar' ref={barRef} style={{ transform: `rotate(${angle}deg)` }}>
                <Image src='../../assets/example/EM-405-01/A-EM41-020002-0401_2.png' width='354px' height='48px' />
              </Bar>
            </Box>
            <Dot />
          </Box>
          <Box position='absolute' top='-8px' left='250px' zIndex='-1'>
            <Image src='../../assets/example/EM-405-01/arrow.png' width='50px' height='86px' />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const Bar = styled.div`
  width: 354px; /* 막대의 길이 */
  height: 48px; /* 막대의 두께 */
  position: absolute;
  transform-origin: left center; /* 막대의 왼쪽 끝을 기준으로 회전 */
`;

const Dot = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: var(--color-black);
  border-radius: 50px;
  top: 19px;
  left: 9px;
  z-index: 999;
`;

export default EM40501;
