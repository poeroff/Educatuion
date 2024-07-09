import { useState } from 'react';
import { Box, BoxWrap, Button, EStyleButtonTypes, TMainHeaderInfoTypes, Radio, Dialog, EStyleSizes, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE01701 = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [isShow, setShow] = useState(false);

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong',
  };

  const questionInfo = {
    text: 'Q1. Who is the speaker?',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
    >
      <BoxWrap useFull>
        <Box vAlign='center' hAlign='center' useFull>
          <Box>
            <Radio type={'circle'} align='vertical' name={'radio-question-A'} gap={8} label='Dr.Edward Wilson' value={false} isError />
            <Radio type={'circle'} align='vertical' name={'radio-question-A'} gap={8} label='A friendly student' value={true} />
          </Box>
        </Box>

        <Box useFull>
          <Box background='blue' useRound useFull>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom={'8px'}>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
                </Box>
                <Box height='calc(100% - 52px)'>
                  <Scroll>
                    It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way,
                    I had trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in
                    situations like this, we want to help someone in need. Now, this raises some interesting questions: where does our friendliness
                    come from, and why is it important?
                  </Scroll>
                </Box>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>

      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE01701;
