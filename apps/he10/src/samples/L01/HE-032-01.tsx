import { StyleReceipt, TMainHeaderInfoTypes, Input, Typography, Box, EStyleFontSizes, IQuestionProps, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

export const HE03201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Complete the bill using information from the dialogue.',
  };

  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');

  const onSubmit = () => {
    console.log('check the answer');
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
    right: 10,
    top: 10,
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      onSubmit={onSubmit}
      submitLabel={'채점하기'}
    >
      <StyleReceipt.BackgroundWrap>
        <StyleReceipt.Content>
          <StyleReceipt.TextWrap>
            <Box paddingTop='30px' paddingLeft='12px' width='422px'>
              <Typography weight={900} size={EStyleFontSizes.SMALL}>
                Item
              </Typography>
            </Box>
            <Box paddingTop='30px' width='100px' hAlign='right' marginLeft='20px'>
              <Typography weight={900} size={EStyleFontSizes.SMALL}>
                Qty
              </Typography>
            </Box>
            <Box paddingTop='30px' width='307px' hAlign='right' marginLeft='20px'>
              <Typography weight={900} size={EStyleFontSizes.SMALL}>
                Price
              </Typography>
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box paddingLeft='12px' width='430px' vAlign='left'>
              <StyleReceipt.ContentText weight={800}>ORGANIC COTTEN SWEATER</StyleReceipt.ContentText>
            </Box>
            <Box width='100px' hAlign='right' marginLeft='10px'>
              <StyleReceipt.ContentText weight={500}>1</StyleReceipt.ContentText>
            </Box>
            <Box width='307px' hAlign='right' marginLeft='20px'>
              <StyleReceipt.ContentText weight={500}>$50</StyleReceipt.ContentText>
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box paddingLeft='15px' width='553px' marginTop='12px'>
              <StyleReceipt.ContentText weight={500}>(1)</StyleReceipt.ContentText>
              <Input value={ans1} onChange={event => setAns1(event.target.value)} placeholder='내용을 넣어 주세요.' width='225px' maxLength={30} />
              <StyleReceipt.ContentText weight={500}>% off</StyleReceipt.ContentText>
            </Box>
            <Box marginTop='12px'>
              <StyleReceipt.ContentText weight={500}>-$ (2)</StyleReceipt.ContentText>
              <Input value={ans2} onChange={event => setAns2(event.target.value)} placeholder='내용을 넣어 주세요.' width='225px' maxLength={30} />
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box paddingLeft='15px' width='553px' marginTop='8px'>
              <StyleReceipt.ContentText weight={500}>New Membershop Coupon</StyleReceipt.ContentText>
            </Box>
            <Box marginTop='8px'>
              <StyleReceipt.ContentText weight={500}>-$ (3)</StyleReceipt.ContentText>
              <Input value={ans3} onChange={event => setAns3(event.target.value)} placeholder='내용을 넣어 주세요.' width='225px' maxLength={30} />
            </Box>
          </StyleReceipt.TextWrap>
          <StyleReceipt.TextWrap>
            <Box width='566px' marginTop='25px' hAlign='center'>
              <Typography weight={800} size={EStyleFontSizes.MEDIUM}>
                Total
              </Typography>
            </Box>
            <Box marginTop='25px'>
              <StyleReceipt.ContentText weight={500}>$ (4)</StyleReceipt.ContentText>
              <Input value={ans4} onChange={event => setAns4(event.target.value)} placeholder='내용을 넣어 주세요.' width='225px' maxLength={30} />
            </Box>
          </StyleReceipt.TextWrap>
        </StyleReceipt.Content>
      </StyleReceipt.BackgroundWrap>
    </Container>
  );
};

export default HE03201;
