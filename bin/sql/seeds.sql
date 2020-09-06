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
    ('admin', 'admin@zowie.com', 'admin', 1),
    ('user1', 'user1@zowie.com', 'user1', 1),
    ('user1', 'user2@zowie.com', 'user2', 2),
    ('user3', 'user3@zowie.com', 'user3', 3),
    ('user4', 'user4@zowie.com', 'user4', 4),
    ('user5', 'user5@zowie.com', 'user5', 3),
    ('user6', 'user6@zowie.com', 'user6', 5);

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
        2, 'Need to have a new routes', 'New routes for comp-A', 'High', '2020-12-20 20:45:27', 'ongoing', 3
    ),
    (4, 'Need to have a new routes', 'New routes for comp-A', 'High', '2020-12-20 20:45:27', 'ongoing', 2),
    (4, 'Need to have a new routes', 'New routes for comp-A', 'High', '2020-12-20 20:45:27', 'ongoing', 3),
    (
        2, 'Need to have a new routes', 'New routes for comp-A', 'High', '2020-12-20 20:45:27', 'ongoing', 3
    ),
    (4, 'Need to have a new routes', 'New routes for comp-A', 'High', '2020-12-20 20:45:27', 'ongoing', 2);

INSERT INTO comments
    (
    issue_id,
    c_sender_id,
    c_description
    )
VALUES(1, 2, 'well noted'),
    (1, 2, 'well noted'),
    (2, 4, 'well noted'),
    (3, 2, 'well noted'),
    (4, 4, 'well noted');

  




