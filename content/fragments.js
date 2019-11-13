const speakerFragment = /* GraphQL */ `
  fragment imageUrl on Speaker {
    avatar {
      url(transformation: {image: {resize: {width: 500, height: 500, fit: crop}}, document: {output: {format: jpg}}})
    }
  }

  fragment speaker on PieceOfSpeakerInfo {
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
      ...imageUrl
    }
  }
`;

module.exports = {
  speakerFragment,
};
