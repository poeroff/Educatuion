type ArraysMatchResult = {
  isAllCorrect: boolean;
  keysMatch: boolean[];
};

export const arraysMatchRegardlessOrder = (arr1: (string | number)[], arr2: (string | number)[]): ArraysMatchResult => {
  const keysMatch: boolean[] = [];
  const array2 = [...arr2];

  arr1.forEach(arrEl => {
    const matchIndex = array2.findIndex(el => el === arrEl);
    if (matchIndex !== -1) {
      keysMatch.push(true);
      array2.splice(matchIndex, 1);
    } else {
      keysMatch.push(false);
    }
  });

  const isAllCorrect = keysMatch.every(match => match);

  return { isAllCorrect, keysMatch };
};
