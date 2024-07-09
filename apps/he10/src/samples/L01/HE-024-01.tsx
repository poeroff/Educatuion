import { Box, TMainHeaderInfoTypes, Dialog, BoxWrap, File, Image, PinchZoom } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE02401 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Create and Present',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Look at the example to create your own.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull>
        <Box>
          <PinchZoom>
            <Image
              src='/example/HE1-L01-C10-A02-P05.jpg'
              alt='왼쪽에는 물로 이루어진 남성 캐릭터, 오른쪽에는 불로 이루어진 여성 캐릭터가 서로 마주보고 걷고 있다. '
              width='270px'
            />
          </PinchZoom>
        </Box>
        <Box useFull>
          <File cardStoreInfo={{ subjectCode: 'HE10', cardPath: '', page: '', index: 0, userId: 9999 }} />
        </Box>
      </BoxWrap>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE02401;
