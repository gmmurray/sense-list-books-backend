export const createOriginUrls = (url: string): string[] => {
  const result: string[] = [];
  if (url.includes('www')) {
    result.push(url, url.replace('www', ''));
  } else {
    const splitIndex = url.lastIndexOf('/') + 1;
    result.push(url);
    result.push(
      url.substring(0, splitIndex) +
        'www.' +
        url.substring(splitIndex, url.length),
    );
  }

  return result;
};
