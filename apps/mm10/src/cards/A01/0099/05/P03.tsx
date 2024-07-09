import { EStyleButtonTypes, ESvgType, Input, SvgIcon } from '@maidt-cntn/ui';
import { MContainer } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import ArrowSVG from '@/assets/A01/0099/05/A-MM1-010099-05-arrow.svg';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import ActivityWithNumber from './components/activityWithNumber';

export const P03 = () => {
  const { getValueInputData, changeInputData, submitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(3),
    collectDatas: getCorrectData(3),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: number | string) => {
    changeInputData(mainKey, subKey, value);
  };

  function areAllValuesEmpty(...values: string[]): boolean {
    return values.every(value => value.trim() === '');
  }

  const isEmpty = areAllValuesEmpty(
    getValueInputData(0, 'TEXT-0') as string,
    getValueInputData(1, 'TEXT-0') as string,
    getValueInputData(2, 'TEXT-0') as string,
    getValueInputData(3, 'TEXT-0') as string,
    getValueInputData(4, 'TEXT-0') as string,
    getValueInputData(5, 'TEXT-0') as string,
    getValueInputData(6, 'TEXT-0') as string,
    getValueInputData(7, 'TEXT-0') as string,
    getValueInputData(8, 'TEXT-0') as string,
  );

  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'creativeUpEmotion' }}
      questionInfo={{ text: <Title>소수로 암호 체계 만들기</Title> }}
      onSubmit={submitPageData}
      submitLabel='완료하기'
      submitDisabled={isEmpty || pageSubmitted}
      submitBtnColor={EStyleButtonTypes.SECONDARY}
    >
      <Content>
        <MainBody>
          <SubTitle>
            <span>
              <ActivityWithNumber number={1} />
            </span>
            <span className='question'>모둠별로 암호 키를 정하고, 다음 표를 완성하여 ‘행복’을 암호화해 보자.</span>
          </SubTitle>
          <ItemContainer>
            <div className='item'>
              <span className='item-number'>(1)</span>
              <span className='item-text'>암호 키 : </span>
              <Input
                status={'enable'}
                width='100%'
                value={getValueInputData(0, 'TEXT-0') as string}
                onChange={event => {
                  handleChangeInputData(0, 'TEXT-0', event?.target.value);
                }}
              />
            </div>
            <div className='item' style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <span className='item-number'>(2)</span>
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th style={{ width: '114px' }}>메세지</th>
                      <th style={{ width: '282px' }}>암호화</th>
                      <th style={{ width: '114px' }}>메세지</th>
                      <th style={{ width: '282px' }}>암호화</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ㅎ</td>
                      <td>
                        <input
                          value={getValueInputData(1, 'TEXT-0') as string}
                          onChange={event => {
                            handleChangeInputData(1, 'TEXT-0', event?.target.value);
                          }}
                        />
                      </td>
                      <td>ㅂ</td>
                      <td>
                        <input
                          value={getValueInputData(2, 'TEXT-0') as string}
                          onChange={event => {
                            handleChangeInputData(2, 'TEXT-0', event?.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>ㅏ</td>
                      <td>
                        <input
                          value={getValueInputData(3, 'TEXT-0') as string}
                          onChange={event => {
                            handleChangeInputData(3, 'TEXT-0', event?.target.value);
                          }}
                        />
                      </td>
                      <td>ㅗ</td>
                      <td>
                        <input
                          value={getValueInputData(4, 'TEXT-0') as string}
                          onChange={event => {
                            handleChangeInputData(4, 'TEXT-0', event?.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>ㅣ</td>
                      <td>
                        <input
                          value={getValueInputData(5, 'TEXT-0') as string}
                          onChange={event => {
                            handleChangeInputData(5, 'TEXT-0', event?.target.value);
                          }}
                        />
                      </td>
                      <td>ㅏ</td>
                      <td>
                        <input
                          value={getValueInputData(6, 'TEXT-0') as string}
                          onChange={event => {
                            handleChangeInputData(6, 'TEXT-0', event?.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>ㅇ</td>
                      <td>
                        <input
                          value={getValueInputData(7, 'TEXT-0') as string}
                          onChange={event => {
                            handleChangeInputData(7, 'TEXT-0', event?.target.value);
                          }}
                        />
                      </td>
                      <td style={{ backgroundColor: '#F8F8F8' }}></td>
                      <td style={{ backgroundColor: '#F8F8F8' }}></td>
                    </tr>
                  </tbody>
                </Table>
              </TableContainer>
            </div>
            <div className='item'>
              <Answer>
                <span className='answer-arrow'>
                  <SvgIcon type={ESvgType.IMG} src={ArrowSVG} />
                </span>
                <span>암호문:</span>
                <Input
                  status={'enable'}
                  width='100%'
                  value={getValueInputData(8, 'TEXT-0') as string}
                  onChange={event => {
                    handleChangeInputData(8, 'TEXT-0', event?.target.value);
                  }}
                />
              </Answer>
            </div>
          </ItemContainer>
        </MainBody>
      </Content>
    </MContainer>
  );
};

export default P03;

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
  figure {
    transform: translateX(-15px);
  }
`;

const MainBody = styled.div`
  width: 1000px;
`;

const SubTitle = styled.div`
  display: flex;
  gap: 20px;

  .question {
    font-family: SUIT;
    font-size: 28px;
    font-weight: 500;
    line-height: 42px;
    text-align: left;
    color: var(--color-grey-900);
  }
`;

const ItemContainer = styled.div`
  width: 840px;

  gap: 80px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .item {
    display: flex;
    gap: 10px;
    height: fit-content;
    display: flex;
    align-items: center;
  }

  .item-number,
  .item-text {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }

  input {
    width: 312px;
    height: 58px;
    padding: 8px 12px;
    gap: 8px;
  }
`;

const TableContainer = styled.div`
  border: 1px solid #e0e2e6;
  border-radius: 8px;
`;
const Table = styled.table`
  width: 792px;
  height: 284px;
  border-radius: 8px;
  border: 1px solid #e0e2e6;
  border-collapse: collapse;

  th {
    border: 1px solid #e0e2e6;
    background-color: #f8f8f8;
    padding: 8px;
    font-family: SUIT;
    font-size: 28px;
    font-weight: 700;
    line-height: 42px;
    text-align: center;
  }

  td {
    border: 1px solid #e0e2e6;
    padding: 2px;
    background-color: #ffffff;
    font-family: SUIT;
    font-size: 28px;
    font-weight: 500;
    line-height: 40px;
    text-align: center;
  }

  th:first-child,
  th:last-child {
    border: none;
  }

  tr:last-child > td:last-child {
    border: none;
  }

  tr:last-child > td:first-child {
    border: none;
  }

  tr:first-child th:first-child {
    border-top-left-radius: 8px;
  }

  tr:first-child th:last-child {
    border-top-right-radius: 8px;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
  }

  input {
    width: 100%;
    height: 100%;

    &:focus {
      outline: none;
    }
  }
`;

const Answer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 50px;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }

  input {
    width: 312px;
    height: 58px;
    padding: 8px 12px 8px 12px;
  }
`;
