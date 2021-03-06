/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import moment from 'moment';
import { compose } from 'recompose';
import propTypes from 'prop-types';
import { Select, message, Spin } from 'antd';
import { withAuth } from '../Session/index';

import NavBar from '../../components/navigationBar';
import JournalCard from '../../components/JournalCard';
import { months } from './data';
import LogoHeader from '../../components/LogoHeader';
import { withFirebase } from '../Firebase/index';

import './feeds.css';

const { Option } = Select;
class Feed extends Component {
  state = {
    data: [],
    monthCount: months,
    loading: true,
    allJournals: [],
  };

  componentDidMount() {
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');

    firebase.db
      .collection('users')
      .doc(userId)
      .get()
      .then(snapshot => {
        if (snapshot.data().userJournals) {
          const allUserJournal = snapshot.data().userJournals;
          const monthArray = allUserJournal.map(journal =>
            moment(journal.timestamp).format('MMMM')
          );
          const filteredObject = monthArray.reduce((acc, curr) => {
            if (typeof acc[curr] == 'undefined') {
              acc[curr] = 1;
            } else {
              acc[curr] += 1;
            }
            return acc;
          }, {});

          const keys = Object.keys(filteredObject);

          for (let i = 0; i < months.length; i++) {
            for (let j = 0; j < keys.length; j++) {
              if (months[i].month === keys[j]) {
                months[i].count = filteredObject[keys[j]];
              }
            }
          }
          const currentMonthJournal = allUserJournal.filter(
            journal =>
              moment(journal.timestamp).format('MMMM') ===
              moment(new Date()).format('MMMM')
          );
          this.setState({
            monthCount: months,
            data: currentMonthJournal,
            loading: false,
            allJournals: allUserJournal,
          });
        }
        this.setState({
          loading: false,
        });
      });
  }

  handleChange = value => {
    const { allJournals } = this.state;
    const selectedJournal = allJournals.filter(
      journal => moment(journal.timestamp).format('MMMM') === value
    );
    this.setState({ data: selectedJournal });
  };

  handleDelete = id => {
    const { firebase } = this.props;
    const userId = firebase.auth.currentUser.uid;

    const { data, monthCount, allJournals } = this.state;
    message.warning('This Journal is deleted');

    const deletedCardMonth = moment(data[0].timestamp).format('MMMM');
    monthCount.map(month => {
      if (month.month === deletedCardMonth) {
        month.count--;
      }
      return month;
    });

    firebase.db
      .collection('users')
      .doc(userId)
      .update({
        userJournals: allJournals.filter(journal => journal.timestamp !== id),
      });

    this.setState({
      data: data.filter(journal => journal.timestamp !== id),
      allJournals: allJournals.filter(journal => journal.timestamp !== id),
    });
  };

  handleJournalDetails = id => {
    const {
      history: { push },
    } = this.props;
    push(`/journal/${id}`);
  };

  render() {
    const { data, monthCount, loading } = this.state;
    return (
      <div className="feeds">
        <div className="feeds__content container">
          <LogoHeader />
          <br />
          <Select
            defaultValue={moment(new Date()).format('MMMM')}
            className="feeds__select"
            onChange={this.handleChange}
          >
            {monthCount.map(element => (
              <Option
                className="feeds__option"
                key={element.id}
                value={element.month}
              >
                <span>{element.month}</span>
                <span>{element.count}</span>
              </Option>
            ))}
          </Select>
        </div>
        <div className="feed_journals container">
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '9vh' }}>
              <Spin size="large" />
            </div>
          ) : data.length > 0 ? (
            data.map(journal => (
              <JournalCard
                key={journal.timestamp}
                time={moment(journal.timestamp).format('h:mm a')}
                date={moment(journal.timestamp).format('MMMM Do YYYY')}
                grateful={journal.grateful && journal.grateful.title}
                challenge={journal.challenge && journal.challenge.title}
                developing={journal.developing && journal.developing.title}
                handleDelete={() => this.handleDelete(journal.timestamp)}
                journalId={journal.timestamp}
                handleJournalDetails={this.handleJournalDetails}
              />
            ))
          ) : (
            <h2 className="feeds__message">
              No entries for this month, choose another one
            </h2>
          )}
        </div>
        <NavBar />
      </div>
    );
  }
}

Feed.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    user: propTypes.func.isRequired,
    db: propTypes.object.isRequired,
  }).isRequired,
};

const AuthFedd = compose(
  withAuth,
  withFirebase
)(Feed);

export default AuthFedd;
