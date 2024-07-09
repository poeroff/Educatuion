import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02SP03_1 } from './store';

const P19 = ({ _page = 'P19' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02SP03_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Typography>
        3. 다음 글의 밑줄 친 부분 중, 문맥상 낱말의 쓰임이 적절하지 <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>않은</u>{' '}
        것을 고르시오.
      </Typography>
    ),
    mark: cardData.p19.isSubmitted ? (cardData.p19.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: '(1)',
    },
    {
      text: '(2)',
    },
    {
      text: '(3)',
    },
    {
      text: '(4)',
    },
    {
      text: '(5)',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p19.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p19.answer === cardData.p19.solution;
      setCardData(prev => ({ ...prev, p19: { ...prev.p19, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p19.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p19: {
            ...prev.p19,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p19.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p19: { ...prev.p19, answer: index } }));
    changeData(_page, 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p19.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p19.isSubmitted && cardData.p19.answer === 0}
      submitBtnColor={
        !cardData.p19.isSubmitted && cardData.p19.answer === 0
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.DEFAULT
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box width='100%'>
          <Box height='570px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Typography>
              Dark patterns not only manipulate customers to act against their intentions, but they can also lead to financial losses and personal
              data leaks. To (1)<u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>tackle</u> this problem, extensive research
              across various websites and applications is being conducted to document the prevalence of dark patterns and come up with solutions. In
              addition to research, governments are actively discussing on how to regulate these (2)
              <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>deceptive</u> design patterns. However, regulations alone may
              not be (3)<u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>sufficient</u>. As individuals, we should take steps
              to (4)<u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>accept</u> dark patterns and be responsible for our
              online shopping behavior. Developing an (5)<u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>awareness</u> of
              dark patterns is also essential to avoid potential harm and economic loss. Ultimately, our attention and efforts will protect us from
              manipulation and enable us to make wise decisions in this digital age.
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
      <Box useFull flex='1'>
        <Scroll height='398px' tabIndex={0}>
          <List
            gap={10}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio
                type={'square'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={index === cardData.p19.answer}
                onClick={() => handleChange(index)}
                readOnly={cardData.p19.isSubmitted}
                isError={cardData.p19.isSubmitted && cardData.p19.answer !== cardData.p19.solution}
              >
                <BoxWrap alignItems='baseline'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </BoxWrap>
              </Radio>
            )}
          />
        </Scroll>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p19.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              다크 패턴의 잠재적인 피해와 경제적 손실을 방지하기 위해 다크 패턴에 대한 인식을 형성하고, 다크 패턴의 조종으로부터 우리를 보호해야
              한다고 했으므로 4번의 accept(받아들이다)를 combat(맞서 싸우다) 등으로 고쳐야 한다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              다크 패턴은 소비자가 의도에 어긋나는 행동을 하도록 조종할 뿐만 아니라, 재정적 손실과 개인적인 정보의 유출도 초래할 수 있다. 이 문제를
              해결하기 위해서, 다양한 웹사이트와 응용프로그램에 대한 광범위한 연구가 다크 패턴의 확산을 입증하고 해결책을 마련하기 위해 진행되고 있다.
              연구 이외에도 정부들은 이러한 기만적인 기법의 패턴을 어떻게 규제할 것인지에 대해 적극적으로 논의하고 있다. 그러나 규제만으로는 충분하지
              않을 수 있다. 개인으로서 우리는 다크 패턴을 받아들이기(→에 맞서 싸우기) 위한 조치를 취하고 우리의 온라인 쇼핑 행동에 책임감을 가져야
              한다. 다크 패턴에 대한 인식을 형성하는 것 또한 잠재적인 피해와 경제적 손실을 피하기 위해 필수적이다. 궁극적으로 우리의 관심과 노력은
              조종으로부터 우리를 보호하고, 우리가 이 디지털 시대에 현명한 결정을 내릴 수 있도록 해 줄 것이다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P19;
