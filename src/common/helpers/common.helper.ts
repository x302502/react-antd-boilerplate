const getKeyEnumByValue = <T = any>(targetEnum: T, valueFind: any) => {
  return Object.keys(targetEnum)[Object.values(targetEnum).indexOf(valueFind)] || '';
};

const pipeLongTextUi = (value: string = '', leftCharAmount = 4, rightCharAmount = 4) => {
  if (value.length <= leftCharAmount + rightCharAmount + 3) {
    return value;
  }
  return `${value?.substring(0, leftCharAmount) ?? ''}...
  ${value?.substring(value.length - rightCharAmount) ?? ''}`;
};

const getBaseUrl = () => {
  return window.location.origin;
};
const parseParams = (paramObject: Record<string, string>) => {
  return new URLSearchParams(paramObject).toString();
};

const checkURLType = (url: string) => {
  if (!url) {
    return 'Other';
  }
  const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const extension = url.split('.').pop().toLowerCase();
  if (videoExtensions.includes(extension)) {
    return 'Video';
  } else if (imageExtensions.includes(extension)) {
    return 'Image';
  } else {
    return 'Other';
  }
};

export const commonHelper = { checkURLType, getBaseUrl, getKeyEnumByValue, parseParams, pipeLongTextUi };
