import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C04A02 } from './store';
import { studentAtom } from '@/stores/student';
import {
  Box,
  EImageType,
  EStyleButtonTypes,
  EStyleTableTypes,
  IQuestionProps,
  Input,
  Image,
  TBody,
  TD,
  TH,
  TMainHeaderInfoTypes,
  TR,
  Table,
  BottomSheet,
  Typography,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C04A02);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Weather Report: Step2',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '도시를 한 곳 정해 오늘 날씨를 찾고, 사람들이 무엇을 하고 있을지 표를 완성해 봅시다.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p03.answer3,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
      return;
    }

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer1,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer2,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p03.answer3,
            isAnswer: true,
            isCorrect: true,
          },
        ],
      },
    ];
    submitData('P03', userSubmission);
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer3: value } }));
    }
    changeData('P03', 1, subKey, value);
  };

  const checkBtnColorInput = () => {
    return (
      cardData.p03.answer1 &&
      isNotEmptyString(cardData.p03.answer1) &&
      cardData.p03.answer2 &&
      isNotEmptyString(cardData.p03.answer2) &&
      cardData.p03.answer3 &&
      isNotEmptyString(cardData.p03.answer3)
    );
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
      useExtend
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={submitAnswer}
      submitDisabled={
        !(
          cardData.p03.answer1 &&
          isNotEmptyString(cardData.p03.answer1) &&
          cardData.p03.answer2 &&
          isNotEmptyString(cardData.p03.answer2) &&
          cardData.p03.answer3 &&
          isNotEmptyString(cardData.p03.answer3)
        )
      }
      submitBtnColor={
        checkBtnColorInput()
          ? cardData.p03.isSubmitted
            ? isShow
              ? EStyleButtonTypes.GRAY
              : EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Table sizes={['500px', 'auto']}>
        <TBody>
          <TR>
            <TH bgColor='var(--color-blue-200)' fontColor='var(--color-black)' scope='row' hAlign='center'>
              {cardData.p03.egSolution?.[0].question}
            </TH>
            <TD bgColor='var(--color-blue-100)' color={EStyleTableTypes.COLORFUL}>
              <Input
                type='text'
                minWidth='500px'
                maxLength={100}
                value={cardData.p03.answer1}
                onChange={e => handleChange(1, e.target.value)}
                readOnly={cardData.p03.isSubmitted}
                placeholder='e.g. Seoul, Korea'
                ariaLabel='1번 답 입력란'
              />
            </TD>
          </TR>
          <TR>
            <TH bgColor='var(--color-blue-200)' fontColor='var(--color-black)' scope='row' hAlign='center'>
              {cardData.p03.egSolution?.[1].question}
            </TH>
            <TD bgColor='var(--color-blue-100)' color={EStyleTableTypes.COLORFUL}>
              <Input
                type='text'
                minWidth='500px'
                maxLength={100}
                value={cardData.p03.answer2}
                onChange={e => handleChange(2, e.target.value)}
                readOnly={cardData.p03.isSubmitted}
                placeholder='e.g. warm and sunny'
                ariaLabel='2번 답 입력란'
              />
            </TD>
          </TR>
          <TR>
            <TH bgColor='var(--color-blue-200)' fontColor='var(--color-black)' scope='row' hAlign='center'>
              {cardData.p03.egSolution?.[2].question}
            </TH>
            <TD bgColor='var(--color-blue-100)' color={EStyleTableTypes.COLORFUL}>
              <Input
                type='text'
                minWidth='500px'
                maxLength={100}
                value={cardData.p03.answer3}
                onChange={e => handleChange(3, e.target.value)}
                readOnly={cardData.p03.isSubmitted}
                placeholder='e.g. carry an umbrella, take a walk'
                ariaLabel='3번 답 입력란'
              />
            </TD>
          </TR>
        </TBody>
      </Table>
      <Box hAlign='flex-end' marginTop='10px'>
        <Image width='200px' height='50px' type={EImageType.IMG} src={'/L02/C04/A02/ME1-L02-C04-A02-P03.jpg'} />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Typography>
              <Tag type={ETagLine.GREEN} label='예시 답안' />
            </Typography>
          </Box>
          <Box>
            {cardData.p03.egSolution?.map(item => {
              return (
                <Box>
                  <Typography>{item.question}</Typography>
                  <br />
                  <Typography color={'var(--color-blue-900)'}>{item.solution}</Typography>{' '}
                </Box>
              );
            })}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
