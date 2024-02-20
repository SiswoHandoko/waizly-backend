CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department VARCHAR(255) NOT NULL,
    joined_date DATE NOT NULL
);

CREATE TABLE sales_data (
    sales_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    sales DECIMAL(10, 2) NOT NULL
);