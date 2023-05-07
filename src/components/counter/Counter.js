import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { counterFetch } from '../../integrations/counterFetch';
import {
  decrement,
  increment,
  incrementByAmount,
} from '../../reducers/counterReducer';
import styles from '../../styles/counter.module.css';

const Counter = (props) => {
  const { value, increment, decrement, incrementByAmount } = props;

  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  const getAmount = async () => {
    const res = await counterFetch();
    incrementByAmount(res.amount);
  };

  const incrementIfOdd = (amount) => {
    if (value % 2 === 1) {
      incrementByAmount(amount);
    }
  };

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={decrement}
        >
          -
        </button>
        <span className={styles.value}>{value}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={increment}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => incrementByAmount(incrementValue)}
        >
          Add Amount
        </button>
        <button className={styles.asyncButton} onClick={() => getAmount()}>
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => incrementIfOdd(incrementValue)}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    value: state.counter.value,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      increment,
      decrement,
      incrementByAmount,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
