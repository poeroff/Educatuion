import { MContainer } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getDefaultData, getCorrectData } from './pageData';
import ActivityWithNumber from './components/activityWithNumber';

const P04 = () => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData, pageSubmitted } = useCurrentPageData({
    initData: getDefaultData(4),
    collectDatas: getCorrectData(4),
  });

  function areAllValuesEmpty(...values: string[]): boolean {
    return values.every(value => value.trim() === '');
  }

  const isEmpty = areAllValuesEmpty(
    getValueInputData(0, 'TEXT-0') as string,
    getValueInputData(0, 'TEXT-1') as string,
    getValueInputData(0, 'TEXT-2') as string,
    getValueInputData(1, 'TEXT-0') as string,
    getValueInputData(1, 'TEXT-1') as string,
    getValueInputData(1, 'TEXT-2') as string,
  );

  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'creativeUpEmotion' }}
      questionInfo={{ text: <Title>소수로 암호 체계 만들기</Title> }}
      submitLabel='완료하기'
      onSubmit={submitPageData}
      submitDisabled={isEmpty || pageSubmitted}
    >
      <Content>
        <ContentTitleContainer>
          <ActivityWithNumber number={2} />
          <ContentTitle>두 모둠이 짝을 이루어 모둠별로 한 문장을 암호화하여 상대 모둠에 암호를 보내고, 받은 암호를 풀어 보자.</ContentTitle>
        </ContentTitleContainer>

        <ContentInner>
          <div>
            <ContentInnerHeader>
              <p>(1)</p>
              <p>암호 보내기</p>
            </ContentInnerHeader>
            <PasswordTable>
              <TableHead>암호 키</TableHead>
              <TableDiv>
                <TableInput
                  type='text'
                  value={getValueInputData(0, 'TEXT-0') as string}
                  onChange={e => changeInputData(0, 'TEXT-0', e.currentTarget.value)}
                  disabled={isSubmittedInput(0, 'TEXT-0')}
                />
              </TableDiv>
              <TableHead>메세지</TableHead>
              <TableDiv>
                <TableInput
                  type='text'
                  value={getValueInputData(0, 'TEXT-1') as string}
                  onChange={e => changeInputData(0, 'TEXT-1', e.currentTarget.value)}
                  disabled={isSubmittedInput(0, 'TEXT-1')}
                />
              </TableDiv>
              <TableHead style={{ borderBottom: 'none' }}>암호</TableHead>
              <TableDiv style={{ borderBottom: 'none' }}>
                <TableInput
                  type='text'
                  value={getValueInputData(0, 'TEXT-2') as string}
                  onChange={e => changeInputData(0, 'TEXT-2', e.currentTarget.value)}
                  disabled={isSubmittedInput(0, 'TEXT-2')}
                />
              </TableDiv>
            </PasswordTable>
          </div>

          <div>
            <ContentInnerHeader>
              <p>(2)</p>
              <p>암호 풀기</p>
            </ContentInnerHeader>
            <PasswordTable>
              <TableHead>암호 키</TableHead>
              <TableDiv>
                <TableInput
                  type='text'
                  value={getValueInputData(1, 'TEXT-0') as string}
                  onChange={e => changeInputData(1, 'TEXT-0', e.currentTarget.value)}
                  disabled={isSubmittedInput(1, 'TEXT-0')}
                />
              </TableDiv>
              <TableHead>메세지</TableHead>
              <TableDiv>
                <TableInput
                  type='text'
                  value={getValueInputData(1, 'TEXT-1') as string}
                  onChange={e => changeInputData(1, 'TEXT-1', e.currentTarget.value)}
                  disabled={isSubmittedInput(1, 'TEXT-1')}
                />
              </TableDiv>
              <TableHead style={{ borderBottom: 'none' }}>암호</TableHead>
              <TableDiv style={{ borderBottom: 'none' }}>
                <TableInput
                  type='text'
                  value={getValueInputData(1, 'TEXT-2') as string}
                  onChange={e => changeInputData(1, 'TEXT-2', e.currentTarget.value)}
                  disabled={isSubmittedInput(1, 'TEXT-2')}
                />
              </TableDiv>
            </PasswordTable>
          </div>
        </ContentInner>
      </Content>
    </MContainer>
  );
};

export default P04;

const PasswordTable = ({ children }: PropsWithChildren) => {
  return <Table>{children}</Table>;
};

const Table = styled.div`
  display: grid;
  grid-template-columns: 114px 263px;
  border: 1px solid var(--color-grey-200);

  border-radius: 8px;
  overflow: hidden;
  text-align: center;

  margin-left: 51px;

  figure {
    transform: translate(-15px, 30px);
  }
`;

const TableHead = styled.div`
  padding: 8px 0;

  font-family: SUIT;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  color: var(--color-grey-900);

  background-color: var(--color-grey-50);
  border-right: 1px solid var(--color-grey-200);
  border-bottom: 1px solid var(--color-grey-200);
`;

const TableDiv = styled.div`
  padding: 8px 0;

  font-family: SUIT;
  font-weight: 500;
  font-size: 28px;
  line-height: 40px;
  color: var(--color-grey-900);

  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-grey-200);
`;

const TableInput = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;

  background-color: var(--color-white);

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-family: SUIT;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  color: var(--color-grey-900);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentTitleContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ContentTitle = styled.p`
  font-family: SUIT;
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  color: var(--color-grey-900);
`;

const ContentInner = styled.div`
  display: flex;
  gap: 20px;

  margin-left: 120px;
`;

const ContentInnerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 10px;

  p {
    font-family: SUIT;
    font-weight: 600;
    font-size: 28px;
    line-height: 40px;
    color: var(--color-grey-900);
  }
`;
