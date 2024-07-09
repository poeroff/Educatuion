import { Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P08 = () => {
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
      <Box vAlign='center' hAlign='center'>
        <PinchZoom pinchType={'image'}>
          <Image src={'/L02/SP03-1/HE2-L02-SP03-1-P08.jpg'} width='320px' height='156.77px' />
          <Box type='hidden'>
            모바일 인터페이스의 세 가지 화면 첫 번째 화면: “Settings＂메뉴가 선택된 상태 두 번째 화면 : "Settings" 메뉴에서 "Account" 옵션이 선택된
            모습 세 번째 화면 : "Account" 메뉴에서 "Subscription" 옵션이 선택되었고, "Cancel Subscription" 버튼이 강조되어 있다.
          </Box>
        </PinchZoom>
      </Box>
      A widely used dark pattern is the practice of “forced continuity,” which requires users to pay a membership fee after a free trial ends.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        널리 사용되는 다크 패턴은 무료 체험이 종료된 후 사용자에게 회비를 지불하도록 요구하는 '강제된 연속성'이라는 관행이다.
      </Typography>
      <br />
      <br />
      Companies deliberately avoid informing users about the end of the free trial period or make the cancellation process complicated.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        기업들은 사용자에게 무료 체험 기간의 종료에 관해 알리는 것을 의도적으로 피하거나 취소 절차를 복잡하게 만든다.
      </Typography>
      <br />
      <br />
      As a result, users have to pay membership fees even if they no longer want to use the service.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        그 결과, 사용자는 더 이상 서비스를 이용하고 싶지 않아도 회비를 지불해야 한다.
      </Typography>
      <br />
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          A common practice of a dark pattern: forced continuity
        </Typography>
      </Box>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          다크 패턴의 흔한 관행: 강제된 연속성
        </Typography>
      </Box>
      <Box background={'white'} useRound height='80%' useFull>
        <Scroll tabIndex={0}>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P08;
