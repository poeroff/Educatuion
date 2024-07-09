import React, { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  TableMathCaption,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { isNotEmptyString, areArraysEqualIgnoringCaseAndWhitespace } from '@maidt-cntn/util/CommonUtil';

export interface IEM00402 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  math?: IMath[];
  value: string[][];
  answers: IAnswer[];
  onSubmit?: (result: boolean) => void;
  submitted: boolean;
  from?: string;
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

export interface IAnswer {
  answer: string[];
  description: IDescription;
}

export interface IDescription extends IMath {
  tfoot: string[];
}

const EM00401 = ({ headerInfo, questionInfo, math, submitted, value, answers, from, onSubmit }: IEM00402) => {
  const [isShow, setShow] = useState<boolean>(false);
  const valueArray = Array.isArray(value) ? value : [[]]; // 기본값으로 빈 배열을 포함한 2차원 배열로 설정

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else if (value.every(subArray => subArray.every(isNotEmptyString))) {
      const result = value.every((subArray, rowIndex) => {
        // Ensure each sub-array has the same length as the corresponding answer array
        if (subArray.length !== answers[rowIndex].answer.length) {
          return false;
        }
        return areArraysEqualIgnoringCaseAndWhitespace(subArray, answers[rowIndex].answer);
      });

      onSubmit && onSubmit(result);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!valueArray.every(subArray => subArray.every(isNotEmptyString))}
      submitBtnColor={
        valueArray.every(subArray => subArray.every(isNotEmptyString))
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={() => {
        handleSubmit();
      }}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap height={'304px'}>
        {math?.map((row, index) => {
          return (
            <Box type='dashed' hAlign='center' flexDirection='column' useRound useFull key={`BOX` + index}>
              <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
                <TableMathCaption caption={row?.caption} math={row?.math || []} />
                <THead hidden>
                  <TR key={`TR` + index}>
                    {row?.th.map((item, index) => {
                      return (
                        <TH scope='col' key={`TH` + index}>
                          {item}
                        </TH>
                      );
                    })}
                  </TR>
                </THead>
                <TBody key={`TBody` + index}>
                  {row?.td.map((item, index) => {
                    return (
                      <TR key={`TR` + index}>
                        {item.map((td, idx) => (
                          <TD key={idx}>{td}</TD>
                        ))}
                      </TR>
                    );
                  })}
                </TBody>
                <TFoot key={`TFoot` + index}>
                  <TR>{row?.input}</TR>
                </TFoot>
              </Table>
              {row.typo && (
                <Box marginTop='24px' key={`TYPO` + index}>
                  <Typography>{row.typo}</Typography>
                  {row.typoInput}
                </Box>
              )}
            </Box>
          );
        })}
      </BoxWrap>
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
                  {item.answer.join(', ')}
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
                                <TD fontColor={from === 'EM41' && tdIndex === 0 ? 'var(--color-pink-400)' : ''} key={idx}>
                                  {td}
                                </TD>
                              ))}
                            </TR>
                          ))}
                        </TBody>
                        <TFoot>
                          <TR>
                            {item.description?.tfoot.map((tfoot, tfootIndex) => (
                              <TD fontColor={from === 'EM41' ? 'var(--color-pink-400)' : ''} key={`TFOOT_${tfootIndex}`}>
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

export default EM00401;
