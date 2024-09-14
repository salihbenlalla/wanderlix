DROP TABLE IF EXISTS Authors;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS Countries;
DROP TABLE IF EXISTS States;
DROP TABLE IF EXISTS Cities;
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Links;
DROP TABLE IF EXISTS IframeSrcs;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Newsletter;

CREATE TABLE Authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL UNIQUE,
  bio TEXT,
  avatarUrl TEXT,
  imageUrl TEXT
);

CREATE TABLE Tags (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL UNIQUE
);

CREATE TABLE Countries (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  param TEXT NOT NULL UNIQUE
);

CREATE TABLE States (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  param TEXT NOT NULL UNIQUE,
  country_id INTEGER,
  FOREIGN KEY (country_id) REFERENCES Countries(id)
);

CREATE TABLE Cities (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  param TEXT NOT NULL UNIQUE,
  country_id INTEGER,
  state_id INTEGER,
  FOREIGN KEY (country_id) REFERENCES Countries(id),
  FOREIGN KEY (state_id) REFERENCES States(id)
);

CREATE TABLE Posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT,
    title TEXT,
    description TEXT,
    content TEXT,
    image TEXT,
    imageType TEXT,
    imageWidth INTEGER,
    imageHeight INTEGER,
    readDuration INTEGER,
    datePublished TEXT,
    dateModified TEXT,
    author_id INTEGER,
    tag_id INTEGER,
    country_id INTEGER,
    state_id INTEGER,
    city_id INTEGER
);

CREATE TABLE Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    website TEXT,
    avatarImage TEXT,
    authorName TEXT,
    email TEXT,
    commentDate TEXT,
    commentText TEXT,
    commenter_id TEXT,
    post_id INTEGER,
    approved INTEGER DEFAULT 0,
    FOREIGN KEY (post_id) REFERENCES Posts(id)
);

CREATE TABLE Links (
  id INTEGER PRIMARY KEY,
  originalHref TEXT NOT NULL UNIQUE,
  newHref TEXT NOT NULL UNIQUE,
  use TEXT CHECK(use IN ('none', 'originalHref', 'newHref'))
);

CREATE TABLE IframeSrcs (
  id INTEGER PRIMARY KEY,
  originalSrc TEXT NOT NULL UNIQUE,
  newSrc TEXT NOT NULL UNIQUE,
  use TEXT CHECK(use IN ('none', 'originalSrc', 'newSrc'))
);

CREATE TABLE Messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    senderName TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    messageText TEXT,
    messageDate TEXT
);

CREATE TABLE Newsletter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    subscriptionDate TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK(Status IN ('active', 'pending', 'unsubscribed')),
    unsubscribeDate TEXT NULL
);
