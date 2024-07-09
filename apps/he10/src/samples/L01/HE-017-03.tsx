import { BoxWrap, Box, TMainHeaderInfoTypes, Dialog, Button, EStyleButtonTypes, EStyleSizes, Textarea, Scroll, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE01703 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but String (1/5)',
  };
  const questionInfo = {
    text: 'Q1. Who is the speaker?',
  };

  const [opened, setOpened] = useState<boolean>(false);
  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const content =
    'It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way, I had trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in situations like this, we want to help someone in need. Now, this raises some interesting questions: where does our friendliness come from, and why is it important?';

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull>
        {/* TO-DO: chang to textarea */}
        <Box useFull marginRight='24px'>
          <Textarea width='100%' height='100%' placeholder='내용을 넣어 주세요.' />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='56px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE01703;
