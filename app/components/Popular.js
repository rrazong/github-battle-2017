import React from 'react';
import Loading from './Loading';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { fetchPopularRepos } from '../utils/api'

class Popular extends React.Component {

  state = {
    selectedLanguage: 'All',
    isLoading: true,
    repos: null,
  };

  updateLanguage = (selectedLanguage) => {
    this.setState(function() {
      return {
        selectedLanguage
      }
    });

    fetchPopularRepos(selectedLanguage).then(function(repos) {
      this.setState(function() {
        return {
          isLoading: false,
          repos,
        }
      });
    }.bind(this));
  }

  componentDidMount() {
     this.updateLanguage(this.state.selectedLanguage);
  }

  render() {
    const { selectedLanguage, isLoading, repos } = this.state;
    return (
      <div>
        <SelectLanguge
          selectedLanguage={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        <ReposGrid
          isLoading={isLoading}
          repos={repos}
        />
      </div>
    );
  }
}

function ReposGrid (props) {
  const { isLoading, repos } = props;

  return (
    <div>
      { isLoading
        ? <Loading />
        : (
          <ul className='repos'>
            {repos.map(function(repo, index) {
              const { id, name, owner: { avatar_url, login }, html_url, stargazers_count } = repo;
              return (
                <li
                  className='repos-item'
                  key={ id }
                >
                  <div className='repos-rank'>
                    #{index + 1}
                  </div>
                  <img
                    alt={`Avatar of ${ name }`}
                    className='repos-avatar'
                    src={ avatar_url }
                  />
                  <h3 className='repos-title'>
                    <a href={ html_url } >
                      { name }
                    </a>
                  </h3>
                  <div> @{ login } </div>
                  <div> { stargazers_count } stars</div>
                </li>
              )
            })}
          </ul>
        )
      }
    </div>
  )
}

ReposGrid.propType = {
  repos: PropTypes.array.isRequired,
}

function SelectLanguge (props) {
  const languages = [
    'All',
    'Javascript',
    'Ruby',
    'Java',
    'CSS',
    'Python',
  ];
  const { selectedLanguage, updateLanguage } = props;

  return (
    <ul className='languages' >
      {languages.map(lang => (
          <li
            className={classnames(
              'languages-item',
              { 'languages-item--selected': lang == selectedLanguage },
            )}
            key={lang}
            onClick={updateLanguage.bind(null, lang)}
          >
              {lang}
          </li>
      ))}
    </ul>
  );
}

SelectLanguge.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
}

export default Popular;
