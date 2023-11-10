export const getDate = () => {
  function getSeventhDate() {
    const currentDateTime = new Date();
    currentDateTime.setDate(currentDateTime.getDate() + 7);
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();
    return `${year}-${month}-${day}`;
  }

  function getFifthDate() {
    const currentDateTime = new Date();
    currentDateTime.setDate(currentDateTime.getDate() + 5);
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();
    return `${year}-${month}-${day}`;
  }

  function getSecondDate() {
    const currentDateTime = new Date();
    currentDateTime.setDate(currentDateTime.getDate() + 1);
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();
    return `${year}-${month}-${day}`;
  }

  const dateObject = {
    seventhDate: getSeventhDate(),
    fifthDate: getFifthDate(),
    secondDate: getSecondDate(),
  };

  return dateObject;
};
