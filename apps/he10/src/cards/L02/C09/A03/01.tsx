import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L02C09A03 } from './store';
import {
  TMainHeaderInfoTypes,
  IQuestionProps,
  Table,
  TBody,
  TR,
  TD,
  TH,
  EStyleTableTypes,
  Textarea,
  Question,
  Box,
  Scroll,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C09A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Choose a book that you want to review and complete the form.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const onSubmitText = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p01.answer6,
            },
          ],
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
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
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, subKey: number) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: e.target.value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: e.target.value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: e.target.value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: e.target.value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: e.target.value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer6: e.target.value } }));
    }
    changeData('P01', 1, subKey, e.target.value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      vAlign={'flex-start'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={onSubmitText}
      submitDisabled={
        !isNotEmptyString(cardData.p01.answer1) ||
        !isNotEmptyString(cardData.p01.answer2) ||
        !isNotEmptyString(cardData.p01.answer3) ||
        !isNotEmptyString(cardData.p01.answer4) ||
        !isNotEmptyString(cardData.p01.answer5) ||
        !isNotEmptyString(cardData.p01.answer6)
      }
      submitBtnColor={
        !isNotEmptyString(cardData.p01.answer1) ||
        !isNotEmptyString(cardData.p01.answer2) ||
        !isNotEmptyString(cardData.p01.answer3) ||
        !isNotEmptyString(cardData.p01.answer4) ||
        !isNotEmptyString(cardData.p01.answer5) ||
        !isNotEmptyString(cardData.p01.answer6)
          ? EStyleButtonTypes.SECONDARY
          : !cardData.p01.isSubmitted
          ? EStyleButtonTypes.PRIMARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <Scroll tabIndex={0}>
        <Table color={EStyleTableTypes.COLORFUL} sizes={['258px', 'auto', '181px', 'auto']}>
          <caption></caption>
          <TBody>
            <TR>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Title
              </TH>
              <TD color={EStyleTableTypes.COLORFUL}>
                <Textarea
                  placeholder='내용을 넣어주세요.'
                  value={cardData.p01.answer1.trim()}
                  onChange={e => {
                    handleInputChange(e, 1);
                  }}
                  height='80px'
                  width='100%'
                />
              </TD>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Author
              </TH>
              <TD color={EStyleTableTypes.COLORFUL}>
                <Textarea
                  placeholder='내용을 넣어주세요.'
                  value={cardData.p01.answer2.trim()}
                  onChange={e => {
                    handleInputChange(e, 2);
                  }}
                  height='80px'
                  width='100%'
                />
              </TD>
            </TR>
            <TR>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Plot <br /> Summary
              </TH>
              <TD color={EStyleTableTypes.COLORFUL} colSpan={3}>
                <Textarea
                  placeholder='내용을 넣어주세요.'
                  value={cardData.p01.answer3.trim()}
                  onChange={e => {
                    handleInputChange(e, 3);
                  }}
                  height='80px'
                  width='100%'
                />
              </TD>
            </TR>
            <TR>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Personal <br /> Refelction
              </TH>
              <TD color={EStyleTableTypes.COLORFUL} colSpan={3}>
                <Box>
                  <Question type='dot' size='small'>
                    Most Moving Part:
                  </Question>
                  <Textarea
                    placeholder='내용을 넣어주세요.'
                    value={cardData.p01.answer4.trim()}
                    onChange={e => {
                      handleInputChange(e, 4);
                    }}
                    height='80px'
                    width='100%'
                  />
                </Box>
                <Box marginTop={10}>
                  <Question type='dot' size='small'>
                    Feeling:
                  </Question>
                  <Textarea
                    placeholder='내용을 넣어주세요.'
                    value={cardData.p01.answer5.trim()}
                    onChange={e => {
                      handleInputChange(e, 5);
                    }}
                    height='80px'
                    width='100%'
                  />
                </Box>
              </TD>
            </TR>
            <TR>
              <TH color={EStyleTableTypes.COLORFUL} scope='row' hAlign='center'>
                Reason for
                <br /> Recommendation
              </TH>
              <TD color={EStyleTableTypes.COLORFUL} colSpan={3}>
                <Textarea
                  placeholder='내용을 넣어주세요.'
                  value={cardData.p01.answer6.trim()}
                  onChange={e => {
                    handleInputChange(e, 6);
                  }}
                  height='80px'
                  width='100%'
                />
              </TD>
            </TR>
          </TBody>
        </Table>
      </Scroll>
      <BottomSheet
        bottomSheetTargetId='targetContainer'
        height='50%'
        show={isShow && cardData.p01.isSubmitted}
        closeOption={{ useYn: true, onClose: () => setShow(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography weight={700}>• Title</Typography>
            <p> A Long Walk to Water</p>
            <Typography weight={700}>• Author</Typography>
            <p> Linda Sue Park</p>
            <Typography weight={700}>• P lot Summary</Typography>
            <p>a boy and a girl, Salva and Nya, who struggle to survive during the wars in Sudan</p>
            <Typography weight={700}>• Personal Reflection</Typography>
            <p>
              - Most Moving Part: when Nya walks with bare feet every day for eight hours to bring water to her family <br />- Feeling: I felt her
              pain and sorrow as if I experienced her hardship myself.
            </p>
            <Typography weight={700}>• Reason for Recommendation</Typography>

            <p>
              It shows us not only how terribly war can change people’s lives but also how strong people can be while going through such difficulties.
            </p>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
