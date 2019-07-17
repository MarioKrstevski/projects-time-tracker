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
      {
        description: "Created Weather Widget to include in our library",
        duration: 4000
      }
    ]
  }
];
import redis from "redis";
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

client.on("error", err => {
  console.log("Error " + err);
});

client.set("projects", JSON.stringify(projects));

export default {
  Query: {
    getProjects: async () => {
      try {
        const projectsString = await getAsync("projects");
        const projects = JSON.parse(projectsString);
        return projects;
      } catch (err) {
        console.log("Error while getProjects query", err);
        return {
          error: "Failed to get projects"
        };
      }
    },
    getProject: async (parent, { projectName }, context, info) => {
      try {
        const projectsString = await getAsync("projects");
        const projects = JSON.parse(projectsString);
        const project = projects.find(project => {
          return project.projectName.toLowerCase() === projectName;
        });
        return project;
      } catch (err) {
        console.log("Error while getProject query", err);
        return {
          error: "Failed to get project"
        };
      }
    }
  },
  Mutation: {
    addProject: async (parent, { projectName, description }) => {
      try {
        const projectsString = await getAsync("projects");
        let projects = JSON.parse(projectsString);

        projects = [
          ...projects,
          {
            projectName: `${projectName}`,
            description: `${description}`,
            time: []
          }
        ];

        client.set("projects", JSON.stringify(projects));

        return {
          projectName: `${projectName}`,
          description: `${description}`,
          time: []
        };
      } catch (err) {
        console.log("Error from addProject mutation,", err);
        return {
          error: "Failed to add project"
        };
      }
    },
    deleteProject: async (parent, { projectName }) => {
      try {
        const projectsString = await getAsync("projects");
        let projects = JSON.parse(projectsString);

        projects = projects.filter(project => {
          return project.projectName !== projectName;
        });

        client.set("projects", JSON.stringify(projects));
        return "Successfuly deleted project";
      } catch (err) {
        console.log("Error from addProject mutation,", err);

        return "Failed to delete project";
      }
    },
    updateProject: async (
      parent,
      { projectName, description, oldProjectName }
    ) => {
      try {
        const projectsString = await getAsync("projects");
        let projects = JSON.parse(projectsString);
        let projectTime = [];
        projects = projects.filter(project => {
          if (project.projectName === oldProjectName) {
            projectTime = project.time;
          }
          return project.projectName !== oldProjectName;
        });

        projects = [
          ...projects,
          {
            projectName: `${projectName}`,
            description: `${description}`,
            time: projectTime
          }
        ];

        client.set("projects", JSON.stringify(projects));

        return {
          projectName: `${projectName}`,
          description: `${description}`,
          time: projectTime
        };
      } catch (err) {
        console.log("Error from updateProject mutation,", err);
        return {
          error: "Failed to update project"
        };
      }
    },
    deleteTime: async (parent, { projectName, description }) => {
      try {
        const projectsString = await getAsync("projects");
        let projects = JSON.parse(projectsString);

        const project = projects.find(project => {
          return project.projectName === projectName;
        });

        let time = project.time;
        let deletedTime = time.find(
          timeEntry => timeEntry.description === description
        );
        time = time.filter(timeEntry => {
          return timeEntry.description !== description;
        });

        projects = projects.map(project => {
          if (project.projectName === projectName) {
            let returnProject = project;
            returnProject.time = time;
            return returnProject;
          } else {
            return project;
          }
        });

        client.set("projects", JSON.stringify(projects));

        return deletedTime;
      } catch (err) {
        console.log("Error from deleteTime mutation,", err);
        return {
          error: "Failed to delete time on project"
        };
      }
    },
    addTime: async (parent, { projectName, description, duration }) => {
      try {
        const projectsString = await getAsync("projects");
        let projects = JSON.parse(projectsString);

        const project = projects.find(project => {
          return project.projectName === projectName;
        });

        let time = project.time;
        time = [
          ...time,
          {
            description,
            duration
          }
        ];

        projects = projects.map(project => {
          if (project.projectName === projectName) {
            let returnProject = project;
            returnProject.time = time;
            return returnProject;
          } else {
            return project;
          }
        });

        client.set("projects", JSON.stringify(projects));

        return {
          description,
          duration
        };
      } catch (err) {
        console.log("Error from addTime mutation,", err);
        return {
          error: "Failed to add time on project"
        };
      }
    }
  }
};
