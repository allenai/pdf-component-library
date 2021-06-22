import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import Alert from 'antd/es/alert';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';

import { solve, Answer, Query } from '../api';

/**
 * We use a state machine to capture the current state of the view. Since
 * there's a form it might be empty, loading, displaying an answer or
 * giving the user feedback about an error.
 *
 * Feel free to preserve this constructor, or roll your own solution. Do
 * what works best for your use case!
 */
enum View {
    EMPTY,
    LOADING,
    ANSWER,
    ERROR,
}

export const Home = (props: RouteComponentProps) => {
    /**
     * The home page has a form, which requires the preservation of state in
     * memory. The links below contain more information about component state
     * and managed forms in React:
     *
     * @see https://reactjs.org/docs/state-and-lifecycle.html
     * @see https://reactjs.org/docs/forms.html
     *
     * Only use state when necessary, as in-memory representaions add a bit of
     * complexity to your UI.
     */
    const [query, setQuery] = useState<Query>(Query.fromQueryString(props.location));
    const [view, setView] = useState<View>(View.EMPTY);
    const [answer, setAnswer] = useState<Answer | undefined>();
    const [error, setError] = useState<string | undefined>();

    /**
     * This is a lifecycle function that's called by React after the component
     * has first been rendered.
     *
     * We use it here to fetch an answer if the url parameters include a fully
     * defined query.
     *
     * You can read more about React component's lifecycle here:
     * @see https://reactjs.org/docs/state-and-lifecycle.html
     */
    useEffect(() => {
        if (query.isValid() && !hasAnswerForCurrentQuery()) {
            fetchAnswer();
        }
    }, []);

    /**
     * Returns whether there is an answer and whether that answer is for
     * the current query.
     *
     * @returns {boolean}
     */
    const hasAnswerForCurrentQuery = () => {
        return answer && answer.query.equals(query);
    };

    /**
     * Submits an API query for an answer for the current query.
     *
     * @returns {void}
     */
    const fetchAnswer = () => {
        // We store a local variable capturing the value of the current
        // query. We use this as a semaphore / lock of sorts, since the
        // API query is asynchronous.
        const originalQuery = query;
        setView(View.LOADING);
        solve(query)
            .then((answer) => {
                // When the API returns successfully we make sure that
                // the returned answer is for the last submitted query.
                // This way we avoid displaying an answer that's not
                // associated with the last query the user submitted.
                if (query.equals(originalQuery)) {
                    setView(View.ANSWER);
                    setError(undefined);
                    setAnswer(answer);
                }
            })
            .catch((err) => {
                // Again, make sure that the error is associated with the
                // last submitted query.
                if (query.equals(originalQuery)) {
                    // Try to see if there's a more specific error
                    // we're supposed to display.
                    let error;
                    if (err.response) {
                        // If the check below is true, the API returned
                        // error message that's likely helpful to display
                        if (err.response.data && err.response.data.error) {
                            error = err.response.data.error;
                        } else if (err.response.status === 503) {
                            error =
                                'Our system is a little overloaded, ' +
                                'please try again in a moment';
                        }
                    }

                    // Fallback to a general error message
                    if (!error) {
                        error = 'Something went wrong. Please try again.';
                    }
                    setView(View.ANSWER);
                    setAnswer(undefined);
                    setError(error);
                }
            });
    };

    /**
     * This handler updates the query whenever the user changes the question
     * text. It's bound to the question input's `onChange` handler in the
     * `render` method below.
     *
     * @see https://reactjs.org/docs/forms.html
     */
    const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setQuery(new Query(value, query.choices));
    };

    /**
     * This handler updates the query whenever the user changes the first
     * answer text. It's bound to the answer input's `onChange` handler in the
     * `render` method below.
     *
     * @see https://reactjs.org/docs/forms.html
     */
    const handleFirstAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setQuery(new Query(query.question, [value, query.choices[1]]));
    };

    /**
     * This handler updates the query whenever the user changes the second
     * answer text. It's bound to the answer input's `onChange` handler in the
     * `render` method below.
     *
     * @see https://reactjs.org/docs/forms.html
     */
    const handleSecondAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setQuery(new Query(query.question, [query.choices[0], value]));
    };

    /**
     * This handler is invoked when the form is submitted, which occurs when
     * the user clicks the submit button or when the user clicks input while
     * the button and/or a form element is selected.
     *
     * We use this instead of a onClick button on a button as it matches the
     * traditional form experience that end users expect.
     *
     * @see https://reactjs.org/docs/forms.html
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // By default, HTML forms make a request back to the server. We
        // prevent that and instead submit the request asynchronously.
        event.preventDefault();

        // We add the query params to the URL, so that users can link to
        // our demo and share noteworthy cases, edge cases, etc.
        props.history.push(`/?${query.toQueryString()}`);

        // Query the answer and display the result.
        fetchAnswer();
    };

    /**
     * The render method defines what's rendered. When writing yours keep in
     * mind that you should try to make it a "pure" function of the component's
     * props and state.  In other words, the rendered output should be expressed
     * as a function of the component properties and state.
     *
     * React executes render whenever a component's properties and/or state is
     * updated. The output is then compared with what's rendered and the
     * required updates are made. This is to ensure that rerenders make as few
     * changes to the document as possible -- which can be an expensive process
     * and lead to slow interfaces.
     */
    return (
        <React.Fragment>
            <p>Enter a question and answers below to see what answer our application selects.</p>
            <Form onSubmit={handleSubmit}>
                <InputLabel>Question:</InputLabel>
                <Input.TextArea
                    autoSize={{ minRows: 4, maxRows: 6 }}
                    placeholder="Enter a question"
                    value={query.question}
                    required={true}
                    onChange={handleQuestionChange}
                />
                <InputLabel>Answer 1:</InputLabel>
                <Input.TextArea
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    placeholder="Enter the first possible answer"
                    required={true}
                    value={query.choices[0]}
                    onChange={handleFirstAnswerChange}
                />
                <InputLabel>Answer 2:</InputLabel>
                <Input.TextArea
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    placeholder="Enter the second possible answer"
                    required={true}
                    value={query.choices[1]}
                    onChange={handleSecondAnswerChange}
                />
                <SubmitContainer>
                    <SubmitButton type="primary">Submit</SubmitButton>
                    {view === View.LOADING ? <LoadingOutlined /> : null}
                </SubmitContainer>
                {view === View.ERROR ? (
                    <Alert type="error" message={error || 'Sorry, something went wrong.'} />
                ) : null}
                {view === View.ANSWER && answer ? (
                    <Alert
                        type="info"
                        message="Our system answered:"
                        description={`${answer.answer} (${answer.score}%)`}
                    />
                ) : null}
            </Form>
        </React.Fragment>
    );
};

/**
 * The definitions below create components that we can use in the render
 * function above that have extended / customized CSS attached to them.
 * Learn more about styled components:
 * @see https://www.styled-components.com/
 *
 *
 * CSS is used to modify the display of HTML elements. If you're not familiar
 * with it here's quick introduction:
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS
 */

const Form = styled.form`
    margin: ${({ theme }) => `0 0 ${theme.spacing.sm}`};
    max-width: 600px;
`;

const SubmitButton = styled(Button).attrs({
    htmlType: 'submit',
})`
    margin: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 0`};
`;

const SubmitContainer = styled.div`
    display: grid;
    grid-template-columns: min-content min-content;
    grid-gap: ${({ theme }) => `${theme.spacing.xs} 0 0`};
    align-items: center;
`;

const InputLabel = styled.div`
    margin-top: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;
