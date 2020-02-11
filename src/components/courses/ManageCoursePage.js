import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

const ManageCoursesPage = ({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  course: initialCourse
}) => {
  // const { courses, authors, loadCourses, loadAuthors } = props;
  const [course, setCourse] = useState(initialCourse);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) getCourses();
    if (authors.length === 0) getAuthors();
  }, []);

  const getCourses = async () => {
    loadCourses().catch(error => {
      alert("Loading courses failed" + error);
    });
  };

  const getAuthors = async () => {
    loadAuthors().catch(error => {
      alert("Loading authors failed" + error);
    });
  };

  return (
    <CourseForm course={course} authors={authors} errors={errors}/>
  );
};

ManageCoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    authors: state.authors,
    course: newCourse
  };
};

const mapDispatchToProps = {
  //createCourse: courseActions.createCourse,
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};

// const mapDispatchToProps = dispatch => {
//   return {
//     actions: {
//       loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
//       loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
//     }
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
