export type TQuestionType = 'img' | 'video';

export type TAnswerType = 'img' | 'text';

export type TQuestionVideo = { questionVideoSrc: string; qusetionVideoSrt?: string };
export type TQuestionImg = { questionImgSrc: string; questionImgAlt: string; questionImgTitle?: string; questionImgValue?: string };
export type TAnswerText = { answerText: { title: string; value: number | string }[] };
export type TAnswerImg = {
  answerImg: { answerImgSrc: string; answerImgAlt: string; answerImgTitle?: string; answerImgValue?: string; text?: string }[];
};

export type TQuestionInfo<T extends TQuestionType> = {
  questionType: T;
} & (T extends 'img' ? TQuestionImg : TQuestionVideo);

export type TAnswerInfo<T extends TAnswerType> = {
  answerType: T;
} & (T extends 'img' ? TAnswerImg : TAnswerText);

export type TContentInfo<Q extends TQuestionType, A extends TAnswerType> = {
  questionInfo: TQuestionInfo<Q>;
  answerInfo: TAnswerInfo<A>;
};

export type TSolutionData = {
  answer?: string;
  script?: string;
  interpretation?: string;
};
