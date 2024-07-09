import Style from './Divexplanation.style';

export interface IDivexplanation {
  explanation?: boolean;
  count?: number;
  children?: React.ReactNode;
}

export const Divexplanation = ({ children, explanation = false, count = 1 }: IDivexplanation) => {
  return (
    <Style.Container>
      {explanation ? (
        <>
          <Style.DivStyle>{children}</Style.DivStyle>
          <Style.explContainer explanation={explanation}>
            <Style.explStyle>
              <span>{count}</span>번
            </Style.explStyle>
          </Style.explContainer>
        </>
      ) : (
        <>
          <Style.DivStyle>{children}</Style.DivStyle>
          <Style.explContainer>
            <Style.explStyle>나누어지는 수</Style.explStyle>
            <Style.explStyle>나누는 수</Style.explStyle>
            <Style.explStyle>몫</Style.explStyle>
          </Style.explContainer>
        </>
      )}
    </Style.Container>
  );
};

export default Divexplanation;
