import React, { Component } from 'react';
import CCUtils from 'creditcardutils';
import Colors from '../constants/Colors';
import Input from './Input'
import { connect } from 'react-redux';
import ErrorCustom from './Error'
import { submitPayment } from '../actions/bookActions';
import api from '../lib/api';
import countries from '../../public/countries.json';

class BillingLoader extends Component {
  constructor(props) {
    super(props);
    this.state = { payment: this.props.payment || {}, regions: [] };
  }

  componentWillMount() {
    this.setState({ payment: this.state.payment, regions: countries });
  }

  _submit = async () => {

    const requiredFields = ['ccnumber', 'ccdate', 'ccv', 'name', 'lastname', 'dni', 'city', 'postalcode', 'street', 'email', 'phone', 'country', 'state'];
    const emptyFields = [];
    const errorObj = {};

    requiredFields.forEach((field) => {
      if (!this.state.payment[field] || this.state.payment[field] instanceof ErrorCustom) emptyFields.push(field);
    })

    if (emptyFields.length) {
      emptyFields.forEach((field) => {
        errorObj[field] = new ErrorCustom();
      })

      this.props.dispatch(submitPayment({...this.state.payment, ...errorObj}));
      this.setState({payment: {...this.state.payment, ...errorObj} });
      return;
    }

    this.props.dispatch(submitPayment(this.state.payment));
    
    const ccvalid = await api.validateCard({ number: this.state.payment.ccnumber.split(' ').join(''), exp_date: this.state.payment.ccdate.split(' / ').join(''), sec_code: this.state.payment.ccv });
    if (ccvalid.error || !ccvalid.valid ) return alert('La tarjeta de crédito es inválida. Por favor, revisela.');

    if (window.document.querySelector('.error-field')) return;
    this.props.nextStep();
  }

  _updateField = async (event) => {
    const payment = {...this.state.payment};

    if (event.target.name === 'ccnumber') {
      const newNumber = CCUtils.formatCardNumber(event.target.value);
      payment.cctype = CCUtils.parseCardType(newNumber);
      event.target.value = newNumber;  
    } else if (event.target.name === 'ccdate') {
      const newNumber = CCUtils.formatCardExpiry(event.target.value);
      event.target.value = newNumber;  
    }

    payment[event.target.name] = event.target.value;
    this.props.dispatch(submitPayment(payment));
    this.setState({payment});
    
    if ((event.target.name || '').startsWith('cc')) {
      const validNum = CCUtils.validateCardNumber(payment.ccnumber) && ['visa', 'mastercard', 'dinersclub', 'amex'].includes(CCUtils.parseCardType(payment.ccnumber));
      const validExpiry = CCUtils.validateCardExpiry(...((payment.ccdate || '').split('/')));
      const validCCV = CCUtils.validateCardCVC(payment.ccv, payment.cardType);

      if (validNum && validExpiry && validCCV) {
        const body = {
          flight_id: this.props.flightId,
          adults: this.props.flightParams.adults,
          children: this.props.flightParams.children,
          infants: this.props.flightParams.infants,
          number: payment.ccnumber.split(' ').join(''),
        }

        const response = await api.getInstallments(body);

        if (response.error) return;
        this.setState({payment: {...payment, installments: response.installments }})
      }
    }
  }

