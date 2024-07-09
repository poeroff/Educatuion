import Style from './ExampleBox.style';

type ColorTypes = 'purple' | 'blue' | 'green' | 'yellow' | 'emerald' | 'pink';

type ExampleBoxProps = {
  color: ColorTypes;
  title: React.ReactNode;
  children?: React.ReactNode;
};

export const ExampleBox = ({ color, title, children }: ExampleBoxProps) => {
  return (
    <Style.Container>
      <Style.TitleBox color={color}>{title}</Style.TitleBox>
      <Style.ContentBox color={color}>{children}</Style.ContentBox>
    </Style.Container>
  );
};

export default ExampleBox;
