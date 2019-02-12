import React from 'react';

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: ''
    };
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
      return;
    } else {
      this.generateEmoji(this.props.entries);
    }
  }

  generateEmoji = async (entries) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_AWS_LAMBDA_RANK_API}?rank=${entries}`
      );
      const data = await res.json();
      this.setState({ emoji: data.input });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        {`${this.props.name} , you uploaded`}
        <div className="white f1">
          {`${this.props.entries} photos.`}
        </div>
        <div className="white f3">
          {`Rank Badge: ${this.state.emoji}`}
        </div>
      </div>
    );
  }
}

export default Rank;
