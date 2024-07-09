import { TMainHeaderInfoTypes, BoxWrap, PinchZoom, Image, Scroll } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (1)',
    headerPattern: 'text',
  };
  const udl = [
    '패널 1: 팀이 그의 휴대폰을 보며 신나서 외친다, "와! 무료 영화!" 휴대폰 텍스트: "STREAMNATION"과 "1 WEEK FREE" 배너',
    '패널 2: 휴대폰 화면 클로즈업. 휴대폰 텍스트: "1 WEEK FREE - Auto-Renewal After the Trial"',
    '패널 3: 팀이 그의 휴대폰에 입력한다. 휴대폰 텍스트: "Join Us"와 ID, Password, Email 입력란',
    '패널 4: 팀이 휴대폰에서 "Sign Up Completed" 버튼을 누른다. 팀 생각: "Oops! I must\'ve pressed the wrong button. But why is it here, anyway?!"',
    '패널 5: 패널 5: 팀이 그의 휴대폰에서 특별 할인 행사를 본다. 휴대폰 텍스트: "Only 1 dollar?! What a deal! Limited Time Offer 00:05:58"',
    '패널 6: 주문 세부 사항을 보여주는 휴대폰 화면 클로즈업. 휴대폰 텍스트: "ORDER NOW T-shirt $1, Delivery $15, Total $16" 팀 생각: "Huh...?"',
    `패널 7: 팀이 그의 구매를 합리화한다. 팀 생각: "Well, it's still a good price... I guess."`,
    '패널 8: 6일 후, 팀이 그의 휴대폰을 보며 실망한 표정을 짓는다. 팀 생각: "Uh... There are no good movies on this website. I\'d better cancel my subscription." 휴대폰 텍스트: "STREAMNATION"',
    '패널 9: 팀이 구독을 취소하려고 한다. 휴대폰 텍스트: "Cancellation Request. Are you sure?" 두 개의 버튼: "Stay Entertained"와 "Continue My Boring Life" 팀 생각: "Hey! My life isn\'t boring!"',
    '패널 10: 팀이 충격 받고 당황해 한다. 휴대폰 텍스트: "Thank you for your order. Auto-Renewal starts now." 팀: "Nooooo!"',
  ];
  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap useFull justifyContent='center'>
        <Scroll tabIndex={101}>
          <PinchZoom tabIndex={102}>
            <Image src={'/L02/C06/A03/HE2-L02-C06-A03-P01.jpg'} width='100%' height='100%' alt='' />
            <HiddenDev>
              {udl.map((udlItem, udlIndex) => (
                <p key={udlIndex}>{udlItem}</p>
              ))}
            </HiddenDev>
          </PinchZoom>
        </Scroll>
      </BoxWrap>
    </Container>
  );
};

const HiddenDev = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: -1;
  width: 1px;
  height: 1px;
  font-size: 1px;
  opacity: 0.01;
  clip: rect(1px, 1px, 1px, 1px);
`;

export default P01;
