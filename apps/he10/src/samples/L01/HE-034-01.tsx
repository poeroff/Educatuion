import {
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  Image,
  Label,
  Scroll,
  SvgIcon,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import profileIcon from '../../assets/icon/profile_icon.svg';
import { useState } from 'react';

const HE03401 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Design and Sav',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose one of the dark patterns in the main text and make the design user-friendly. Then, describe your design.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={EStyleButtonTypes.PRIMARY}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Scroll height='100%' tabIndex={0}>
        <BoxWrap>
          <Box>
            <Image src={'/HE2-L02-C07-A03-P02-01.jpg'} width='330px' height='330px' />
            <Box type='hidden'>
              계산서 Order Details Confirm and Pay You’ll pay 300 dollar per ticket. Ticket Price 300 dollar Service Fee 80 dollar Total 380 dollar
            </Box>
          </Box>
          <Box useFull width='calc(100% - 330px)'>
            <Box hAlign='space-between'>
              <Box vAlign='center' whiteSpace='nowrap'>
                <Label type='step' value={1} />
                <Typography size={EStyleFontSizes['X-MEDIUM']} weight={700}>
                  Make the design user-friendly
                </Typography>
              </Box>
              <Button
                label={'지문보기'}
                color={EStyleButtonTypes.SECONDARY}
                size={EStyleSizes['SMALL']}
                minWidth='96px'
                useRound
                onClick={() => {}}
              />
            </Box>
            <Box marginTop='8px' useFull>
              {/* 그리기 도구 영역 */}
            </Box>
          </Box>
        </BoxWrap>
        <Box vAlign='start' marginTop='20px'>
          <SvgIcon src={profileIcon} width='38px' height='50px' />
          <Box type='hidden'>I :</Box>
          <Box background='blue' border='none' useRound hAlign='center' padding='0 12px' marginLeft='8px' width='calc(100% - 38px)'>
            <Typography>
              I chose “hidden fees” and made them user-friendly. Before the change, users may have been surprised at the final step of the ordering
              process. With my changes, however, ...
            </Typography>
          </Box>
        </Box>
      </Scroll>
    </Container>
  );
};

export default HE03401;
