import { Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P12 = () => {
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
      To tackle this problem, extensive research across various websites and applications is being conducted to document the prevalence of dark
      patterns and come up with solutions.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        이 문제를 해결하기 위해서, 다양한 웹사이트와 응용프로그램에 대한 광범위한 연구가 다크 패턴의 확산을 입증하고 해결책을 마련하기 위해 진행되고
        있다.
      </Typography>
      <br />
      <br />
      In addition to research, governments are actively discussing on how to regulate these deceptive design patterns.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        연구 이외에도 정부들은 이러한 기만적인 디자인 패턴을 어떻게 규제할 것인지에 대해 적극적으로 논의하고 있다.
      </Typography>
      <br />
      <br />
      As individuals, we should be cautious while making purchases, read terms and conditions carefully, and recognize that companies’ interests may
      not be the same as our own.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        개인으로서 우리는 구매할 때 신중하고, 약관과 조건을 주의 깊게 읽고, 기업의 이익이 우리의 이익과 같지 않을 수 있음을 인식해야 한다.
      </Typography>
      <br />
      <br />
      Developing an awareness of dark patterns is also essential to avoid potential harm and economic loss.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        다크 패턴에 대한 인식을 형성하는 것 또한 잠재적인 피해와 경제적 손실을 피하기 위해 필수적이다.
      </Typography>
      <br />
      <br />
      Ultimately, our attention and efforts will protect us from manipulation and enable us to make wise decisions in this digital age.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        궁극적으로 우리의 관심과 노력이 조종으로부터 우리를 보호하고, 우리가 이 디지털 시대에 현명한 결정을 내릴 수 있도록 해 줄 것이다.
      </Typography>
      <br />
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          What should we do?
        </Typography>
      </Box>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          우리가 해야 할 것은 무엇인가?
        </Typography>
      </Box>
      <Box background={'white'} useRound height='80%' useFull>
        <Scroll tabIndex={0}>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P12;
