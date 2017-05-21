import React from 'react';
import Colors from '../constants/Colors';
import ErrorCustom from './Error'


export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  componentWillMount() {
    const fakeEvent = {
      target: {
        value: this.props.value || ''
      }
    }

    if (this.props.value instanceof ErrorCustom) return this.setState({ error: true });
    if (this.props.value) this._updateField(fakeEvent);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value instanceof ErrorCustom) this.setState({ error: true });
  }

  _updateField = (ev) => {
    this.props.onChange && this.props.onChange(ev);
    const validate = this.props.validation || (() => true);
    this.setState({ error: !validate(ev.target.value) });
  }

  render() {
    const props = {...this.props};
    delete props.validation;
    delete props.errorMessage;
    delete props.children;
    return (
      <div>
        { this.props.children }
        <input {...props} onError={(ev) => ev.target.value ? this.setState({ error: true }) : null } onChange={ this._updateField }/>
        { this.state.error ? <div className='error-field' style={styles.error}><span>{this.props.errorMessage || "El campo es incorrecto"}</span></div> : null } 
      </div>
    )
  }
}

const styles = {
  error: {
    fontSize: 12,
    background: Colors.red,
    width: 'calc(100% - 20px)',
    marginTop: 5,
    color: 'white',
    padding: '5px 10px',
    borderRadius: 5,
  }
}