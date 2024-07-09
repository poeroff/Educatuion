import { BoxWrap, Box, TMainHeaderInfoTypes, Dialog, TextView, Input, Typography, ETextViewColor, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

import Pen from '@maidt-cntn/assets/icons/pen_color.svg';
import Help from '@maidt-cntn/assets/icons/help_circle_contained.svg';
import arrow from '../../assets/icon/arrow-icon.svg';

import styled from '@emotion/styled';

const HE02601 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Write and Share',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Ask your partner about their problems and think about helpful advice for them.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull height={'90%'}>
        <Box useFull>
          <TextView type={ETextViewColor.SKYBLUE} title={'My Partner’s Problem'} icon={Help} hAlign='center'>
            <Textarea placeholder='내용을 넣어 주세요.' />
          </TextView>
        </Box>

        <Box useFull>
          <TextView type={ETextViewColor.YELLOW} title={'My Advice'} height='100%' isBorder={false} icon={Pen} vAlign='start'>
            <Box width='100%' marginTop='12px'>
              <Input width='100%' onChange={() => {}} placeholder='내용을 넣어 주세요.' textAlign='center' value='' />
            </Box>
            <Box marginTop='24px' vAlign='center'>
              <ArrowImg src={arrow} alt='오른쪽 가르키는 화살표' />
              <Typography>This will help you</Typography>
              <Input width='140px' onChange={() => {}} placeholder='텍스트 입력' textAlign='center' value='' />
            </Box>
          </TextView>
        </Box>
      </BoxWrap>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

const ArrowImg = styled.img`
  width: 30px;
  height: 30px;
`;

export default HE02601;
