CREATE TABLE departments
(
    did SERIAL PRIMARY KEY,
    department_name VARCHAR(255)
);

CREATE TABLE users
(
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(did) ON DELETE CASCADE
);

CREATE TABLE issues
(
    iid SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    i_title VARCHAR(255),
    i_description TEXT,
    i_data_created TIMESTAMP,
    i_priority VARCHAR(255),
    i_deadline TIMESTAMP,
    i_status VARCHAR(255),
    receiver_id INT NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(uid) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE comments
(
    cid SERIAL PRIMARY KEY,
    issue_id INT NOT NULL,
    c_description TEXT,
    c_date TIMESTAMP,
    FOREIGN KEY (issue_id) REFERENCES issues(iid) ON DELETE CASCADE
);


CREATE TABLE users_comments
(
    user_id INT NOT NULL,
    comment_id INT NOT NULL,
    PRIMARY KEY (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES users(uid) ON UPDATE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(cid) ON UPDATE CASCADE
);

