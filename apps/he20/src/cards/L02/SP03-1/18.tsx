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

const P18 = ({ _page = 'P18' }) => {
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
        2. 다음 글에서 전체 흐름과 관계 <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>없는</u> 문장을 고르시오.
      </Typography>
    ),
    mark: cardData.p18.isSubmitted ? (cardData.p18.isCorrect ? 'correct' : 'incorrect') : 'none',
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
    if (cardData.p18.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p18.answer === cardData.p18.solution;
      setCardData(prev => ({ ...prev, p18: { ...prev.p18, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p18.answer,
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
          p18: {
            ...prev.p18,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p18.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p18: { ...prev.p18, answer: index } }));
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
      submitLabel={cardData.p18.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p18.isSubmitted && cardData.p18.answer === 0}
      submitBtnColor={
        !cardData.p18.isSubmitted && cardData.p18.answer === 0
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
              Dark patterns on digital platforms are becoming more complex and more prevalent. So, what is driving their growth? (1)Over the years,
              online commerce has grown steadily, especially with the development of smart phones and other digital technologies. (2)As the
              competition in online markets has intensified, companies have begun to develop sneakier strategies to trick people into making
              purchases. (3)While these companies insist that they are simply using new types of marketing strategies, critics do not agree that dark
              patterns are valid marketing strategies. (4)Developing a persuasive marketing strategy is essential for reaching target customers
              effectively. (5)Rather, they suggest that a real marketing strategy create value for both companies and customers, promoting positive
              and supportive relationships.
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
      <Box useFull flex='1'>
        {/* <Scroll height='398px' tabIndex={0}> */}
        <List
          gap={10}
          data={data}
          row={({ value, index = 1 }) => (
            <Radio
              type={'square'}
              align='vertical'
              name={'radio-question-A'}
              label={value?.text}
              value={index === cardData.p18.answer}
              onClick={() => handleChange(index)}
              readOnly={cardData.p18.isSubmitted}
              isError={cardData.p18.isSubmitted && cardData.p18.answer !== cardData.p18.solution}
            >
              <BoxWrap alignItems='baseline'>
                <Label value={index} />
                <Typography>{value?.text}</Typography>
              </BoxWrap>
            </Radio>
          )}
        />
        {/* </Scroll> */}
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p18.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              다크 패턴이 퍼지는 이유와 이것을 둘러싼 논쟁을 다룬 내용인데 4번은 앞 문장에서 언급된 마케팅 전략에 관련된 내용이므로, 글 전체의 흐름과
              무관하다.
            </Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              디지털 플랫폼상에서 다크 패턴은 점점 더 복잡해지고 더 퍼지고 있다. 그렇다면 무엇이 그 성장을 견인하고 있는가? 수년 동안, 온라인 상거래는
              특히 스마트폰과 다른 디지털 기술의 발달과 함께 꾸준하게 성장해 왔다. 온라인 시장에서의 경쟁이 심해지면서, 기업들은 사람들이 구매를
              하도록 속이기 위한 더 교활한 전략을 개발하기 시작했다. 이러한 기업들은 그들이 단지 새로운 유형의 마케팅 전략을 사용한다고 주장하는
              반면에, 비평가들은 다크 패턴이 정당한 마케팅 전략이라는 데 동의하지 않는다. (설득력 있는 마케팅 전략을 수립하는 것은 목표한 고객에게
              효과적으로 도달하기 위해 필수적이다.) 오히려, 그들은 진정한 마케팅 전략은 회사와 고객 모두를 위한 가치를 창출하여 긍정적이고 지지적인
              관계를 촉진해야 한다고 제안한다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P18;
