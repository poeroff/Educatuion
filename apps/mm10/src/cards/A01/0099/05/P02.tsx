import { MContainer } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { ESvgType, Label, SvgIcon } from '@maidt-cntn/ui';
import HeaderSVG from '@maidt-cntn/assets/icons/header/header_L_creativeUpEmotion.svg';
import ArrowSVG from '@/assets/A01/0099/05/A-MM1-010099-05-arrow.svg';

interface codeItemType {
  symbol: string;
  code: number;
}
interface codeDataType {
  category: string;
  items: codeItemType[];
}

interface textItem {
  labelNum: string;
  text: string;
}

interface BoxItem {
  title?: string;
  text: string;
  formula?: string;
  hasArrow?: boolean;
}

const codeData: codeDataType[] = [
  {
    category: '자음',
    items: [
      { symbol: 'ㄱ', code: 11 },
      { symbol: 'ㄴ', code: 12 },
      { symbol: 'ㄷ', code: 13 },
      { symbol: 'ㄹ', code: 14 },
      { symbol: 'ㅁ', code: 15 },
      { symbol: 'ㅂ', code: 16 },
      { symbol: 'ㅅ', code: 17 },
      { symbol: 'ㅇ', code: 18 },
      { symbol: 'ㅈ', code: 19 },
      { symbol: 'ㅊ', code: 20 },
      { symbol: 'ㅋ', code: 21 },
      { symbol: 'ㅌ', code: 22 },
      { symbol: 'ㅍ', code: 23 },
      { symbol: 'ㅎ', code: 24 },
    ],
  },
  {
    category: '모음',
    items: [
      { symbol: 'ㅏ', code: 41 },
      { symbol: 'ㅑ', code: 42 },
      { symbol: 'ㅓ', code: 43 },
      { symbol: 'ㅕ', code: 44 },
      { symbol: 'ㅗ', code: 45 },
      { symbol: 'ㅛ', code: 46 },
      { symbol: 'ㅜ', code: 47 },
      { symbol: 'ㅠ', code: 48 },
      { symbol: 'ㅡ', code: 49 },
      { symbol: 'ㅣ', code: 50 },
    ],
  },
];

const boxItems: BoxItem[] = [
  { title: '꿈', text: 'ㄲ ㅜ ㅁ', hasArrow: true },
  { text: 'ㄱ: ', formula: '11×53=583', hasArrow: true },
  { text: 'ㄱ: ', formula: '11×53=583' },
  { text: 'ㅜ: ', formula: '47×53=2491' },
  { text: 'ㅁ: ', formula: '15×53=795' },
];

const textItems: textItem[] = [
  {
    labelNum: '1',
    text: '위의 부호와 겹치지 않도록 50보다 큰 소수를 하나 골라 암호 키로 정하고, 이를 상대와 공유한다. 예를 들어 암호 키를 53으로 정하자.',
  },
  {
    labelNum: '2',
    text: "보내고 싶은 메시지가 '꿈'일 때, 오른쪽과 같은 방법으로 암호화 한다.",
  },
  {
    labelNum: '3',
    text: '상대방에게 암호문 583, 583, 2491, 795를 전송한다.',
  },
  {
    labelNum: '4',
    text: '상대방이 전송된 암호문을 보고, 암호 키를 53으로 각각 나누면 11, 11, 47, 15를 얻는다.',
  },
  {
    labelNum: '5',
    text: '위의 표에서 11, 11, 47, 15에 해당하는 ㄱ, ㄱ, ㅜ, ㅁ을 찾으면 원래의 메시지가 ‘꿈’임을 알 수 있다.',
  },
];

