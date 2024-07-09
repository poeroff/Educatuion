import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, PinchZoom, Image, BoxWrap, EStyleButtonTypes, Button } from '@maidt-cntn/ui';
import { useState, useCallback } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState<string>('');
  const contentImage = '/L04/C10/A02/HE2-L04-C10-A02-P04.jpg';

  const imageText = '로봇이 주문한 음식을 서빙하는 모습';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What Will Our Future Look Like?',
  };

  const questionInfo = {
    text: 'Make slides about your findings and and present it.',
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
            <Image src={contentImage} width='180px' height='300px' alt={imageText} />
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
