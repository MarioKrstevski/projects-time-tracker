import styled from 'styled-components';

export const ProjectListContainer = styled.div`
  width: 100%;
  min-width: 300px;
`;

export const ProjectPageContainer = styled.div`
  width: 80vw;
  min-width: 300px;
  margin: 0 auto;
  height: 100%;
`;
export const ProjectStats = styled.div`
  padding: 10px 30px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  background-color: #307f69;
  color: #fff;
  text-shadow: 0 1px 1px #111111;
  font-size: 21px;
  text-align: center;
  display: grid;
  grid-template-columns: 500px auto;
  justify-items: center;
  grid-template-rows: auto;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  & div h1 {
    padding: 0;
    margin: 0;
    margin-top: 20px;
  }

  & .totalTime {
    align-self: center;

    .time {
      text-shadow: 0 1px 1px #111;
      padding-top: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 28px;
      color: lightcyan;
      font-weight: bolder;
    }
  }
`;
export const TimeEntryHeader = styled.div`
  display: grid;
  grid-template-columns: 65% 25% auto;
  grid-template-rows: auto;
  background-color: #599887;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  text-transform: capitalize;
  text-decoration: underline;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;
export const TimeEntryElement = styled.div`
  display: grid;
  grid-template-columns: 65% 25% auto;
  grid-template-rows: auto;
  text-align: center;
  color: smokewhite;

  & p {
    font-size: 17px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  align-self: center;

  & button {
    border-radius: 3px;
    text-align: center;
    width: fit-content;
    border: none;
    outline: none;
    height: 30px;
    font-size: 15px;
    background-color: #e58e8e;

    span {
      font-size: 18px;
      font-weight: bold;
      color: darkred;
    }
  }
`;

export const TimeEntriesList = styled.div`
  & > *:nth-child(odd) {
    background-color: #508879;
  }
  & > *:nth-child(even) {
    background-color: #729f93;
  }
`;
export const TimeEntryFormContainer = styled.div`
  display: grid;
  background-color: #599887;
  grid-template-columns: 1fr 1fr 13%;
  grid-template-rows: 50px;
  text-align: center;
  color: black;
  font-size: 18px;

  & > div {
    align-self: center;

    input {
      min-width: 200px;
      outline: none;
      border: none;
    }
  }

  & .addTimeButton {
    height: 65%;

    button {
      height: 100%;
      border: none;
      outline: none;
      border-radius: 3px;
      background-color: #73e5d7;

      span {
        font-size: 18px;
        color: darkgreen;
      }
    }
  }
`;

// Here start the css for MainPage

export const ProjectFormContainer = styled.div`
  /* height:200px; */
  display:grid;
  justify-items: end;
  background-color: #307f69;
  height: 75px;

  & button{
    align-self: center;
    margin-right:20px;
    height:35px;
    padding: 0 20px;
    border-radius:5px;
    border:none;
    outline: none;
    background-color: #82f6a1;

  }
  & button:hover{
    background-color: #A6f9C4;

  }
`;

export const FieldContainer = styled.div`
  /* float: right; */
  margin-right:8px;
  line-height:75px;
  display: inline-block;
  height: 99%;
  min-width: 250px;
  width: fit-content;
`;

export const FieldRow = styled.div`

  input {
    background-color: white;   
    min-width:240px;
    height:40px;
    border-radius: 8px;
    border:none;
    outline:none;
    font-size:18px;
    font-weight:400;
    color:black;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    padding-left: 30px;
  }
  input::placeholder{
    font-weight:400;
color: ${props => (props.error && props.touched ? 'red' : 'black')};

  }
`;
export const Name4 = styled.div``;
export const Name5 = styled.div``;
export const Name6 = styled.div``;
export const Name7 = styled.div``;
export const Name8 = styled.div``;
export const Name9 = styled.div``;
