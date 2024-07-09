import { Container } from '@maidt-cntn/ui/en';
import { Box, Textarea, TMainHeaderInfoTypes, EStyleButtonTypes, BottomSheet } from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import Img from '../assets/icon/yellow_dot.png';

interface PageInfo {
  headerText: string;
  mainKey: number;
  subKey: string;
  pageNum: number;
}

interface EE40L01C01A03P01 {
  pageInfo: PageInfo;
  list: string[];
  answer: string;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | null;
    }[][];
  }[];
}

const EE40L01C01A03P01 = ({ pageInfo, list, answer, getDefaultData, getCorrectData }: EE40L01C01A03P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.mainKey),
    collectDatas: getCorrectData(pageInfo.mainKey),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: pageInfo.headerText,
    headerPattern: 'text',
  };

  const splitArray = (arr: any, n: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += n) {
      result.push(arr.slice(i, i + n));
    }
    return result;
  };

  const datas = splitArray(list, 3);
  const [disabledIs, setDisabled] = useState(true);
  const [showIs, setShowIs] = useState(false);
  const isComplete: boolean = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);

  const onChangeInputs = (e: React.ChangeEvent<HTMLTextAreaElement>, subKey: string) => {
    const valusIs = e.target.value;
    handleChangeInputData(pageInfo.mainKey, subKey, valusIs);

    if (valusIs.length > 0) setDisabled(false);
    else setDisabled(true);
  };

  const onSubmitData = () => {
    if (!isComplete) return submitPageData();
    setShowIs(!showIs);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      submitLabel={isComplete ? (showIs ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={disabledIs}
      submitBtnColor={!disabledIs ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.TERTIARY}
      onSubmit={() => onSubmitData()}
    >
      <Box useFull>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' marginBottom='32px' useFull>
          {datas.map((item, index) => (
            <YellowList key={index}>
              {item.map((subItem: any, subIndex: any) => (
                <li key={subIndex}>{subItem}</li>
              ))}
              {index === datas.length - 1 && (
                <Textarea
                  value={getValueInputData(pageInfo.mainKey, pageInfo.subKey) as string}
                  disabled={isSubmittedInput(pageInfo.mainKey, pageInfo.subKey)}
                  onChange={e => onChangeInputs(e, pageInfo.subKey)}
                  placeholder='내용을 넣어주세요.'
                  width='438px'
                />
              )}
            </YellowList>
          ))}
        </Box>
        {showIs && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showIs}>
            <SolutionBox>
              <div>
                <span>답안</span>
                <p>{answer}</p>
              </div>
            </SolutionBox>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

export default EE40L01C01A03P01;

const YellowList = styled.ul`
  display: flex;
  width: 438px;
  flex-direction: column;
  align-items: center;
  li {
    &:before {
      /* content: url(${`Img`}); */
      content: '';
      background-color: #ffb400;
      width: 12px;
      height: 12px;
      margin: 0 20px 0 0;
      border-radius: 50px;
    }
    width: 100%;
    color: var(--color-grey-900);
    font-size: 32px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
`;

const SolutionBox = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #e0e2e6;
  border-radius: 12px;
  padding: 28px;

  div {
    margin-bottom: 22px;
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      border-radius: 30px;
      background: #e5f4ea;
      border: 2px solid #1eaa58;
      color: #007637;
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
      width: 79px;
      font-weight: bold;
      font-size: 22px;
    }
    p {
      color: var(--color-grey-900);
      font-size: 28px;
      font-weight: bold;
      padding-left: 10px;
    }
  }
`;
