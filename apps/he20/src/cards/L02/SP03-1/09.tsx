import { Box, TMainHeaderInfoTypes, Typography, Scroll, IQuestionProps, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P09 = () => {
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
          <Image src={'/L02/SP03-1/HE2-L02-SP03-1-P09.jpg'} width='320px' height='156.77px' />
          <Box type='hidden'>
            티켓 구매와 관련된 스마트폰 화면. 왼쪽 화면: "You'll pay $300 per ticket."라는 메시지가 있고, 그 아래에 "Go" 버튼이 있다. 오른쪽 화면:
            Ticket Price: $300 Service Fee: $80 Total: $380 이 이미지는 초기 비용으로 $300이 언급되지만, 최종 결제 금액은 추가 $80의 서비스 수수료가
            포함되어 총 $380이 된다는 점을 강조하고 있다.
          </Box>
        </PinchZoom>
      </Box>
      Another common type of dark pattern is known as “hidden fees.”
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        다크 패턴의 또 다른 흔한 유형은 ‘숨겨진 요금’이라고 알려져 있다.
      </Typography>
      <br />
      <br />
      This design suddenly adds extra fees at the last step of the ordering process.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        이 기법은 주문 과정의 마지막 단계에서 갑자기 추가 요금을 부과한다.
      </Typography>
      <br />
      <br />
      On the final page, consumers are surprised to discover additional charges, such as shipping or processing fees, which the seller has added to
      increase the final cost of the order.
      <br />
      <Typography color={'var(--color-blue-400)'} useGap={false}>
        마지막 페이지에서 소비자는 판매자가 주문의 최종 비용을 증가시키기 위해 추가한 배송 비용 또는 처리 비용과 같은 추가 요금을 발견하고 놀란다.
      </Typography>
      <br />
    </>
  );

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start'>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          A common practice of a dark pattern: hidden fees
        </Typography>
      </Box>
      <Box background='var(--color-grey-50)' border='none' padding='4px 12px' hAlign='center'>
        <Typography useGap={false} weight={700}>
          다크 패턴의 흔한 관행: 숨겨진 요금
        </Typography>
      </Box>
      <Box background={'white'} useRound height='80%' useFull>
        <Scroll tabIndex={0}>{data}</Scroll>
      </Box>
    </Container>
  );
};

export default P09;
