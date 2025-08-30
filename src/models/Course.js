export class Course {
  constructor(data = {}) {
    this.id = data.ID || data.id || null;
    this.semester = data.SEMESTER || data.semester || null;
    this.code = data.CODE || data.code || '';
    this.title = data.TITLE || data.title || '';
    this.credits = data.CREDITS || data.credits || 0;
    this.isAutumnCourse = data.IS_AUTUMN_COURSE || data.isAutumnCourse || 0;
    this.isSpringCourse = data.IS_SPRING_COURSE || data.isSpringCourse || 0;
    this.comment = data.COMMENT || data.comment || '';
    this.grade = data.GRADE || data.grade || null;
    this.type = data.TYPE || data.type || 'regular';
  }
}