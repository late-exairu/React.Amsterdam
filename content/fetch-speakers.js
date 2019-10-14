const { markdownToHtml } = require('./markdown');

const queryPages = /* GraphQL */ `
  query($conferenceTitle: ConferenceTitle, $eventYear: EventYear) {
    conf: conferenceBrand(where: { title: $conferenceTitle }) {
      id
      status
      year: conferenceEvents(where: { year: $eventYear }) {
        id
        status
        speakers: pieceOfSpeakerInfoes {
          status
          id
          label
          isNightSpeaker
          speaker {
            id
            name
            company
            country
            bio
            githubUrl
            twitterUrl
            mediumUrl
            ownSite
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;

const fetchData = async(client, vars) => {
  const data = await client
    .request(queryPages, vars)
    .then(res => res.conf.year[0].speakers);

  const speakers = data
    .map(item => ({
      ...item.speaker,
      ...item,
      avatar: (item.speaker && item.speaker.avatar) || {},
    }))
    .map(
      async({
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

  const allSpeakers = await Promise.all(speakers);

  const daySpeakers = allSpeakers.filter(
    ({ isNightSpeaker }) => !isNightSpeaker
  );
  const eveningSpeakers = allSpeakers.filter(
    ({ isNightSpeaker }) => isNightSpeaker
  );

  return {
    speakers: daySpeakers,
    eveningSpeakers,
  };
};

module.exports = {
  fetchData,
};
