import React, { Component } from 'react';
import { leaderboardDbRef } from '../firebase';

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            leaderboard: [],
            leaderboardShown: false,
            gameInfoShown: false,
        };
    }

    componentDidMount() {
        // Get the top 10 entries, ordered by score
        leaderboardDbRef
            .orderByChild('score')
            .limitToLast(10)
            .on('value', (snapshot) => {
                let leaderboard = [];
                snapshot.forEach((child) => {
                    leaderboard.unshift(child.val());
                });

                this.setState({ leaderboard: leaderboard });
            });
    }

    toggleLeaderboard = () => {
        this.setState((currentState) => {
            return { leaderboardShown: !currentState.leaderboardShown };
        });
    };

    render() {
        const leaderboardContent = (showContent) => {
            if (showContent) {
                return (
                    <div className="modal">
                        <div className="modal-container">
                            <h2> Leaderboard </h2>
                            <div className="entries">
                                {this.state.leaderboard.map((entry, index) => {
                                    return (
                                        <div className="entry" key={entry.key}>
                                            {index + 1}. {entry.name} - {entry.score}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        };

        return (
            <div>
                <div>
                    <button className="btn-leaderboard" onClick={this.toggleLeaderboard}>
                        Show leaderboard
                    </button>
                    {leaderboardContent(this.state.leaderboardShown)}
                </div>
            </div>
        );
    }
}

export default Leaderboard;
