import { Box, IQuestionProps, SvgIcon, Symbol, TMainHeaderInfoTypes, Image, BoxWrap, Typography, List } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../assets/icon/m_default_01.svg';

const EMA3101901 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPreview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Box marginRight='12px' vAlign='center'>
          <SvgIcon src={headerIcon} size='36px' />
        </Box>
        만화를 보며 이 단원에서 배우는 내용을 살펴보세요.
      </Box>
    ),
  };

  const data = [
    '① 1 cm보다 더 짧게는 얼마만큼의 길이인가요?',
    '② 시계에서 긴바늘, 짧은바늘 이외의 얇은 바늘은 어느 숫자를 가리키나요?',
    '③ 이 단원에서는 어떤 내용을 공부할 것 같나요?',
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
    >
      <List
        gap={24}
        data={data}
        row={item => {
          return (
            <Box marginBlock={4}>
              <Typography fontSize='32px' lineHeight='52px' color='var(--color-grey-900)'>
                {item.value}
              </Typography>
            </Box>
          );
        }}
      />
    </Container>
  );
};

export default EMA3101901;
