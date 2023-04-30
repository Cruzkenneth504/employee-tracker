const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'departments_db'
});

const app = async () => {
  const conn = await pool.getConnection();
  console.log('Connected to database');

  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View departments',
      'Add a department',
      'View roles',
      'Add a role',
      'View employees',
      'Add an employee',
      'Update an employee role'
    ]
  })
    
  switch (action) {
    case 'View departments':
      await viewDepartments(conn);
      break;
    case 'Add a department':
      await addDepartment(conn);
      break;
    case 'View roles':
      await viewRoles(conn);
      break;
    case 'Add a role':
      await addRole(conn);
      break;
    case 'View employees':
      await viewEmployees(conn);
      break;
    case 'Add an employee':
      await addEmployee(conn);
      break;
    case 'Update an employee role':
      await updateEmployeeRole(conn);
      break;
  }

  await conn.release();
};

// View Departments
const viewDepartments = async (conn) => {
  const [departments] = await conn.query('SELECT * FROM departments');
  console.table(departments)
  app()
};

// View Roles
const viewRoles = async (conn) => {
  const [roles] = await conn.query('SELECT * FROM roles');
  console.table(roles)
  app()
};

// View Employees
const viewEmployees = async (conn) => {
  const [employees] = await conn.query('SELECT * FROM employees');
  console.table(employees)
  app()
};

// Add Department
const addDepartment = async (conn) => {
  const { departmentName } = await inquirer.prompt({
    type: 'input',
    name: 'departmentName',
    message: 'Enter the name of the new department:'
  });
  await conn.execute(`INSERT INTO departments (department_name) VALUES (?)`, [
    departmentName
  ]);
  console.log(`Added ${departmentName} department to database`)
  app()
};

// Add Role
const addRole = async (conn) => {
  const [departments] = await conn.query(`SELECT * FROM departments`);
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the new role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the new role:'
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for the new role:',
      choices: departments.map((department) => ({
        name: department.department_name,
        value: department.id
      }))
    }
  ]);
  await conn.execute(
    `INSERT INTO roles (title_name, salary_decimal, department_id) VALUES (?, ?, ?)`,
    [title, salary, departmentId]
  );
  console.log(`Added ${title} role to database`)
  app();
};
// Add Employee
const addEmployee = async (conn) => {
  const [roles] = await conn.query('SELECT * FROM roles');
  const [managers] = await conn.query('SELECT * FROM employees');
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the new employee:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the new employee:'
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role of the new employee:',
      choices: roles.map((role) => ({ name: role.title_name, value: role.id }))
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Select the new employee's manager:",
      choices: managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
      }))
    }
  ]);
  await conn.execute(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
    [firstName, lastName, roleId, managerId]
  );
  console.log(`Added ${firstName} ${lastName} employee to database`)
  app();
};
app()