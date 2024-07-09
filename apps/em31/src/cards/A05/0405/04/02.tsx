import { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  Label,
  Scroll,
  TBody,
  TD,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A05040504_store } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, saveData, submitData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A05040504_store);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  const pageKey = 'P02';

  const th_arr = ['물건', '어림한 길이', '잰 길이'];
  const td_arr = [
    '연필심',
    '연필',
    <Input
      value={cardData.P02.answer2[0][0]}
      onChange={e => handleInputChange2(0, 0, e.target.value)}
      readOnly={cardData.P02.isSubmitted}
      ariaLabel='1번 물건 입력란'
      width='155px'
    />,
    <Input
      value={cardData.P02.answer2[0][1]}
      onChange={e => handleInputChange2(0, 1, e.target.value)}
      width='155px'
      readOnly={cardData.P02.isSubmitted}
      ariaLabel='2번 물건 입력란'
    />,
  ];

  const td_arr_answer = [
    '연필심',
    '연필',
    <Input value={'클립'} width='155px' readOnly={true} ariaLabel='1번 물건 예시 답안란' />,
    <Input value={'가위'} width='155px' readOnly={true} ariaLabel='1번 물건 예시 답안란' />,
  ];

  const bottomSheetAnswer = [
    ['5mm', '6mm'],
    ['9cm 8mm', '8cm 5mm'],
    ['약 33mm', '34mm'],
    ['약 15cm', '16cm 2mm'],
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '물건의 길이 어림하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        <Label value='ㄱ' color='var(--color-white)' background='#969590' cssStyle={{ margin: '10px 12px 10px 3px' }} />
        에서 잰 둘째 손가락의 너비와 길이를 이용하여 여러 가지 물건의 길이를 어림하고 자로 재어 확인해 보세요.
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [
            ['', ''],
            ['', ''],
            ['', ''],
            ['', ''],
          ],
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: [['', '']],
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P02: {
            ...prev.P02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P02.answer,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P02.answer2,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newAnswers = cardData.P02.answer.map(row => [...row]);
    newAnswers[rowIndex][colIndex] = value;
    setCardData(prevData => ({
      ...prevData,
      P02: {
        ...prevData.P02,
        answer: newAnswers,
      },
    }));
    changeData(pageKey, 1, 1, newAnswers);
  };

  const handleInputChange2 = (rowIndex: number, colIndex: number, value: string) => {
    const newAnswers = cardData.P02.answer2.map(row => [...row]);
    newAnswers[rowIndex][colIndex] = value;
    setCardData(prevData => ({
      ...prevData,
      P02: {
        ...prevData.P02,
        answer2: newAnswers,
      },
    }));
    changeData(pageKey, 1, 2, newAnswers);
  };

  const handleSubmit = () => {
    if (!cardData.P02.isSubmitted) {
      setCardData(prev => ({ ...prev, P02: { ...prev.P02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.P02.answer,
            },
            {
              subKey: 2,
              type: 'TEXT_LIST',
              value: cardData.P02.answer2,
            },
          ],
        },
      ];
      submitData(pageKey, userSubmission);
    } else {
      setIsAnswerOpen(!isAnswerOpen);
    }
  };

  const getButtonColor = () => {
    if (!cardData?.P02.isSubmitted) {
      return !(cardData.P02.answer?.every(row => row.every(val => val)) && cardData.P02.answer2?.every(row => row.every(val => val)))
        ? EStyleButtonTypes.SECONDARY
        : EStyleButtonTypes.YELLOW;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  const getSubmitLabel = () => (cardData.P02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기');
  const isSubmitDisabled = () =>
    !(cardData.P02.answer?.every(row => row.every(val => val)) && cardData.P02.answer2?.every(row => row.every(val => val))) &&
    !cardData.P02.isSubmitted;

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      useRound
      vAlign='flex-start'
      background={'var(--color-white)'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={getSubmitLabel()}
      submitBtnColor={getButtonColor()}
      submitDisabled={isSubmitDisabled()}
    >
      <Scroll tabIndex={0}>
        <Box display='flex' justifyContent='center'>
          <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['221px', '221px', '221px']}>
            <THead>
              <TR>
                {th_arr.map((item, idx) => {
                  return (
                    <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                      {item}
                    </TH>
                  );
                })}
              </TR>
            </THead>
            <TBody>
              {td_arr.map((value, rowIndex) => (
                <TR key={rowIndex}>
                  <TH scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                    {value}
                  </TH>
                  {Array(th_arr.length - 1)
                    .fill(null)
                    .map((_, colIndex) => (
                      <TD key={colIndex} hAlign='center' vAlign='middle' color={EStyleTableTypes.YELLOW_SECONDARY}>
                        {colIndex === 0 && (rowIndex === 0 || rowIndex === 1) ? <Typography>약</Typography> : ''}
                        <Input
                          width={(rowIndex === 2 || rowIndex === 3) && colIndex === 0 ? '180px' : '155px'}
                          value={cardData.P02.answer[rowIndex][colIndex]}
                          onChange={e => handleInputChange(rowIndex, colIndex, e.target.value)}
                          readOnly={cardData.P02.isSubmitted}
                          ariaLabel={`${th_arr[0]} ${rowIndex === 2 || rowIndex === 3 ? cardData.P02.answer2[0][rowIndex - 2] : td_arr[rowIndex]}의 ${
                            th_arr[colIndex + 1]
                          }`}
                        />
                      </TD>
                    ))}
                </TR>
              ))}
            </TBody>
          </Table>
          <Image src={'/A05/0405/04/MC31542.png'} alt='연필이 있습니다.' height='219px' width='252px' />
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isAnswerOpen} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='80px'>
          <Box marginBottom='22px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Table color={EStyleTableTypes.YELLOW_SECONDARY} sizes={['221px', '221px', '221px']}>
              <THead>
                <TR>
                  {th_arr.map((item, idx) => {
                    return (
                      <TH key={idx} scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                        {item}
                      </TH>
                    );
                  })}
                </TR>
              </THead>
              <TBody>
                {td_arr_answer.map((value, rowIndex) => (
                  <TR key={rowIndex}>
                    <TH scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                      {value}
                    </TH>
                    {Array(th_arr.length - 1)
                      .fill(null)
                      .map((_, colIndex) => (
                        <TD key={colIndex} hAlign='center' vAlign='middle' color={EStyleTableTypes.YELLOW_SECONDARY}>
                          {colIndex === 0 && (rowIndex === 0 || rowIndex === 1) ? <Typography>약</Typography> : ''}
                          <Input
                            width='180px'
                            value={bottomSheetAnswer[rowIndex][colIndex]}
                            readOnly={true}
                            ariaLabel={`${th_arr[0]} ${td_arr[rowIndex]}의 ${th_arr[colIndex + 1]} 예시 답안`}
                          />
                        </TD>
                      ))}
                  </TR>
                ))}
              </TBody>
            </Table>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
