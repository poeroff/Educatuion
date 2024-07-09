import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, Radio, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { checkExpression } from '@maidt-cntn/util/CommonUtil';
import { B01000870_Atom } from './store';

import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '../../../../assets/icon/m_default_01.svg';

import arrowRight from '@/assets/icon/arrow_right.svg';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01000870_Atom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='baseline' fontSize={28}>
        <Box marginRight={20}>
          <SvgIcon src={headerIcon} size='36px' />
        </Box>
        마라톤에 남자 885명, 여자 709명이 참가했습니다. 참가들에게 물 1700병을 나누어 주려고 합니다. 참가자 모두 물을 받을 수 있는지 어림셈을 해 보고
        문장을 완성해 보세요.
      </Box>
    ),
    markSize: 'middle',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  const data = [{ text: '있을' }, { text: '없을' }];
  const data2 = [{ text: '있습니다' }, { text: '없습니다' }];

  const radioAnswer6 = useMemo(() => {
    if (cardData.p01.answer6 !== 0) {
      return cardData.p01.answer6;
    }
  }, [cardData.p01.answer6]);

  const radioAnswer8 = useMemo(() => {
    if (cardData.p01.answer8 !== 0) {
      return cardData.p01.answer8;
    }
  }, [cardData.p01.answer8]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p01.answer1,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: cardData.p01.answer2,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: cardData.p01.answer3,
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: cardData.p01.answer4,
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: cardData.p01.answer5,
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: cardData.p01.answer6,
          isAnswer: true,
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: cardData.p01.answer7,
          isAnswer: true,
        },
        {
          subKey: 8,
          type: 'TEXT',
          value: cardData.p01.answer8,
          isAnswer: true,
        },
      ],
    },
  ];

  const handleOnSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1.trim() === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2.trim() === cardData.p01.solution2;
      const checkExpression3and4 = `${cardData.p01.answer3}+${cardData.p01.answer4}=1600`;
      const isCorrect3 = checkExpression(checkExpression3and4, cardData.p01.solution3_and_solution4_check);
      const isCorrect4 = checkExpression(checkExpression3and4, cardData.p01.solution3_and_solution4_check);
      const isCorrect5 = cardData.p01.answer5.trim() === cardData.p01.solution5;
      const isCorrect6 = cardData.p01.answer6 === cardData.p01.solution6;
      const isCorrect7 = cardData.p01.answer7.trim() === cardData.p01.solution7;
      const isCorrect8 = cardData.p01.answer8 === cardData.p01.solution8;
      console.log('isCorrect3: ', isCorrect3, 'isCorrect4', isCorrect4, 'isCorrect5 ', isCorrect5);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6 && isCorrect7 && isCorrect8;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isCorrect, isSubmitted: true } }));
      // console.log('@@@ handleOnSubmit isCorrect', isCorrect, 'cardData.p01 ', cardData.p01);

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p01.answer6,
              isAnswer: true,
              isCorrect: isCorrect6,
            },
            {
              subKey: 7,
              type: 'TEXT',
              value: cardData.p01.answer7,
              isAnswer: true,
              isCorrect: isCorrect7,
            },
            {
              subKey: 8,
              type: 'TEXT',
              value: cardData.p01.answer8,
              isAnswer: true,
              isCorrect: isCorrect8,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p01.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p01.answer6,
            answer7: userSubmissionList[0].inputData[6]?.value || cardData.p01.answer7,
            answer8: userSubmissionList[0].inputData[7]?.value || cardData.p01.answer8,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    // console.log('subKey: ', subKey, 'value: ', value);
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: value } }));
    } else if (subKey === 6) {
      // console.log('radio 6의 서브키: ', subKey, 'value: ', value);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer6: Number(value) } }));
    } else if (subKey === 7) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer7: value } }));
    } else if (subKey === 8) {
      // console.log('radio 8의 서브키: ', subKey, 'value: ', value);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer8: Number(value) } }));
    }
    changeData(PAGE_NUMBER, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p01.answer1 &&
          cardData.p01.answer2 &&
          cardData.p01.answer3 &&
          cardData.p01.answer4 &&
          cardData.p01.answer5 &&
          cardData.p01.answer6 &&
          cardData.p01.answer7
        ) &&
        !cardData.p01.isSubmitted &&
        !isShow
      }
      submitBtnColor={
        !(
          cardData.p01.answer1 &&
          cardData.p01.answer2 &&
          cardData.p01.answer3 &&
          cardData.p01.answer4 &&
          cardData.p01.answer5 &&
          cardData.p01.answer6 &&
          cardData.p01.answer7
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      onSubmit={handleOnSubmit}
      useRound
    >
      <Box vAlign='flex-start' marginTop='24px'>
        <SvgIcon src={arrowRight} size='50px' />
        <Typography lineHeight='52px'>
          885를&nbsp;
          <Input
            textAlign='center'
            value={cardData.p01.answer1}
            maxLength={100}
            readOnly={cardData.p01.isSubmitted}
            status={
              !cardData.p01.isSubmitted
                ? InputStatus.ENABLE
                : cardData.p01.answer1.trim() !== cardData.p01.solution1
                ? InputStatus.ERROR
                : InputStatus.CORRECT
            }
            onChange={e => handleChange(1, e.target.value)}
            width='130px'
            ariaLabel='마라톤 참가한 남자 명수'
          />
          &nbsp;으로, &nbsp;709를{' '}
          <Input
            textAlign='center'
            value={cardData.p01.answer2}
            maxLength={100}
            readOnly={cardData.p01.isSubmitted}
            status={
              !cardData.p01.isSubmitted
                ? InputStatus.ENABLE
                : cardData.p01.answer2.trim() !== cardData.p01.solution2
                ? InputStatus.ERROR
                : InputStatus.CORRECT
            }
            onChange={e => handleChange(2, e.target.value)}
            width='130px'
            ariaLabel='마라톤 참가한 여자 명수'
          />
          &nbsp;으로, 생각합니다.
          <Box hAlign='center' marginTop='3px'>
            <Input
              textAlign='center'
              value={cardData.p01.answer3}
              maxLength={100}
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.isSubmitted
                  ? InputStatus.ENABLE
                  : !!cardData.p01.answer3.trim() &&
                    checkExpression(`${cardData.p01.answer3}+${cardData.p01.answer4}=1600`, cardData.p01.solution3_and_solution4_check)
                  ? InputStatus.CORRECT
                  : InputStatus.ERROR
              }
              onChange={e => handleChange(3, e.target.value)}
              width='130px'
              ariaLabel='식을 입력하세요'
            />
            <Typography>+</Typography>
            <Input
              textAlign='center'
              value={cardData.p01.answer4}
              maxLength={100}
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.isSubmitted
                  ? InputStatus.ENABLE
                  : !!cardData.p01.answer4.trim() &&
                    checkExpression(`${cardData.p01.answer3}+${cardData.p01.answer4}=1600`, cardData.p01.solution3_and_solution4_check)
                  ? InputStatus.CORRECT
                  : InputStatus.ERROR
              }
              onChange={e => handleChange(4, e.target.value)}
              width='130px'
              ariaLabel='식을 입력하세요'
            />
            <Typography>=</Typography>
            <Input
              textAlign='center'
              value={cardData.p01.answer5}
              maxLength={100}
              readOnly={cardData.p01.isSubmitted}
              status={
                !cardData.p01.isSubmitted
                  ? InputStatus.ENABLE
                  : !!cardData.p01.answer5.trim() && cardData.p01.answer5 === cardData.p01.solution5
                  ? InputStatus.CORRECT
                  : InputStatus.ERROR
              }
              onChange={e => handleChange(5, e.target.value)}
              width='130px'
              ariaLabel='스케치북 1권과 자 1개를 더해 어림한 값'
            />
          </Box>
          <Box>
            따라서&nbsp; 참가자&nbsp; 모두&nbsp; 물을&nbsp; 받을 &nbsp;수 (&nbsp;
            {radioAnswer6 &&
              data.map((item, index) => (
                <span key={'radio' + index}>
                  <Radio
                    type={'box'}
                    name={'radio-group'}
                    label={item.text}
                    value={radioAnswer6 === index + 1}
                    readOnly={cardData.p01.isSubmitted}
                    isError={cardData.p01.isSubmitted && radioAnswer6 !== cardData.p01.solution6}
                    onClick={() => handleChange(6, String(index + 1))}
                  >
                    {item.text}
                  </Radio>
                  {index < 1 ? <Typography>,</Typography> : ''}
                </span>
              ))}
            {!radioAnswer6 &&
              data.map((item, index) => (
                <span key={'radio' + index}>
                  <Radio
                    type={'box'}
                    name={'radio-group'}
                    label={item.text}
                    value={false}
                    readOnly={cardData.p01.isSubmitted}
                    isError={cardData.p01.isSubmitted && radioAnswer6 !== cardData.p01.solution6}
                    onClick={() => handleChange(6, String(index + 1))}
                  >
                    {item.text}
                  </Radio>
                  {index < 1 ? <Typography>,</Typography> : ''}
                </span>
              ))}
            &nbsp;) 것&nbsp; 같습니다.
          </Box>
        </Typography>
      </Box>
      <Box vAlign='flex-start' marginTop='24px'>
        <SvgIcon src={arrowRight} size='50px' />
        <Typography lineHeight='52px'>
          마라톤에&nbsp; 참가한&nbsp; 사람은&nbsp; 모두 &nbsp; 885+709=
          <Input
            textAlign='center'
            value={cardData.p01.answer7}
            maxLength={100}
            readOnly={cardData.p01.isSubmitted}
            status={
              !cardData.p01.isSubmitted
                ? InputStatus.ENABLE
                : cardData.p01.answer7.trim() !== cardData.p01.solution7
                ? InputStatus.ERROR
                : InputStatus.CORRECT
            }
            onChange={e => handleChange(7, e.target.value)}
            width='130px'
            ariaLabel='마라톤에 참가한 사람 모두의 값'
          />
          &nbsp;(명) 이므로,
          <Box>
            참가자&nbsp; 모두&nbsp; 물을&nbsp; 받을 &nbsp;수 (&nbsp;
            {radioAnswer8 &&
              data2.map((item, index) => (
                <span key={'radio' + index}>
                  <Radio
                    type={'box'}
                    name={'radio-group-2'}
                    label={item.text}
                    value={radioAnswer8 === index + 1}
                    readOnly={cardData.p01.isSubmitted}
                    isError={cardData.p01.isSubmitted && radioAnswer8 !== cardData.p01.solution8}
                    onClick={() => handleChange(8, String(index + 1))}
                  >
                    {item.text}
                  </Radio>
                  {index < 1 ? <Typography>,</Typography> : ''}
                </span>
              ))}
            {!radioAnswer8 &&
              data2.map((item, index) => (
                <span key={'radio' + index}>
                  <Radio
                    type={'box'}
                    name={'radio-group-2'}
                    label={item.text}
                    value={false}
                    readOnly={cardData.p01.isSubmitted}
                    isError={cardData.p01.isSubmitted && radioAnswer8 !== cardData.p01.solution8}
                    onClick={() => handleChange(8, String(index + 1))}
                  >
                    {item.text}
                  </Radio>
                  {index < 1 ? <Typography>,</Typography> : ''}
                </span>
              ))}
            &nbsp;) 것&nbsp; 같습니다.
          </Box>
        </Typography>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>900, 700, 900, 700, 1600, 있을 / 1594, 있습니다</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>
                885를 900, 709를 700으로 생각하여 어림셈을 하면 900+700=1600입니다. 실제로 계산하면 마라톤에 참가한 사람은 모두 885+709=1594(명)이므로
                참 가자 모두 물을 받을 수 있습니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
