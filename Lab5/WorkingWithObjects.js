const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};
const module = {
    id: 1, name: "NodeJS Module",
    description: "Module for creating a NodeJS server with ExpressJS",
    course: "Full Stack Development"
}
export default function WorkingWithObjects(app) {
    const getAssignment = (req, res) => {
        res.json(assignment);
    };
    const getModule = (req, res) => {
        res.json(module);
    };
    const getAssignmentTitle = (req, res) => {
        res.json(assignment.title);
    };
    const getAssignmentScore = (req, res) => {
        res.json(assignment.score);
    };
    const getAssignmentStatus = (req, res) => {
        res.json(assignment.completed);
    };
    const getModuleName = (req, res) => {
        res.json(module.name);
    };
    const getModuleDescription = (req, res) => {
        res.json(module.description);
    };
    const setAssignmentTitle = (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    };
    const setAssignmentScore = (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
    };
    const setAssignmentStatus = (req, res) => {
        const { newStatus } = req.params;
        assignment.completed = newStatus;
        res.json(assignment);
    };
    const setModuleName = (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    };
    const setModuleDescription = (req, res) => {
        const { newDesc } = req.params;
        module.description = newDesc;
        res.json(module);
    };
    app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
    app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
    app.get("/lab5/assignment/status/:newStatus", setAssignmentStatus);
    app.get("/lab5/assignment/title", getAssignmentTitle);
    app.get("/lab5/assignment/score", getAssignmentScore);
    app.get("/lab5/assignment/status", getAssignmentStatus);
    app.get("/lab5/assignment", getAssignment);

    app.get("/lab5/module", getModule);
    app.get("/lab5/module/name", getModuleName);
    app.get("/lab5/module/description", getModuleDescription);
    app.get("/lab5/module/name/:newName", setModuleName);
    app.get("/lab5/module/description/:newDesc", setModuleDescription);
};
