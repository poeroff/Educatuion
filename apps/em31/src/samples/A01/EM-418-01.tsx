import { Box, IQuestionProps, Label, TMainHeaderInfoTypes, SvgIcon, BoxWrap, Typography, Button } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import tryangle from '../../assets/example/EM-418-01/tryangle.svg';
import erasedTryangle from '../../assets/example/EM-418-01/erasedTryangle.svg';

const EM41801 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '각도기로 삼각형의 세 각의 크기의 합 알아보기',
    iconType: 'search',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='#969590' marginRight={12} />
        삼각형에서 점 ㄱ을 옮겨 다른 삼각형을 그려 보세요.
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
      <BoxWrap boxGap={24}>
        <Box display='flex' justifyContent='center' border='4px solid vaR(--color-grey-100)' padding='121px 0' borderRadius='8px' useFull>
          <SvgIcon src={tryangle} width='302px' height='160px' alt='삼각형이 있습니다. 삼각형 오른쪽 꼭짓점에 ㄱ으로 표시되어 있습니다.' />
        </Box>
        <Box display='flex' justifyContent='center' border='4px solid vaR(--color-grey-100)' padding='121px 0' borderRadius='8px' useFull>
          <SvgIcon
            src={erasedTryangle}
            width='302px'
            height='160px'
            alt='꼭짓점 ㄱ이랑 만나는 두 변이 모두 지워져 있고 다른 한 변만 남아 있습니다.'
          />
        </Box>
        <Box width='93px' height='93px' vAlign='center'>
          <Button
            width='93px'
            height='93px'
            style={{
              backgroundColor: 'var(--color-grey-100)',
              display: 'flex',
              flexDirection: 'column',
              padding: '0 5px 0 6px',
              borderRadius: 0,
            }}
          >
            <Typography fontSize='var(--font-size-18)' lineHeight='18px' color='var(--color-black)' style={{ whiteSpace: 'nowrap' }}>
              교구 버튼{' '}
            </Typography>
            <Typography fontSize='var(--font-size-10)' lineHeight='18px' color='var(--color-black)'>
              (고객 검토 후 반영 예정)
            </Typography>
          </Button>
        </Box>
      </BoxWrap>
    </Container>
  );
};
export default EM41801;
