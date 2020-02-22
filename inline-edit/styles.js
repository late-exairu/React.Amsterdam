const styled = {
  global: str => str.raw[0],
};

const globalStyles = styled.global`
  .graphcms-container {
    outline: #ff5f7b 2px inset;
    box-shadow: 0px 0px 4px 4px #a20e27;
  }

  .graphcms-container__hook {
    position: relative;
  }

  .graphcms-container__edit-button {
    position: absolute;
    left: 0;
    top: 0;
    background: #2da500;
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-transform: none;
    padding: 5px;
    z-index: 9999;
  }

  span.graphcms-container .graphcms-container__edit-button {
    transform: translate(0, -100%);
  }
`;

export const injectStyles = () => {
  const style = document.createElement('style');
  style.innerText = globalStyles;
  document.head.appendChild(style);
};
