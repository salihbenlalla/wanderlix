DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    website TEXT,
    avatarImage TEXT,
    authorName TEXT,
    email TEXT,
    commentDate TEXT,
    commentText TEXT
    );
INSERT INTO Comments (
    id,
    website,
    avatarImage,
    authorName,
    email,
    commentDate,
    commentText
) VALUES (
    1,
    'johnsmith.com',
    '151824697-headshot-portrait-of-smiling-confident-young-caucasian-businessman-in-glasses-posing-in-office_dguabf',
    'John Smith',
    'johnsmith@gmail.com',
    '2023-03-10T12:00:20+00:00',
    'Hello, My name is John Smith'
),
(
    2,
    'johndoe.com',
    'thoughtful-office-worker-thinking-problem-solution-looking-computer-working-serious-smart-young-businessman-employee-138893862_w804xb',
    'John Doe',
    'johndoe@gmail.com',
    '2023-03-10T12:00:20+00:00',
    'Hello, this Is My First Comment'
);