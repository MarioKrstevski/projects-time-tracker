// import React from "react";
// import { Link } from '@reach/router';

// import { gql } from "apollo-boost";
// import { Query } from "react-apollo";

// import { GET_PROJECTS } from "./Detail";
// import ProjectList from "./ProjectList";
// import { Dog } from "../Dog";
// import Header from "../Header";
// import { Fetching, Error } from "../Fetching";

// const GET_DOGS = gql`
//   {
//     dogs {
//       id
//       breed
//       displayImage
//     }
//   }
// `;

// const Feed = () => (
//   <View style={styles.container}>
//     <Header />
//     <Query query={GET_DOGS}>
//       {({ loading, error, data, client }) => {
//         if (loading) return <Fetching />;
//         if (error) return <Error />;

//         return (
//           <DogList
//             data={data.dogs}
//             renderRow={(type, data) => (
//               <Link
//                 to={{
//                   pathname: `/${data.breed}/${data.id}`,
//                   state: { id: data.id }
//                 }}
//                 onMouseOver={() =>
//                   client.query({
//                     query: GET_DOG,
//                     variables: { breed: data.breed }
//                   })
//                 }
//                 style={{ textDecoration: "none" }}
//               >
//                 <Dog {...data} url={data.displayImage} />
//               </Link>
//             )}
//           />
//         );
//       }}
//     </Query>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     flex: 1
//   }
// });

// export default Feed;


import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import Project from './Project';
import { ProjectListContainer } from './styled-components';
import { Link } from '@reach/router';

export default function ProjectList(props) {
  const projectList = props.projects.map(project => {
    return (
      <div key={project.projectName}>
        <Link to={'project/' + project.projectName.toLowerCase()}>
          Open Project
        </Link>
        <Project
          addTime={props.addTime}
          key={project.projectName}
          time={project.time}
          name={project.projectName}
          description={project.description}
        />
      </div>
    );
  });

  return (
    <ProjectListContainer>
      <ProjectForm addNewProject={props.addNewProject} />
      {projectList}
    </ProjectListContainer>
  );
};