import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Scroll,
  TBody,
  TD,
  TH,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Tag,
  Textarea,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L06C04A02 } from './store';

const P02 = () => {
  const pageNumber = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L06C04A02);
  const { userId } = useRecoilValue(studentAtom);

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

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXTAREA',
          value: '',
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
            userInput1: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].userInput1,
            userInput2: userSubmissionList[0].inputData[1]?.value || cardData[pageNumber].userInput2,
            userInput3: userSubmissionList[0].inputData[2]?.value || cardData[pageNumber].userInput3,
            userInput4: userSubmissionList[0].inputData[3]?.value || cardData[pageNumber].userInput4,
            isSubmitted: isSubmitted,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData[pageNumber].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput1,
            },
            {
              subKey: 2,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput2,
            },
            {
              subKey: 3,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput3,
            },
            {
              subKey: 4,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput4,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const isSubmittable =
    isNotEmptyString(cardData[pageNumber].userInput1 || '') &&
    isNotEmptyString(cardData[pageNumber].userInput2 || '') &&
    isNotEmptyString(cardData[pageNumber].userInput3 || '') &&
    isNotEmptyString(cardData[pageNumber].userInput4 || '');
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const toggleShowAnswer = () => {
    setIsShowAnswer(prev => !prev);
  };

  const handleInputChange = (value: string, subKey: number) => {
    if (subKey === 0) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput1: value } }));
    } else if (subKey === 1) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput2: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput3: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput4: value } }));
    }
    changeData(pageNumber, 1, subKey + 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'My Role Model: Step 2',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '자신의 롤 모델에 관한 질문에 답해 봅시다.',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageNumber].isSubmitted ? (!isShowAnswer ? '답안보기' : '답안닫기') : '완료하기'}
      submitDisabled={!isSubmittable}
      submitBtnColor={
        !cardData[pageNumber].isSubmitted
          ? isSubmittable
            ? EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
          : !isShowAnswer
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.GRAY
      }
      onSubmit={!cardData[pageNumber].isSubmitted ? handleSubmit : toggleShowAnswer}
      useExtend
    >
      <Scroll tabIndex={0}>
        <Table color={EStyleTableTypes.TERTIARY} sizes={['350px', 'auto', 'auto', 'auto']}>
          <TBody>
            <TR>
              <TH color={EStyleTableTypes.TERTIARY} scope='row' hAlign='center'>
                <Typography color='var(--color-black)'>Who is your role model?</Typography>
              </TH>
              <TD color={EStyleTableTypes.DEFAULT}>
                <Textarea
                  height='75px'
                  width='100%'
                  placeholder={'e.g. ' + cardData[pageNumber].solutions?.[0]}
                  ariaLabel={`답 입력란 1`}
                  value={cardData[pageNumber].userInput1}
                  onChange={e => handleInputChange(e.target.value, 0)}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </TD>
            </TR>
            <TR>
              <TH color={EStyleTableTypes.TERTIARY} scope='row' hAlign='center'>
                <Typography color='var(--color-black)'>What is the person like?</Typography>
              </TH>
              <TD color={EStyleTableTypes.DEFAULT} colSpan={3}>
                <Textarea
                  height='75px'
                  width='100%'
                  placeholder={'e.g. ' + cardData[pageNumber].solutions?.[1]}
                  ariaLabel={`답 입력란 2`}
                  value={cardData[pageNumber].userInput2}
                  onChange={e => handleInputChange(e.target.value, 1)}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </TD>
            </TR>
            <TR>
              <TH color={EStyleTableTypes.TERTIARY} scope='row' hAlign='center'>
                <Typography color='var(--color-black)'> What does/did the person do?</Typography>
              </TH>
              <TD color={EStyleTableTypes.DEFAULT} colSpan={3}>
                <Textarea
                  height='90px'
                  width='100%'
                  placeholder={'e.g. ' + cardData[pageNumber].solutions?.[2]}
                  ariaLabel={`답 입력란 3`}
                  value={cardData[pageNumber].userInput3}
                  onChange={e => handleInputChange(e.target.value, 2)}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </TD>
            </TR>
            <TR>
              <TH color={EStyleTableTypes.TERTIARY} scope='row' hAlign='center'>
                <Typography color='var(--color-black)'>What do you want to do like the person?</Typography>
              </TH>
              <TD color={EStyleTableTypes.DEFAULT} colSpan={3}>
                <Textarea
                  height='90px'
                  width='100%'
                  placeholder={'e.g. ' + cardData[pageNumber].solutions?.[3]}
                  ariaLabel={`답 입력란 4`}
                  value={cardData[pageNumber].userInput4}
                  onChange={e => handleInputChange(e.target.value, 3)}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </TD>
            </TR>
          </TBody>
        </Table>
      </Scroll>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'예시답안'} />
          </Box>
          <BoxWrap flexDirection='column' marginTop='12px'>
            <Typography>{`* Who is your role model? : ${cardData[pageNumber].solutions?.[0]}`}</Typography>
            <Typography>{`* What is the person like?: ${cardData[pageNumber].solutions?.[1]}`}</Typography>
            <Typography>{`* What does/did the person do?: ${cardData[pageNumber].solutions?.[2]}`}</Typography>
            <Typography>{`* What do you want to do like the person?: ${cardData[pageNumber].solutions?.[3]}`}</Typography>
          </BoxWrap>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
