import { Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P10 = () => {
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
          <Image src={'/L02/SP03-1/HE2-L02-SP03-1-P10.jpg'} width='320px' height='156.77px' />
          <Box type='hidden'>
            티켓 구매와 관련된 스마트폰 화면. 왼쪽 화면: "You'll pay $300 per ticket."라는 메시지가 있고, 그 아래에 "Go" 버튼이 있다. 오른쪽 화면:
            Ticket Price: $300 Service Fee: $80 Total: $380 이 이미지는 초기 비용으로 $300이 언급되지만, 최종 결제 금액은 추가 $80의 서비스 수수료가
            포함되어 총 $380이 된다는 점을 강조하고 있다.
          </Box>
        </PinchZoom>
      </Box>
      “Confirm-shaming” is another online trick that users should be aware of.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        ‘컨펌 쉐이밍’은 사용자들이 알아야 할 또 다른 온라인 속임수이다.
      </Typography>
      <br />
      <br />
      This technique manipulates users into feeling ashamed for cancelling their membership or requesting a refund for an order.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        이 기술은 멤버십을 취소하거나 주문에 대한 환불을 요청하는 것에 대해 부끄러움을 느끼도록 사용자들을 조종한다.
      </Typography>
      <br />
      <br />
      Companies use this to keep their members subscribed, even if it goes against the members’ intentions.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        기업들은 회원들의 의도에 어긋난다고 할지라도 회원들의 구독 상태를 유지하기 위해서 이를 사용한다.
      </Typography>
      <br />
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          A common practice of a dark pattern: confirm-shaming
        </Typography>
      </Box>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          다크 패턴의 흔한 관행: 컨펌 쉐이밍
        </Typography>
      </Box>
      <Box background={'white'} useRound height='80%' useFull>
        <Scroll tabIndex={0}>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P10;