const P01 = () => {
  return (
    <MContainer
      headerInfo={{ headerText: <SvgIcon type={ESvgType.IMG} src={HeaderSVG} /> }}
      questionInfo={{ text: <Title>소수로 암호 체계 만들기</Title> }}
    >
      <Content>
          <ExampleText>다음은 소수를 이용하여 암호 체계를 만드는 아주 단순한 방법의 예이다.</ExampleText>
          <Table>
            {codeData.map((d: codeDataType, key) => (
              <tbody key={key}>
                <tr>
                  <TH scope='row' $order={1}>
                    {d.category}
                  </TH>
                  {d.items.map((item: { symbol: string; code: number }, key) => (
                    <td key={key}>{item.symbol}</td>
                  ))}
                </tr>
                <tr>
                  <TH scope='row' $order={2}>
                    부호
                  </TH>
                  {d.items.map((item: { symbol: string; code: number }, key) => (
                    <td key={key}>{item.code}</td>
                  ))}
                </tr>
              </tbody>
            ))}
          </Table>
          <TextContent>
            <Item>
              <Label background='#6A6D73' type={'paint'} value={textItems[0].labelNum} color={'white'} />
              <p>{textItems[0].text}</p>
            </Item>
            <Box>
              <div className='box-content'>
                {boxItems.map((item, index) => (
                  <div className='box-item' key={index}>
                    <span className='box-title'>{item.title ?? ''}</span>
                    <span className='box-arrow'>{item.hasArrow && <SvgIcon type={ESvgType.IMG} src={ArrowSVG} />}</span>
                    <div className='box-text'>
                      {item.text}
                      <span>{item.formula}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
            {textItems.map((item, index) => {
              if (index === 0) return null;
              return (
                <Item key={index}>
                  <Label background='#6A6D73' type={'paint'} value={item.labelNum} color={'white'} />
                  <p>{item.text}</p>
                </Item>
              );
            })}
          </TextContent>
      </Content>
    </MContainer>
  );
};

export default P01;

const Content = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

const Title = styled.div`
  width: 340px;
  height: 54px;
  font-family: SUIT;
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  text-align: left;
  color: var(--color-grey-900);
`;

const ExampleText = styled.div`
  height: 42px;
  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
  text-align: left;
  color: var(--color-grey-900);
`;

const Table = styled.table`
  height: 240px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;

  tbody {
    width: fit-content;
    border-radius: 8px 0px 0px 8px;
    border: 1px solid #e0e2e6;
  }

  td {
    border: 1px solid #e0e2e6;
    width: 48.57px;
    height: 58px;
    padding: 8px 0px 0px 0px;
    gap: 10px;
    background-color: white;
    text-align: center;
  }
`;

const TH = styled.th<{ $order: number }>`
  width: 114px;
  height: 58px;
  padding: 8px 20px 8px 20px;
  gap: 10px;
  background-color: #f8f8f8;
  border-radius: ${props => (props.$order === 1 ? '8px 0px 0px 0px;' : '0px 0px 0px 8px;')};
  border-bottom: ${props => props.$order === 1 && '1px solid #e0e2e6;'};

  font-family: SUIT;
  font-size: 28px;
  font-weight: 700;
  line-height: 40px;
  text-align: center;
`;

const TextContent = styled.div`
  height: 540px;
  margin-top: 40px;
  overflow: auto;
`;

const Item = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 20px;

  p {
    font-family: SUIT;
    font-size: 28px;
    font-weight: 600;
    line-height: 42px;
    color: var(--color-grey-900);
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

const Box = styled.div`
  width: 362px;
  height: 259px;

  background-color: white;
  border-radius: 15px;
  border: 1px solid #e0e2e6;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  float: right;
  margin-left: 34px;
  margin-right: 26px;
  padding: 25px 4px 24px 30px;

  .box-content {
    width: 328px;
    height: 210px;
    display: flex;
    flex-direction: column;
  }

  .box-item {
    display: flex;
    gap: 8px;
    height: 42px;
    width: 100%;
  }

  .box-title {
    width: 25px;
    height: 42px;
    font-family: SUIT;
    font-size: 28px;
    font-weight: 600;
    line-height: 42px;
    text-align: left;
    color: rgba(35, 36, 38, 1);
    background-color: white;
  }

  .box-arrow {
    width: 50px;
    height: 42px;
    font-family: SUIT;
    font-size: 28px;
    font-weight: 600;
    line-height: 42px;
    text-align: left;
    color: rgba(35, 36, 38, 1);
  }

  .box-text {
    font-family: SUIT;
    font-size: 28px;
    font-weight: 600;
    line-height: 42px;
    text-align: left;
    color: rgba(35, 36, 38, 1);

    span {
      font-family: NOTO;
      font-weight: 400;
    }
  }
`;
