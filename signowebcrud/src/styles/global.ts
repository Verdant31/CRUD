import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
 
  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

  }

  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: white;
    padding: 3rem;
    position: relative;
    border-radius:1.24rem;

  }

`