1.注册观察者
```jsx static
@NotificationCenter
class ViewCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count : 1
    }
    this.goBack = this.goBack.bind(this);
  }
  componentDidMount() {
    const { observer } = this.props.notification;
    observer('countUpdate', count => {
      // 接收到通知的响应事件
      this.setState({
        count
      })
    });
  }
  componentWillUnmount() {
    const { removeObserver } = this.props.notification;
    //发送通知
    removeObserver('countUpdate');
  }
  render() {
    return (
      <Button>
       {this.state.count}
      </Button>
    );
  }
}
```
2.发送通知
```jsx static
@NotificationCenter
class ViewDetail extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  goBack(e) {
    const { postNotification } = this.props.notification;
    postNotification('countUpdate', 10);    
  }
  render() {
    return (
      <Button onClick={this.goBack}>
       back
      </Button>
    );
  }
}
```
