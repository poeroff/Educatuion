import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, PinchZoom, Image, Textarea, BoxWrap, EStyleButtonTypes, Button } from '@maidt-cntn/ui';
import { useState, useCallback } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState<string>('');
  const contentImage = '/L03/C10/A02/HE2-L03-C10-A02-P04.jpg';

  const imageText =
    'Chochungdo Cotton-Bag신사 임당의 조 충도 그림이 새겨져 있는 천 가방 사진Welcome to the National Museum of KoreaThis beautiful bag features a print of Shin Saimdang’s Chochungdo , which portrayscommon plants and insects in nature. It is a must-have fashion item that enhancesa person’s style. Just as people in Joseon believed that Chochungdo would bring them happiness, we hope that everyone carrying this bag will have good luck.';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Museums Around the World',
  };

  const questionInfo = {
    text: 'Design your goods and make a slide with a short description and present it.',
  };

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='제출하기'
      submitBtnColor={!isNotEmptyString(inputContent) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isSubmitted ? true : !isNotEmptyString(inputContent)}
      onSubmit={handleSubmit}
    >
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='290px' height='180px' alt={imageText} />
          </PinchZoom>
        </Box>

        <Box hAlign='center' width='calc(100% - 430px)' useFull>
          <Box background='var(--color-grey-100)' height={'200px'} width={'400px'} useRound vAlign='center' hAlign='center'>
            {/* todo : 파일 업로드 추후 별도 개발 예정 */}
            <Button>파일 업로드</Button>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P04;
