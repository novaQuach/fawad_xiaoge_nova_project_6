import React from 'react';

// data passed in here is the question object
// this functional component will display the data on the screen
const Question = ({ data, updateScore }) => {
    if (data == null) {
        return null;
    }
    console.log(data);

    // <div> {JSON.stringify(data)}</div>;

    // checking if the value clicked matches the answer.
    const checkAnswer = (e) => {
        console.log(e.target.value, 'clicked word');
        console.log('homophone', data.homophone);

        const userClick = e.target.value;
        if (userClick === data.homophone) {
            updateScore(100);
        } else if (userClick === data.originalWord) {
            updateScore(0);
        }
    };

    const Answer = (e) => {
        if (e.charAt(0) === "n") {
            let res = e.replace(/n/, "Noun:");
            return res
        } else if (e.charAt(0) === "v") {
            let res = e.replace(/v/, "Verb:");
            return res;
        } else if (e.charAt(0) === "a") {
            let res = e.replace(/adj/, "Adjvective:");
            return res;
        }
    }

    return (
        <div className="question">
            <p className="definition">{Answer(data.definition)}</p>
            {data.wordPosition === 0 ? (
                <div>
                    <button onClick={checkAnswer} value={data.originalWord}>
                        {data.originalWord}
                    </button>
                    <button onClick={checkAnswer} value={data.homophone}>
                        {data.homophone}
                    </button>
                </div>
            ) : (
                <div>
                    <button onClick={checkAnswer} value={data.homophone}>
                        {data.homophone}
                    </button>
                    <button onClick={checkAnswer} value={data.originalWord}>
                        {data.originalWord}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Question;
