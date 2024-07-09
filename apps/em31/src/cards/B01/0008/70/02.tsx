import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, Radio, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { B01000870_Atom } from './store';

import { Container } from '@maidt-cntn/ui/math';

import headerIcon from '../../../../assets/icon/m_default_01.svg';

import arrowRight from '@/assets/icon/arrow_right.svg';

const P02 = () => {
  const PAGE_NUMBER = 'P02';
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
        책꽂이에 책을 700권 꽂을 수 있습니다. 지금까지 꽂은 책은 312권이고 남은 책은 489권입니다. 책을 모두 책꽂이에 꽂을 수 있는지 어림셈을 해 보고
        문장을 완성해 보세요.
      </Box>
    ),
    markSize: 'middle',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  const data = [{ text: '있을' }, { text: '없을' }];
  const data2 = [{ text: '있습니다' }, { text: '없습니다' }];
  const radioAnswer5 = useMemo(() => {
    if (cardData.p02.answer5 !== 0) {
      return cardData.p02.answer5;
    }
  }, [cardData.p02.answer5]);

  const radioAnswer7 = useMemo(() => {
    if (cardData.p02.answer7 !== 0) {
      return cardData.p02.answer7;
    }
  }, [cardData.p02.answer7]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p02.answer1,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: cardData.p02.answer2,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: cardData.p02.answer3,
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: cardData.p02.answer4,
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: cardData.p02.answer5,
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: cardData.p02.answer6,
          isAnswer: true,
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: cardData.p02.answer7,
          isAnswer: true,
        },
      ],
    },
  ];

  const handleOnSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim() === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2.trim() === cardData.p02.solution2;
      const isCorrect3 = cardData.p02.answer3.trim() === cardData.p02.solution3;
      const isCorrect4 = cardData.p02.answer4.trim() === cardData.p02.solution4;
      const isCorrect5 = cardData.p02.answer5 === cardData.p02.solution5;
      const isCorrect6 = cardData.p02.answer6.trim() === cardData.p02.solution6;
      const isCorrect7 = cardData.p02.answer7 === cardData.p02.solution7;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6 && isCorrect7;
      // console.log('@@@ handleOnSubmit isCorrect', isCorrect);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isCorrect, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p02.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p02.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p02.answer6,
              isAnswer: true,
              isCorrect: isCorrect6,
            },
            {
              subKey: 7,
              type: 'TEXT',
              value: cardData.p02.answer7,
              isAnswer: true,
              isCorrect: isCorrect7,
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
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p02.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p02.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p02.answer6,
            answer7: userSubmissionList[0].inputData[6]?.value || cardData.p02.answer7,
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
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer4: value } }));
    } else if (subKey === 5) {
      // console.log('radio 5의 서브키: ', subKey, 'value: ', value);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer5: Number(value) } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer6: value } }));
    } else if (subKey === 7) {
      // console.log('radio 7의 서브키: ', subKey, 'value: ', value);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer7: Number(value) } }));
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p02.answer1 &&
          cardData.p02.answer2 &&
          cardData.p02.answer3 &&
          cardData.p02.answer4 &&
          cardData.p02.answer5 &&
          cardData.p02.answer6 &&
          cardData.p02.answer7
        ) &&
        !cardData.p02.isSubmitted &&
        !isShow
      }
      submitBtnColor={
        !(
          cardData.p02.answer1 &&
          cardData.p02.answer2 &&
          cardData.p02.answer3 &&
          cardData.p02.answer4 &&
          cardData.p02.answer5 &&
          cardData.p02.answer6 &&
          cardData.p02.answer7
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
          312를&nbsp;
          <Input
            textAlign='center'
            width='130px'
            value={cardData.p02.answer1}
            maxLength={100}
            readOnly={cardData.p02.isSubmitted}
            status={
              !cardData.p02.isSubmitted
                ? InputStatus.ENABLE
                : cardData.p02.answer1.trim() !== cardData.p02.solution1
                ? InputStatus.ERROR
                : InputStatus.CORRECT
            }
            onChange={e => handleChange(1, e.target.value)}
            ariaLabel='지금까지 꽂은 책의 수를 어립수로 입력하세요'
          />
          &nbsp;으로, &nbsp;생각합니다.
          <Box hAlign='center' marginTop='3px'>
            <Input
              textAlign='center'
              width='130px'
              value={cardData.p02.answer2}
              maxLength={100}
              readOnly={cardData.p02.isSubmitted}
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p02.answer2.trim() !== cardData.p02.solution2
                  ? InputStatus.ERROR
                  : InputStatus.CORRECT
              }
              onChange={e => handleChange(2, e.target.value)}
              ariaLabel='식을 입력하세요.'
            />
            <Typography>-</Typography>
            <Input
              textAlign='center'
              width='130px'
              maxLength={100}
              readOnly={cardData.p02.isSubmitted}
              value={cardData.p02.answer3}
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p02.answer3.trim() !== cardData.p02.solution3
                  ? InputStatus.ERROR
                  : InputStatus.CORRECT
              }
              onChange={e => handleChange(3, e.target.value)}
              ariaLabel='식을 입력하세요.'
            />
            <Typography>=</Typography>
            <Input
              textAlign='center'
              width='130px'
              maxLength={100}
              readOnly={cardData.p02.isSubmitted}
              value={cardData.p02.answer4}
              status={
                !cardData.p02.isSubmitted
                  ? InputStatus.ENABLE
                  : cardData.p02.answer4.trim() !== cardData.p02.solution4
                  ? InputStatus.ERROR
                  : InputStatus.CORRECT
              }
              onChange={e => handleChange(4, e.target.value)}
              ariaLabel='답을 입력하세요.'
            />
          </Box>
          <Box>
            따라서&nbsp; 책을&nbsp; 모두&nbsp; 책꽂이에&nbsp; 꽂을 &nbsp;수 (&nbsp;
            {radioAnswer5 &&
              data.map((item, index) => (
                <span key={'radio' + index}>
                  <Radio
                    type={'box'}
                    name={'radio-group'}
                    label={item.text}
                    value={radioAnswer5 === index + 1}
                    readOnly={cardData.p02.isSubmitted}
                    isError={cardData.p02.isSubmitted && radioAnswer5 !== cardData.p02.solution5}
                    onClick={() => handleChange(5, String(index + 1))}
                  >
                    {item.text}
                  </Radio>
                  {index < 1 ? <Typography>,</Typography> : ''}
                </span>
              ))}
            {!radioAnswer5 &&
              data.map((item, index) => (
                <span key={'radio' + index}>
                  <Radio
                    type={'box'}
                    name={'radio-group'}
                    label={item.text}
                    value={false}
                    readOnly={cardData.p02.isSubmitted}
                    isError={cardData.p02.isSubmitted && radioAnswer5 !== cardData.p02.solution5}
                    onClick={() => handleChange(5, String(index + 1))}
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
          책꽂이에&nbsp; 더&nbsp; 꽂을&nbsp;수 &nbsp;있는 &nbsp;책은 &nbsp; 700-312=
          <Input
            textAlign='center'
            value={cardData.p02.answer6}
            width='130px'
            maxLength={100}
            readOnly={cardData.p02.isSubmitted}
            status={
              !cardData.p02.isSubmitted
                ? InputStatus.ENABLE
                : cardData.p02.answer6.trim() !== cardData.p02.solution6
                ? InputStatus.ERROR
                : InputStatus.CORRECT
            }
            onChange={e => handleChange(6, e.target.value)}
            ariaLabel='책꽂이에 더 꽂을 수 있는 책의 총 수를 입력하세요.'
          />
          &nbsp;(권) 이므로,
          <Box>
            책을&nbsp; 모두&nbsp; 책꽂이에&nbsp; 꽂을 &nbsp;수 (&nbsp;
            {radioAnswer7 &&
              data2.map((item, index) => (
                <span key={'radio' + index}>
                  <Radio
                    type={'box'}
                    name={'radio-group-2'}
                    label={item.text}
                    value={radioAnswer7 === index + 1}
                    readOnly={cardData.p02.isSubmitted}
                    isError={cardData.p02.isSubmitted && radioAnswer7 !== cardData.p02.solution7}
                    onClick={() => handleChange(7, String(index + 1))}
                  >
                    {item.text}
                  </Radio>
                  {index < 1 ? <Typography>,</Typography> : ''}
                </span>
              ))}
            {!radioAnswer7 &&
              data2.map((item, index) => (
                <span key={'radio' + index}>
                  <Radio
                    type={'box'}
                    name={'radio-group-2'}
                    label={item.text}
                    value={false}
                    readOnly={cardData.p02.isSubmitted}
                    isError={cardData.p02.isSubmitted && radioAnswer7 !== cardData.p02.solution7}
                    onClick={() => handleChange(7, String(index + 1))}
                  >
                    {item.text}
                  </Radio>
                  {index < 1 ? <Typography>,</Typography> : ''}
                </span>
              ))}
            &nbsp;).
          </Box>
        </Typography>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>300, 700, 300, 400, 없을 / 388, 없습니다</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>
                312을 300으로 생각하여 어림셈을 하면 700-300=400입니다. 실제로 계산하면 책꽂이에 더 꽂을 수 있는 책은 700-312=388(권)이므로 책 을 모두
                책꽂이에 꽂을 수 없습니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
