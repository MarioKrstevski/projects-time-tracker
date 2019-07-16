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

// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//   console.log(replies.length + " replies:");
//   replies.forEach(function (reply, i) {
//       console.log("    " + i + ": " + reply);
//   });
//   // client.quit();
// });

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
            {
              description: "Default - Search not found implemented",
              duration: 3300
            },
            { description: "Default - Can't find Project", duration: 4000 }
          ]
        };
      }
    },
    getRedis: (parent, { key }) => {
      try {
        return client.get(key);
      } catch (e) {
        return null;
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
  },
  Mutation: {
    addProject: async (parent, { projectName, description }) => {
      console.log("We are hitting the server");
      try {
        await client.set("Test", "Test", redis.print);
        return {
          projectName: `${projectName} Success`,
          description: `${description}`,
          time: [
            {
              description: "Default - Search not found implemented",
              duration: 3300
            },
            { description: "Default - Can't find Project", duration: 4000 }
          ]
        };
      } catch (e) {
        console.log(e);
        return {
          projectName: `${projectName} Failure`,
          description: `${description}`,
          time: [
            {
              description: "Default - Search not found implemented",
              duration: 3300
            },
            { description: "Default - Can't find Project", duration: 4000 }
          ]
        };
      }
      // console.log(projectName,description)
      // return {
      //   projectName: `${projectName} Test`,
      //   description: `${description}`,
      //   time: [
      //     {
      //       description: "Default - Search not found implemented",
      //       duration: 3300
      //     },
      //     { description: "Default - Can't find Project", duration: 4000 }
      //   ]
    },

    deleteProject: async (parent, { projectName }) => {
      try {
        return "Project has been deleted successfully";
      } catch (err) {
        console.log("Delete project: erorr = ", error);
      }
    },
    updateProject: async (parent, { projectName, description }) => {
      try {
        return {
          projectName: `${projectName} Update`,
          description: `${description}`,
          time: [
            {
              description: "Default - Search not found implemented",
              duration: 3300
            },
            { description: "Default - Can't find Project", duration: 4000 }
          ]
        };
      } catch (err) {
        console.log("Update project: error = ", error);
      }
    },
    deleteTime: async (parent, {projectName, description}) => {
      try {
        console.log('Time deleted try block')
        return {
          description: "Default - Time Successfully Deleted",
          duration: 1337
        };
      } catch (e) {
        console.log(e);
        return  {
          description: "Default - Time FAILED to be deleted",
          duration: 0
        };
      }
    },
    addTime: async (parent, {projectName, description, duration}) => {
      try {
        console.log('Time added try block')
        return {
          description: "Default - Time Successfully Added",
          duration: 3333
        };
      } catch (e) {
        console.log('Error', e);
        return  {
          description: "Default - Time FAILED to be added",
          duration: 5
        };
      }
    },
    setRedis: async (parent, { key, value }) => {
      try {
        await client.set(key, value);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
