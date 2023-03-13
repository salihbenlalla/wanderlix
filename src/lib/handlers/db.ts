export interface Comment {
  CommentID: number;
  website: string;
  avatarImage: string;
  authorName: string;
  email: string;
  date: string;
  text: string;
}

export interface DBProps {
  comments: Comment[];
}

export const DB: DBProps = {
  comments: [
    {
      CommentID: 1,
      website: "johndoe.com",
      avatarImage:
        "https://thumbs.dreamstime.com/b/thoughtful-office-worker-thinking-problem-solution-looking-computer-working-serious-smart-young-businessman-employee-138893862.jpg",
      authorName: "John Doe",
      email: "johndoe@gmail.com",
      date: "2023-03-10T12:00:20+00:00",
      text: "Hello, this Is My First Comment",
    },
    {
      CommentID: 1,
      website: "johnsmith.com",
      avatarImage:
        "https://previews.123rf.com/images/fizkes/fizkes2007/fizkes200701460/151824697-headshot-portrait-of-smiling-confident-young-caucasian-businessman-in-glasses-posing-in-office.jpg",
      authorName: "John Smith",
      email: "johnsmith@gmail.com",
      date: "2023-03-10T12:00:20+00:00",
      text: "Hello, My name is John Smith",
    },
  ],
};
