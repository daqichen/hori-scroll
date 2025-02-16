import { IconName } from '../material-icon-names';

export const updateIconRequest = () => {
  const iconArray = Array.from(
    new Set(
      Array.from(
        document.getElementsByClassName('material-symbols-outlined'),
      ).map((spanEle) => (spanEle as HTMLSpanElement).innerText),
    ),
  );

  const totalExistingTagsHTMLCollection = document.getElementsByTagName('link');
  const existingMaterialSymbolsTag = Array.from(
    totalExistingTagsHTMLCollection,
  ).filter((item) =>
    item.href?.includes(
      'https://fonts.googleapis.com/css2?family=Material+Symbols',
    ),
  );
  let overallList = [...iconArray];
  existingMaterialSymbolsTag.forEach(
    (tag) =>
      (overallList = [
        ...overallList,
        ...((tag.href.split('icon_names=')?.[1].split(',') ??
          []) as IconName[]),
      ]),
  );
  console.log('overallList', Array.from(new Set(overallList)).sort().join(','));
  const linkTagsToDelete = Array.from(totalExistingTagsHTMLCollection).map(
    (item, ind) => {
      if (
        item.href?.includes(
          'https://fonts.googleapis.com/css2?family=Material+Symbols',
        )
      ) {
        return ind;
      }
    },
  );
  console.log('linkTagsToDelete', linkTagsToDelete);

  linkTagsToDelete.forEach((ind) => {
    if (ind) totalExistingTagsHTMLCollection[ind]?.remove();
  });

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.type = 'text/css';
  stylesheet.href = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=${Array.from(new Set(overallList)).sort().join(',')}`;
  document.head.appendChild(stylesheet);
};
