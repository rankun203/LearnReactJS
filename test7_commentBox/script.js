(function () {
  var CommentBox = React.createClass({
    displayName: 'CommentBox',
    getInitialState(){
      return {comments: []};
    },
    loadCommentsFromServer: function () {
      var dataUrl = this.props.url + '?_=' + new Date().getTime();
      $.getJSON(dataUrl, function (data) {
        this.setState({comments: data});
      }.bind(this)).fail(function () {
        console.log("ADD to all server api: res.header('Access-Control-Allow-Origin', 'http://localhost:63342')");
      });
    },
    componentDidMount: function () {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    handleCommentSubmit: function (comment) {
      var comments = this.state.comments;
      var newComments = comments.concat([comment]);
      this.setState({data: newComments});

      var dataUrl = this.props.url + '?_=' + new Date().getTime();
      $.post(dataUrl, comment);
    },
    render: function () {
      return (
          <div className='commentBox'>
            <CommentList comments={this.state.comments}/>
            <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
          </div>
      );
    }
  });

  var CommentList = React.createClass({
    displayName: 'CommentList',
    render: function () {
      console.log(this.props);
      var commentNodes = this.props.comments.map(function (comment) {
        return (<Comment author={comment.author} text={comment.text}/>);
      });

      return (
          <ul>{commentNodes}</ul>
      );
    }
  });

  var Comment = React.createClass({
    displayName: 'Comment',
    render: function () {
      return (
          <li>
            <h2>{this.props.author}</h2>

            <div class="content" dangerouslySetInnerHTML={{
              __html: marked(this.props.text, {sanitize: true})
            }}/>
          </li>
      );
    }
  });

  var CommentForm = React.createClass({
    displayName: 'Comment',
    getInitialState: function () {
      return {author: '', text: ''};
    },
    handleNameChange: function (e) {
      this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
      this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
      e.preventDefault();
      var author = this.state.author.trim();
      var text = this.state.text.trim();
      if (text.length === 0 || author.length === 0) {
        return;
      }

      this.props.onCommentSubmit(this.state);
      this.setState({author: '', text: ''});
      console.log(this.state);
    },
    render: function () {
      return (
          <form action="#" method="POST" onSubmit={this.handleSubmit} className='commentForm'>
            <label>Name:
              <input type="text" value={this.state.author} onChange={this.handleNameChange} name="author"/></label>
            <label>Comment:
              <input type="text" value={this.state.text} onChange={this.handleTextChange} name="text"/></label>
            <input type="submit" value="leave a comment"/>
          </form>
      );
    }
  });

  React.render(
      <CommentBox url="http://localhost:3000/comments.json" pollInterval={1000}/>,
      document.querySelector('#content')
  );
})();