import { Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P11 = () => {
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
      As the competition in online markets has intensified, companies have begun to develop sneakier strategies to trick people into making purchases.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        온라인 시장에서의 경쟁이 심해지면서, 기업들은 사람들이 구매를 하도록 속이기 위한 더 교활한 전략을 개발하기 시작했다.
      </Typography>
      <br />
      <br />
      While these companies insist that they are simply using new types of marketing strategies, critics do not agree that dark patterns are valid
      marketing strategies.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        이러한 기업들은 그들이 단지 새로운 유형의 마케팅 전략을 사용한다고 주장하는 반면에, 비평가들은 다크 패턴이 정당한 마케팅 전략이라는 데
        동의하지 않는다.
      </Typography>
      <br />
      <br />
      Critics suggest that a real marketing strategy create value for both companies and customers, promoting positive and supportive relationships.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        비평가들은 진정한 마케팅 전략은 회사와 고객 모두를 위한 가치를 창출하여 긍정적이고 지지적인 관계를 촉진해야 한다고 제안한다.
      </Typography>
      <br />
      <br />
      Dark patterns, in contrast, not only manipulate customers to act against their intentions, but they can also lead to financial losses and
      personal data leaks.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        이와는 대조적으로, 다크 패턴은 소비자가 의도에 어긋나는 행동을 하도록 조종할 뿐만 아니라, 재정적 손실과 개인적인 정보의 유출도 초래할 수 있다.
      </Typography>
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          Dark Patterns: Deception or Marketing Strategy?
        </Typography>
      </Box>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          다크 패턴: 기만인가, 마케팅 전략인가?
        </Typography>
      </Box>
      <Box background={'white'} useRound height='80%' useFull>
        <Scroll tabIndex={0}>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P11;
