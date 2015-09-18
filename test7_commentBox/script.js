(function () {
  var CommentBox = React.createClass({
    displayName: 'CommentBox',
    render: function () {
      return (
          <div className='commentBox'>
            <CommentList />
            <CommentForm />
          </div>
      );
    }
  });

  var CommentList = React.createClass({
    displayName: 'CommentList',
    render: function () {
      return (
          <ul>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </ul>
      );
    }
  });

  var Comment = React.createClass({
    displayName: 'Comment',
    render: function () {
      return (
          <li>
            <h1>Comment Title</h1>

            <div>Comment content</div>
          </li>
      );
    }
  });

  var CommentForm = React.createClass({
    displayName: 'Comment',
    getInitialState: function () {
      return {name: '', msg: ''};
    },
    handleNameChange: function (e) {
      this.setState({name: e.target.value});
    },
    handleMsgChange: function (e) {
      this.setState({msg: e.target.value});
    },
    handleSubmit: function (e) {
      e.preventDefault();
      this.setState({name: '', msg: ''});
      console.log(this.state);
    },
    render: function () {
      return (
          <form action="#" method="POST" onSubmit={this.handleSubmit} className='commentForm'>
            <label>Name: <input type="text" value={this.state.name} onChange={this.handleNameChange} name="name"/></label>
            <label>Comment: <input type="text" value={this.state.msg} onChange={this.handleMsgChange} name="msg"/></label>
            <input type="submit" value="leave a comment"/>
          </form>
      );
    }
  });

  React.render(
      <CommentBox />,
      document.querySelector('#content')
  );
})();