import { useEffect, useState } from 'react';
import React from 'react';
import {
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  Textarea,
  Tag,
  Image,
  Scroll,
  TMainHeaderInfoTypes,
  Typography,
  BottomSheet,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L04C07A03 } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
const textContentA03 = {
  title: `A Better Future for
  Coffee Waste`,
  content: `The famous German musician Johann Sebastian Bach once said, “Without my morning coffee, I’m just like a dried-up piece of goat.” Today this sentiment is shared by many,with coffee shops springing up on almost every street corner, and it is common to see city residents walking around with a cup of coffee in hand. According to the International Coffee Organization (ICO), approximately 10 billion tons of coffee was consumed worldwide between 2020 and 2021, and Koreans made a significant contribution to this huge total, consuming 150,780 tons of coffee. This means that every Korean adult drank an average of one cup of coffee every day throughout the year. Clearly, for Koreans and other world citizens, coffee is not just a drink but a daily necessity.
  The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant waste. Only 0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent disposed of as waste. As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.
  So, what happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general waste and sent to landfills. There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2. Some SCGs are incinerated instead of being buried, but this releases a lot of CO2: 338 kg per ton. However, neither of these waste management options takes into account the potential value of coffee grounds. Although the grounds contain valuable organic compounds and minerals, they are simply destroyed.
  An example of a circular economy in action occurs when a chain of coffee shops collaborates with an organization to collect spent coffee grounds from its shops. These grounds are processed to remove impurities and dried out. The resulting SCGs are sold to fertilizer companies, where they are transformed into organic fertilizer. This fertilizer is later sold back to the coffee shop chain. The chain provides the fertilizer to local ecofriendly farmers, who then sell their produce back to the chain. The farm produce can be used to create various food items, such as rice chips and dried sweet potatoes, which are sold in the chain’s coffee shops. By repurposing coffee grounds in this manner, related businesses and local farmers can benefit both economically and environmentally.
  Recycled coffee grounds have a wide range of uses, including coffee logs, fabrics for clothing and shoes, and reusable cups. Coffee logs, for instance, generate more heat and burn for a longer time than wood. Fabric made from coffee grounds absorbs sweat, dries quickly, and provides UV protection. Reusable cups from coffee grounds not only have a visually appealing appearance but also preserve the taste of the coffee. Korea has shown a growing interest in recycling spent coffee grounds in recent years. The government is taking steps toward the creation of a sustainable recycling system in the coffee industry, while companies are dedicating themselves to researching and developing new uses for coffee waste. By recycling materials such as coffee waste, individuals can also help protect the environment. With continued efforts, the recycling of used coffee grounds is expected to increase, encouraging more sustainable methods of enjoying coffee for years to come.`,
};
const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { title, content } = textContentA03;
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Present',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Think about how people could promote their business based on the main text, and then present your ideas',
  };
  const handleButtonOnClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const submitAnswer = () => {
    if (cardData.p04.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P04', userSubmission);
    }
  };
  const submitBtnColor = !cardData.p04.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
  const dialog = '“Made from ..., our products not only ... but also ... Use our cups and ...!”';
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
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
    changeData('P04', 1, 1, value);
  };
  useEffect(() => {
    return () => {
      saveData('P04');
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={cardData.p04.answer === ''}
      onSubmit={submitAnswer}
      bodyId='targetContainer'
      submitBtnColor={submitBtnColor}
    >
      <BoxWrap>
        <Box width='30%' hAlign={'center'} useRound border={'1px solid var(--color-grey-600)'}>
          <Image
            src={'/L04/C07/A03/HE1-L04-C07-A03-P04.jpg'}
            width='250px'
            height='200px'
            alt='각기 다른 색깔을 가진 세
              개의 컵 사진과 연결된 이름표
              Reusable Cup Maker'
          />
        </Box>
        <Box flex='1' border={'1px solid var(--color-grey-600)'} useRound background='var(--color-blue-50)'>
          <Box hAlign='right' margin={'10px'}>
            <Button
              minWidth='96px'
              size={EStyleSizes.SMALL}
              color={EStyleButtonTypes.SECONDARY}
              label='지문 보기'
              onClick={handleButtonOnClick}
              useRound
            />
          </Box>
          <Scroll height='120px'>
            <Typography size={EStyleFontSizes['SMALL']} width={'100%'}>
              {dialog}
            </Typography>
          </Scroll>
        </Box>
      </BoxWrap>
      <Dialog width={893} height={458} isShow={isDialogOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px' tabIndex={105}>
          <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            {title}
          </Typography>
        </Box>

        <Box hAlign='center' marginTop='24px'>
          <Scroll height={'250px'}>
            {content.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography size={EStyleFontSizes.MEDIUM}>{paragraph}</Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </Box>
      </Dialog>
      <Box vAlign='center' marginTop='20px'></Box>
      <Box>
        <Textarea
          value={cardData.p04.answer}
          readOnly={cardData.p04.isSubmitted ? true : false}
          onChange={event => handleChange(event.target.value)}
          width='100%'
          height='200px'
          placeholder='내용을 넣어 주세요.'
        />
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box marginTop='12px'>
            Made from recycled coffee grounds, our products not only look appealing but also preserve the taste of the coffee. Use our cups and become
            an eco- friendly coffee drinker!
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
