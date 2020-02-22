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
    font-size: 14px;
    font-weight: bold;
    text-transform: none;
    text-decoration: none;
    padding: 2px !important;
    width: max-content;
    z-index: 9999;
    opacity: 0.7;
    display: flex;
    align-items: center;
  }
  .graphcms-container__edit-button:hover {
    opacity: 1;
  }

  .graphcms-container__edit-button.alt {
    top: 30px;
    background: #be57ff;
  }

  span.graphcms-container .graphcms-container__edit-button {
    transform: translate(0, -100%);
  }

  div.edit-icon {
    width: 16px;
    height: 16px;
    background-image: url(/img/edit.svg);
    background-size: contain;
    display: inline-block;
  }
  div.edit-text {
    margin: 4px;
  }
`;

export const injectStyles = () => {
  const style = document.createElement('style');
  style.innerText = globalStyles;
  document.head.appendChild(style);
};
