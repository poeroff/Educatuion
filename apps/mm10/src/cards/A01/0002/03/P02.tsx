import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';
import { Image } from '@maidt-cntn/ui';

const P02 = () => {
  const fileUrl = '/A01/0002/03/A-MM1-0102-03-02.png';

  return (
    <Container headerInfo={{}} vAlign='start' useExtend>
      <Content>
        <ExampleChip>보기</ExampleChip>

        <div style={{ position: 'relative' }}>
          <Image
            src={fileUrl ?? ''}
            alt='3곱하기3곱하기3곱하기3은 3이 4개이므로 3의 네제곱입니다. 5곱하기5곱하기5곱하기7곱하기7은 5가 3개, 7이 2개이므로 5의 세제곱 곱하기 7의 제곱입니다.'
            width='891px'
          />

          <Input top={69} left={153} maxLength={1} size='large' />
          <Input top={121.6} left={273.5} maxLength={1} size='large' />

          <Input top={69} left={560} maxLength={1} size='large' />
          <Input top={69} left={662.5} maxLength={1} size='large' />
          <Input top={123.5} left={767} maxLength={1} size='small' />
          <Input top={123.5} left={821.5} maxLength={1} size='small' />
        </div>
      </Content>
    </Container>
  );
};

export default P02;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin-top: 38px;
`;

const ExampleChip = styled.span`
  padding: 2px 16px;
  background-color: var(--color-grey-700);
  border-radius: 12px;

  font-family: SUIT;
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: var(--color-white);

  width: fit-content;
`;

const Input = styled.input<{ top: number; left: number; size: 'large' | 'small' }>`
  background-color: transparent;

  width: ${props => (props.size === 'large' ? '30px' : '15px')};
  height: ${props => (props.size === 'large' ? '30px' : '15px')};

  text-align: center;

  position: absolute;
  top: ${props => props.top + 'px'};
  left: ${props => props.left + 'px'};

  font-family: NOTO;
  font-weight: 400;
  font-size: ${props => (props.size === 'large' ? '28px' : '14px')};
`;
