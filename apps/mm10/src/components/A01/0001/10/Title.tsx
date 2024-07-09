import styled from 'styled-components';

interface TitleProps {
  num: number;
  text: string;
  noMargin?: boolean;
  children?: React.ReactNode;
}
const Title = ({ num, text, noMargin, children }: TitleProps) => (
  <Text $noMargin={noMargin}>
    <Num>
      {num}
      {children}
    </Num>
    {text}
  </Text>
);

export default Title;

const Text = styled.div<{ $noMargin: boolean | undefined }>`
  font-size: 32px;
  color: var(--color-grey-900);
  line-height: 58px;
  font-family: 'SUIT';
  font-weight: 500;
  margin-left: -16px;
  display: flex;
  gap: 10px;
  margin-bottom: ${props => (props.$noMargin ? 0 : '22px')};
`;

const Num = styled.div`
  position: relative;
  font-size: 36px;
  color: #2f38c7;
  line-height: 58px;
  font-family: 'SUIT';
  font-weight: 600;
`;
