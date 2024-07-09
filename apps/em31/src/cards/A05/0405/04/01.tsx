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

const P01 = () => {
  const { changeData, initData, saveData, submitData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A05040504_store);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  const pageKey = 'P01';

  const th_arr = ['둘째 손가락', '어림한 길이', '잰 길이'];
  const td_arr = ['너비', '길이'];
  const bottomSheetAnswer = [
    ['1cm', '11mm'],
    ['5cm', '5cm 1mm'],
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
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        자신의 둘째 손가락의 너비와 길이를 어림하고 자로 재어 확인해 보세요.
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
          ],
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
          P01: {
            ...prev.P01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.P01.answer,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newAnswers = cardData.P01.answer.map(row => [...row]);
    newAnswers[rowIndex][colIndex] = value;
    setCardData(prevData => ({
      ...prevData,
      P01: {
        ...prevData.P01,
        answer: newAnswers,
      },
    }));
    changeData(pageKey, 1, 1, newAnswers);
  };

  const handleSubmit = () => {
    if (!cardData.P01.isSubmitted) {
      setCardData(prev => ({ ...prev, P01: { ...prev.P01, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.P01.answer,
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
    if (!cardData?.P01.isSubmitted) {
      return !cardData.P01.answer?.every(row => row.every(val => val)) ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    }
  };

  const getSubmitLabel = () => (cardData.P01.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기');
  const isSubmitDisabled = () => !cardData.P01.answer?.every(row => row.every(val => val)) && !cardData.P01.isSubmitted;

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
                        {colIndex === 0 ? <Typography>약</Typography> : ''}
                        <Input
                          width='155px'
                          value={cardData.P01.answer[rowIndex][colIndex]}
                          onChange={e => handleInputChange(rowIndex, colIndex, e.target.value)}
                          readOnly={cardData.P01.isSubmitted}
                          ariaLabel={`${th_arr[0]} ${td_arr[rowIndex]}의 ${th_arr[colIndex + 1]}`}
                        />
                      </TD>
                    ))}
                </TR>
              ))}
            </TBody>
          </Table>
          <Image
            src={'/A05/0405/04/MC31512.png'}
            alt='검지만 들어올린 손가락이 있고, 손가락의 길이와 너비가 표시되어 있습니다.'
            height='219px'
            width='252px'
          />
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isAnswerOpen} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='-30px'>
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
                {td_arr.map((value, rowIndex) => (
                  <TR key={rowIndex}>
                    <TH scope='col' hAlign='center' color={EStyleTableTypes.YELLOW_SECONDARY}>
                      {value}
                    </TH>
                    {Array(th_arr.length - 1)
                      .fill(null)
                      .map((_, colIndex) => (
                        <TD key={colIndex} hAlign='center' vAlign='middle' color={EStyleTableTypes.YELLOW_SECONDARY}>
                          {colIndex === 0 ? <Typography>약</Typography> : ''}
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

export default P01;
