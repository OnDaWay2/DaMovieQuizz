import { Component } from 'react'


class GameOver extends Component {
    constructor (props) {
        super(props)
        this.state = {
            point: localStorage.getItem('point')
        }
    }

    render() {
        console.log(this.props.point)
        return (
            <div>
                <h1>Your score is : {this.props.point}</h1>
            </div>
        )
    }
    componentDidMount () {
        this.setState({
          point: localStorage.getItem('point')
        })
    }
}
export default GameOver