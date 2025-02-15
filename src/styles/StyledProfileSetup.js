import styled from "styled-components";

export const StyledProfileSetupStep = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h3{
    font-weight: 500;
  }
  .description {
    margin-top: 4px;
    margin-bottom: 40px;
  }
  .fields {
    min-height: 370px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .field {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 30px;
      label {
        font-weight: 400;
        font-size: 0.9rem;
        a{
            text-decoration: underline;
        }
      }
      input,
      select,
      textarea {
        width: 300px;
      }
      .gray-btn {
        border-radius: 50px;
        border: 1px solid var(--gray-color);
        padding: 8px 12px;
        background-color: transparent;
        &:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
      }
      .services-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        .gray-btn.active {
          border-color: var(--primary-color);
          color: var(--primary-color);
          background-color: #e4fbf0;
        }
      }
      .special-label {
        display: none;
      }
    }
  }
  &.step2 {
    .field {
      width: 70%;
      h5 {
        color: var(--text-light-color);
        width: 100%;
        text-align: center;
      }
      .range-input {
        width: 100%;
      }
    }
  }
  &.step3 {
    .field {
      .gray-btn {
        padding: 0px 8px;
        cursor: pointer;
      }
      width: 100%;
    }
  }
  &.step4 {
    textarea {
      padding: 10px 6px;
      border-radius: var(--m-radius);
      width: 320px;
      max-width: 320px;
      height: 200px;
      max-height: 200px;
    }
  }
`;
