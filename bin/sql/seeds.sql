INSERT INTO departments
    (
    department_name
    )
VALUES
    ('Admin'),
    ('Frontend'),
    ('Backend'),
    ('PM'),
    ('Technical support'),
    ('Sales');


INSERT INTO users
    (username,email,password,department_id)
VALUES
    ('admin', 'admin@zowie.com', 'adminpw', 1),
    ('f1', 'f1@zowie.com', 'userpw', 2),
    ('f2', 'f2@zowie.com', 'userpw', 2),
    ('b1', 'b1@zowie.com', 'userpw', 3),
    ('b2', 'b23@zowie.com', 'userpw', 3),
    ('p1', 'p1@zowie.com', 'userpw', 4),
    ('p2', 'p2@zowie.com', 'userpw', 4),
    ('t1', 't1@zowie.com', 'userpw', 5),
    ('t2', 't2@zowie.com', 'userpw', 5),
    ('s1', 's1@zowie.com', 'userpw', 6),
    ('s2', 's2@zowie.com', 'userpw', 6);

INSERT INTO issues
    (
    sender_id,
    i_title,
    i_description,
    i_priority,
    i_deadline,
    i_status,
    receiver_id)
VALUES(
        2, 'API not working', 'API not working', 'High', '2020-09-20 20:45:27', 'ongoing', 4
    ),
    (4, 'let me know the schedule', 'let me know the schedule', 'High', '2020-09-20 20:45:27', 'ongoing', 5),
    (5, 'front-end need to fix the ui asap', 'front-end need to fix the ui asap', 'High', '2020-09-20 20:45:27', 'ongoing', 2),
    (
        2, 'Need to have a new routes', 'New routes for comp-A', 'High', '2020-08-20 20:45:27', 'solved', 5
    ),
    (5, 'Please confirm the data', 'Please confirm the data', 'High', '2020-08-20 20:45:27', 'solved', 2);

INSERT INTO comments
    (
    issue_id,
    c_sender_id,
    c_description
    )
VALUES(1, 4, 'well noted'),
    (1, 5, 'well noted'),
    (3, 2 , 'well noted'),
    (4, 5, 'well noted'),
    (5, 2, 'well noted');

  




