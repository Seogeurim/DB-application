const query = require('./query');
const mongo = require('./mongo');

async function newSection(){
    const section_raw = await query.getRawData('section');
    section_raw.map(async section => {
        /* EMBEDDED : time_slot */
        const time_slot_data = await query.getTimeSlot(section.time_slot_id);
        delete section.time_slot_id;
        section.time_slot = time_slot_data;

        /* EMBEDDED : classroom */
        const classroom_data = await query.getClassroom(section.building, section.room_number);
        delete section.building;
        delete section.room_number;
        section.classroom = classroom_data;

        /* LINKED : course */
        const course_link = {course_id : section.course_id};
        delete section.course_id;
        section.course = course_link;

        // console.log(section);
        mongo.insertData('section', section);
    });
}

async function newStudent(){
    const student_raw = await query.getRawData('student');
    student_raw.map(async student => {
        /* EMBEDDED : department */
        const department_data = await query.getDepartment(student.dept_name);
        delete student.dept_name;
        student.department = department_data;

        /* LINKED : advisor */
        student.advisor = {};

        // console.log(student);
        mongo.insertData('student', student);
    });
}

async function newInstructor(){
    const instructor_raw = await query.getRawData('instructor');
    instructor_raw.map(async instructor => {
        /* EMBEDDED : department */
        const department_data = await query.getDepartment(instructor.dept_name);
        delete instructor.dept_name;
        instructor.department = department_data;

        /* LINKED : section */
        instructor.section = {};

        /* LINKED : advisor */
        instructor.advisor = {};

        // console.log(instructor);
        mongo.insertData('instructor', instructor);
    });
}

async function newCourse(){
    const course_raw = await query.getRawData('course');
    course_raw.map(async course => {
        /* EMBEDDED : department */
        const department_data = await query.getDepartment(course.dept_name);
        delete course.dept_name;
        course.department = department_data;

        /* LINKED : prereq */
        course.prereq = {};

        // console.log(course);
        mongo.insertData('course', course);
    });
}

async function newTakes(){
    const takes_raw = await query.getRawData('takes');
    takes_raw.map(async takes => {
        /* LINKED : section */
        takes.section = {};

        /* LINKED : student */
        takes.student = {};

        /* DELETE FIELD */
        delete takes.sec_id;
        delete takes.course_id;
        delete takes.semester;
        delete takes.year;

        // console.log(takes);
        mongo.insertData('takes', takes);
    });
}

newSection();
newStudent();
newInstructor();
newCourse();
newTakes();