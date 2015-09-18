'use strict';

(function () {
  var CommentBox = React.createClass({
    displayName: 'CommentBox',
    getInitialState: function getInitialState() {
      return { comments: [] };
    },
    loadCommentsFromServer: function loadCommentsFromServer() {
      var dataUrl = this.props.url + '?_=' + new Date().getTime();
      $.getJSON(dataUrl, (function (data) {
        this.setState({ comments: data });
      }).bind(this)).fail(function () {
        console.log("ADD to all server api: res.header('Access-Control-Allow-Origin', 'http://localhost:63342')");
      });
    },
    componentDidMount: function componentDidMount() {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    handleCommentSubmit: function handleCommentSubmit(comment) {
      this.state.comments.push(comment);
      this.setState({ comments: this.state.comments });

      var dataUrl = this.props.url + '?_=' + new Date().getTime();
      $.post(dataUrl, comment);
    },
    render: function render() {
      return React.createElement(
        'div',
        { className: 'commentBox' },
        React.createElement(CommentList, { comments: this.state.comments }),
        React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
      );
    }
  });

  var CommentList = React.createClass({
    displayName: 'CommentList',
    render: function render() {
      console.log(this.props);
      var commentNodes = this.props.comments.map(function (comment) {
        return React.createElement(Comment, { author: comment.author, text: comment.text });
      });

      return React.createElement(
        'ul',
        null,
        commentNodes
      );
    }
  });

  var Comment = React.createClass({
    displayName: 'Comment',
    render: function render() {
      return React.createElement(
        'li',
        null,
        React.createElement(
          'h2',
          null,
          this.props.author
        ),
        React.createElement('div', { 'class': 'content', dangerouslySetInnerHTML: {
            __html: marked(this.props.text, { sanitize: true })
          } })
      );
    }
  });

  var CommentForm = React.createClass({
    displayName: 'Comment',
    getInitialState: function getInitialState() {
      return { author: '', text: '' };
    },
    handleNameChange: function handleNameChange(e) {
      this.setState({ author: e.target.value });
    },
    handleTextChange: function handleTextChange(e) {
      this.setState({ text: e.target.value });
    },
    handleSubmit: function handleSubmit(e) {
      e.preventDefault();
      var author = this.state.author.trim();
      var text = this.state.text.trim();
      if (text.length === 0 || author.length === 0) {
        return;
      }

      this.props.onCommentSubmit(this.state);
      this.setState({ author: '', text: '' });
      console.log(this.state);
    },
    render: function render() {
      return React.createElement(
        'form',
        { action: '#', method: 'POST', onSubmit: this.handleSubmit, className: 'commentForm' },
        React.createElement(
          'label',
          null,
          'Name:',
          React.createElement('input', { type: 'text', value: this.state.author, onChange: this.handleNameChange, name: 'author' })
        ),
        React.createElement(
          'label',
          null,
          'Comment:',
          React.createElement('input', { type: 'text', value: this.state.text, onChange: this.handleTextChange, name: 'text' })
        ),
        React.createElement('input', { type: 'submit', value: 'leave a comment' })
      );
    }
  });

  React.render(React.createElement(CommentBox, { url: 'http://localhost:3000/comments.json', pollInterval: 1000 }), document.querySelector('#content'));
})();
