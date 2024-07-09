import { useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
  Image,
  TMainHeaderInfoTypes,
  SvgIcon,
  Typography,
  IQuestionProps,
  Scroll,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import QuestionIconBar from '@maidt-cntn/assets/icons/QuestionIconBar.svg';

const HE03301 = () => {
  const [value, setValue] = useState<string>('');
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Act Out',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Imagine you are one of the three artists and introduce your paintings based on the main text.',
  };

  const [opened, setOpened] = useState<boolean>(false);
  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const content =
    '“Hi, I’m Anna Ancher. I’m excited to share my artworks with you. The Maid in the Kitchen and Sewing​ Fisherman’s Wife focus on portraying women actively engaged in everyday tasks. Additionally,';

  return (
    <Container
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap>
        {/* TO-DO: chang to textarea */}
        <Box width='auto' hAlign='center'>
          <Image
            src={'/example/HE2-L03-C07-A03-P02-2.png'}
            width='330px'
            alt='모자를 쓰고 앞치마를 입은 채 한 손에 붓을 들고 환하게 웃는 여자 화가'
          />
        </Box>
        <Box width='100%' height='260px'>
          <Box background='blue' useRound useFull>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom={'24px'}>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='56px' onClick={handleButtonOnClick} />
                </Box>
                <Scroll height='calc(100% - 52px)' tabIndex={0}>
                  <Typography lineHeight='48px' useGap={false}>
                    {content}
                  </Typography>
                </Scroll>
              </>
            ) : (
              <Box hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>
      <Box vAlign='center' marginTop='20px'>
        <SvgIcon src={QuestionIconBar} width='6px' height='18px' />
        <Typography color='var(--color-blue-400)' weight='var(--font-weight-bold)'>
          Imagine you are Anna Ancher.
        </Typography>
      </Box>
      <Box>
        <Textarea
          value={value}
          onChange={event => setValue(event.target.value)}
          width='100%'
          height='200px'
          placeholder='내용을 넣어 주세요.'
          ariaLabel='답 입력란'
        />
      </Box>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE03301;
