// import React from 'react';
// import { gql } from 'apollo-boost';
// import { Query } from 'react-apollo';

// import { GET_DOG } from './Detail';
// import DogList from '../DogList';
// import { Dog } from '../Dog';
// import Header from '../Header';

// import ProjectList from './ProjectList';

// const GET_DOGS = gql`
//   {
//     dogs {
//       id
//       breed
//       displayImage
//     }
//   }
// `;

// export default function Projects() {
//   return (
//     <View style={styles.container}>
//       <Header />
//       <Query query={GET_DOGS}>
//         {({ loading, error, data, client }) => {
//           if (loading) return <div>Fetching..</div>;
//           if (error) return <div>Error..</div>;

//           return (
//             <ProjectList
//               data={data.dogs}
//               renderRow={(type, data) => (
//                 <Link
//                   to={{
//                     pathname: `/${data.breed}/${data.id}`,
//                     state: { id: data.id },
//                   }}
//                   onMouseOver={() =>
//                     client.query({
//                       query: GET_DOG,
//                       variables: { breed: data.breed },
//                     })
//                   }
//                   style={{ textDecoration: 'none' }}
//                 >
//                   <Dog {...data} url={data.displayImage} />
//                 </Link>
//               )}
//             />
//           );
//         }}
//       </Query>
//     </View>
//   );
// }
