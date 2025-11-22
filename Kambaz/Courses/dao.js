// import { v4 as uuidv4 } from "uuid";

// export default function CoursesDao(db) {
//     function findAllCourses() {
//         return db.courses;
//     }
//     function findCoursesForEnrolledUser(userId) {
//         const { courses, enrollments } = db;
//         const enrolledCourses = courses.filter((course) =>
//             enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
//         return enrolledCourses;
//     }
//     function createCourse(course) {
//         const newCourse = { ...course, _id: uuidv4() };
//         db.courses = [...db.courses, newCourse];
//         return newCourse;
//     }

//     function deleteCourse(courseId) {
//         const { courses, enrollments } = db;
//         db.courses = courses.filter((course) => course._id !== courseId);
//         db.enrollments = enrollments.filter(
//             (enrollment) => enrollment.course !== courseId
//         );
//     }

//     function updateCourse(courseId, courseUpdates) {
//         const { courses } = db;
//         const course = courses.find((course) => course._id === courseId);
//         Object.assign(course, courseUpdates);
//         return course;
//     }





//     return {
//         findAllCourses,
//         findCoursesForEnrolledUser,
//         createCourse,
//         deleteCourse,
//         updateCourse ,
//     };
// }


import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";


export default function CoursesDao() {

    function findAllCourses() {
        return model.find({});
    }
    async function findCoursesForEnrolledUser(userId) {
        const enrollments = await enrollmentModel.find({ user: userId });
        
        // Extract course IDs from enrollments
        const courseIds = enrollments.map(enrollment => enrollment.course);
        
        // Find courses that match these IDs
        const courses = await model.find(
            { _id: { $in: courseIds } }, 
            { _id:1, name: 1, description: 1, cardImg: 1 }
        );
        
        return courses;
    }
    function createCourse(course) {
        const newCourse = { ...course, _id: uuidv4() };
        return model.create(newCourse);
    }

    async function deleteCourse(courseId) {
        await enrollmentModel.deleteMany({ course: courseId });
        return model.deleteOne({_id: courseId});
    }

    function updateCourse(courseId, courseUpdates) {
        return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    }





    return {
        findAllCourses,
        findCoursesForEnrolledUser,
        createCourse,
        deleteCourse,
        updateCourse ,
    };
}
