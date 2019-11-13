const { markdownToHtml } = require('./markdown');

const prepareSpeakers = speakers => speakers
  .map(item => ({
    ...item.speaker,
    ...item,
    avatar: (item.speaker && item.speaker.avatar) || {},
  }))
  .map(
    async ({
      bio,
      githubUrl,
      twitterUrl,
      mediumUrl,
      ownSite,
      speaker,
      avatar,
      ...item
    }) => ({
      ...item,
      company: `${item.company}, ${item.country}`,
      photo: avatar.url,
      desc: await markdownToHtml(bio),
      github: githubUrl,
      twitter: twitterUrl,
      medium: mediumUrl,
      site: ownSite,
    })
  );

module.exports = {
  prepareSpeakers,
};
