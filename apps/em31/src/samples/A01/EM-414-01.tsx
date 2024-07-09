import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, TMainHeaderInfoTypes, Label, Image, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import arrow from '@/assets/icon/brown_fill_arrow.svg';
import { boolean } from 'mathjs';

const EM41401 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '각도 어림 놀이 하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />원 모양 각도기를 만들어 보세요.
      </>
    ),
  };

  const [course1, setCourse1] = useState<boolean>(false);
  const [course2, setCourse2] = useState<boolean>(false);

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <BoxWrap justifyContent='flex-start' boxGap={32}>
        <Box vAlign='center'>
          <ProtractorButton onClick={() => setCourse1(true)}>
            <Box marginRight='24px'>
              <Image
                src='../../assets/example/EM-414-01/A-EM41-020005-0601_1.png'
                alt='각도기처럼 눈금이 있는 원모양 종이가 있습니다.'
                width='200px'
              />
            </Box>
            <SvgIcon src={arrow} width='99px' height='81px' />
          </ProtractorButton>
        </Box>
        {course1 && (
          <>
            <Box vAlign='center'>
              <ProtractorButton onClick={() => setCourse2(true)}>
                <Box marginRight='24px'>
                  <Image src='../../assets/example/EM-414-01/A-EM41-020005-0601_3.png' alt='눈금이 없는 원모양 종이가 있습니다.' width='200px' />
                </Box>
                <SvgIcon src={arrow} width='99px' height='81px' />
              </ProtractorButton>
            </Box>
            {course2 && (
              <Image
                src='../../assets/example/EM-414-01/A-EM41-020005-0601_2.png'
                alt='눈금이 있는 원모양 종이 위에 눈금이 없는 원모양 종이가 있습니다. 눈금이 없는 원모양 종이는 원의 중심에서 조각케익모양으로 일부가 잘려져 있습니다.'
                width='200px'
              />
            )}
          </>
        )}
      </BoxWrap>
    </Container>
  );
};

const ProtractorButton = styled.button`
  display: flex;
  align-items: center;
`;

export default EM41401;
