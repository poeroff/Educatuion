import { Container } from '@maidt-cntn/ui/en';
import { TMainHeaderInfoTypes, IQuestionProps, Typography, BoxWrap, Button, Input, EStyleButtonTypes, Rating } from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useState } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { tokenAtom } from '@maidt-cntn/stores/token';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';

interface PageInfo {
  mainKey: number;
  subKey: string;
  pageNumber: number;
  headerText: string;
  questionText: string;
}

export interface Person {
  name: string | undefined;
  scoreList: Array<number>;
}

interface EEL01C04A03P06 {
  questions: string[];
  pageInfo: PageInfo;
  personList: Person[];
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | null;
    }[][];
  }[];
}

const prefix = import.meta.env.VITE_CDN_PATH;
const iconInfo = '/close_btn.png';

const EEL01C04A03P06 = ({ questions, pageInfo, personList, getDefaultData, getCorrectData }: EEL01C04A03P06) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(6),
    collectDatas: getCorrectData(6),
  });
  const [iconSrc, setIconSrc] = useState<string>('');

  const [{ accessToken }] = useRecoilState(tokenAtom);

  useEffect(() => {
    if (accessToken) {
      setIconSrc(getFileFromCDNWithToken(prefix + iconInfo, accessToken));
    }
  }, [accessToken]);

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: pageInfo.headerText,
  };

  const questionInfo: IQuestionProps = {
    text: pageInfo.questionText,
  };

  const isComplete: boolean = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);
  const currentAnswer = getValueInputData(pageInfo.mainKey, pageInfo.subKey);

  interface Person {
    name: string | undefined;
    scoreList: Array<number>;
  }

  const [personLists, setPersonList] = useState<Array<Person>>(() => {
    if ((currentAnswer as string) !== '') {
      return JSON.parse(currentAnswer as string);
    }
    return personList;
  });

  const addPerson = () => {
    setPersonList(prevPersonList => {
      const updatedPersonList = [...prevPersonList, { name: undefined, scoreList: [0, 0, 0, 0] }];
      return updatedPersonList;
    });
  };

  const updateName = (index: number, newName: string) => {
    setPersonList(prevPersonList => {
      const updatedPersonList = [...prevPersonList];
      updatedPersonList[index].name = newName;
      return updatedPersonList;
    });
  };

  const removePerson = (index: number) => {
    setPersonList(prevPersonList => {
      const updatedPersonList = [...prevPersonList];
      updatedPersonList.splice(index, 1);
      return updatedPersonList;
    });
  };

  const updateScore = (personIndex: number, questionIndex: number, score: number) => {
    setPersonList(prevPersonList => {
      const updatedPersonList = [...prevPersonList];
      updatedPersonList[personIndex].scoreList[questionIndex] = score;
      return updatedPersonList;
    });
  };

  const handleSubmit = () => {
    if (!areAllScoresChecked()) return;
    if (!isComplete) {
      submitPageData();
      return;
    }
  };

  const areAllScoresChecked = (): boolean => {
    return personLists.every(person => person.scoreList.every(score => score !== 0) && person.name !== undefined && person.name.trim() !== '');
  };

  useEffect(() => {
    handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, JSON.stringify(personLists));
  }, [personLists]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={handleSubmit}
      submitDisabled={isComplete || !areAllScoresChecked()}
      submitBtnColor={areAllScoresChecked() ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap useFull>
        <CustomTable>
          <thead>
            <tr>
              <td></td>
              {personLists.map((person: Person, index: number) => (
                <TheadCell key={index}>
                  <Input
                    value={person.name ? person.name : ''}
                    width='130px'
                    textAlign='center'
                    placeholder='친구 이름'
                    onChange={e => updateName(index, e.target.value)}
                    disabled={isComplete}
                  ></Input>
                </TheadCell>
              ))}
              <td></td>
            </tr>
          </thead>
          <tbody>
            {questions.map((question: string, index: number) => (
              <tr key={`question_${index}`}>
                <QuestionCell>
                  <CustomLabel>{index + 1}</CustomLabel>
                  <Typography weight={500} color='var(--color-grey-900)'>
                    {question}
                  </Typography>
                </QuestionCell>
                {personLists.map((person: Person, personIndex: number) => (
                  <RatingCell key={`person_${personIndex}`}>
                    <Rating
                      score={person.scoreList[index]}
                      onChange={newScore => updateScore(personIndex, index, newScore)}
                      readOnly={isComplete}
                    ></Rating>
                  </RatingCell>
                ))}
                {index === 0 && personLists.length < 4 && !isComplete && (
                  <AddCell rowSpan={4}>
                    <Button color={EStyleButtonTypes.SECONDARY} label='+ 친구 추가하기' width='157px' height='44px' onClick={addPerson} useRound />
                  </AddCell>
                )}
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              {personLists.map(
                (person: Person, personIndex: number) =>
                  personIndex !== 0 &&
                  !isComplete && (
                    <DeleteCell key={personIndex}>
                      <CustomButton onClick={() => removePerson(personIndex)}>
                        <img src={iconSrc} alt='close' />
                      </CustomButton>
                    </DeleteCell>
                  ),
              )}
            </tr>
          </tbody>
        </CustomTable>
      </BoxWrap>
    </Container>
  );
};

const CustomTable = styled.table`
  height: 336px;
  margin-top: 0px;
  margin-left: -35px;
  padding: 20px 0px 10px 0px;
  gap: 40px;
  position: absolute;
  td {
    height: 62px;
  }
`;

const QuestionCell = styled.td`
  // width: 296px;
  width: 310px;
  vertical-align: middle;
  margin: 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RatingCell = styled.td`
  // width: 148px;
  width: 165px;
  vertical-align: middle;
  margin: 5px;
  text-align: center;
  z-index: -10;
`;

const TheadCell = styled.td`
  text-align: center;
  vertical-align: middle;
`;

const AddCell = styled.td`
  vertical-align: middle;
  text-align: center;
`;

const DeleteCell = styled.td`
  text-align: center;
`;

const CustomButton = styled.button`
  // background-color: #f8f8f8;
  // color: #8d9299;
  // font-size: 16px;
  height: 28px;
  width: 28px;
  border-radius: 100%;
`;

const CustomLabel = styled.div`
  background-color: #1e78ff;
  color: #ffffff;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-right: 5px;
`;

export default EEL01C04A03P06;
