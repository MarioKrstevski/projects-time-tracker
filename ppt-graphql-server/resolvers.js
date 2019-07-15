
const projects = [
  {
    projectName: "Google",
    description: "a search engine",
    time: [
      { description: "Implemented Search Bar", duration: 2000 },
      { description: "Improved Search Speed", duration: 8000 }
    ]
  },
  {
    projectName: "Youtube",
    description: "video sharing platform",
    time: [
      { description: "Updated Styling", duration: 1000 },
      { description: "New demonetisation algorithm", duration: 3000 }
    ]
  },
  {
    projectName: "Flutter",
    description: "Better Android",
    time: [
      { description: "Created demo app for note session", duration: 3300 },
      { description: "Created Weather Widget to include in our library", duration: 4000 }
    ]
  }
];

export default {
    Query: {
        getProjects: () => projects,
        getProject: (parent, args, context, info) => {
          let found = projects.find(project => {
            return project.projectName.toLowerCase() === args.projectName;
          });
    
          if (found != undefined && found != null) {
            return found;
          } else {
            return {
              projectName: "Default - Search not found",
              description: "Default Default - Search not found",
              time: [
                { description: "Default - Search not found implemented", duration: 3300 },
                { description: "Default - Can't find Project", duration: 4000 }
              ]
            };
          }
        }
        // getProject: (parent, args, context, info) => {
    
        // return  {
        //   projectName: args.projectName,
        //   description: "Better Android",
        //   time: [
        //     { dateRegistered: new Date().toLocaleDateString(), duration: 3300 },
        //     { dateRegistered: new Date().toLocaleDateString(), duration: 4000 }
        //   ]
        // }
      }
}