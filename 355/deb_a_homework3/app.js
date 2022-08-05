const demoController = new (require('./controller/demoController'))();
const studentController = new (require('./controller/studentController'))();
const departmentController = new (require('./controller/departmentController'))();

async function getStudentRecord(name) {
    let result = await departmentController.joinDepartmentByName(name);
    //joing result and deptObj = new array [name,dept, n]
    result.forEach(result => {
        console.log("Student Record for: ", result.ID, " - ", result.name);
        console.log("\t Department: ", result.dept_name);
        console.log("\t Home Building: ", result.building);
        console.log("\t Total Credits: ", result.tot_cred);
    });
}

async function createDepartment(department) {
    let vari = await departmentController.getDepartmentByName(department.name);
    if(vari[0] == undefined)
    {
        await departmentController.addDepartment({"dept_name":department.name, "building": department.building, "budget": department.budget});
        let verfi = await departmentController.getDepartmentByName(department.name);
        console.log(verfi);
    }
    else
    {
        console.log(`${vari[0].dept_name} already exits`);
    }
}

async function demo() {
    try {
        let result = await demoController.getDatabases();
        if(result.length > 0) {
            console.log("BK_ Tables Exist");
        }
    } catch (e) {
        console.log(`You BK_ Tables might be missing!: ${e.sqlMessage}`);
    }
}

(async function main() {
    let input = parseInt(process.argv[2]); // cast to int
    console.log(`Your input was: ${input}`);

    switch (input) {
        case 0:
            // Demo: Check for BK_ Tables in your database
            await demo();
            break;
        case 1:
            // Fetching Data
            let studentName = process.argv[3];
            console.log(`Your argument was: ${studentName}`);
            await getStudentRecord(studentName);
            break;
        case 2:
            // Posting Data
            let department = process.argv[3];
            department = JSON.parse(department);
            console.log(`Your argument was: ${department}`);
            await createDepartment(department);
            break;
        default:
            console.log("Connection Successful: Welcome to HW3!");
            break;
    }

    process.exit(0);
})();