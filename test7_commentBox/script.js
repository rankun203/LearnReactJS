(function () {
  var CommentBox = React.createClass({
    displayName: 'CommentBox',
    getInitialState: function() {
      return {
        comments: [
          {name: 'Kun', msg: 'This is my message'},
          {name: 'Zhou', msg: 'Hey, I am Zhou'}
        ]
      };
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
      var commentList = this.props.comments.map(function (comment) {
        return (<Comment name={comment.name} msg={comment.msg}/>);
      });

      return (
          <ul>{commentList}</ul>
      );
    }
  });

  var Comment = React.createClass({
    displayName: 'Comment',
    render: function () {
      return (
          <li>
            <h2>{this.props.name}</h2>

            <div>{this.props.msg}</div>
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
            <label>Name:
              <input type="text" value={this.state.name} onChange={this.handleNameChange} name="name"/></label>
            <label>Comment:
              <input type="text" value={this.state.msg} onChange={this.handleMsgChange} name="msg"/></label>
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