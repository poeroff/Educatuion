import { Container } from '@maidt-cntn/ui/math';
import { Puzzle } from '@maidt-cntn/ui/math';
import { Box, IQuestionProps, Label } from '@maidt-cntn/ui';

const EM01401 = () => {
  const headerInfo = null;

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        덧셈과 뺄셈을 하여 그림 조각을 맞춰 보세요.
      </>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound>
      <Box useFull vAlign='start' justifyContent='center'>
        {/* 퍼즐영역은 차후에 전달될 예정이라고 함. */}
        <Puzzle
          ariaLabel='임시 텍스트'
          rowNum={3}
          colNum={3}
          imgUrls={['', '', '', '', '', '', '', '', '']}
          imgAlts={[
            '이미지 1번 설명의 이미지',
            '이미지 2번 설명의 이미지',
            '이미지 3번 설명의 이미지',
            '이미지 4번 설명의 이미지',
            '이미지 5번 설명의 이미지',
            '이미지 6번 설명의 이미지',
            '이미지 7번 설명의 이미지',
            '이미지 8번 설명의 이미지',
            '이미지 9번 설명의 이미지',
          ]}
          eqNums={[
            ['324', '+115'],
            ['483', '+456'],
            ['229', '+683'],
            ['435', '+435'],
            ['742', '+266'],
            ['379', '+664'],
            ['631', '-237'],
            ['901', '-353'],
            ['741', '-214'],
          ]}
          tgtNums={[7, 0, 8, 5, 1, 3, 4, 6, 2]}
          onFinish={() => {}}
        />
      </Box>
    </Container>
  );
};

export default EM01401;
