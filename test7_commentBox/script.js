(function () {
  var CommentBox = React.createClass({
    displayName: 'CommentBox',
    getInitialState(){
      return {
        comments: []
      };
    },
    componentDidMount: function () {
      var dataUrl = this.props.url + '?_=' + new Date().getTime();
      var componentThis = this;
      $.getJSON(dataUrl, function (data) {
        componentThis.setState({comments: data});
      });
    },
    render: function () {
      return (
          <div className='commentBox'>
            <CommentList comments={this.state.comments}/>
            <CommentForm />
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
      <CommentBox url="http://localhost:3000/comments.json"/>,
      document.querySelector('#content')
  );
})();