import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, EStyleButtonTypes, BoxWrap, Textarea, File } from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { initDataType, correctDataType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { handleDownload, handleUpload } from '@maidt-cntn/util/FileUtil';
import { LabelTypes } from '@/assets/styles';

interface FileInfo {
  subjectCode: string;
  path: string;
  id: number;
}

interface PageInfo {
  headerText: string;
  mainKey: number;
  subKey: string;
  pageNum: number;
  questionText: string;
}

interface EEL10C03A10P03 {
  answer: any;
  pageInfo: PageInfo;
  fileInfo: FileInfo;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
}

export const imgName = 'uploadImg1.png';

const EEL10C03A10P03 = ({ pageInfo, answer, fileInfo, getDefaultData, getCorrectData }: EEL10C03A10P03) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.mainKey),
    collectDatas: getCorrectData(pageInfo.mainKey),
  });

  const { subjectCode, path, id } = fileInfo;
  const serverFileName = imgName;
  const [disabled, setDisabled] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const isComplete = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);

  const loadPreviewImg = async (subjectCode: string, path: string, id: number, setImgSrc: Function) => {
    const filename = `${path}/${id}/${serverFileName}`;
    const img = await handleDownload(subjectCode, filename);
    const url = window.URL.createObjectURL(img);
    setImgSrc(url);
  };

  useEffect(() => {
    loadPreviewImg(subjectCode, path, id, setImgSrc);
  }, []);

  const handleInputChange = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
    setDisabled(value.length === 0);
  };

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    // const fileName = file.name;
    const uploadSuccess = await handleUpload(file, subjectCode, path, id, serverFileName);

    if (uploadSuccess) {
      console.log('[ 이미지 업로드 완료 ]');
      loadPreviewImg(subjectCode, path, id, setImgSrc);
    }
  };

  const handleSubmit = () => {
    if (!isComplete) {
      submitPageData();
    } else {
      setShowSolution(!showSolution);
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: pageInfo.headerText,
    headerPattern: 'text',
  };

  return (
    <Container
      headerInfo={headerInfo}
      submitLabel={isComplete ? (showSolution ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={disabled}
      submitBtnColor={!disabled ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.TERTIARY}
      onSubmit={handleSubmit}
      questionInfo={{
        size: 'medium',
        text: pageInfo.questionText,
      }}
    >
      <Box useFull display='flex' flexDirection='column' alignItems='center' padding={'30px'}>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' marginBottom='32px' flexDirection='column'>
          <BoxWrap gap={40}>
            <Box>
              <Box marginBottom={14}>
                <LabelTypes
                  info='title'
                  fontSize={32}
                  background='#0091FF'
                  color='#fff'
                  type='paint'
                  value='오늘 배운 낱말'
                  cssStyle={{
                    width: '440px',
                  }}
                />
              </Box>
              <Textarea
                width='440px'
                height='256px'
                placeholder='내용을 넣어 주세요.'
                value={getValueInputData(pageInfo.mainKey, pageInfo.subKey) as string}
                disabled={isSubmittedInput(pageInfo.mainKey, pageInfo.subKey)}
                onChange={e => handleInputChange(pageInfo.mainKey, pageInfo.subKey, e.target.value)}
              />
            </Box>
            <Box>
              <FileWrap onChange={handleUploadImage}>{imgSrc ? <ImgWrap src={imgSrc} alt='업로드된 이미지' /> : <File />}</FileWrap>
            </Box>
          </BoxWrap>
          {showSolution && (
            <SolutionBox>
              <div>
                <span>답안</span>
                <p>{answer}</p>
              </div>
            </SolutionBox>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default EEL10C03A10P03;

const FileWrap = styled.div`
  width: 480px;
  height: 336px;
  backgound: #e0e2e6;
  border-radius: 8px;
`;

const ImgWrap = styled.img`
  width: 480px;
  height: 340px;
  border-radius: 8px;
`;

const SolutionBox = styled.div`
  width: 952px;
  height: auto;
  background: rgba(239, 240, 242, 0.3);
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
