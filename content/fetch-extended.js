const { markdownToHtml } = require('./markdown');

const renderStyles = {
  None_Default: 'None_Default',
  Standard_Markdown: 'Standard_Markdown',
};

const queryTexts = /* GraphQL */ `
  query($conferenceTitle: ConferenceTitle, $eventYear: EventYear) {
    conf: conferenceBrand(where: { title: $conferenceTitle }) {
      id
      status
      year: conferenceEvents(where: { year: $eventYear }) {
        id
        status
        extendeds {
          title
          subtitle
          description
          location
          image {
            url
          }
        }
      }
    }
  }
`;

const markdownRender = async (text, style) => {
  const renders = {
    [renderStyles.None_Default]: t => t,
    [renderStyles.Standard_Markdown]: async t => await markdownToHtml(t),
  };
  const defaultRender = renders[renderStyles.None_Default];

  return await (renders[style] || defaultRender)(text);
}

const fetchData = async(client, vars) => {
  const data = await client
    .request(queryTexts, vars)
    .then(res => res.conf.year[0].extendeds);

  const extendeds = await Promise.all(
    data.map(async item => ({
      ...item,
      title: await markdownToHtml(item.title),
      subtitle: await markdownToHtml(item.subtitle),
      description: await markdownToHtml(item.description),
      location: await markdownToHtml(item.location),
    }))
  );

  extendeds
  return {
    extendeds,
  };
};

module.exports = {
  fetchData,
};