  render() {
    return (
      <div style={ styles.elementContainer}>
        <h2 style={{ ...styles.title, ...{color: Colors.lightblue} }}>Forma de pago</h2>
        <h3 style={styles.title}>Tarjeta de crédito { this.props.index || '' }</h3>
        <div style={styles.fieldContainer}>
          <div style={styles.fieldset}>
            <label style={styles.label} htmlFor="">Numero de tarjeta <span>{ this.state.payment.cctype || ''}</span></label>
            <Input errorMessage="El número de tarjeta es inválido" validation={ (val) => val ? CCUtils.validateCardNumber(val) && ['visa', 'mastercard', 'dinersclub', 'amex'].includes(CCUtils.parseCardType(val)) : true } required style={styles.input} onChange={this._updateField.bind(this)} value={this.state.payment.ccnumber} name="ccnumber" placeholder="•••• •••• •••• ••••" type="text"/>
          </div>
          <div style={{ ...styles.fieldset, ...{ width: 150 } }}>
            <label style={styles.label} htmlFor="">Vencimiento</label>
            <Input errorMessage="Vencimiento inválido"validation={ (val) => val ? CCUtils.validateCardExpiry(...(val.split('/'))) : true } required style={styles.input} onChange={this._updateField.bind(this)} value={this.state.payment.ccdate} name="ccdate" placeholder="mm / yy" type="text" />
          </div>
          <div style={{ ...styles.fieldset, ...{ width: 80 } }}>
            <label style={styles.label} htmlFor="">CVV</label>
            <Input name="ccv" value={this.state.payment.ccv} onChange={this._updateField.bind(this)} errorMessage="Incorrecto" validation={ (val) => val ? CCUtils.validateCardCVC(val, this.state.payment.cardType) : true } required style={ styles.input } minLength="2" maxLength="4" placeholder="•••" type="text" />
          </div>
          <div style={{ ...styles.fieldset, ...{ width: 90 }, display: this.state.payment.installments ? 'block' : 'none' }}>
            <label style={styles.label} htmlFor="">Cuotas</label>
            <select className="sell-select" value={this.state.payment.installment || '1'} onChange={this._updateField.bind(this)} name="installment" id="">
              { (this.state.payment.installments || []).map((installment) => <option key={installment.quantity} value={installment.quantity}>{installment.quantity} Cuotas</option> ) }
            </select>
          </div>
          <div style={{ ...styles.fieldset, ...{ width: 200 } }}>
            <label style={styles.label} htmlFor="">Nombre del titular</label>
            <Input maxLength="80" name="name" value={this.state.payment.name} onChange={this._updateField.bind(this)} required style={styles.input} validation={(text) => text ? new RegExp('^[A-Za-z áéíóúñ]+$').test(text) : true} minLength="2" type="text"/>
          </div>
          <div style={{ ...styles.fieldset, ...{ width: 200 } }}>
            <label style={styles.label} htmlFor="">Apellido del titular</label>
            <Input maxLength="80" name="lastname" value={this.state.payment.lastname} onChange={this._updateField.bind(this)} required style={styles.input} validation={(text) => text ? new RegExp('^[A-Za-z áéíóúñ]+$').test(text) : true} minLength="2" type="text"/>
          </div>
          <div style={styles.fieldset}>
            <label style={styles.label} htmlFor="">DNI del titular</label>
            <Input maxLength="8" name="dni" value={this.state.payment.dni} onChange={this._updateField.bind(this)} errorMessage="Solo se permiten números" required style={styles.input} validation={(text) => text ? new RegExp('^[0-9]+$').test(text) : true} minLength="2" type="text"/>
          </div>
        </div>

        <h3 style={styles.title}>Dirección de facturación { this.props.index || '' }</h3>
        <div style={styles.fieldContainer}>
          <div style={{ ...styles.fieldset, ...{ width: 150 } }}>
            <label style={styles.label} htmlFor="">Pais</label>
            <select className="sell-select" style={{ width: 150 }} value={this.state.payment.country} onChange={this._updateField.bind(this)} name="country" id="">
              <option value="">País</option>
              { this.state.regions.map((region) => <option key={region.countryName} value={region.countryShortCode}> {region.countryName} </option>) }
            </select>
            { this.state.payment.country instanceof ErrorCustom ? <div style={styles.error}><span>{"Seleccione un país"}</span></div> : null }
          </div>
          <div style={{ ...styles.fieldset, ...{ width: 150 } }}>
            <label style={styles.label} htmlFor="">Estado o provincia</label>
            <select className="sell-select" style={{ width: 150 }} value={this.state.payment.state} onChange={this._updateField.bind(this)} name="state" id="">
              <option value="">Estado</option>
              { this.state.regions.length ? (this.state.regions.find((country) => country.countryShortCode === this.state.payment.country) || {regions: []}).regions.map((state) => <option key={state.name} value={state.name + '|' + state.shortCode}> {state.name} </option>) : null }
            </select>
            { this.state.payment.state instanceof ErrorCustom ? <div style={styles.error}><span>{"Seleccione un estado"}</span></div> : null }
          </div>
          <div style={{ ...styles.fieldset, ...{ width: 250 } }}>
            <label style={styles.label} htmlFor="">Ciudad</label>
            <Input maxLength="80" name="city" value={this.state.payment.city} onChange={this._updateField.bind(this)} errorMessage="Sólo se permiten letras" validation={(text) => text ? new RegExp('^[A-Za-z ]+$').test(text) : true} required style={styles.input} minLength="1" type="text"/>
          </div>
          <div style={{ ...styles.fieldset, ...{ width: 150 } }}>
            <label style={styles.label} htmlFor="">Codigo postal</label>
            <Input name="postalcode" validation={(text) => text ? new RegExp('^[A-Za-z0-9]+$').test(text) : true} value={this.state.payment.postalcode} onChange={this._updateField.bind(this)} required style={styles.input} minLength="1" maxLength="10" type="text"/>
          </div>
          <div style={styles.fieldset}>
            <label style={styles.label} htmlFor="">Calle</label>
            <Input maxLength="80" name="street" validation={(text) => text ? new RegExp('^[A-Za-z áéíóúñ0-9]+$').test(text) : true} value={this.state.payment.street} onChange={this._updateField.bind(this)} required style={styles.input} type="text"/>
          </div>
          <div style={{ ...styles.fieldset, ...{ width: 200 } }}>
            <label style={styles.label} htmlFor="">Departamento (opcional)</label>
            <Input validation={(text) => text ? new RegExp('^[A-Za-z0-9]+$').test(text) : true} name="apt" value={this.state.payment.apt} onChange={this._updateField.bind(this)} style={styles.input} maxLength="5" type="text"/>
          </div>
        </div>

        <h3 style={styles.title}>Contacto { this.props.index || '' }</h3>
        <div style={styles.fieldContainer}>
          <div style={styles.fieldset}>
            <label style={styles.label} htmlFor="">Email</label>
            <Input name="email" value={this.state.payment.email} onChange={this._updateField.bind(this)} errorMessage="No es un email correcto" validation={(text) => text ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(text) : true} required style={styles.input} maxLength="128" type="email"/>
          </div>
          <div style={styles.fieldset}>
            <label style={styles.label} htmlFor="">Número de teléfono</label>
            <Input name="phone" value={this.state.payment.phone} onChange={this._updateField.bind(this)} errorMessage="El campo está vacío o contiene caracteres inválidos" validation={(text) => text ? new RegExp('^[0-9 +() ]+$').test(text) : true} required style={styles.input} minLength="3" maxLength="25" type="text"/>
          </div>
        </div>

        <button onClick={ this.props.prevStep } style={ styles.btnSecond }>MODIFICAR PASAJEROS</button>
        <button onClick={ this._submit } style={ styles.btn }>REALIZAR COMPRA</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  payment: state.book.payment,
  flightId: state.book.flightId,
  flightParams: state.flights.flightParams,
});

export default connect(mapStateToProps)(BillingLoader);


const styles = {
  title: {
    color: Colors.blue,
    marginTop: 20,
    marginBottom: 0,
  },
  elementContainer: {
    backgroundColor: Colors.grey,
    padding: 20,
    textAlign: 'left'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: 16,
    boxSizing: 'border-box',
    borderRadius: 5,
    outline: 'none',
    border: '1px solid grey'
  },
  label: {
    display: 'block',
    fontWeight: 900,
    marginBottom: 15,
  },
  fieldContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '900px',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  fieldset: {
    textAlign: 'left',
    width: 430,
    marginRight: 15,
    marginTop: 20
  },
  btn: {
    backgroundColor: Colors.pink,
    border: '1px solid red',
    padding: '10px 20px',
    outline: 'none',
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: 5,
    color: 'white',
    fontWeight: 900
  },
  btnSecond: {
    backgroundColor: 'grey',
    border: '1px solid grey',
    padding: '10px 20px',
    outline: 'none',
    cursor: 'pointer',
    marginTop: 20,
    marginRight: 10,
    borderRadius: 5,
    color: 'white',
    fontWeight: 900
  },
  error: {
    fontSize: 12,
    background: Colors.pink,
    width: 'calc(100% - 20px)',
    marginTop: 5,
    color: 'white',
    padding: '5px 10px',
    borderRadius: 5,
  }
};