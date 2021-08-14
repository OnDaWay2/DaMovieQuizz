import { Component } from 'react'


class GameOver extends Component {
    constructor (props) {
        super(props)
        this.state = {
            gamePoint: 0
        }
    }

    render() {
        const {gamePoint} = this.state
        console.log('ALLO')
        console.log(this.props.gamepoint)
        return (
            <div>
                <h1>Your score is : {gamePoint}</h1>
            </div>
        )
    }
    componentDidMount () {
        const {getPoint} = this.props
        this.setState({
          gamePoint: getPoint
        })
    }
}
// //                <button onClick={this.props.incrementItem}>Click {this.props.playerPoint}</button>
export default GameOver