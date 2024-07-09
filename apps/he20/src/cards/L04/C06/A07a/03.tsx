import { ChangeEvent, useEffect, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Button,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  EStyleFontSizes,
  BottomSheet,
  Tag,
  ETagLine,
  IQuestionProps,
  Image,
  PinchZoom,
  Textarea,
  Scroll,
} from '@maidt-cntn/ui';

import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import { L04C06A07a } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

export interface IDialog {
  dialogTitle: React.ReactNode;
  dialogText: string;
}

const P03 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [isPassageShow, setPassageShow] = useState<boolean>(false);

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A07a);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans?(5)',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: 'Q6. Add your comment about AI-powered neural implant technology.',
  };

  const dialogWithoutTitle: Omit<IDialog, 'dialogTitle'> = {
    dialogText:
      'I hope that we can overcome these challenges through careful consideration of neuroethics. This field highlights the social aspects of neural technology and provides possible answers to what should be considered legal and ethical. I think it is important to establish a prior review process and thoroughly assess the ethical aspects before any kind of brain research is conducted. This will ensure thatscience and technology progress in accordance with ethical principles.​ What do you think about this technology? Please share your opinion in the comments section below.',
  };

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.p03.answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P03', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page == 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
          },
        }));
      }

      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };
  const handlePassageButtonClick = () => {
    setPassageShow(prevState => !prevState);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const truncateValue = truncateToMaxBytes(e.target.value);
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: truncateValue } }));
    changeData('P03', 1, 1, truncateValue);
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
      onSubmit={handleSubmit}
      vAlign={'flex-start'}
      submitDisabled={cardData.p03.answer === ''}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={!cardData.p03.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap useFull>
        <Box width='346px'>
          <PinchZoom>
            <Image src={'/L04/C06/A07/HE2-L04-C06-A07-P01.jpg'} alt={''} width='350px' ariaDescribedby='img_desc' />
          </PinchZoom>
          <Box type='hidden' id='img_desc'>
            <p>인터넷 게시글에 작성된 세 개의 코멘트 프로필 사진 옆에 그 사람이 작성한 코멘트가 있다. (오래된 순)</p>

            <p>
              작성자 : Eric Davis 작성 시각 : 9 minutes ago 공감 수 : 4 작성 글: Wow, AI-powered neural implants sound incredible! I can’t believe
              that AI can help the disabled walk again and use artificial arms that move according to their thoughts!
            </p>

            <p>
              작성자 : Yumi Lee 작성 시각 : 5 minutes ago 공감 수 : 9 작성 글: Well, the technology sounds amazing, but I’m really worried about the
              privacy issues it might cause. I think it is necessary to strictly enforce privacy laws to protect the personal information of
              individuals.
            </p>

            <p>
              작성자 : Andy Taylor 작성 시각 : 2 minutes ago 공감 수 : 17 작성 글: Thank you all for sharing your thoughts. I’ll talk more about how
              to address the concerns in my next post
            </p>
          </Box>
          <Box>
            <Textarea
              value={cardData.p03.answer}
              onChange={handleChange}
              width='380px'
              height='185px'
              rows={5}
              placeholder='내용을 넣어 주세요.'
              readOnly={cardData.p03.isSubmitted}
              ariaLabel='답란'
            />
          </Box>
        </Box>
        <Box></Box>
        <Box></Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isPassageShow ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={handlePassageButtonClick}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false} usePre>
                  {dialogWithoutTitle.dialogText}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handlePassageButtonClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>
              I’m most interested in the incredible potential for AI-powered neural implants in the medical field! It’s inspiring to see how they
              could revolutionize treatments. I hope that more people can access and benefit from this technology.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
