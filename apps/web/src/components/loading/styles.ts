import styled from 'styled-components';

export const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: center;
  background: ${props => props.theme.backgroundColorDown};
`;
