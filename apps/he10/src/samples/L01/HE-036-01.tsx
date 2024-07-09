import {
  Box,
  TMainHeaderInfoTypes,
  BoxWrap,
  Input,
  PinchZoom,
  List,
  SvgIcon,
  Image,
  Scroll,
  Question,
  IAudioPlayerProps,
  IQuestionProps,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import arrow_right from '@/assets/icon/arrow_right.svg';
import styled from '@emotion/styled';

const HE03601 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Question size='medium'>2. &nbsp;</Question>
        Find the three parts that are NOT true according to the ad and correct them.
      </>
    ),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  const data = [{ num: '(1)' }, { num: '(2)' }, { num: '(3)' }];

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='flex-start' useExtend submitLabel='완료하기'>
      <Scroll tabIndex={0}>
        <BoxWrap>
          <Box useFull hAlign='center'>
            <PinchZoom>
              <Image src={'/example/HE2-L02-C04-A02-02.jpg'} width='699px' height='239px' />
              <Box type='hidden'>
                <p>제목: GREEN PLUS Skin-Care Set</p>
                <p>내용1. Facial Wash & Cream</p>
                <p>내용2. All-natural ingredients and vitamins</p>
                <p>내용3. More than 85% customer satisfaction</p>
                <p>내용5. 40달러에서 20달러로 할인되는 표시</p>
                <p>내용6. Leave a photo review and get a free sample of hair conditioner!</p>
              </Box>
            </PinchZoom>
          </Box>
        </BoxWrap>

        <BoxWrap>
          <Box useFull hAlign='center'>
            <Typography>errors</Typography>
          </Box>
          <Box useFull hAlign='center'>
            <Typography>corrections</Typography>
          </Box>
        </BoxWrap>
        <Box vAlign='center' marginTop='9px'>
          <List data={data}>
            {({ value }) => (
              <Box hAlign='center'>
                <Box width='56px'>
                  <Question type='text' size='small'>
                    {value?.num || '(undefined)'}
                  </Question>
                </Box>
                <ItemWrap>
                  <Input width='410px' placeholder='내용을 넣어 주세요.' ariaLabel='답 입력란' />
                  <SvgIcon src={arrow_right} size='38px' />
                  <Input width='410px' placeholder='내용을 넣어 주세요.' ariaLabel='답 입력란' />
                </ItemWrap>
              </Box>
            )}
          </List>
        </Box>
      </Scroll>
    </Container>
  );
};

export default HE03601;

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0px;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
