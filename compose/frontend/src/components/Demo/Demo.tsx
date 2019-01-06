import React from 'react';
import { connect } from 'react-redux';
import redux, { bindActionCreators } from 'redux';

import { filesActions } from '../../actions';
import { IFiles } from '../../interfaces';

import * as styles from './styles.css';


interface IDemoProps {
  error: Error;
  files: IFiles;
  filesActions: any;
  loadingFiles: boolean;
  loadingCategories: boolean;
  match: {
    params: {
      expressId: string;
    };
  };
}

class Demo extends React.Component<IDemoProps> {
  componentDidMount() {
    const { files } = this.props;
    // If there is no file data in the store, go get it!
    if (!files.length) {
      this.refreshFileData();
    }
  }

  componentDidUpdate(prevProps: IDemoProps) {
    // If expressId param in the route has changed, get file data for the new Id
    if (this.props.match.params.expressId !== prevProps.match.params.expressId) {
      this.refreshFileData();
    }
  }

  refreshFileData() {
    this.props.filesActions.fetchFiles(this.props.match.params.expressId);
  }

  render() {
    const {
      error,
      loadingFiles,
      files,
      match: {
        params: { expressId },
      },
    } = this.props;

    const result = loadingFiles ? (
      <div className={styles.loading}>Loading...</div>
    ) : error ? (
      <div>
        <p>Error Message: <span className={styles.dang}>{error.message}</span></p>
        <p>Error Stack: <span className={styles.dang}>{error.stack}</span></p>      
      </div>
    ) : (
      <div>
        <p className={styles.sweet}>Your request has succeeded. Your data is below.</p>
        <p className={styles.sweet}>What you would do now is build a nice component tree for it.</p>
        <p>{JSON.stringify(files)}</p>
      </div>
    );

    return (
      <>
        <div className={styles.sweet}>
          <p>Welcome to the demo page.</p>
          <p>The purpose of this page is simply to demonstrate how:</p>
          <p>1) React is hooked up (via Redux) to the backend of the application</p>
          <p>2) How state is managed with Redux and React-Redux</p>
          <p>Kindly pretend for a moment that you are requesting data from the fileService on uploaded documents for Express Application Id: {expressId}.</p>
          <p>There is a 50% chance your request will succeed. The UI will reflect the result.</p>
        </div>
        <hr />

        {result}
      </>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    error: state.demo.error,
    expressId: state.demo.expressId,
    files: state.demo.files,
    loadingFiles: state.demo.loadingFiles,
  };
}

function mapDispatchToProps(dispatch: redux.Dispatch) {
  return {
    filesActions: bindActionCreators(filesActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Demo);
