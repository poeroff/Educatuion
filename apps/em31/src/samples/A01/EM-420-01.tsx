import { Box, IQuestionProps, Label, TMainHeaderInfoTypes, Image, EImageType } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM42001 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '삼각형을 이용하여 사각형의 네 각의 크기의 합 알아보기',
    iconType: 'search',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='#969590' marginRight={12} />
        사각형을 그려 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel='완료하기'
      onSubmit={() => {}}
      useRound
    >
      <Box useFull display='flex'>
        <Image type={EImageType.IMG_BG} src={'/example/EM-420-01/Group.png'} width='100%' height='385'>
          <Box marginTop='80px' marginLeft='30px'>
            그리기 도구
          </Box>
          {/* SB: 드로잉도구에 보더 삭제하고 배경이미지깔기 */}
        </Image>
      </Box>
    </Container>
  );
};
export default EM42001;
