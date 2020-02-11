import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

const CoursesPage = props => {
  const { courses, authors, actions } = props;

  useEffect(() => {
    if (courses.length === 0) getCourses();
    if (authors.length === 0) getAuthors();
  }, []);

  const getCourses = async () => {
    actions.loadCourses().catch(error => {
      alert("Loading courses failed" + error);
    });
  };

  const getAuthors = async () => {
    actions.loadAuthors().catch(error => {
      alert("Loading authors failed" + error);
    });
  };

  return (
    <>
      <h2 className="col-form-label-lg">Courses </h2>
      <CourseList courses={courses} />
    </>
  );
};

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors
  };
};

/*const mapDispatchToProps = {
  createCourse: courseActions.createCourse
};*/

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
