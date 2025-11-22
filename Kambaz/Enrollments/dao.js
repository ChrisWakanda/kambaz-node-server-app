// import { v4 as uuidv4 } from "uuid";

// export default function EnrollmentsDao(db) {


//   function enrollUserInCourse(userId, courseId) {
//     const { enrollments } = db;
//     const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
//     enrollments.push(newEnrollment);
//     return newEnrollment; // Return the new enrollment
//   }

//   function unenrollUserFromCourse(userId, courseId) {
//     const { enrollments } = db;
//     db.enrollments = enrollments.filter(
//       (enrollment) =>
//         !(enrollment.user === userId && enrollment.course === courseId)
//     );
//   }

//   function findEnrollmentsForUser(userId) {
//     const { enrollments } = db;
//     return enrollments.filter((enrollment) => enrollment.user === userId);
//   }

//   function findAllEnrollments() {
//     return db.enrollments;
//   }

//   return {
//     enrollUserInCourse,
//     unenrollUserFromCourse,
//     findEnrollmentsForUser,
//     findAllEnrollments,
//   };
// }


import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import userModel from "../Users/model.js";
export default function EnrollmentsDao() {


  function enrollUserInCourse(userId, courseId) {
    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
      enrollmentDate: new Date(),
      status: "ENROLLED"
    };
    return model.create(newEnrollment);
  }

  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }

  function findEnrollmentsForUser(userId) {
    return model.find({ user: userId });
  }

  function findAllEnrollments() {
    return model.find();
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId });
    const userIds = enrollments.map(enrollment => enrollment.user);
    const users = await userModel.find({ _id: { $in: userIds } });
    return users;
  }


  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findAllEnrollments,
    unenrollAllUsersFromCourse,
    findUsersForCourse,
  };
}