import * as Style from './Tooltip.styled';

export default function Tooltip(props: { handleSubmit?: Function; children: React.ReactNode }) {
  const { children } = props;

  return (
    <Style.Wrapper>
      <Style.Contents>{children}</Style.Contents>
    </Style.Wrapper>
  );
}
