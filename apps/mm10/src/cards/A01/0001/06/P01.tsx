import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import ChatBubble from '@/components/A01/0001/06/ChatBubble';
import { Image } from '@maidt-cntn/ui';

const P01 = () => {
  const tooltipRef = useRef<HTMLButtonElement>(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const fileUrl1 = '/A01/0001/06/A-MM1-0101-06-01.png';
  const fileUrl2 = '/A01/0001/06/A-MM1-0101-06-01_1.png';

  return (
    <Container headerInfo={{}} useExtend>
      <Content>
        <Left>
          <Image src={fileUrl2 ?? ''} alt='1부터 50까지의 자연수' width='717px' height='303px' />

          <div>
            <Text>
              <HighlightedText>함께하기</HighlightedText>로부터 <Number>1</Number>부터 <Number>50</Number>까지 자연수 중에서 소수는
            </Text>
            <Text>
              <Number>&nbsp;&nbsp;&nbsp;2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47</Number>
            </Text>
            <Text>임을 알 수 있다.</Text>
          </div>
        </Left>

        <Right>
          <Image src={fileUrl1 ?? ''} alt='에라토스테네스' width='227px' height='401px' />
          <TooltipIcon ref={tooltipRef} onClick={() => setShowTooltip(true)} />
        </Right>
      </Content>

      {showTooltip && (
        <ChatBubble
          iconRef={tooltipRef}
          direction='top'
          text="왼쪽과 같이 소수를 찾는 방법을 고안하였다. 이 방법을 '에라토스테네스의 체'라고 한다."
          onClickClose={() => setShowTooltip(false)}
        />
      )}
    </Container>
  );
};

export default P01;

const Content = styled.div`
  display: flex;
  gap: 40px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Right = styled.div`
  position: relative;
`;

const Text = styled.div`
  font-family: SUIT;
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  color: var(--color-grey-900);
`;

const Number = styled.span`
  font-family: NOTO;
  font-weight: 400;
`;

const HighlightedText = styled.span`
  color: var(--color-grey-700);
`;

const TooltipIcon = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-pink-500);

  position: absolute;
  top: 0;
  right: 44px;
`;
