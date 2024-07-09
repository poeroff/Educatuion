import { Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    size: 'large',
    text: '',
  };

  const data = (
    <>
      Dark patterns are manipulative designs on websites and applications that trick users into making unintended decisions.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        다크 패턴은 사용자들이 의도하지 않은 결정을 내리도록 속이는 웹사이트와 응용프로그램의 속임수 기법이다.
      </Typography>
      <br />
      <br />
      These deceptive practices often have consequences that cause financial damages to the users.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        이러한 기만적인 관행은 흔히 사용자들에게 금전적인 피해를 초래하는 결과를 낳는다.
      </Typography>
      <br />
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          What is a dark pattern?
        </Typography>
      </Box>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          다크 패턴이란 무엇인가?{' '}
        </Typography>
      </Box>

      <Box background={'white'} useRound height='80%' useFull>
        <Scroll tabIndex={0}>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P07;
