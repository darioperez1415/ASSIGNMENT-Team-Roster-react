import React from 'react';
import styled from 'styled-components';

const WelcomeStyle = styled.div`
  font-size: large;
  color: white;
  text-shadow:1em;
  position:center;
  flex:20%;
`;

export default function Home() {
  return (
    <>
      <WelcomeStyle>
        <div className="intro">
          <h1>Welcome to Liverpool FC Team Roster </h1>
          <p>
            Liverpool Football Club is a professional football club in
            Liverpool, England, that competes in the Premier League, the top
            tier of English football.{' '}
          </p>
        </div>
      </WelcomeStyle>
    </>
  );
}
