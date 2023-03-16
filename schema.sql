DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
    id int AUTO_INCREMENT,
    website TEXT,
    avatarImage TEXT,
    authorName TEXT,
    email TEXT,
    commentDate TEXT,
    commentText TEXT,
    PRIMARY KEY (`id`)
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
    'https://previews.123rf.com/images/fizkes/fizkes2007/fizkes200701460/151824697-headshot-portrait-of-smiling-confident-young-caucasian-businessman-in-glasses-posing-in-office.jpg',
    'John Smith',
    'johnsmith@gmail.com',
    '2023-03-10T12:00:20+00:00',
    'Hello, My name is John Smith'
),
(
    2,
    'johndoe.com',
    'https://thumbs.dreamstime.com/b/thoughtful-office-worker-thinking-problem-solution-looking-computer-working-serious-smart-young-businessman-employee-138893862.jpg',
    'John Doe',
    'johndoe@gmail.com',
    '2023-03-10T12:00:20+00:00',
    'Hello, this Is My First Comment'
);