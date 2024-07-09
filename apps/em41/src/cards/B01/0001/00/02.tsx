import {
  Image,
  BoxWrap,
  BottomSheet,
  Tag,
  Table,
  THead,
  TR,
  TH,
  TD,
  TFoot,
  TBody,
  EStyleTableTypes,
  TableMathCaption,
  ETagLine,
  EStyleButtonTypes,
  Box,
  Label,
  Typography,
  Input,
  IQuestionProps,
  EStyleFontSizes,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B01_0001_00 } from './store';
import { isNumber, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

export interface IAnswer {
  answer: string[];
  description: IDescription;
}
export interface IDescription extends IMath {
  tfoot: string[];
}
export interface IMath {
  caption?: string;
  math?: string[];
  th: string[];
  td: string[][];
  input?: React.ReactNode;
  typo?: string;
  typoInput?: React.ReactNode;
}

const P02 = () => {
  const pageNumber = 'P02';

  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01_0001_00);
  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: cardData[pageNumber].answer,
          isAnswer: true,
          isCorrect: cardData[pageNumber].answer === cardData[pageNumber].solution,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onGrade = () => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData[pageNumber].answer === cardData[pageNumber].solution;
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const answers: IAnswer[] = [
    {
      answer: ['4', '3', '4'],
      description: {
        caption: '세로셈',
        math: ['749', '-', '315'],
        th: ['일의 자리', '십의 자리', '백의 자리', '연산 기호'],
        td: [
          ['9', '4', '7', ''],
          ['5', '1', '3', '-'],
        ],
        tfoot: ['4', '3', '4', ''],
      },
    },
  ];

  const handleChange = (value: string) => {
    if (isNumber(value)) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: value } }));
      changeData(pageNumber, 1, 1, value);
    }
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='2' type='icon' />
        현태와 아라가 가진 두 수의 차는 얼마인지 구해 보세요.
      </>
    ),
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
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
      headerInfo={null}
      questionInfo={questionInfo}
      background='var(--color-white)'
      onSubmit={onGrade}
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData[pageNumber].answer}
      submitBtnColor={!cardData[pageNumber].answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      vAlign='center'
      useRound
    >
      <Box vAlign='center' flexDirection='column'>
        <BoxWrap>
          <Box>
            <Box marginLeft={140}>
              <Image src='/B00/DJC410004-1.png' alt='남자아이 현태 그림입니다.' width='50px' height='150px' />
            </Box>
            <Box marginLeft={80} width='519px' marginTop={24} padding='24px' useRound>
              <Typography color='var(--color-gray-800)' size={EStyleFontSizes['X-MEDIUM']}>
                <Box
                  border='1px solid var(--color-grey-600)'
                  textAlign='center'
                  width='98px'
                  padding='6px 12px'
                  borderRadius={8}
                  backgroundColor='var(--color-gray-800)'
                  color='var(--color-gray-800)'
                >
                  315
                </Box>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box marginLeft={140}>
              <Image src='/B00/DJC410004-2.png' alt='여자아이 아라 그림입니다.' width='50px' height='150px' />
            </Box>
            <Box marginLeft={80} width='519px' color='var(--color-gray-400)' marginTop={24} padding='24px' useRound>
              <Typography size={EStyleFontSizes['X-MEDIUM']}>
                <Box
                  border='1px solid var(--color-grey-600)'
                  textAlign='center'
                  width='98px'
                  padding='6px 12px'
                  borderRadius={8}
                  backgroundColor='var(--color-gray-400)'
                  color='var(--color-gray-800)'
                >
                  749
                </Box>
              </Typography>
            </Box>
          </Box>
        </BoxWrap>
        <Box vAlign='center' marginTop='24px'>
          <Box>
            <Input
              width='98px'
              ariaLabel='답 입력란'
              marginLeft={8}
              value={cardData[pageNumber].answer ? cardData[pageNumber].answer.toString() : ''}
              onChange={e => handleChange(e.target.value)}
              readOnly={cardData[pageNumber].isSubmitted ? true : false}
              status={
                isNotEmptyString(cardData[pageNumber].answer ?? '')
                  ? !cardData[pageNumber].isSubmitted || cardData[pageNumber].answer === cardData[pageNumber].solution
                    ? InputStatus.ENABLE
                    : InputStatus.ERROR
                  : InputStatus.DEFAULT
              }
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box marginTop='12px' gap={'20px'}>
              {answers.map((item, index) => (
                <Typography key={index}>
                  {item.answer}
                  {index !== answers.length - 1 ? ',' : ''}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            {answers.map((item, index) => {
              if (index % 2 === 0) {
                return (
                  <BoxWrap key={`BOXWRAP_${index}`} marginTop={index / 2 > 0 ? '20px' : '0px'}>
                    <Box hAlign='center' flexDirection='column' useRound useFull key={`ANSWER_${index}`}>
                      <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                        <TableMathCaption caption={item.description.caption} math={item.description.math || []} />
                        <THead hidden>
                          <TR key={`ANS_TR_${index}`}>
                            {item.description.th.map((row, thIndex) => (
                              <TH scope='col' key={`ANS_TH_${thIndex}`}>
                                {row}
                              </TH>
                            ))}
                          </TR>
                        </THead>
                        <TBody>
                          {item.description?.td.map((row, tdIndex) => (
                            <TR key={`ANS_TR_${tdIndex}`}>
                              {row.map((td, idx) => (
                                <TD key={idx}>{td}</TD>
                              ))}
                            </TR>
                          ))}
                        </TBody>
                        <TFoot>
                          <TR>
                            {item.description?.tfoot.map((tfoot, tfootIndex) => (
                              <TD fontColor='var(--color-blue-400)' key={`TFOOT_${tfootIndex}`}>
                                {tfoot}
                              </TD>
                            ))}
                          </TR>
                        </TFoot>
                      </Table>
                    </Box>

                    {/* 다음 인덱스가 존재하는지 확인하고 추가합니다 */}
                    {index + 1 < answers.length && (
                      <Box hAlign='center' flexDirection='column' useRound useFull key={`ANSWER_${index + 1}`}>
                        <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                          <TableMathCaption caption={answers[index + 1].description.caption} math={answers[index + 1].description.math || []} />
                          <THead hidden>
                            <TR key={`ANS_TR_${index + 1}`}>
                              {answers[index + 1].description.th.map((row, thIndex) => (
                                <TH scope='col' key={`ANS_TH_${thIndex}`}>
                                  {row}
                                </TH>
                              ))}
                            </TR>
                          </THead>
                          <TBody>
                            {answers[index + 1].description?.td.map((row, tdIndex) => (
                              <TR key={`ANS_TR_${tdIndex}`}>
                                {row.map((td, idx) => (
                                  <TD key={idx}>{td}</TD>
                                ))}
                              </TR>
                            ))}
                          </TBody>
                          <TFoot>
                            <TR>
                              {answers[index + 1].description?.tfoot.map((tfoot, tfootIndex) => (
                                <TD key={`TFOOT_${tfootIndex}`}>{tfoot}</TD>
                              ))}
                            </TR>
                          </TFoot>
                        </Table>
                      </Box>
                    )}
                  </BoxWrap>
                );
              }
            })}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
