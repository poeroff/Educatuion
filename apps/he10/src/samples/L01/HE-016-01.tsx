import { BoxWrap, TMainHeaderInfoTypes, Box, Dialog, Textarea, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE01601 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Strategy in Use',
  };

  const questionInfo: IQuestionProps = {
    size: 'small',
    text: 'How many examples are presented that support how friendliness is related to survival?',
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(event.target.value);
  };

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
        <Box useFull background='white' useRound>
          <Scroll height='100%'>
            It's good to see you, everyone!
            <br />
            It's good to see you, everyone! <br />
            I'm Dr. Edward Wilson, an evolutionary biologist. <br />
            Thank you for inviting me here today. <br />
            On my way, I had trouble locating this room. <br />
            Luckily, a friendly student came up to me and walked me here.
          </Scroll>
        </Box>
        <Box useFull>
          <Textarea placeholder='내용을 넣어 주세요.' value={inputContent} onChange={handleInputChange} />
        </Box>
      </BoxWrap>
      <Dialog
        isShow={isShow}
        useFooter
        closeLabel='취소'
        confirmLabel='확인'
        onClose={() => setShow(!isShow)}
        onConfirm={() => setShow(!isShow)}
      ></Dialog>
    </Container>
  );
};

export default HE01601;
