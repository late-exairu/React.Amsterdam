const { markdownToHtml } = require('./markdown');

const queryPages = /* GraphQL */ `
  query($conferenceTitle: ConferenceTitle, $eventYear: EventYear) {
    conf: conferenceBrand(where: { title: $conferenceTitle }) {
      id
      status
      year: conferenceEvents(where: { year: $eventYear }) {
        id
        status
        openForTalks
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
              url(
                transformation: {
                  image: { resize: { width: 500, height: 500, fit: crop } },
                  document: { output: { format: jpg } }
                }
              )
            }
          }
        }
      }
    }
  }
`;

const fetchData = async (client, vars) => {
  const data = await client
    .request(queryPages, vars)
    .then(res => ({ speakers: res.conf.year[0].speakers, openForTalks: res.conf.year[0].openForTalks }));

  const { openForTalks } = data;
  const speakers = data.speakers
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
    speakersBtn: openForTalks ? 'Submit a talk' : false,
  };
};

module.exports = {
  fetchData,
};
