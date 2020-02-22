const projectId = '8be1ceff148c4b749e78b34007f9cc34';
const projectStage = 'master';

const createEntryURL = ({ id, contentTypeId }) => {
  const url = `https://app.graphcms.com/${projectId}/${projectStage}/content/${contentTypeId}/table/${id}`;
  return url;
};

const getContentTypeName = contentTypeMap => contentTypeId => {
  const type = Object.entries(contentTypeMap).find(
    ([_, id]) => id === contentTypeId
  );
  if (!type) return 'unknown';
  return type[0];
};

const addHook = element => {
  const hook = document.createElement('div');
  hook.classList.add('graphcms-container__hook');
  element.insertBefore(hook, element.firstElementChild);
  return hook;
};

const addLink = (element, id, contentTypeId, typeName) => {
  const link = document.createElement('a');
  link.classList.add('graphcms-container__edit-button');
  link.href = createEntryURL({ id, contentTypeId });
  link.innerText = `edit ${typeName}`;
  link.target = '_blank';
  element.appendChild(link);
  return link;
};

const addButtonTo = getTypeName => element => {
  const { id, contentType } = element.dataset;
  const hook = addHook(element);
  const typeName = getTypeName(contentType);
  const link = addLink(hook, id, contentType, typeName);
  return link;
};

export const injectButtons = contentTypeMap => {
  const cmsContainers = [...document.querySelectorAll('[data-content-type]')];
  cmsContainers.forEach(addButtonTo(getContentTypeName(contentTypeMap)));
};
