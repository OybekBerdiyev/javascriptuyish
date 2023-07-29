class Post {
  constructor(id, photo, title, description, views, channel) {
    this.id = id;
    this.photo = photo;
    this.title = title;
    this.description = description;
    this.views = views;
    this.channel = channel;
  }
}

module.exports = Post;
